import { encodeFunctionData } from 'viem'
import { AzuraTreasury } from '../contracts/abi'
import type { CryptoPrices, MetalPrices, RwaHoldingConfig, TreasuryHolding, TreasuryReport } from './types'
import { AssetType } from './types'

const DECIMALS_18 = 10n ** 18n

const toUsd18 = (price: number): bigint => BigInt(Math.round(price * 1e18))

const metalPriceForAsset = (assetType: AssetType, prices: MetalPrices): number => {
	switch (assetType) {
		case AssetType.XAU:
			return prices.gold
		case AssetType.XAG:
			return prices.silver
		case AssetType.XPT:
			return prices.platinum
		case AssetType.XPD:
			return prices.palladium
		default:
			throw new Error(`Unknown metal asset type: ${assetType}`)
	}
}

export const buildTreasuryReport = (
	metalPrices: MetalPrices,
	cryptoPrices: CryptoPrices,
	rwaHoldings: RwaHoldingConfig[],
	wbtcBalance: bigint,
	wethBalance: bigint,
	nativeEthBalance: bigint,
	azuraTotalSupply: bigint,
): TreasuryReport => {
	const holdings: TreasuryHolding[] = []

	// RWA holdings (metals) — quantities from config, prices from API
	for (const rwa of rwaHoldings) {
		const price = metalPriceForAsset(rwa.assetType, metalPrices)
		const priceUsd = toUsd18(price)
		// Scale reserve units to 18 decimals
		const amount = BigInt(Math.round(rwa.reserveUnits * 10 ** rwa.decimals)) *
			(DECIMALS_18 / BigInt(10 ** rwa.decimals))
		const valueUsd = (amount * priceUsd) / DECIMALS_18

		holdings.push({
			assetType: rwa.assetType,
			symbol: rwa.symbol,
			amount,
			priceUsd,
			valueUsd,
		})
	}

	// BTC holding — WBTC balance from chain, price from CoinGecko
	const btcPriceUsd = toUsd18(cryptoPrices.bitcoin)
	const btcValueUsd = (wbtcBalance * btcPriceUsd) / DECIMALS_18
	holdings.push({
		assetType: AssetType.BTC,
		symbol: 'BTC',
		amount: wbtcBalance,
		priceUsd: btcPriceUsd,
		valueUsd: btcValueUsd,
	})

	// ETH holding — WETH + native ETH from chain, price from CoinGecko
	const ethPriceUsd = toUsd18(cryptoPrices.ethereum)
	const totalEthBalance = wethBalance + nativeEthBalance
	const ethValueUsd = (totalEthBalance * ethPriceUsd) / DECIMALS_18
	holdings.push({
		assetType: AssetType.ETH,
		symbol: 'ETH',
		amount: totalEthBalance,
		priceUsd: ethPriceUsd,
		valueUsd: ethValueUsd,
	})

	// Aggregate total value
	let totalValueUsd = 0n
	for (const h of holdings) {
		totalValueUsd += h.valueUsd
	}

	// Compute backing ratio (18-decimal fixed point)
	// backingRatio = totalValueUsd * 1e18 / azuraTotalSupply
	const backingRatio =
		azuraTotalSupply > 0n ? (totalValueUsd * DECIMALS_18) / azuraTotalSupply : 0n

	const timestamp = BigInt(Math.floor(Date.now() / 1000))

	return {
		holdings,
		totalValueUsd,
		azuraTotalSupply,
		backingRatio,
		timestamp,
	}
}

export const encodeTreasuryReport = (report: TreasuryReport): `0x${string}` => {
	const holdingsArgs = report.holdings.map((h) => ({
		assetType: h.assetType,
		amount: h.amount,
		priceUsd: h.priceUsd,
		valueUsd: h.valueUsd,
	}))

	return encodeFunctionData({
		abi: AzuraTreasury,
		functionName: 'updateReserves',
		args: [
			{
				holdings: holdingsArgs,
				totalValueUsd: report.totalValueUsd,
				azuraTotalSupply: report.azuraTotalSupply,
				backingRatio: report.backingRatio,
				timestamp: report.timestamp,
			},
		],
	})
}
