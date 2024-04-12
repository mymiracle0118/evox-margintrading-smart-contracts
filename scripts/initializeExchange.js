const hre = require("hardhat");
const OracleABI = require("../artifacts/contracts/Oracle.sol/Oracle.json")
const ExecutorAbi = require("../artifacts/contracts/executor.sol/EVO_EXCHANGE.json")
const utilABI = require("../artifacts/contracts/utils.sol/Utility.json")
const DataHubAbi = require("../artifacts/contracts/datahub.sol/DataHub.json");
const InterestAbi = require("../artifacts/contracts/interestData.sol/interestData.json")
const LiquidatorAbi = require("../artifacts/contracts/liquidator.sol/Liquidator.json")
const depositABI = require("../artifacts/contracts/depositvault.sol/DepositVault.json")

async function main(){
        //const ex = "0x3BDa6E23ee7DEEe1fdf0E826D78F529C7304997C" original working 
       //  const ex ="0x34855845Dd334C6970e98227436be5F550e7e5a8" 2nd one not working with large charg mass interest in 
       //const ex ="0xF0fF0B479193Ef6329F4dAA77200dC89eAF309ab" 3rd still not working with charge mas intereat public in the interest charge fctiion
       // something is worng with charge mass interesst what is wrong is below 
       // whats wrong is Datahub.fetchTotalBorrowedAmount(token); function does not exist you must replace it 
       //Exchange deployed to 0xF5E276a29103Ab06Fb9e7E67AD6A6C807b7418b6 trade fees in  they work but not correct the math is wrong
     //  const ex = "0xF5E276a29103Ab06Fb9e7E67AD6A6C807b7418b6"
     /*
     const ex = "0x04CfbA4820f575159470dADbBe0C5e1E0Df8005C" // this has debit deposit interest
        const DH = "0xfc3f0E8eaEB9Ba9C52E84fc777Dd41964eAC4252"
        const DV = "0xa9d870a4480F8E0093cfbc1632F1eee32Df89115"
        const oracle = "0xA0F9a39d656724a65561980c44e52bb80c232F79"
        const util = "0x3138C2F7723EA5a9748D59d6FADC5627Fe916749"
        const interest = "0xf1d2e67C64Cbb486BdC07955fCCFD1F635f9483C"
        const liq = "0x8dF103078B500A89E72f95a02a02030Cfe7Ca080"
*/

//0xBb20dFac2c4cBdd0729787ac5869613554aE1361

//const ex = "0x4E1Dc2D90E81Ad889054Ef2668B5Ab5fDDdf23bf"
/*
const ex = "0xBb20dFac2c4cBdd0729787ac5869613554aE1361"
const DH = "0x9dEB2F4A64b7E56e08fB9d065AA515643Ec04B1b"
const DV = "0x259ca2d085Bdc9Ab4C19D834781f2De7a44C388a"
const oracle = "0xb06ff8274F31ba7bFCDC734b810B55C48dE87C18"
const util = "0x453B0471Ccc75382697ED645ee8Ede742DD09D50"
const interest = "0x85c8b7e19045a528c89831bD93a47375931738f2"
const liq = "0xFe1cC78055F628eB067FE696fB2a8dA57C3C6001"
const ex = "0xab8Aafb59706D9C00b35BD9Eb90cb67CE2C2AeA8"
const DH = "0x4D4fdbC6090F85c504A5f9435ba5cb297049c506"
const DV = "0x12d892F536854eb23edc219F7B0Fdd2D84C7D9C1"
const oracle = "0x0d2FD2AC9d9314B3C35473e1ba0DFC04c6eCb5EF"
const util = "0xfe173D97B0947746454eab61b7fBc09E5E61E560"
const interest = "0x63b2D884f53eB59353B5aF9c98E3E4fcC1C7F373"
const liq = "0x52cc3D11231760F42ddEE635EC86F9906a7dD0f2"

const ex = "0xd77c2686162ae9F8a8Fc9991A9Aff8603CF1822D"
const DH = "0xe7175BC1D0F9EeC50c6E7b712e91b4A213761F90"
const DV = "0xE6F619379E0b42510Fa1e4E97c7F2BC4B5050eDd"
const oracle = "0x7bB4F0F41B620bFb5B80ad92171FbddA3BaB4C84"
const util = "0x96cB745a9455401335CbdB4f27c68A7e2e165190"
const interest = "0xBE5cCBCCBc38BE77B469B926a08439b50f54A2b6"
const liq = "0x5a80DB3a9Bb97D3131fAFfc567eD3A456ae8f66F"

*/
//const ex = "0xb0F76ECA4Ef70530d86C2151CAa577078542d29f"
//const ex ="0xC9B4c417F2F97d85B45882291Ee5f3e95F2f2C0B"
//const ex = "0x43FBaF1202eC9238199BA37cfd2dd0aAEe2E0418"
//const ex = "0xB8375BC858447fd6fAd122736D726259AD64dB97"

//const ex = "0x38d9Ddca6883C1855Bdf1ac61B3F9322c03AcE11"
const ex = "0x7E1557162Dd5C01ddE69815e40A8392F292C0f4f"
const DH = "0x894F4a46A60b64c1E171F8e28455208DC0C91469"
const DV = "0x1f1bF2411fEb48B5087A7956A6322d8B5a31cdEE"
const oracle = "0x088845602AC3Ba1e38af7c1347FB651f118ac59f"
const util = "0x8Ce6c9D657fE3012fCfDf741A1Cb6Ca66207dbd8"
const interest = "0x467BC7055baB4ea8df6aDa49a08721EB1c9Ff588"
const liq = "0x1c4e62533dC7F2976eD0767080A14d520354b8Bb"

        const deployer = await hre.ethers.provider.getSigner(0); // change 0 / 1 for different wallets 

        console.log("INIT with the account:", deployer.address);

        const DataHub = new hre.ethers.Contract(DH, DataHubAbi.abi, deployer);

        const Oracle = new hre.ethers.Contract(oracle, OracleABI.abi, deployer);

        const DepositVault = new hre.ethers.Contract(DV, depositABI.abi, deployer);

        const Utils = new hre.ethers.Contract(util, utilABI.abi, deployer);

        const Exchange = new hre.ethers.Contract(ex, ExecutorAbi.abi, deployer);

        const _Interest = new hre.ethers.Contract(interest, InterestAbi.abi, deployer);

        const CurrentLiquidator = new hre.ethers.Contract(liq, LiquidatorAbi.abi, deployer);


        const SETUP = await Utils.alterAdminRoles(DH, DV, oracle, interest, liq, ex);

        SETUP.wait()
/*
        address _DataHub,
        address _deposit_vault,
        address _oracle,
        address _interest,
        address _liquidator,
        address _ex
*/


        const SETUPEX = await Exchange.alterAdminRoles(DH, DV, oracle, util, interest, liq);
/*
    address _datahub,
        address _deposit_vault,
        address _oracle,
        address _util,
        address _int,
        address _liquidator
*/
   
        SETUPEX.wait()


        const setupDV = await DepositVault.alterAdminRoles(DH, ex, interest)
/*
      address dataHub,
        address executor,
        address interest
*/
   
        setupDV.wait();


        const liqSetup = await CurrentLiquidator.alterAdminRoles(ex);

        liqSetup.wait();



        const setup = await DataHub.alterAdminRoles(DV, ex, oracle, interest, util);

        setup.wait();
/*
     address _deposit_vault,
        address _executor,
        address _oracle,
        address _interest,
        address _utils
*/

        const oraclesetup = await Oracle.alterAdminRoles(ex, DH, DV);

        oraclesetup.wait();

/*
        address _ex,
        address _DataHub,
        address _deposit_vault
*/

        const interestSetup = await _Interest.alterAdminRoles(DH, ex, DV, util);
   /*
     address _dh,
        address _executor,
        address _dv,
        address _utils
   */

        interestSetup.wait();

        console.log("Contract Admin Roles configured")

}main()