import Certification from './artifacts/contracts/Certification.sol/Certification';
import {certificationAddress} from './__config';
import {ethers} from 'ethers';
import getProof from './utils/getProof';

const provider = new ethers.providers.Web3Provider(ethereum);

async function register() {
  await ethereum.enable();
  const merkleRoot = document.getElementById("merkle-root-2").value;
  const ensName = document.getElementById("ens-name").value;
  const signer = provider.getSigner();

  if(!merkleRoot) {
    alert("Must provide a merkle root!");
  }
  if(!ensName) {
    alert("Must provide an ENS Name!");
  }

  const contract = new ethers.Contract(certificationAddress, Certification.abi, signer);

  const address = await signer.getAddress();
  const cid = await contract.graduations(merkleRoot);
  if(!cid) {
    alert(`Could not find CID for merkleRoot: ${merkleRoot}`);
  }

  const proof = await getProof(cid, address);
  await contract.register(ensName, proof, merkleRoot);

  alert("Register Transaction Submitted!");
}

document.getElementById("register").addEventListener("click", register);
