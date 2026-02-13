export const AzuraTreasury = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'totalValueUsd',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'backingRatio',
				type: 'uint256',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'timestamp',
				type: 'uint256',
			},
		],
		name: 'ReservesUpdated',
		type: 'event',
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{ internalType: 'uint8', name: 'assetType', type: 'uint8' },
							{ internalType: 'uint256', name: 'amount', type: 'uint256' },
							{ internalType: 'uint256', name: 'priceUsd', type: 'uint256' },
							{ internalType: 'uint256', name: 'valueUsd', type: 'uint256' },
						],
						internalType: 'struct Holding[]',
						name: 'holdings',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'totalValueUsd', type: 'uint256' },
					{ internalType: 'uint256', name: 'azuraTotalSupply', type: 'uint256' },
					{ internalType: 'uint256', name: 'backingRatio', type: 'uint256' },
					{ internalType: 'uint256', name: 'timestamp', type: 'uint256' },
				],
				internalType: 'struct TreasuryReport',
				name: 'report',
				type: 'tuple',
			},
		],
		name: 'updateReserves',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getLatestReport',
		outputs: [
			{
				components: [
					{
						components: [
							{ internalType: 'uint8', name: 'assetType', type: 'uint8' },
							{ internalType: 'uint256', name: 'amount', type: 'uint256' },
							{ internalType: 'uint256', name: 'priceUsd', type: 'uint256' },
							{ internalType: 'uint256', name: 'valueUsd', type: 'uint256' },
						],
						internalType: 'struct Holding[]',
						name: 'holdings',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'totalValueUsd', type: 'uint256' },
					{ internalType: 'uint256', name: 'azuraTotalSupply', type: 'uint256' },
					{ internalType: 'uint256', name: 'backingRatio', type: 'uint256' },
					{ internalType: 'uint256', name: 'timestamp', type: 'uint256' },
				],
				internalType: 'struct TreasuryReport',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getBackingRatio',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getTotalValue',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lastUpdated',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
] as const
