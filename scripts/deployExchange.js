
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(0);

  console.log("Deploying contracts with the account:", deployer.address);

  const initialOwner = deployer.address // insert wallet address 
  const _DataHub = "0x5Cd21735F2E64287a2294582aa0370dA44EC629c";
  const _deposit_vault = "0x4185984C776b1C7F7963c91D1cB55210BAD20b72";
  const _oracle = "0xDFb5A0F85d956e37456B7AAe145b20Eb3295e68E";
  const _utility = "0xcEbaabD5c6A06640cb72e88A04818A2066Dd45a8";
  const _interest = "0x375b40b8C9a6A7Cb3D636f8ed8f1dAAdd6B9F7Da";
  const _liquidator = "0xfDB3e75183eE41aD041EAa30E405B3B37ae8D1a0";
 
  // Deploy REXE library
  const Exchange = await hre.ethers.getContractFactory("EVO_EXCHANGE", {
    libraries: {
      EVO_LIBRARY: "0x5fc42E582Eb4B2dE2952C382F8B5892A9E774A9B",
    },
  });


  const Deploy_Exchange = await Exchange.deploy(initialOwner, _DataHub, _deposit_vault, _oracle, _utility, _interest, _liquidator);

  console.log("Exchange deployed to", await Deploy_Exchange.getAddress());

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });