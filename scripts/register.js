const MerkleTree = require('../app/utils/MerkleTree');
const getProof = require('../app/utils/getProof');
const { certificationAddress } = require('./__config');

const root = "0x92cfd9bc10ad445dbf0bc661f8ffe10d84c97ad1a6fe2ccaeca612fba5600401";
const name = "yay";

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
