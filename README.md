# [🏗️ WIP] Curriculum

The goal is to show [Guillem's curriculum](https://github.com/guillempuche) to wallets that owns [_GuillemCurriculum_](https://testnets.opensea.io/assets/sepolia/0x1ee2cb4badb50f6f3b9ed57e0f444cb8c5e6662e/0) token (minted in Alchemy testnet). The image and the metadata of the NFT is hosted on IPFS via [Filebase](https://filebase.com/).

The gas spent required when minting should be sponsored by Alchemy's [Gas Manager](https://accountkit.alchemy.com/using-smart-accounts/sponsoring-gas/gas-manager.html).

TODOs:

1. [wip] Mint the NFT, show/hide curriculum depending on the ownership of the NFT
2. Host the web in Cloudflare or [Fleek](https://fleek.xyz/)
3. Use an ENS or Handshake domain for the website
4. Decouple parts of the web into packages of the monorepo like component and providers. This will allow reusability.

- NFT
  - Contract  <https://sepolia.etherscan.io/token/0x1ee2cb4badb50f6f3b9ed57e0f444cb8c5e6662e>
  - Hosting <https://testnets.opensea.io/assets/sepolia/0x1ee2cb4badb50f6f3b9ed57e0f444cb8c5e6662e/0>
- Explorer for Alchemy's Sepolia network <https://sepolia.etherscan.io/>

> WARNING: Viem version needs specific Tanstack version. More here <https://accountkit.alchemy.com/getting-started/setup-app.html#install-dependencies>

## Resources

- Code examples
  - Web authentication with Web3Auth and Biconomy <https://github.com/bcnmy/biconomy_web3auth_example/blob/main/src/pages/index.tsx>
  - Create smart accounts wiht Alchemy Accounts
    - <https://github.com/alchemyplatform/creating-smart-contract-and-sending-userops/blob/main/src/ts/index.ts>
    - <https://github.com/alchemyplatform/aa-sdk/tree/main/examples/>
  - Create NFTs (contract and hosting) <https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy#mint-your-sepolia-nft>
  - Mint NFTs
    - Viem + Biconomy Accounts <https://github.com/bcnmy/sdk-examples/blob/master/scripts/erc20/mintNFT.ts>
- Contract and NFT no-code editor <https://docs.openzeppelin.com/contracts/5.x/wizard>
