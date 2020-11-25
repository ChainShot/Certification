const ipfsApi = require("ipfs-http-client");
const ipfs = ipfsApi("https://ipfs.infura.io:5001");

async function run(merkleTree) {
  const files = [{
    path: '/',
    content: JSON.stringify({
      graduates: merkleTree.unalteredElements
    })
  }];

  const result = await ipfs.add(files);
  return result.cid.toString();
}

module.exports = run;
