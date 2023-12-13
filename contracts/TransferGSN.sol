// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import IERC20 interface for interacting with ERC20 tokens
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";

contract TokenTransfer is ERC2771Recipient {
  // Address of the ERC20 token contract
  address public tokenAddress;

  // Constructor to set the token address and owner
  constructor() {
    tokenAddress = 0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557;
  }

  // Function to transfer tokens from one address to another
  function transferTokens(address _to, uint256 _amount) public {
    // Use IERC20 interface to transfer tokens
    IERC20 token = IERC20(tokenAddress);
    require(token.transferFrom(_msgSender(), _to, _amount), "Transfer failed");
  }
}
