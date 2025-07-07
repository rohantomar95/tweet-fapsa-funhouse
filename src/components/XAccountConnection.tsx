
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Info, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const XAccountConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    username: "@cryptomaster2024",
    twitterScore: 847
  });

  const handleConnect = () => {
    // Simulate connection process
    toast({
      title: "Connecting to X...",
      description: "Please wait while we connect your account.",
    });
    
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Successfully connected!",
        description: "Your X account is now connected to FAPS.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Account disconnected",
      description: "Your X account has been disconnected from FAPS.",
    });
  };

  if (!isConnected) {
    return (
      <Card className="faps-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TwitterIcon />
            <h3 className="text-lg font-semibold">Engagement Rewards</h3>
          </div>
          <Button 
            className="bg-faps-primary hover:bg-faps-secondary flex items-center gap-2"
            onClick={handleConnect}
          >
            Connect <TwitterIcon className="w-4 h-4 inline mx-1" /> account
          </Button>
        </div>
        <p className="text-muted-foreground">
          Connect your <TwitterIcon className="w-4 h-4 inline mx-1" /> account and earn FAPS for every like, comment, retweet, or tag — 
          including when you mention us in your own posts.
        </p>
      </Card>
    );
  }

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TwitterIcon />
          <h3 className="text-lg font-semibold">Engagement Rewards</h3>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-muted-foreground">
            Your <TwitterIcon className="w-4 h-4 inline mx-1" /> account is connected! Earn FAPS for every like, comment, retweet, or tag — 
            including when you mention us in your own posts.
          </p>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-faps-primary/10 rounded-lg border border-faps-primary/30 min-w-fit relative">
          <img 
            src={userProfile.profilePicture} 
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="pr-24">
            <p className="font-semibold text-faps-primary">{userProfile.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">Twitter Score:</span>
              <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50">
                {userProfile.twitterScore}/1000
              </Badge>
              <div className="relative group">
                <button className="p-1 hover:bg-muted rounded-full transition-colors">
                  <Info className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
                </button>
                <div className="absolute z-50 invisible group-hover:visible bg-popover border border-border text-popover-foreground p-3 rounded-md shadow-md text-xs max-w-xs -mt-20 -ml-32">
                  Twitter score is assigned by Twitterscore.io based on engagement metrics. 
                  FAPS are calculated based on Engagement and Twitter score of the user. Scores range from 1 to 1000.
                </div>
              </div>
            </div>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            className="absolute top-2 right-2 flex items-center gap-1 px-2 h-auto py-1"
          >
            <X className="w-3 h-3" />
            <span className="text-xs">Disconnect</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
