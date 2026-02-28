export function BalanceCard() {
  return (
    <div className="bg-surface border border-border-1 rounded-2xl p-6 mb-4">
      <div className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-muted mb-[14px] flex items-center justify-between">
        Your Balance
        <button className="bg-transparent border-none text-muted cursor-pointer text-[0.85rem] py-0.5 px-1.5 rounded-md transition-all duration-200 hover:text-text-main hover:bg-surface-2" title="Refresh">
          ↻
        </button>
      </div>
      <div className="text-[2.4rem] font-bold tracking-[-0.04em] text-text-main leading-none mb-1.5">
        10,000.00 <span className="text-[1.1rem] text-muted font-normal ml-1.5">XLM</span>
      </div>
      <div className="text-[0.82rem] text-muted font-light">
        ≈ $1,302.40 USD
      </div>
      <div className="flex items-center gap-[10px] mt-[18px] pt-[18px] border-t border-border-1">
        <div className="w-8 h-8 bg-gradient-to-br from-[#4f7bff] to-[#7b4fff] rounded-lg shrink-0"></div>
        <div className="font-mono text-[0.78rem] text-muted tracking-[0.03em] flex-1">
          GABCD...XYZ7 (Freighter)
        </div>
        <button className="text-[0.72rem] text-muted bg-transparent border border-border-1 rounded-md py-1 px-2.5 cursor-pointer font-sans transition-all duration-200 hover:text-red hover:border-red">
          Disconnect
        </button>
      </div>
    </div>
  );
}
