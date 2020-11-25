## Graduation Certification

This repository holds the contracts and scripts for the ChainShot Bootcamp Certification!

Each cohort is graduated together in a single Merkle Root. To prove that you were a part of the graduating cohort you will need to find the proof for your particular address. To do so, you'll need to locate your graduating merkle root and find the associated IPFS Content Identifier. In IPFS, you'll find the leaves of the Merkle Tree for the graduating cohort. You can use this to create your Merkle Proof!

Don't worry if that sounds a bit overwhelming. This logic has been written into a UI and scripts! Below you'll find documentation of all that.

## Minting and Registration

You can **mint** and **register** using either the **front-end application** or the **scripts**

### Front-End Application

The front-end application uses the compiled artifacts from the contracts contained in the `/contracts` folder. To get started, run `npx hardhat compile` to ensure the artifacts are placed in the `/app` folder.

Next, you'll need to run the front-end application! Run `parcel app/index.html` to get it started. When you're inside of the application you can use a wallet like metamask to interact with the dapp. Use the address that you graduated with to mint your NFT or register your ENS name!

### Scripts

To work with the scripts you'll need to first create a `.env` file that will provide a settings:

- `MAINNET_URL` - This should point to a mainnet JSON RPC endpoint (like infura!)
- `MAINNET_PRIVATE_KEY` - This should be the private key for the address you graduated with

**Note** Be very careful with your `PRIVATE_KEY` if you do choose to run these scripts. After you have successfully completed the transactions you can remove it from the `.env` file. Be sure not to commit this anywhere!

In the scripts folder, you'll find two **Alumni Scripts** which can be used to mint and register:

**Mint** - This script can be called to mint a ChainShot Bootcamp NFT. In order to use it, you will need to ensure that the `root` variable is your graduation Merkle Root. Then you can run `npx hardhat run scripts/mint.js --network mainnet`
**Register** - This script can be called to register .chainshot.eth ENS subdomain. Ensure that the `root` variable is the correct merkle root and the `name` variable is the ENS subdomain that you desire. You can run this with `hardhat run scripts/register.js --network mainnet`

You'll also find two **Admin Scripts** which can be used to deploy a contract and graduate a class. These scripts are not needed unless you'd like to deploy your own version of a certification:

**Deploy** - This script is for deployment of the contract and IPFS NFT information.
**Graduate** - This script will graduate a class, add the leaves to IPFS and commit the root to the certification contract.
