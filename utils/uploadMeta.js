const ipfsApi = require("ipfs-http-client");
const ipfs = ipfsApi("http://127.0.0.1:5001");

async function uploadMeta() {
  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "Bootcamp Graduation",
      image: "https://ipfs.io/ipfs/QmbBpVVZPPgJLMtZFzJ9HT4xmYrLFGWMnSaUwdW3arNyVb",
      description: "You Learned Cryptographic Primitives, Blockchain Components for Bitcoin and Ethereum, Smart Contracts and Decentralized Application Development. Well done!"
    })
  }];

  const result = await ipfs.add(files);
  return result.cid.toString();
}

module.exports = uploadMeta;
