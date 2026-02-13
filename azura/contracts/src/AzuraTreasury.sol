// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Holding {
    uint8 assetType;
    uint256 amount;
    uint256 priceUsd;
    uint256 valueUsd;
}

struct TreasuryReport {
    Holding[] holdings;
    uint256 totalValueUsd;
    uint256 azuraTotalSupply;
    uint256 backingRatio;
    uint256 timestamp;
}

interface IAzuraTreasury {
    function updateReserves(TreasuryReport calldata report) external;
    function getLatestReport() external view returns (TreasuryReport memory);
    function getBackingRatio() external view returns (uint256);
    function getTotalValue() external view returns (uint256);
    function lastUpdated() external view returns (uint256);
}

contract AzuraTreasury is IAzuraTreasury {
    address public authorizedProxy;
    address public owner;

    Holding[] private _holdings;
    uint256 private _totalValueUsd;
    uint256 private _azuraTotalSupply;
    uint256 private _backingRatio;
    uint256 private _lastUpdated;

    event ReservesUpdated(uint256 totalValueUsd, uint256 backingRatio, uint256 indexed timestamp);

    modifier onlyAuthorized() {
        require(msg.sender == authorizedProxy || msg.sender == owner, "Unauthorized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _authorizedProxy) {
        owner = msg.sender;
        authorizedProxy = _authorizedProxy;
    }

    function setProxy(address _proxy) external onlyOwner {
        authorizedProxy = _proxy;
    }

    function updateReserves(TreasuryReport calldata report) external onlyAuthorized {
        // Clear previous holdings
        delete _holdings;

        // Store new holdings
        for (uint256 i = 0; i < report.holdings.length; i++) {
            _holdings.push(report.holdings[i]);
        }

        _totalValueUsd = report.totalValueUsd;
        _azuraTotalSupply = report.azuraTotalSupply;
        _backingRatio = report.backingRatio;
        _lastUpdated = report.timestamp;

        emit ReservesUpdated(report.totalValueUsd, report.backingRatio, report.timestamp);
    }

    function getLatestReport() external view returns (TreasuryReport memory) {
        TreasuryReport memory report;
        report.holdings = _holdings;
        report.totalValueUsd = _totalValueUsd;
        report.azuraTotalSupply = _azuraTotalSupply;
        report.backingRatio = _backingRatio;
        report.timestamp = _lastUpdated;
        return report;
    }

    function getBackingRatio() external view returns (uint256) {
        return _backingRatio;
    }

    function getTotalValue() external view returns (uint256) {
        return _totalValueUsd;
    }

    function lastUpdated() external view returns (uint256) {
        return _lastUpdated;
    }
}
