import { WalletButton } from "./WalletButton";

export function Navbar({ 
  publicKey, 
  isConnecting, 
  onConnect 
}: { 
  publicKey: string; 
  isConnecting: boolean; 
  onConnect: () => void; 
}) {
  return (
    <nav className="relative z-10 flex items-center justify-between py-5 px-10 border-b border-border-1 backdrop-blur-md bg-[rgba(8,13,26,0.6)]">
      <div className="flex items-center gap-[10px] text-[1.15rem] font-bold tracking-[-0.02em] text-text-main">
        <div className="w-[30px] h-[30px] bg-gradient-to-br from-accent to-[#7ba8ff] rounded-lg flex items-center justify-center text-[14px]">
          ✦
        </div>
        <div>
          Stel<span className="text-gold">Remit</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold bg-gold-dim border border-[rgba(240,192,96,0.2)] py-1 px-2.5 rounded-full">
          Testnet
        </div>
        <WalletButton publicKey={publicKey} isConnecting={isConnecting} onConnect={onConnect} />
      </div>
    </nav>
  );
}
