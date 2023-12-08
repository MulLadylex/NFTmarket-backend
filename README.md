# NFTmarket-backend
 Development and use of back-end system matching with NFTmarket
## 1. Introduction
This is a back-end system for NFTmarket. It is developed by JavaScipt and Node.js. It is used to connect with the front-end system and IPFS. It is also used to provide the API for the front-end system.The front-end system is developed by React.js. The front-end system is used to provide the interface for the users. IPFS is used to store the data of the users and the NFTs.
## 2. How it works
### 2.1. homepage
The homepage is used to show the information of the NFTs. The information of the NFTs is stored in the IPFS. The homepage will get the information from the IPFS and show it to the users.
### 2.2. NFTpage
When the users click the NFTs in the homepage, the NFTpage will be shown. The NFTpage is used to show the information of the NFTs, which will get the information from the IPFS, then the users can get the details of the NFTs and buy it.
### 2.3. MyNFTpage
The MyNFTpage is used to show the NFTs that the users have. The information of the NFTs is stored in the IPFS. The MyNFTpage will get the information from the IPFS and show it to the users.
### 2.4. Uploadpage
The Uploadpage is used to upload the NFTs. The users can upload the NFTs to the IPFS and the information of the NFTs will be stored in the IPFS.
* 获取title、description、price、image
* 上传到IPFS
* 获取metadata
* mint NFT
### 2.5. Connect your wallet
The users can connect their wallet to the front-end system. The users can use the wallet to buy the NFTs and upload the NFTs.
### 2.6. Buy NFTs
The users can use their wallet to buy the NFTs. The users can buy the NFTs in the NFTpage.
## 3. Usage
1. Clone the repository
```
git clone https://github.com/MulLadylex/NFTmarket-backend.git
```
2. Install the dependencies
```
npm install
```
3. Run the server

    First, you need to run the IPFS daemon, you can use local IPFS daemon or the IPFS daemon on the cloud. 
    ```
    ```
    Then, you need to start hardhat node, so that you can deploy the smart contract to the hardhat node. It`s used to deploy the smart contract, so we can through the abi to interact with the smart contract. 
    ```
    npx hardhat node
    ```
    Then, you need to deploy the smart contract to the hardhat node.
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```
    Or you can deploy the smart through remix.(make sure your remix is connected with the hardhat node)

    Finally, you can run the server.

    > Tip: You need to change the address of the smart contract and your account in the code.