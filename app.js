import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./ipfs-upload.js";
import { mint } from "./nft-minter.js";
import dotenv from "dotenv";
dotenv.config("./.env");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.get("/", (req, res) => {
    res.render("Home");
});

app.post('/upload', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address;
    console.log(title,description,address)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }
    
    const file = req.files.file;
    const filename = file.name;
    const filepath = 'files/' + filename;
    file.mv(filepath, async (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
        }
        
        // Upload file to IPFS, get CID
        const result = await uploadFileToIPFS(filepath);
        const cid = result.cid.toString();
        
        // get metadata
        const metadata = {
            title: title,
            description: description,
            image: process.env.IMAGE_URL + cid    //改为实际上传的地址
        };
        
        // Upload metadata to IPFS, get CID
        const metadataResult = await uploadJSONToIPFS(metadata);
        const metadataCID = metadataResult.cid.toString();
        
        // Mint NFT to user (address, metadataurl)
        const userAddress = address || process.env.account_address
        await mint(userAddress, process.env.IMAGE_URL + metadataCID); 
        
        // return data
        res.json({
            title: title,
            description: description,
            cid: metadataResult.cid.toString(),
            status: "Uploaded Successfully"
        });
    });
});

const ho = process.env.HOST || "localhost";    //改为实际的host
const pr = process.env.PORT || 3000;    //改为实际的端口


app.listen(pr, ho, () => {
    console.log("Server running on port 3000");
});