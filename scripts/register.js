const MerkleTree = require('../utils/MerkleTree');
const getProof = require('../utils/getProof');
const { certificationAddress } = require('./common/config');

const root = "0x61c9c2ad0eafcd917d51e0dbb3b793eadd2d1e4a0a12d9564ef99890ab07a029";
const name = "dan";

async function main() {
  const Certification = await ethers.getContractFactory("Certification");
  const certification = await Certification.attach(certificationAddress);

  const signer = ethers.provider.getSigner(0);
  const address = await signer.getAddress();
  const cid = await certification.graduations(root);
  const proof = await getProof(cid, address);

  const tx = await certification.register(name, proof, root);
  console.log("Transaction Submitted! Awaiting mining...");

  await tx.wait();
  console.log(`Registration of ${name}.chainshot.eth Successful!`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
