const { assert } = require("chai");
const { utils: { solidityPack, solidityKeccak256 }} = require('ethers');
const { keccakFromString, bufferToHex } = require('ethereumjs-util');
const MerkleTree = require('../utils/MerkleTree');

describe("Certification", function() {
  let merkleTree;
  let addresses;
  let contract;
  beforeEach(async () => {
    addresses = await ethers.provider.listAccounts();
    merkleTree = new MerkleTree(addresses.slice(0, 10));

    const Certification = await ethers.getContractFactory("Certification");
    contract = await Certification.deploy("0x" + "0".repeat(40), "Qm...");
    await contract.deployed();
    await contract.graduate(merkleTree.getHexRoot(), "Qm...");
  });

  it('should work for each address certified', async () => {
    for(let i = 0; i < 10; i++) {
      const address = addresses[i];
      const proof = merkleTree.getHexProof(address);
      const isCertified = await contract.connect(address).isCertified(proof, merkleTree.getHexRoot());
      assert(isCertified);
    }
  });

  it('should not work for invalid proofs', async () => {
    const proof = merkleTree.getHexProof(addresses[1]);
    const isCertified = await contract.connect(addresses[0]).isCertified(proof, merkleTree.getHexRoot());
    assert(!isCertified);
  });

  it('should not work for valid proof, uncertified sender', async () => {
    const proof = merkleTree.getHexProof(addresses[0]);
    const isCertified = await contract.connect(addresses[4]).isCertified(proof, merkleTree.getHexRoot());
    assert(!isCertified);
  });

  it('should revert for invalid root', async () => {
    const proof = merkleTree.getHexProof(addresses[0]);
    let ex;
    try {
        const isCertified = await contract.connect(addresses[4]).isCertified(proof, "0x" + "0".repeat(64));
    }
    catch(_ex) {
      ex = _ex;
    }
    assert(ex);
  });
});
