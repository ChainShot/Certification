const uploadMeta = require('../utils/uploadMeta');
const ensAbi = require('./common/abis/ENS');
const { ensAddress } = require('./common/config');

async function main() {
  const cid = await uploadMeta();

  console.log("Uploaded NFT: ", cid);

  const Certification = await ethers.getContractFactory("Certification");
  const certification = await Certification.deploy(ensAddress, cid);

  await certification.deployed();

  console.log("Certification deployed to: ", certification.address);

  const ens = new ethers.Contract(ensAddress, ensAbi, ethers.provider.getSigner(0));
  await ens.setApprovalForAll(certification.address, true);
  console.log("ENS approval set!");

  // contract should be deployed, however etherscan is not seeing it right away...
  console.log("Waiting 1 minute to call Etherscan verify...");
  const oneMinute = 60  * 1000;

  await new Promise((resolve) => {
    setTimeout(async () => {
      const { run } = hre;
      await run("verify", {
        address: certification.address,
        constructorArguments: [ENS_ADDR, cid]
      });
      resolve();
    }, oneMinute);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
