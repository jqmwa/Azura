import {
	bytesToHex,
	EVMClient,
	encodeCallMsg,
	getNetwork,
	LAST_FINALIZED_BLOCK_NUMBER,
	type Runtime,
} from '@chainlink/cre-sdk'
import { type Address, decodeFunctionResult, encodeFunctionData, zeroAddress } from 'viem'
import { BalanceReader, IERC20 } from '../contracts/abi'
import type { Config } from './main'

const createEvmClient = (chainSelectorName: string): EVMClient => {
	const network = getNetwork({
		chainFamily: 'evm',
		chainSelectorName,
		isTestnet: true,
	})

	if (!network) {
		throw new Error(`Network not found for chain selector name: ${chainSelectorName}`)
	}

	return new EVMClient(network.chainSelector.selector)
}

export const readWbtcBalance = (runtime: Runtime<Config>): bigint => {
	const evmClient = createEvmClient(runtime.config.chainSelectorName)

	const callData = encodeFunctionData({
		abi: IERC20,
		functionName: 'balanceOf',
		args: [runtime.config.treasuryWallet as Address],
	})

	const contractCall = evmClient
		.callContract(runtime, {
			call: encodeCallMsg({
				from: zeroAddress,
				to: runtime.config.wbtcAddress as Address,
				data: callData,
			}),
			blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
		})
		.result()

	const balance = decodeFunctionResult({
		abi: IERC20,
		functionName: 'balanceOf',
		data: bytesToHex(contractCall.data),
	})

	runtime.log(`WBTC balance: ${balance.toString()}`)
	return balance
}

export const readWethBalance = (runtime: Runtime<Config>): bigint => {
	const evmClient = createEvmClient(runtime.config.chainSelectorName)

	const callData = encodeFunctionData({
		abi: IERC20,
		functionName: 'balanceOf',
		args: [runtime.config.treasuryWallet as Address],
	})

	const contractCall = evmClient
		.callContract(runtime, {
			call: encodeCallMsg({
				from: zeroAddress,
				to: runtime.config.wethAddress as Address,
				data: callData,
			}),
			blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
		})
		.result()

	const balance = decodeFunctionResult({
		abi: IERC20,
		functionName: 'balanceOf',
		data: bytesToHex(contractCall.data),
	})

	runtime.log(`WETH balance: ${balance.toString()}`)
	return balance
}

export const readNativeEthBalance = (runtime: Runtime<Config>): bigint => {
	const evmClient = createEvmClient(runtime.config.chainSelectorName)

	const callData = encodeFunctionData({
		abi: BalanceReader,
		functionName: 'getNativeBalances',
		args: [[runtime.config.treasuryWallet as Address]],
	})

	const contractCall = evmClient
		.callContract(runtime, {
			call: encodeCallMsg({
				from: zeroAddress,
				to: runtime.config.balanceReaderAddress as Address,
				data: callData,
			}),
			blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
		})
		.result()

	const balances = decodeFunctionResult({
		abi: BalanceReader,
		functionName: 'getNativeBalances',
		data: bytesToHex(contractCall.data),
	})

	if (!balances || balances.length === 0) {
		throw new Error('No native ETH balances returned from contract')
	}

	runtime.log(`Native ETH balance: ${balances[0].toString()}`)
	return balances[0]
}

export const readAzuraTotalSupply = (runtime: Runtime<Config>): bigint => {
	const evmClient = createEvmClient(runtime.config.chainSelectorName)

	const callData = encodeFunctionData({
		abi: IERC20,
		functionName: 'totalSupply',
	})

	const contractCall = evmClient
		.callContract(runtime, {
			call: encodeCallMsg({
				from: zeroAddress,
				to: runtime.config.azuraTokenAddress as Address,
				data: callData,
			}),
			blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
		})
		.result()

	const supply = decodeFunctionResult({
		abi: IERC20,
		functionName: 'totalSupply',
		data: bytesToHex(contractCall.data),
	})

	runtime.log(`Azura total supply: ${supply.toString()}`)
	return supply
}
