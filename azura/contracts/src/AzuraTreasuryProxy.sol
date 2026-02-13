// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IAzuraTreasury, TreasuryReport} from "./AzuraTreasury.sol";

interface IReceiver {
    function onReport(bytes calldata metadata, bytes calldata report) external;
    function supportsInterface(bytes4 interfaceId) external pure returns (bool);
}

contract AzuraTreasuryProxy is IReceiver {
    IAzuraTreasury public azuraTreasury;
    address public immutable EXPECTED_AUTHOR;
    bytes10 public immutable EXPECTED_WORKFLOW_NAME;

    error InvalidAuthor(address received, address expected);
    error InvalidWorkflowName(bytes10 received, bytes10 expected);

    constructor(
        address _azuraTreasury,
        address expectedAuthor,
        bytes10 expectedWorkflowName
    ) {
        azuraTreasury = IAzuraTreasury(_azuraTreasury);
        EXPECTED_AUTHOR = expectedAuthor;
        EXPECTED_WORKFLOW_NAME = expectedWorkflowName;
    }

    function onReport(bytes calldata metadata, bytes calldata report) external override {
        // Decode metadata: workflow execution ID (bytes32), workflow owner (address), workflow name (bytes10)
        (, address workflowOwner, bytes10 workflowName) = abi.decode(
            metadata,
            (bytes32, address, bytes10)
        );

        // Validate author
        if (workflowOwner != EXPECTED_AUTHOR) {
            revert InvalidAuthor(workflowOwner, EXPECTED_AUTHOR);
        }

        // Validate workflow name
        if (workflowName != EXPECTED_WORKFLOW_NAME) {
            revert InvalidWorkflowName(workflowName, EXPECTED_WORKFLOW_NAME);
        }

        // Decode the report payload — it's ABI-encoded calldata for updateReserves(TreasuryReport)
        // Skip the 4-byte function selector, then decode the TreasuryReport
        TreasuryReport memory treasuryReport = abi.decode(report[4:], (TreasuryReport));

        // Forward to treasury
        azuraTreasury.updateReserves(treasuryReport);
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return interfaceId == type(IReceiver).interfaceId;
    }
}
