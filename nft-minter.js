import {ethers, JsonRpcProvider} from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config("./.env");

export async function mint(to, tokenURI) {
    const provider = new JsonRpcProvider(process.env.hardhatnode_url);
    const signer = await provider.getSigner(0);
    const contractAddress = process.env.contract_address;
    const abi = JSON.parse(fs.readFileSync("abis/MyNFT.json"));
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.safeMint(to, tokenURI);
}
