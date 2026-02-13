export enum AssetType {
	BTC = 0,
	ETH = 1,
	XAU = 2,
	XAG = 3,
	XPT = 4,
	XPD = 5,
}

export interface TreasuryHolding {
	assetType: AssetType
	symbol: string
	amount: bigint // raw amount scaled to 18 decimals
	priceUsd: bigint // USD price scaled to 18 decimals
	valueUsd: bigint // total value scaled to 18 decimals
}

export interface RwaHoldingConfig {
	assetType: AssetType
	symbol: string
	reserveUnits: number // off-chain attested quantity
	decimals: number
}

export interface TreasuryReport {
	holdings: TreasuryHolding[]
	totalValueUsd: bigint
	azuraTotalSupply: bigint
	backingRatio: bigint // 18-decimal fixed point (1e18 = 1:1 backing)
	timestamp: bigint
}

export interface MetalPrices {
	gold: number
	silver: number
	platinum: number
	palladium: number
}

export interface CryptoPrices {
	bitcoin: number
	ethereum: number
}
