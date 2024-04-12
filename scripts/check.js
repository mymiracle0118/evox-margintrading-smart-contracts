

const OracleABI = require("../artifacts/contracts/Oracle.sol/Oracle.json")
const ExecutorAbi = require("../artifacts/contracts/executor.sol/EVO_EXCHANGE.json")

const hre = require("hardhat");
const InterestAbi = require("../artifacts/contracts/interestData.sol/interestData.json")

async function main() {

    const ex = "0x03828bEa5DaB934F6A8BCEfd34EBf091AEeBd3f5"
    const DH = "0xe7175BC1D0F9EeC50c6E7b712e91b4A213761F90"
    const DV = "0xE6F619379E0b42510Fa1e4E97c7F2BC4B5050eDd"
    const oracle = "0x7bB4F0F41B620bFb5B80ad92171FbddA3BaB4C84"
    const util = "0x96cB745a9455401335CbdB4f27c68A7e2e165190"
    const interest = "0xBE5cCBCCBc38BE77B469B926a08439b50f54A2b6"
    const liq = "0x5a80DB3a9Bb97D3131fAFfc567eD3A456ae8f66F"
    const USDT = "0xaBAD60e4e01547E2975a96426399a5a0578223Cb"

    const REXE = "0x1E67a46D59527B8a77D1eC7C6EEc0B06FcF31E28"


 

    const deployer = await hre.ethers.provider.getSigner(0); // change 0 / 1 for different wallets 

    console.log("Charging interest with the account:", deployer.address);

    const Exchange = new hre.ethers.Contract(ex, ExecutorAbi.abi, deployer);


    const fuckyou = await Exchange.fetchUsersDepositInterest(deployer.address, USDT);

    console.log(fuckyou, "fuck me")



} main()