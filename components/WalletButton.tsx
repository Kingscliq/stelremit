export function WalletButton({ 
  publicKey, 
  isConnecting, 
  onConnect 
}: { 
  publicKey: string; 
  isConnecting: boolean; 
  onConnect: () => void; 
}) {
  if (publicKey) {
    const truncated = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
    return (
      <button
        className="font-sans text-[0.82rem] font-semibold text-text-main bg-surface-2 border border-border-2 py-[9px] px-[18px] rounded-[10px] transition-all duration-200 flex items-center gap-2"
      >
        <div className="w-[7px] h-[7px] rounded-full bg-green shadow-[0_0_6px_var(--color-green)]" />
        {truncated}
      </button>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isConnecting}
      className="font-sans text-[0.82rem] font-semibold text-text-main bg-surface-2 border border-border-2 py-[9px] px-[18px] rounded-[10px] cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
