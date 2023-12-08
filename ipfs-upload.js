import { create } from 'kubo-rpc-client'
import fs from 'fs'

const ipfs = create('https://ipfs.infura.io:5001/api/v0')

export async function uploadFileToIPFS(filepath) {
    const file = fs.readFileSync(filepath)
    const result = await ipfs.add({ path: filepath, content: file})
    console.log(result)
    return result
}

export async function uploadJSONToIPFS(json) {
    const result = await ipfs.add(JSON.stringify(json))
    return result
}
