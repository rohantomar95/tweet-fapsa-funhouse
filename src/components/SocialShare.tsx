
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Link, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AchievementCardGenerator } from "./AchievementCardGenerator";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface SocialShareProps {
  achievement: string;
  size?: 'sm' | 'default' | 'lg';
  userStats?: {
    rank: number;
    fapsCount: number;
    username: string;
  };
  showPostOnX?: boolean;
}

export const SocialShare = ({ achievement, size = 'default', userStats, showPostOnX = false }: SocialShareProps) => {
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

Join the FAPS community and earn rewards for your social media engagement!

@Fractionai_xyz`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');

    toast({
      title: "Tweet opened!",
      description: "Add your personal touch and hit Tweet to share your achievement!",
    });
  };

  const shareToTwitter = () => {
    const twitterText = `${achievement} @Fractionai_xyz`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(achievement)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${achievement} @Fractionai_xyz`);
      toast({
        title: "Copied to clipboard!",
        description: "Achievement text copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showPostOnX && userStats) {
    return (
      <AchievementCardGenerator
        achievement={achievement}
        userStats={{
          rank: userStats.rank,
          fapsCount: userStats.fapsCount,
          username: userStats.username
        }}
        showPostOnX={true}
      />
    );
  }

  if (showPostOnX) {
    return (
      <Button
        onClick={shareToTwitter}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <TwitterIcon />
        Post on X
      </Button>
    );
  }

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
            <TwitterIcon className="w-3 h-3" />
          </button>
        )}
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
          <TwitterIcon />
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
