// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AzuraToken.sol";

contract DeployMockTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy mock WBTC (8 decimals like real WBTC, but we'll use 18 for simplicity on testnet)
        AzuraToken wbtc = new AzuraToken("Wrapped Bitcoin", "WBTC", 100e18);
        console.log("Mock WBTC deployed at:", address(wbtc));

        // Deploy mock WETH
        AzuraToken weth = new AzuraToken("Wrapped Ether", "WETH", 1000e18);
        console.log("Mock WETH deployed at:", address(weth));

        // Transfer some to the treasury wallet (deployer is treasury wallet)
        // Already minted to deployer in constructor, so balances are set

        vm.stopBroadcast();

        console.log("--- Mock Token Summary ---");
        console.log("WBTC:", address(wbtc));
        console.log("WETH:", address(weth));
        console.log("Treasury (deployer):", deployer);
    }
}
