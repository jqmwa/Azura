// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AzuraToken.sol";
import "../src/AzuraTreasury.sol";
import "../src/AzuraTreasuryProxy.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        // Workflow name must be bytes10 — truncated/padded from the string
        bytes10 workflowName = bytes10(bytes("azura-trea"));

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy AzuraToken
        AzuraToken token = new AzuraToken("Azura", "AZURA", 1_000_000e18);
        console.log("AzuraToken deployed at:", address(token));

        // 2. Deploy AzuraTreasury with deployer as initial authorized proxy
        AzuraTreasury treasury = new AzuraTreasury(deployer);
        console.log("AzuraTreasury deployed at:", address(treasury));

        // 3. Deploy AzuraTreasuryProxy
        AzuraTreasuryProxy proxy = new AzuraTreasuryProxy(
            address(treasury),
            deployer,
            workflowName
        );
        console.log("AzuraTreasuryProxy deployed at:", address(proxy));

        // 4. Authorize the proxy on the treasury
        treasury.setProxy(address(proxy));
        console.log("Proxy authorized on treasury");

        vm.stopBroadcast();

        console.log("--- Deployment Summary ---");
        console.log("Deployer:", deployer);
        console.log("AzuraToken:", address(token));
        console.log("AzuraTreasury:", address(treasury));
        console.log("AzuraTreasuryProxy:", address(proxy));
    }
}
