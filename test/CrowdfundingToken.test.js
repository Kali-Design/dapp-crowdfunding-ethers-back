import { expect } from 'chai';
//import {Contract} from 'ethers';
const { contract, accounts } = require('@openzeppelin/test-environment');
const { BN,} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const CrowdfundingToken = contract.fromArtifact('CrowdfundingToken');

describe('CrowdfundingToken', async function () {
  const NAME = 'CrowdfundingToken';
  const SYMBOL = 'Ether';
  const totalSupply = new BN('1000000' + '0'.repeat(18));
  const [owner, investors] = accounts;

  beforeEach(async function () {
    this.crowdfunding = await CrowdfundingToken.new(owner, totalSupply, /*CAP,*/ {from: investors});
  });

  it('has name', async function () {
    expect(await this.crowdfunding.name()).to.equal(NAME);
  });

  it('has symbol', async function () {
    expect(await this.crowdfunding.name()).to.equal(SYMBOL);
  });

  /*it('has cap', async function () {
    expect(await this.crowdfunding.cap()).to.be.a.bignumber.equal(CAP);
  });*/

  it('mints initial supply to owner', async function () {
    expect(await this.crowdfunding.balanceOf(owner)).to.be.a.bignumber.equal(totalSupply);
  });

  it('transfers ownership from msg.sender to owner', async function () {
    expect(await this.crowdfunding.owner()).to.equal(owner);
  });

  it('mints initial supply to owner', async function () {
    expect(await this.crowdfunding.balanceOf(owner)).to.be.a.bignumber.equal(totalSupply);
  });
})


  /*describe('Ethers deployment', async () => {
    it('has a name', async () => {
      const name = await ethersToken.name()
      assert.equal(name, 'Ethers Token')
    })
  })

  describe('App Token deployment', async () => {
    it('has a name', async () => {
      const name = await appToken.name()
      assert.equal(name, 'App Token')
    })
  })

  describe('Crowdfunding deployment', async () => {
    it('has a name', async () => {
      const name = await CrowdfundingToken.name()
      assert.equal(name, 'Crowdfunding Token')
    })

    it('contract has tokens', async () => {
      let balance = await appToken.balanceOf(crowdfundingToken.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Crowdfunding tokens', async () => {

    it('rewards investors for staking Ethers tokens', async () => {
      let result

      // Check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Ethers wallet balance correct before staking')

      // Stake Ethers Tokens
      await ethersToken.approve(crowdfundingToken.address, tokens('100'), { from: investor })
      await crowdfundingToken.stakeTokens(tokens('100'), { from: investor })

      // Check staking result
      result = await ethersToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Ethers wallet balance correct after staking')

      result = await ethersToken.balanceOf(crowdfundingToken.address)
      assert.equal(result.toString(), tokens('100'), 'Token Ethers balance correct after staking')

      result = await crowdfundingToken.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await crowdfundingToken.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      // Issue Tokens
      await crowdfundingToken.issueTokens({ from: owner })

      // Check balances after issuance
      result = await appToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor App Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await crowdfundingToken.issueTokens({ from: investor }).should.be.rejected;

      // Unstake tokens
      await crowdfundingToken.unstakeTokens({ from: investor })

      // Check results after unstaking
      result = await ethersToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Ethers wallet balance correct after staking')

      result = await ethersToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('0'), 'Token Ethers balance correct after staking')

      result = await crowdfundingToken.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await crowdfundingToken.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})*/
