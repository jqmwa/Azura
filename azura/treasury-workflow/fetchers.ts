import {
	ConsensusAggregationByFields,
	HTTPClient,
	type HTTPSendRequester,
	median,
	type Runtime,
} from '@chainlink/cre-sdk'
import type { Config } from './main'
import type { CryptoPrices, MetalPrices } from './types'

interface MetalsDevResponse {
	gold: number
	silver: number
	platinum: number
	palladium: number
}

const fetchMetalPricesRaw = (sendRequester: HTTPSendRequester, config: Config): MetalPrices => {
	const response = sendRequester
		.sendRequest({ method: 'GET', url: config.metalsPriceUrl })
		.result()

	if (response.statusCode !== 200) {
		throw new Error(`Metals API request failed with status: ${response.statusCode}`)
	}

	const responseText = Buffer.from(response.body).toString('utf-8')
	const data: MetalsDevResponse = JSON.parse(responseText)

	return {
		gold: data.gold,
		silver: data.silver,
		platinum: data.platinum,
		palladium: data.palladium,
	}
}

export const fetchMetalPrices = (runtime: Runtime<Config>): MetalPrices => {
	const httpCapability = new HTTPClient()

	const prices = httpCapability
		.sendRequest(
			runtime,
			fetchMetalPricesRaw,
			ConsensusAggregationByFields<MetalPrices>({
				gold: median,
				silver: median,
				platinum: median,
				palladium: median,
			}),
		)(runtime.config)
		.result()

	runtime.log(
		`Metal prices — XAU: $${prices.gold}, XAG: $${prices.silver}, XPT: $${prices.platinum}, XPD: $${prices.palladium}`,
	)

	return prices
}

interface CoinGeckoResponse {
	bitcoin: { usd: number }
	ethereum: { usd: number }
}

const fetchCryptoPricesRaw = (
	sendRequester: HTTPSendRequester,
	config: Config,
): CryptoPrices => {
	const response = sendRequester
		.sendRequest({ method: 'GET', url: config.cryptoPriceUrl })
		.result()

	if (response.statusCode !== 200) {
		throw new Error(`CoinGecko API request failed with status: ${response.statusCode}`)
	}

	const responseText = Buffer.from(response.body).toString('utf-8')
	const data: CoinGeckoResponse = JSON.parse(responseText)

	return {
		bitcoin: data.bitcoin.usd,
		ethereum: data.ethereum.usd,
	}
}

export const fetchCryptoPrices = (runtime: Runtime<Config>): CryptoPrices => {
	const httpCapability = new HTTPClient()

	const prices = httpCapability
		.sendRequest(
			runtime,
			fetchCryptoPricesRaw,
			ConsensusAggregationByFields<CryptoPrices>({
				bitcoin: median,
				ethereum: median,
			}),
		)(runtime.config)
		.result()

	runtime.log(`Crypto prices — BTC: $${prices.bitcoin}, ETH: $${prices.ethereum}`)

	return prices
}
