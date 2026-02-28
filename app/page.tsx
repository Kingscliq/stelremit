"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BalanceCard } from "@/components/BalanceCard";
import { SendForm } from "@/components/SendForm";
import { TransactionResult } from "@/components/TransactionResult";

type ViewState = "disconnected" | "connected" | "success";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("disconnected");

  // Sync navbar mock state
  const isConnected = viewState !== "disconnected";

  const handleConnectToggle = (val: boolean) => {
    setViewState(val ? "connected" : "disconnected");
  };

  return (
    <>
      <Navbar connected={isConnected} setConnected={handleConnectToggle} />

      <main className="relative z-[1] max-w-[480px] mx-auto pt-12 px-5 pb-20">
        {/* DEMO TABS */}
        <div className="flex gap-2 mb-8 bg-surface border border-border-1 rounded-xl p-1.5">
          {(["disconnected", "connected", "success"] as ViewState[]).map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setViewState(tab)}
              className={`flex-1 text-center text-[0.75rem] font-semibold py-2 px-2 rounded-lg border-none cursor-pointer font-sans transition-all duration-200 ${
                viewState === tab
                  ? "bg-surface-2 text-text-main border border-border-2 shadow-sm"
                  : "bg-transparent text-muted hover:text-text-main"
              }`}
            >
              {idx === 0 ? "① Disconnected" : idx === 1 ? "② Connected" : "③ Success"}
            </button>
          ))}
        </div>
        <div className="text-center text-[0.7rem] text-muted mb-5 opacity-60 italic">
          ← UI mockup — click tabs to preview each state
        </div>

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
                onClick={() => setViewState("connected")}
                className="font-sans text-[0.9rem] font-semibold text-white bg-accent border-none py-[14px] px-8 rounded-xl cursor-pointer transition-all duration-250 inline-flex items-center gap-2 shadow-[0_4px_24px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(79,123,255,0.35)] active:translate-y-0"
              >
                Connect Freighter Wallet
                <span className="text-[1rem]">→</span>
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
            <BalanceCard />
            <SendForm onSuccess={() => setViewState("success")} />
          </div>
        )}

        {/* STATE: SUCCESS */}
        {viewState === "success" && (
          <div className="animate-fade-up">
            <TransactionResult onSendAgain={() => setViewState("connected")} />
          </div>
        )}
      </main>
    </>
  );
}
