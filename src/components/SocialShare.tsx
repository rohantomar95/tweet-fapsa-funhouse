import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Link } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialShareProps {
  achievement: string;
  size?: 'sm' | 'default' | 'lg';
}

export const SocialShare = ({ achievement, size = 'default' }: SocialShareProps) => {
  const shareUrl = window.location.href;
  const hashtags = 'FAPS,Crypto,Achievement';

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
        <button 
          onClick={shareToTwitter}
          className="social-share-btn"
          title="Share on Twitter"
        >
          <Twitter className="w-3 h-3" />
        </button>
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
      <Button
        onClick={shareToTwitter}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        Share on X
      </Button>
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