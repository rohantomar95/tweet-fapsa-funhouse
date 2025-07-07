
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
            <X className="w-5 h-5 text-foreground" />
            <h3 className="text-lg font-semibold">Engagement Rewards</h3>
          </div>
          <Button 
            className="bg-faps-primary hover:bg-faps-secondary"
            onClick={handleConnect}
          >
            Connect X Account
          </Button>
        </div>
        <p className="text-muted-foreground">
          Connect your X account and earn FAPS for every like, comment, retweet, or tag — 
          including when you mention us in your own posts.
        </p>
      </Card>
    );
  }

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <X className="w-5 h-5 text-foreground" />
          <h3 className="text-lg font-semibold">Engagement Rewards</h3>
        </div>
        <Button 
          variant="outline"
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-muted-foreground">
            Your X account is connected! Earn FAPS for every like, comment, retweet, or tag — 
            including when you mention us in your own posts.
          </p>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-faps-primary/10 rounded-lg border border-faps-primary/30 min-w-fit">
          <img 
            src={userProfile.profilePicture} 
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-faps-primary">{userProfile.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">Twitter Score:</span>
              <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50">
                {userProfile.twitterScore}/1000
              </Badge>
              <button className="ml-1 p-1 hover:bg-muted rounded-full transition-colors group relative">
                <Info className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
                <div className="absolute z-10 invisible group-hover:visible bg-black/90 text-white p-2 rounded-md shadow-md text-xs max-w-xs -mt-16 -ml-32">
                  Twitter score is assigned by Twitterscore.io based on engagement metrics. 
                  FAPS are calculated based on Engagement and Twitter score of the user. Scores range from 1 to 1000.
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
