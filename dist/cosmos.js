"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const math_1 = require("@cosmjs/math");
const run = async () => {
    const mnemonic = "wool cheese blue sock lecture congress recipe sign tag fog badge ostrich debris exclude very sphere snap flower submit neglect essay ostrich devote drastic";
    const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [firstAccount] = await wallet.getAccounts();
    const rpcEndpoint = "http://localhost:26657";
    const client = await stargate_1.SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
        gasPrice: new stargate_1.GasPrice(math_1.Decimal.fromUserInput("0", 2), "0.2stake"),
    });
    const delegator = firstAccount.address; // "cosmos1c2kk0vvrs0y3xeaekgmhneljl9j7lf75dyqjc7";
    const validator = 'cosmosvaloper1c2kk0vvrs0y3xeaekgmhneljl9j7lf75gs585d';
    const amount = {
        denom: "stake",
        amount: "10000",
    };
    const result = await client.delegateTokens(delegator, validator, amount, 'auto');
    console.log(result);
};
run();
//# sourceMappingURL=cosmos.js.map