"use strict";
// import Wallet from 'ethereumjs-wallet';
//
// const acc = Wallet.generate();
// console.log(acc.getPrivateKeyString())
// console.log(acc.getAddressString())
Object.defineProperty(exports, "__esModule", { value: true });
const maticjs_1 = require("@maticnetwork/maticjs");
const ethers_1 = require("ethers");
const maticjs_staking_1 = require("@maticnetwork/maticjs-staking");
const maticjs_ethers_1 = require("@maticnetwork/maticjs-ethers");
(0, maticjs_1.use)(maticjs_ethers_1.Web3ClientPlugin);
const config = {
    rpc: {
        // parent: 'https://polygon-rpc.com',
        parent: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        child: 'https://rpc-mumbai.matic.today',
    },
    validatorAddress: '0x1a9155Ead92CD339E3AE789fD3a5dC60ae268634',
    user1: {
        address: '0xea808dee47e7b962df440bfae7cc8468ff0993dc',
        privateKey: '0xe1deb5775ead574a150e8c28105144e1f34eda72d1709d4f967c5d5e788e4e98'
    },
    user2: {
        address: '0xea808dee47e7b962df440bfae7cc8468ff0993dc',
        privateKey: '0xe1deb5775ead574a150e8c28105144e1f34eda72d1709d4f967c5d5e788e4e98'
    },
    // user2: {
    //     address: '0xbbc1291bcac92758f6d2598f1e3cece8e0710b25',
    //     privateKey: '0x9b90b5a54d6f0efb8ed40bc82d8830a589884a903a969cccc48744084caf49cf'
    // },
};
const run = async () => {
    const stakingClient = new maticjs_staking_1.StakingClient();
    const from = config.user1.address;
    const parentProvider = new ethers_1.providers.JsonRpcProvider(config.rpc.parent);
    const childProvider = new ethers_1.providers.JsonRpcProvider(config.rpc.child);
    await stakingClient.init({
        log: true,
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new ethers_1.Wallet(config.user1.privateKey, parentProvider),
            defaultConfig: { from }
        },
        child: {
            provider: new ethers_1.Wallet(config.user1.privateKey, childProvider),
            defaultConfig: { from }
        }
    });
    const abiManager = new maticjs_1.ABIManager('testnet', 'mumbai');
    await abiManager.init();
    const vs = await stakingClient.validatorShare(config.validatorAddress);
    // const fee = await vs.getMinAmountToStake();
    // console.log(fee);
    const result = await vs.delegateAmount('0xde0b6b3a7640000', 1, {
        from: config.user1.address,
        gasLimit: 10000000,
        maxPriorityFeePerGas: 10000000,
        maxFeePerGas: 10000000,
    });
    console.log(await result.getTransactionHash());
};
run();
//# sourceMappingURL=index.js.map