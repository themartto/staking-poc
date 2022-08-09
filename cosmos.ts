import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";



const run = async () => {
    const mnemonic = "wool cheese blue sock lecture congress recipe sign tag fog badge ostrich debris exclude very sphere snap flower submit neglect essay ostrich devote drastic";

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

    const [firstAccount] = await wallet.getAccounts();


    const rpcEndpoint = "http://localhost:26657";

    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet,
        {
            gasPrice: new GasPrice(Decimal.fromUserInput("0", 2), "0.2stake"),
        }
    );

    const delegator = firstAccount.address; // "cosmos1c2kk0vvrs0y3xeaekgmhneljl9j7lf75dyqjc7";
    const validator = 'cosmosvaloper1c2kk0vvrs0y3xeaekgmhneljl9j7lf75gs585d';
    const amount = {
        denom: "stake",
        amount: "10000",
    };
    const result = await client.delegateTokens(delegator, validator, amount, 'auto');
    console.log(result);
}

run()
