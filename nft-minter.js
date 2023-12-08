import {ethers, JsonRpcProvider} from "ethers";
import fs from "fs";

// contractAddress:0x5FbDB2315678afecb367f032d93F642f64180aa3

export async function mint(to) {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = await provider.getSigner(0);
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = JSON.parse(fs.readFileSync("abis/MyNFT.json"));
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.safeMint(to);
    console.log(result);
}
