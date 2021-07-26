const MerkleTree = require('../app/utils/MerkleTree');
const getProof = require('../app/utils/getProof');
const { certificationAddress, graduations } = require('./__config');

const root = graduations[2].root;
const name = "yay"; // TODO: choose your ENS name!

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
