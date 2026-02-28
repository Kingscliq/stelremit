export function SendForm({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="bg-surface border border-border-1 rounded-2xl overflow-hidden">
      <div className="pt-5 px-6 pb-0 text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-muted mb-5">
        Send XLM
      </div>

      <div className="px-6 mb-[14px]">
        <label className="block text-[0.75rem] font-medium text-muted mb-2 tracking-[0.03em]">
          Recipient Address
        </label>
        <input
          type="text"
          placeholder="G... (Stellar public key)"
          defaultValue="GXYZ9Q3FABCD1234STELLAR"
          className="w-full bg-surface-2 border border-border-2 text-text-main font-mono text-[0.8rem] py-3 px-[14px] rounded-[10px] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] placeholder:text-muted placeholder:font-sans"
        />
      </div>

      <div className="px-6 mb-[14px]">
        <label className="block text-[0.75rem] font-medium text-muted mb-2 tracking-[0.03em]">
          Amount
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            defaultValue="50"
            style={{ paddingRight: "52px" }}
            className="w-full bg-surface-2 border border-border-2 text-text-main font-sans text-[0.88rem] py-3 pl-[14px] rounded-[10px] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] placeholder:text-muted"
          />
          <span className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[0.78rem] font-semibold text-accent tracking-[0.05em] pointer-events-none">
            XLM
          </span>
        </div>
      </div>

      <div className="flex justify-between py-3 px-6 text-[0.75rem] text-muted border-t border-b border-border-1 mt-1.5">
        <span>Network fee</span>
        <span className="text-text-main font-medium">0.00001 XLM</span>
      </div>

      <button
        onClick={onSuccess}
        className="font-sans text-[0.92rem] font-semibold text-[#08111f] bg-gold border-none w-[calc(100%-48px)] mx-6 mt-4 mb-5 p-[14px] rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all duration-250 shadow-[0_4px_20px_var(--color-gold-dim)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(240,192,96,0.25)]"
      >
        Send 50 XLM →
      </button>
    </div>
  );
}
