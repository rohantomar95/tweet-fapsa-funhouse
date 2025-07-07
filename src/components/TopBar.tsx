import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const FractionLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="16" cy="16" r="14" fill="hsl(var(--faps-primary))"/>
    <path d="M12 10h8v2h-8zm0 4h8v2h-8zm0 4h6v2h-6z" fill="white"/>
  </svg>
);

export function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
        <div className="flex items-center gap-3">
          <FractionLogo />
          <span className="text-lg font-semibold text-foreground">Fraction AI</span>
          <span className="text-2xl font-bold faps-gradient-text">Fractals</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-card/80 rounded-lg border border-border/30">
          <span className="text-sm text-muted-foreground">💰</span>
          <span className="font-semibold text-foreground">99943.21</span>
          <span className="text-sm text-muted-foreground">USDC</span>
          <Button variant="outline" size="sm" className="text-xs">
            Deposit
          </Button>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-card/80 rounded-lg border border-border/30">
          <div className="w-8 h-8 bg-faps-primary/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-faps-primary">🔥</span>
          </div>
          <span className="font-semibold text-foreground">WorriedEarwig6928</span>
        </div>
      </div>
    </header>
  );
}