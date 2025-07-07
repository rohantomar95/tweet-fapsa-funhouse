import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Link, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialShareProps {
  achievement: string;
  size?: 'sm' | 'default' | 'lg';
  userStats?: {
    rank: number;
    fapsCount: number;
    username: string;
  };
}

export const SocialShare = ({ achievement, size = 'default', userStats }: SocialShareProps) => {
  const shareUrl = window.location.href;
  const hashtags = 'FAPS,Crypto,Achievement';

  const generateAchievementImage = async () => {
    if (!userStats) {
      toast({
        title: "Cannot generate image",
        description: "User stats not available.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Generating achievement image...",
      description: "Please wait while we create your shareable image.",
    });

    try {
      const { generateImage } = await import('../lib/imageGenerator');
      
      const prompt = `Create a sleek achievement card for FAPS (social media engagement rewards platform). 
      The card should feature:
      - Bold "FAPS Achievement" title at the top
      - User rank: #${userStats.rank} prominently displayed
      - FAPS count: ${userStats.fapsCount} FAPS earned
      - Username: ${userStats.username}
      - Achievement text: "${achievement}"
      - Modern gradient background with crypto/engagement theme colors (purple, blue, green)
      - Professional social media card design, 1200x630 aspect ratio
      - Clean typography and modern UI elements
      - Subtle geometric patterns or crypto-inspired design elements
      Ultra high resolution, social media optimized`;

      await generateImage(prompt, `src/assets/achievement-${Date.now()}.png`, 1200, 630);

      toast({
        title: "Achievement image generated!",
        description: "Image saved to assets folder. You can now share it on social media!",
      });
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: "Image generation failed",
        description: "Falling back to text sharing.",
        variant: "destructive",
      });
      shareToTwitter();
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(achievement)}&hashtags=${hashtags}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(achievement)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${achievement} ${shareUrl}`);
      toast({
        title: "Copied to clipboard!",
        description: "Achievement link copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-1">
        {userStats ? (
          <button 
            onClick={generateAchievementImage}
            className="social-share-btn"
            title="Generate achievement image"
          >
            <Download className="w-3 h-3" />
          </button>
        ) : (
          <button 
            onClick={shareToTwitter}
            className="social-share-btn"
            title="Share on Twitter"
          >
            <Twitter className="w-3 h-3" />
          </button>
        )}
        <button 
          onClick={copyToClipboard}
          className="social-share-btn"
          title="Copy link"
        >
          <Link className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {userStats ? (
        <Button
          onClick={generateAchievementImage}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Generate Image
        </Button>
      ) : (
        <Button
          onClick={shareToTwitter}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Twitter className="w-4 h-4" />
          Share on X
        </Button>
      )}
      <Button
        onClick={shareToFacebook}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>
      <Button
        onClick={copyToClipboard}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Link className="w-4 h-4" />
        Copy Link
      </Button>
    </div>
  );
};