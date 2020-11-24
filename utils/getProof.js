const MerkleTree = require('../utils/MerkleTree');
const ipfsApi = require("ipfs-http-client");
const ipfs = ipfsApi("http://127.0.0.1:5001");

async function getProof(cid, addr) {
  const result = await ipfs.get(cid);
  let graduates;
  for await (const file of result) {
    for await (const chunk of file.content) {
      graduates = JSON.parse(chunk).graduates;
    }
  }
  const merkleTree = new MerkleTree(graduates);
  return merkleTree.getHexProof(addr);
}

module.exports = getProof;
