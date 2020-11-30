
const AppToken = artifacts.require('AppToken')
const EthersToken = artifacts.require('EthersToken')
const CrowdfundingToken = artifacts.require('CrowdfundingToken')

module.exports = async function(deployer, accounts) { 
  
  // Deploy CrowdfundingToken
  await deployer.deploy(
    CrowdfundingToken,
    AppToken.address,
    EthersToken.address,
  )
}
