const uploadMeta = require('../app/utils/uploadMeta');
const ensAbi = require('./abis/ENS');
const fs = require('fs');
const path = require('path');
const ensAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

async function main() {
  const cid = await uploadMeta();

  console.log("Uploaded NFT: ", cid);

  const Certification = await ethers.getContractFactory("Certification");
  const certification = await Certification.deploy(ensAddress, cid);
  await certification.deployed();
  console.log("Certification deployed to: ", certification.address);

  const config = { certificationAddress: certification.address }
  const paths = [
    path.join(__dirname, "..", "app", "__config.json"),
    path.join(__dirname, "__config.json")
  ];
  paths.forEach((location) => {
    fs.writeFileSync(location, JSON.stringify(config, null, 2));
  });

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
        constructorArguments: [ensAddress, cid]
      });
      resolve();
    }, oneMinute);
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
