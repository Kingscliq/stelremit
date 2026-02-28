export function WalletButton({ connected, onClick }: { connected: boolean; onClick: () => void }) {
  if (connected) {
    return (
      <button
        onClick={onClick}
        className="font-sans text-[0.82rem] font-semibold text-text-main bg-surface-2 border border-border-2 py-[9px] px-[18px] rounded-[10px] cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-surface"
      >
        <div className="w-[7px] h-[7px] rounded-full bg-green shadow-[0_0_6px_var(--color-green)]" />
        GABC...Z7
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="font-sans text-[0.82rem] font-semibold text-text-main bg-surface-2 border border-border-2 py-[9px] px-[18px] rounded-[10px] cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)]"
    >
      Connect Wallet
    </button>
  );
}
