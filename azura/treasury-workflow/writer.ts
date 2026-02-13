import {
	bytesToHex,
	EVMClient,
	getNetwork,
	hexToBase64,
	type Runtime,
	TxStatus,
} from '@chainlink/cre-sdk'
import type { Config } from './main'

export const writeTreasuryReport = (runtime: Runtime<Config>, encodedCallData: `0x${string}`): string => {
	const network = getNetwork({
		chainFamily: 'evm',
		chainSelectorName: runtime.config.chainSelectorName,
		isTestnet: true,
	})

	if (!network) {
		throw new Error(
			`Network not found for chain selector name: ${runtime.config.chainSelectorName}`,
		)
	}

	const evmClient = new EVMClient(network.chainSelector.selector)

	runtime.log('Generating consensus-signed treasury report...')

	const reportResponse = runtime
		.report({
			encodedPayload: hexToBase64(encodedCallData),
			encoderName: 'evm',
			signingAlgo: 'ecdsa',
			hashingAlgo: 'keccak256',
		})
		.result()

	const resp = evmClient
		.writeReport(runtime, {
			receiver: runtime.config.treasuryProxyAddress,
			report: reportResponse,
			gasConfig: {
				gasLimit: runtime.config.gasLimit,
			},
		})
		.result()

	const txStatus = resp.txStatus

	if (txStatus !== TxStatus.SUCCESS) {
		throw new Error(`Failed to write treasury report: ${resp.errorMessage || txStatus}`)
	}

	const txHash = resp.txHash || new Uint8Array(32)
	const txHashHex = bytesToHex(txHash)

	runtime.log(`Treasury report written on-chain. txHash: ${txHashHex}`)

	return txHashHex
}
