const MerkleTree = require('../utils/MerkleTree');
const uploadMerkle = require('../utils/uploadMerkle');
const { certificationAddress } = require('./common/config');

const members = [
  // add all graduating addresses here...
];

async function main() {
  const merkleTree = new MerkleTree(members);
  const cid = await uploadMerkle(merkleTree);
  const root = merkleTree.getHexRoot();

  const Certification = await ethers.getContractFactory("Certification");
  const certification = await Certification.attach(certificationAddress);

  await certification.graduate(root, cid);

  console.log('Graduation Successful!');
  console.log('Merkle Root: ', root);
  console.log('Content Identifier: ', cid);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
