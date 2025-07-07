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

  const generateAndShareAchievement = async () => {
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
      description: "Creating your personalized achievement card...",
    });

    // Open Twitter immediately with rich text content
    const twitterText = `🏆 ${achievement}

🎯 Rank: #${userStats.rank} 
💎 ${userStats.fapsCount} FAPS earned
👤 ${userStats.username}

Join the FAPS community and earn rewards for your social media engagement!`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&hashtags=${hashtags}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');

    toast({
      title: "Tweet opened!",
      description: "Add your personal touch and hit Tweet to share your achievement!",
    });
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
            onClick={generateAndShareAchievement}
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
          onClick={generateAndShareAchievement}
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