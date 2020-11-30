// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

import "./AppToken.sol";
import "./EthersToken.sol";

contract CrowdfundingToken is ERC20, ERC20Capped, ERC20Burnable, Ownable {
string public name = "Crowdfunding Token";
    address public owner;
    AppToken public appToken;
    EthersToken public ethersToken;

    // address truffle console : '0x6e0250Df729BdD33FaDACc91F59b046a5D4dB107' 

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(AppToken _appToken, EthersToken _ethersToken) public {
        appToken = _appToken;
        ethersToken = _ethersToken;
        owner = msg.sender;
        address owner_;
        uint256 initialSupply;
        uint256 cap_;
    }

    function startTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer ethers tokens to this contract for staking
        ethersToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to start array only if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

         // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
       
        // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer ethers tokens to this contract for staking
        ethersToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

// Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                appToken.transfer(recipient, balance);
            }
        }
    }

}
