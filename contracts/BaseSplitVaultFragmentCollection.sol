// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseSplitVaultFragmentCollection
/// @notice Minimal claim contract kept small for low-cost Base deployment.
contract BaseSplitVaultFragmentCollection {
    uint256 public constant MAX_FRAGMENT_ID = 12;
    uint256 public totalClaims;

    mapping(uint256 => address) public fragmentOwner;
    mapping(address => uint256) public walletClaimCount;

    event FragmentClaimed(
        address indexed wallet,
        uint256 indexed fragmentId,
        bytes32 proofHash,
        uint64 ownedAt
    );

    error InvalidFragmentId();
    error FragmentAlreadyOwned();
    error WalletLimitReached();

    function claimFragment(uint256 fragmentId) external returns (bytes32 proofHash) {
        if (fragmentId == 0 || fragmentId > MAX_FRAGMENT_ID) revert InvalidFragmentId();
        if (fragmentOwner[fragmentId] != address(0)) revert FragmentAlreadyOwned();
        if (walletClaimCount[msg.sender] != 0) revert WalletLimitReached();

        proofHash = keccak256(
            abi.encodePacked(block.chainid, address(this), msg.sender, fragmentId, block.timestamp)
        );

        fragmentOwner[fragmentId] = msg.sender;
        walletClaimCount[msg.sender] = 1;
        totalClaims++;

        emit FragmentClaimed(msg.sender, fragmentId, proofHash, uint64(block.timestamp));
    }
}
