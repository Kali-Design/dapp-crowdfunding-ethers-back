const CrowdfundingToken = artifacts.require('CrowdfundingToken')
const AppToken = artifacts.require('AppToken')
const EthersToken = artifacts.require('EthersToken')


module.exports = async function(deployer, accounts) {
  // Deploy Ethers
  await deployer.deploy(EthersToken)
  const ethersToken = await deployer.deploy(EthersToken)

  // Deploy App Token
  await deployer.deploy(AppToken)
  const appToken = await deployer.deploy(AppToken)

  // Transfer all tokens to CrowdfundingToken (1 million)
  //await appToken.transfer(CrowdfundingToken.address, '1000000000000000000000000')

  // Transfer 100 Ethers tokens investor and truffle console address : '0xDCD9EB5CC933C79C87E8Ec876E5BB337208D1a5A'
  //await ethersToken.transfer(accounts[1], '100000000000000000000')
}
