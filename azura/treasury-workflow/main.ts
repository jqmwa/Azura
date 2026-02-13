import {
	type CronPayload,
	handler,
	CronCapability,
	Runner,
	type Runtime,
} from '@chainlink/cre-sdk'
import { z } from 'zod'
import { fetchCryptoPrices, fetchMetalPrices } from './fetchers'
import { readAzuraTotalSupply, readNativeEthBalance, readWbtcBalance, readWethBalance } from './readers'
import { buildTreasuryReport, encodeTreasuryReport } from './report'
import { AssetType } from './types'
import type { RwaHoldingConfig } from './types'
import { writeTreasuryReport } from './writer'

const configSchema = z.object({
	schedule: z.string(),
	metalsPriceUrl: z.string(),
	cryptoPriceUrl: z.string(),
	rwaHoldings: z.array(
		z.object({
			assetType: z.number(),
			symbol: z.string(),
			reserveUnits: z.number(),
			decimals: z.number(),
		}),
	),
	chainSelectorName: z.string(),
	gasLimit: z.string(),
	wbtcAddress: z.string(),
	wethAddress: z.string(),
	treasuryWallet: z.string(),
	balanceReaderAddress: z.string(),
	azuraTokenAddress: z.string(),
	treasuryProxyAddress: z.string(),
})

export type Config = z.infer<typeof configSchema>

const safeJsonStringify = (obj: any): string =>
	JSON.stringify(obj, (_, value) => (typeof value === 'bigint' ? value.toString() : value), 2)

const onCronTrigger = (runtime: Runtime<Config>, payload: CronPayload): string => {
	if (!payload.scheduledExecutionTime) {
		throw new Error('Scheduled execution time is required')
	}

	runtime.log('Treasury workflow: starting aggregation...')

	// Fetch prices from external APIs
	const metalPrices = fetchMetalPrices(runtime)
	const cryptoPrices = fetchCryptoPrices(runtime)

	// Read on-chain balances
	const wbtcBalance = readWbtcBalance(runtime)
	const wethBalance = readWethBalance(runtime)
	const nativeEthBalance = readNativeEthBalance(runtime)
	const azuraTotalSupply = readAzuraTotalSupply(runtime)

	// Parse RWA holdings config
	const rwaHoldings: RwaHoldingConfig[] = runtime.config.rwaHoldings.map((h) => ({
		assetType: h.assetType as AssetType,
		symbol: h.symbol,
		reserveUnits: h.reserveUnits,
		decimals: h.decimals,
	}))

	// Build treasury report
	const report = buildTreasuryReport(
		metalPrices,
		cryptoPrices,
		rwaHoldings,
		wbtcBalance,
		wethBalance,
		nativeEthBalance,
		azuraTotalSupply,
	)

	runtime.log(`Treasury report: ${safeJsonStringify(report)}`)

	// Encode and write on-chain
	const callData = encodeTreasuryReport(report)
	const txHash = writeTreasuryReport(runtime, callData)

	runtime.log(`Treasury update complete. Backing ratio: ${report.backingRatio.toString()}`)

	return txHash
}

const initWorkflow = (config: Config) => {
	const cronTrigger = new CronCapability()

	return [
		handler(
			cronTrigger.trigger({
				schedule: config.schedule,
			}),
			onCronTrigger,
		),
	]
}

export async function main() {
	const runner = await Runner.newRunner<Config>({
		configSchema,
	})
	await runner.run(initWorkflow)
}
