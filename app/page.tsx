"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { BalanceCard } from "@/components/BalanceCard";
import { SendForm } from "@/components/SendForm";
import { TransactionResult } from "@/components/TransactionResult";
import { connectWallet, checkConnection } from "@/lib/freighter";
import { fetchBalance, sendXlm } from "@/lib/stellar";

type ViewState = "disconnected" | "connected" | "success";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("disconnected");
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");
  
  // UI loading states
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Transaction details for success view
  const [txHash, setTxHash] = useState("");
  const [lastAmount, setLastAmount] = useState("");
  const [lastDest, setLastDest] = useState("");

  // On mount, check if already connected
  useEffect(() => {
    const init = async () => {
      try {
        const address = await checkConnection();
        if (address) {
          setPublicKey(address);
          setViewState("connected");
          updateBalance(address);
        }
      } catch (e) {
        console.error("Auto-connect failed", e);
      }
    };
    init();
  }, []);

  const updateBalance = async (pubkey: string) => {
    setIsRefreshing(true);
    try {
      const b = await fetchBalance(pubkey);
      setBalance(b);
    } catch (e) {
      console.error(e);
      // fallback handled gracefully in stealth
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleConnect = async () => {
    setErrorMsg("");
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      setPublicKey(address);
      setViewState("connected");
      updateBalance(address);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to connect wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setPublicKey("");
    setBalance("0");
    setViewState("disconnected");
    setErrorMsg("");
  };

  const handleSend = async (destination: string, amount: string) => {
    setErrorMsg("");
    setIsSending(true);
    try {
      const hash = await sendXlm(publicKey, destination, amount);
      setTxHash(hash);
      setLastAmount(amount);
      setLastDest(destination);
      setViewState("success");
      // Pre-fetch balance for whenever they come back
      updateBalance(publicKey);
    } catch (err: any) {
      setErrorMsg(err.message || "Transaction failed.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar 
        publicKey={publicKey} 
        isConnecting={isConnecting} 
        onConnect={handleConnect} 
      />

      <main className="relative z-[1] max-w-[480px] mx-auto pt-12 px-5 pb-20">
        
        {/* Global Error Banner */}
        {errorMsg && (
          <div className="bg-surface border border-red rounded-xl p-4 mb-6 text-red text-[0.8rem] text-center animate-fade-up">
            {errorMsg === "Freighter wallet not installed" ? (
              <span>
                Freighter wallet is not installed.{" "}
                <a
                  href="https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-accent"
                >
                  Download the Chrome Extension here
                </a>
              </span>
            ) : (
              errorMsg
            )}
          </div>
        )}

        {/* STATE: DISCONNECTED */}
        {viewState === "disconnected" && (
          <div className="animate-fade-up">
            <div className="text-center pt-[60px] pb-10">
              <div className="inline-flex items-center gap-[6px] text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-accent bg-accent-glow border border-[rgba(79,123,255,0.2)] py-[5px] px-3 rounded-full mb-7">
                ✦ Built on Stellar
              </div>
              <h1 className="text-[2.6rem] font-bold tracking-[-0.04em] leading-[1.15] text-text-main mb-4">
                Send money<br />anywhere, <span className="text-accent">instantly</span>
              </h1>
              <p className="text-[0.95rem] text-muted leading-[1.7] max-w-[340px] mx-auto mb-9 font-light">
                Fast, low-cost XLM transfers on the Stellar testnet. Connect your wallet to get started.
              </p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="font-sans text-[0.9rem] font-semibold text-white bg-accent border-none py-[14px] px-8 rounded-xl cursor-pointer transition-all duration-250 inline-flex items-center gap-2 shadow-[0_4px_24px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(79,123,255,0.35)] active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting..." : "Connect Freighter Wallet"}
                {!isConnecting && <span className="text-[1rem]">→</span>}
              </button>
              <div className="flex justify-center gap-8 mt-14 pt-8 border-t border-border-1">
                <div className="text-center">
                  <div className="text-[1.3rem] font-bold text-text-main tracking-[-0.02em]">$0.0007</div>
                  <div className="text-[0.72rem] text-muted mt-[3px] font-normal tracking-[0.03em]">Per transaction</div>
                </div>
                <div className="text-center">
                  <div className="text-[1.3rem] font-bold text-text-main tracking-[-0.02em]">~5s</div>
                  <div className="text-[0.72rem] text-muted mt-[3px] font-normal tracking-[0.03em]">Settlement</div>
                </div>
                <div className="text-center">
                  <div className="text-[1.3rem] font-bold text-text-main tracking-[-0.02em]">100+</div>
                  <div className="text-[0.72rem] text-muted mt-[3px] font-normal tracking-[0.03em]">Countries</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE: CONNECTED */}
        {viewState === "connected" && (
          <div className="animate-fade-up">
            <BalanceCard 
              balance={balance} 
              publicKey={publicKey} 
              onDisconnect={handleDisconnect}
              onRefresh={() => updateBalance(publicKey)}
              isRefreshing={isRefreshing}
            />
            <SendForm 
              onSend={handleSend}
              isSending={isSending}
            />
          </div>
        )}

        {/* STATE: SUCCESS */}
        {viewState === "success" && (
          <div className="animate-fade-up">
            <TransactionResult 
              amount={lastAmount}
              destination={lastDest}
              txHash={txHash}
              onSendAgain={() => {
                setViewState("connected");
                setTxHash("");
              }} 
            />
          </div>
        )}
      </main>
    </>
  );
}
