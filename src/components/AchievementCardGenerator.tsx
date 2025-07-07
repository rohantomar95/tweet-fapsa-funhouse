import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface AchievementCardProps {
  achievement: string;
  userStats: {
    rank?: number;
    fapsCount: number;
    username: string;
  };
  showPostOnX?: boolean;
}

export const AchievementCardGenerator = ({ achievement, userStats, showPostOnX }: AchievementCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const generateCard = async () => {
    if (!cardRef.current) return;

    try {
      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default;
      
      toast({
        title: "Generating card...",
        description: "Creating your achievement image...",
      });

      // Generate the canvas
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f0f23',
        scale: 2,
        width: 800,
        height: 400,
        useCORS: true,
        allowTaint: true
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast({
            title: "Failed to generate image",
            description: "Please try again.",
            variant: "destructive",
          });
          return;
        }

        try {
          // Try to copy image to clipboard with proper user interaction handling
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
            
            toast({
              title: "Achievement card copied!",
              description: "The visual card has been copied to your clipboard. Paste it on X!",
            });
          } else {
            throw new Error('Clipboard API not supported');
          }
        } catch (clipboardError) {
          console.error('Clipboard error:', clipboardError);
          
          // Fallback: Create a download link for the image
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'achievement-card.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast({
            title: "Image downloaded!",
            description: "The achievement card has been downloaded. You can upload it to X!",
          });
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error generating card:', error);
      
      // Fallback to text sharing
      const shareText = `🎉 ${achievement}

💎 FAPS Count: ${userStats.fapsCount}
${userStats.rank ? `🏆 Rank: #${userStats.rank}
` : ''}👤 User: ${userStats.username}

#FAPS #Achievement #Crypto`;
      
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Text copied instead",
          description: "Achievement text has been copied for sharing on X!",
        });
      } catch (textError) {
        toast({
          title: "Generation failed",
          description: "Please try again or use the text share option.",
          variant: "destructive",
        });
      }
    }
  };

  const shareOnX = () => {
    const shareText = `🎉 ${achievement}\n\n💎 FAPS Count: ${userStats.fapsCount}\n${userStats.rank ? `🏆 Rank: #${userStats.rank}\n` : ''}👤 User: ${userStats.username}\n\n#FAPS #Achievement #Crypto`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden card for capture */}
      <div 
        ref={cardRef}
        className="fixed -left-[9999px] -top-[9999px] w-[800px] h-[400px] bg-gradient-to-br from-faps-primary via-faps-secondary to-faps-accent p-8 text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold">FAPS</div>
          <div className="text-right">
            <div className="text-xl font-bold">🎉 Achievement Unlocked!</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between h-48">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 leading-tight">{achievement}</h2>
            <div className="space-y-2 text-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💎</span>
                <span>FAPS Count: <strong>{userStats.fapsCount}</strong></span>
              </div>
              {userStats.rank && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <span>Rank: <strong>#{userStats.rank}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <span>User: <strong>{userStats.username}</strong></span>
              </div>
            </div>
          </div>
          
          {/* Achievement Badge */}
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <div className="text-6xl">🏆</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="text-lg opacity-80">#FAPS #Achievement #Crypto</div>
          <div className="text-lg opacity-80">Share your success!</div>
        </div>
      </div>

      {/* Action Buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={generateCard}
        className="text-xs px-2 py-1 h-auto"
      >
        <Copy className="w-3 h-3 mr-1" />
        Copy Card
      </Button>
      
      {showPostOnX && (
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnX}
          className="text-xs px-2 py-1 h-auto"
        >
          <TwitterIcon className="w-3 h-3 mr-1" />
          Post on X
        </Button>
      )}
    </div>
  );
};