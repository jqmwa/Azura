// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AzuraToken.sol";
import "../src/AzuraTreasury.sol";
import "../src/AzuraTreasuryProxy.sol";

contract AzuraTreasuryTest is Test {
    AzuraToken token;
    AzuraTreasury treasury;
    AzuraTreasuryProxy proxy;

    address deployer = address(this);
    bytes10 workflowName = bytes10(bytes("azura-trea"));

    function setUp() public {
        token = new AzuraToken("Azura", "AZURA", 1_000_000e18);
        treasury = new AzuraTreasury(deployer);
        proxy = new AzuraTreasuryProxy(address(treasury), deployer, workflowName);
        treasury.setProxy(address(proxy));
    }

    function test_TokenDeployment() public view {
        assertEq(token.name(), "Azura");
        assertEq(token.symbol(), "AZURA");
        assertEq(token.totalSupply(), 1_000_000e18);
        assertEq(token.balanceOf(deployer), 1_000_000e18);
    }

    function test_TokenMintBurn() public {
        token.mint(address(0xBEEF), 500e18);
        assertEq(token.balanceOf(address(0xBEEF)), 500e18);

        vm.prank(address(0xBEEF));
        token.burn(100e18);
        assertEq(token.balanceOf(address(0xBEEF)), 400e18);
    }

    function test_TokenMintOnlyOwner() public {
        vm.prank(address(0xBEEF));
        vm.expectRevert();
        token.mint(address(0xBEEF), 100e18);
    }

    function test_DirectUpdateReserves() public {
        // deployer is owner, so can call updateReserves directly
        TreasuryReport memory report = _buildReport();

        // Owner can also call updateReserves
        treasury.updateReserves(report);

        assertEq(treasury.getTotalValue(), 100e18);
        assertEq(treasury.getBackingRatio(), 2e18);
        assertGt(treasury.lastUpdated(), 0);
    }

    function test_GetLatestReport() public {
        TreasuryReport memory report = _buildReport();
        treasury.updateReserves(report);

        TreasuryReport memory stored = treasury.getLatestReport();
        assertEq(stored.holdings.length, 1);
        assertEq(stored.holdings[0].assetType, 2); // XAU
        assertEq(stored.holdings[0].amount, 1e18);
        assertEq(stored.totalValueUsd, 100e18);
        assertEq(stored.azuraTotalSupply, 50e18);
        assertEq(stored.backingRatio, 2e18);
    }

    function test_UnauthorizedUpdateReverts() public {
        TreasuryReport memory report = _buildReport();

        vm.prank(address(0xDEAD));
        vm.expectRevert("Unauthorized");
        treasury.updateReserves(report);
    }

    function test_ProxyOnReport() public {
        TreasuryReport memory report = _buildReport();

        // Encode the report as updateReserves calldata
        bytes memory reportCalldata = abi.encodeWithSelector(
            IAzuraTreasury.updateReserves.selector,
            report
        );

        // Build metadata: executionId (bytes32), workflowOwner (address), workflowName (bytes10)
        bytes memory metadata = abi.encode(
            bytes32(uint256(1)),
            deployer,
            workflowName
        );

        proxy.onReport(metadata, reportCalldata);

        assertEq(treasury.getTotalValue(), 100e18);
        assertEq(treasury.getBackingRatio(), 2e18);
    }

    function test_ProxyInvalidAuthorReverts() public {
        TreasuryReport memory report = _buildReport();
        bytes memory reportCalldata = abi.encodeWithSelector(
            IAzuraTreasury.updateReserves.selector,
            report
        );

        bytes memory metadata = abi.encode(
            bytes32(uint256(1)),
            address(0xBAD),
            workflowName
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                AzuraTreasuryProxy.InvalidAuthor.selector,
                address(0xBAD),
                deployer
            )
        );
        proxy.onReport(metadata, reportCalldata);
    }

    function test_ProxyInvalidWorkflowReverts() public {
        TreasuryReport memory report = _buildReport();
        bytes memory reportCalldata = abi.encodeWithSelector(
            IAzuraTreasury.updateReserves.selector,
            report
        );

        bytes10 badName = bytes10(bytes("wrong-name"));
        bytes memory metadata = abi.encode(
            bytes32(uint256(1)),
            deployer,
            badName
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                AzuraTreasuryProxy.InvalidWorkflowName.selector,
                badName,
                workflowName
            )
        );
        proxy.onReport(metadata, reportCalldata);
    }

    function test_SupportsInterface() public view {
        // IReceiver interfaceId = onReport selector ^ supportsInterface selector
        bytes4 iReceiverInterface = type(IReceiver).interfaceId;
        assertTrue(proxy.supportsInterface(iReceiverInterface));
        assertFalse(proxy.supportsInterface(bytes4(0xdeadbeef)));
    }

    function test_ReservesUpdatedEvent() public {
        TreasuryReport memory report = _buildReport();

        vm.expectEmit(false, false, true, true);
        emit AzuraTreasury.ReservesUpdated(100e18, 2e18, report.timestamp);

        treasury.updateReserves(report);
    }

    function _buildReport() internal view returns (TreasuryReport memory) {
        Holding[] memory holdings = new Holding[](1);
        holdings[0] = Holding({
            assetType: 2, // XAU
            amount: 1e18,
            priceUsd: 100e18,
            valueUsd: 100e18
        });

        return TreasuryReport({
            holdings: holdings,
            totalValueUsd: 100e18,
            azuraTotalSupply: 50e18,
            backingRatio: 2e18,
            timestamp: block.timestamp
        });
    }
}
