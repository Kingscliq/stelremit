export function TransactionResult({ onSendAgain }: { onSendAgain: () => void }) {
  return (
    <div className="bg-surface border border-[rgba(62,207,142,0.2)] rounded-2xl py-8 px-6 text-center">
      <div className="w-14 h-14 bg-green-dim border border-[rgba(62,207,142,0.25)] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5">
        ✓
      </div>
      <div className="text-[1.15rem] font-bold text-green mb-2 tracking-[-0.02em]">
        Transaction Sent
      </div>
      <div className="text-[0.82rem] text-muted mb-6 leading-relaxed font-light">
        50 XLM has been sent to GXYZ9Q...4STELLAR on the Stellar testnet.
      </div>

      <div className="bg-surface-2 border border-border-1 rounded-[10px] py-3 px-4 text-left mb-5">
        <div className="text-[0.68rem] text-muted font-semibold tracking-[0.1em] uppercase mb-[6px]">
          Transaction Hash
        </div>
        <div className="font-mono text-[0.75rem] text-accent break-all leading-[1.6]">
          a3f1e9b2d74c85a2f1e9b2d74c85a2f1e9b2d74c85a2f1e9b2d74c85a2f1e9b
        </div>
      </div>

      <div className="flex gap-2.5 justify-center">
        <button
          onClick={onSendAgain}
          className="font-sans text-[0.82rem] font-semibold text-text-main bg-surface-2 border border-border-2 py-2.5 px-5 rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-surface hover:border-[rgba(255,255,255,0.2)]"
        >
          ← Send Again
        </button>
        <button
          className="font-sans text-[0.82rem] font-semibold text-accent bg-surface-2 border border-[rgba(79,123,255,0.3)] py-2.5 px-5 rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-surface hover:border-[rgba(255,255,255,0.2)]"
        >
          View on Stellar Expert ↗
        </button>
      </div>
    </div>
  );
}
