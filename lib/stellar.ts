import { Horizon, TransactionBuilder, Networks, Asset, Operation } from "@stellar/stellar-sdk";
import { signTx } from "./freighter";

const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET;
const NETWORK_NAME = process.env.NEXT_PUBLIC_STELLAR_NETWORK || "TESTNET";

export const server = new Horizon.Server(HORIZON_URL);

export const fetchBalance = async (publicKey: string): Promise<string> => {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b) => b.asset_type === "native");
    return nativeBalance ? nativeBalance.balance : "0.00";
  } catch (error: any) {
    if (error?.response?.status === 404) {
      console.warn("Account not found on network (unfunded). Returning balance 0.");
      return "0.00"; 
    }
    throw error;
  }
};

export const sendXlm = async (senderPublicKey: string, destPublicKey: string, amount: string): Promise<string> => {
  const account = await server.loadAccount(senderPublicKey);
  const fee = await server.fetchBaseFee();
  
  const transaction = new TransactionBuilder(account, {
    fee: fee.toString(),
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: destPublicKey,
        asset: Asset.native(),
        amount: amount.toString(),
      })
    )
    .setTimeout(30)
    .build();

  const xdr = transaction.toXDR();
  const signedXdrResponse = await signTx(xdr, NETWORK_PASSPHRASE);
  
  // @ts-ignore
  if (signedXdrResponse.error) {
    // @ts-ignore
    const errObj = signedXdrResponse.error;
    const errorMsg = typeof errObj === "string" 
      ? errObj 
      : (errObj as any).message || "User rejected signature or wallet error.";
    throw new Error(errorMsg);
  }

  const signedXdr = typeof signedXdrResponse === "string" 
    ? signedXdrResponse 
    : (signedXdrResponse as any).signedTxXdr || (signedXdrResponse as any).signedTx; // Handle both old and new typings just in case
  
  if (!signedXdr) {
      console.error("Raw response from Freighter:", signedXdrResponse);
      throw new Error("Failed to parse signed transaction from wallet.");
  }

  const transactionToSubmit = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
  
  try {
    const response = await server.submitTransaction(transactionToSubmit as any);
    if (!response.successful) {
      throw new Error("Transaction failed on network.");
    }
    return response.hash;
  } catch (networkErr: any) {
    let msg = "Network submission failed";
    if (networkErr.response && networkErr.response.data && networkErr.response.data.extras) {
      // Extract the result codes from Horizon
      const codes = networkErr.response.data.extras.result_codes;
      
      if (codes.operations && codes.operations.includes("op_no_destination")) {
        msg = "Recipient wallet does not exist on the network yet. It must be funded with at least 1 XLM to be created.";
      } else {
        msg += `: ${codes.transaction || ""} ${codes.operations ? codes.operations.join(",") : ""}`.trim();
      }
    } else if (networkErr.message) {
      msg = networkErr.message;
    }
    throw new Error(msg);
  }
};
