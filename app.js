import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./ipfs-upload.js";
import { mint } from "./nft-minter.js";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.render("Home");
});

app.post('/upload', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    

    const file = req.files.file;
    const filename = file.name;
    const filepath = 'IPFS/' + filename;
    file.mv(filepath,  (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
        }
    });

    // Upload file to IPFS, get CID
    const result = await uploadFileToIPFS(filepath);
    const cid = result.cid.toString();
    
    // get metadata
    const metadata = {
        title: title,
        description: description,
        image: 'https://ipfs.io/ipfs/' + cid + '/image.png',    //实际上传的地址
    };
    
    // Upload metadata to IPFS, get CID
    const metadataResult = await uploadJSONToIPFS(metadata);
    
    // Mint NFT
    await mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'); // mint to user

    // return data
    res.json = {
        title: title,
        description: description,
        cid: metadataResult.cid,
        status: "Uploaded Successfully"
    };
});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});