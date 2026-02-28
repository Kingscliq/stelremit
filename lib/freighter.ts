import {
  isConnected,
  isAllowed,
  requestAccess,
  signTransaction,
  getAddress,
} from "@stellar/freighter-api";

export const connectWallet = async (): Promise<string> => {
  const connection = await isConnected();
  if (!connection.isConnected) {
    throw new Error("Freighter wallet not installed");
  }

  // Request access will trigger the popup
  const response = await requestAccess();
  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    } else {
      throw new Error((response.error as any).message || "User rejected connection");
    }
  }
  return response.address as string;
};

export const checkConnection = async (): Promise<string> => {
  const connection = await isConnected();
  if (!connection.isConnected) return "";

  // If we've already allowed the app, getAddress will silently fetch the key
  const allowed = await isAllowed();
  if (!allowed.isAllowed) return "";

  const info = await getAddress();
  if (!info || !info.address) return "";

  return info.address;
};

export const signTx = async (xdr: string, networkPassphrase: string) => {
  const signedTransaction = await signTransaction(xdr, {
    networkPassphrase,
  });
  return signedTransaction;
};
