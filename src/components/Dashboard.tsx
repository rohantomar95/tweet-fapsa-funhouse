import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
import { 
  TrendingUp, Flame, Calendar, Users, MessageCircle, Repeat2, Heart, 
  Trophy, Star, Target, Zap, Crown, Info, Share2, Facebook, Link, 
  Download, Copy, BarChart3, ExternalLink, MoreHorizontal, Bookmark, Share
} from "lucide-react";


// Twitter Icon Component
const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Sparkline Chart Component
interface SparklineChartProps {
  data: number[];
  className?: string;
}

const SparklineChart = ({ data, className = '' }: SparklineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length < 2) return;

    const svg = svgRef.current;
    const width = 64;
    const height = 32;
    const padding = 2;

    svg.innerHTML = '';

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    const pathData = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', 'hsl(var(--faps-chart))');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.classList.add('animate-sparkline');

    svg.appendChild(path);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width="64"
      height="32"
      viewBox="0 0 64 32"
      className={`${className}`}
    />
  );
};

// Achievement Card Generator Component
interface AchievementCardProps {
  achievement: string;
  userStats: {
    rank?: number;
    fapsCount: number;
    username: string;
  };
  showPostOnX?: boolean;
}

const AchievementCardGenerator = ({ achievement, userStats, showPostOnX }: AchievementCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const copyImageToClipboard = async (canvas: HTMLCanvasElement): Promise<boolean> => {
    console.log('Starting clipboard copy process...');
    
    try {
      // Check if we're in a secure context
      if (!window.isSecureContext) {
        console.error('Not in secure context, clipboard API requires HTTPS');
        return false;
      }
      
      if (!navigator.clipboard) {
        console.error('Clipboard API not supported');
        return false;
      }
      
      if (!navigator.clipboard.write) {
        console.error('Clipboard write not supported');
        return false;
      }
      
      console.log('Creating blob from canvas...');
      const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob((blob) => {
          console.log('Blob creation callback, blob:', blob);
          resolve(blob);
        }, 'image/png', 1.0);
      });
      
      if (!blob) {
        console.error('Failed to create blob from canvas');
        return false;
      }
      
      console.log('Blob created successfully, size:', blob.size, 'type:', blob.type);
      
      const clipboardItem = new ClipboardItem({ 'image/png': blob });
      console.log('Writing to clipboard...');
      
      await navigator.clipboard.write([clipboardItem]);
      
      console.log('Image successfully written to clipboard');
      
      // Verify clipboard contents
      const clipboardContents = await navigator.clipboard.read();
      console.log('Clipboard verification - items count:', clipboardContents.length);
      
      return true;
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      return false;
    }
  };

  const generateCard = async (): Promise<boolean> => {
    if (!cardRef.current) {
      console.error('Card ref not available');
      toast.error('Failed to generate image - component not ready');
      return false;
    }

    console.log('Starting image generation...');

    try {
      console.log('Loading html2canvas...');
      const html2canvas = (await import('html2canvas')).default;
      
      console.log('Generating canvas from element...');
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: 'hsl(220 13% 6%)',
        scale: 2, // Reduced scale for better performance
        width: 1200,
        height: 630,
        useCORS: true,
        allowTaint: true,
        logging: false, // Disable html2canvas logging
        onclone: (clonedDoc) => {
          console.log('Document cloned for rendering');
        }
      });

      console.log('Canvas generated successfully, size:', canvas.width, 'x', canvas.height);

      // Test if we can create a data URL first
      const dataUrl = canvas.toDataURL('image/png');
      console.log('Data URL created, length:', dataUrl.length);

      console.log('Attempting to copy to clipboard...');
      const copySuccess = await copyImageToClipboard(canvas);
      
      if (copySuccess) {
        toast.success('✅ Image copied to clipboard! Ready to share on X 🎉');
        console.log('✅ Copy successful!');
        return true;
      } else {
        throw new Error('Clipboard copy returned false');
      }

    } catch (error) {
      console.error('❌ Image generation/copy failed:', error);
      
      // Fallback to text copying
      const shareText = `🎉 ${achievement}

💎 FAPS Count: ${userStats.fapsCount}
${userStats.rank ? `🏆 Rank: #${userStats.rank}
` : ''}👤 User: ${userStats.username}

#FAPS #Achievement #Crypto`;
      
      try {
        await navigator.clipboard.writeText(shareText);
        toast.warning("Image copy failed - text copied instead!");
        console.log('📝 Fallback text copy successful');
        return false;
      } catch (textError) {
        console.error('❌ Even text copy failed:', textError);
        toast.error("❌ Failed to copy anything. Please check browser permissions.");
        return false;
      }
    }
  };

  const shareOnX = async () => {
    // First ensure image is copied to clipboard
    const copySuccess = await generateCard();
    
    if (copySuccess) {
      // Wait a moment for clipboard to be ready
      setTimeout(() => {
        const shareText = `🎉 ${achievement}\n\n💎 FAPS Count: ${userStats.fapsCount}\n${userStats.rank ? `🏆 Rank: #${userStats.rank}\n` : ''}👤 User: ${userStats.username}\n\n#FAPS #Achievement #Crypto`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
        toast.info('🐦 Opening Twitter - paste your image in the tweet!');
      }, 500);
    } else {
      toast.error('Please copy the image first before sharing on X');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        ref={cardRef}
        className="fixed -left-[9999px] -top-[9999px] w-[1200px] h-[630px] text-white relative overflow-hidden"
        style={{ 
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(40 36% 8%) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 100%, hsl(25 65% 6%) 0%, transparent 50%),
            linear-gradient(135deg, hsl(220 13% 6%) 0%, hsl(30 20% 5%) 50%, hsl(35 25% 4%) 100%)
          `
        }}
      >
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(40 36% 49% / 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(25 65% 45% / 0.3) 0%, transparent 50%)
            `
          }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 h-full p-16 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] flex items-center justify-center text-3xl font-bold shadow-lg">
                F
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] bg-clip-text text-transparent">
                  FAPS
                </div>
                <div className="text-lg text-white/70">Fraction AI Protocol</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] bg-clip-text text-transparent">
                🎉 Achievement Unlocked!
              </div>
              <div className="text-white/60 text-lg mt-1">Congratulations!</div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 pr-16">
              <h2 className="text-6xl font-bold mb-8 leading-tight text-white drop-shadow-lg">
                {achievement}
              </h2>
              <div className="space-y-4 text-2xl">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <span>FAPS Count: <strong className="text-[hsl(40_36%_49%)]">{userStats.fapsCount.toLocaleString()}</strong></span>
                </div>
                {userStats.rank && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <span>Rank: <strong className="text-[hsl(40_36%_49%)]">#{userStats.rank}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <span>User: <strong className="text-[hsl(40_36%_49%)]">{userStats.username}</strong></span>
                </div>
              </div>
            </div>
            
            {/* Achievement icon */}
            <div className="w-80 h-80 relative flex-shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] flex items-center justify-center shadow-2xl relative">
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20"></div>
                <div className="text-9xl relative z-10 drop-shadow-lg">🏆</div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(40_36%_49%)] to-[hsl(25_65%_45%)] blur-xl opacity-30 scale-110"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-xl text-[hsl(40_36%_49%)] font-semibold">#FAPS</span>
              <span className="text-xl text-[hsl(25_65%_45%)] font-semibold">#Achievement</span>
              <span className="text-xl text-white/60 font-semibold">#FractionAI</span>
            </div>
            <div className="text-xl text-white/70 font-medium">
              Share your success and earn more rewards! 🚀
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={generateCard}
        className="text-xs px-2 py-1 h-auto hover:bg-faps-primary/10 hover:border-faps-primary/30"
      >
        <Copy className="w-3 h-3 mr-1" />
        Copy Image
      </Button>
      
      {showPostOnX && (
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnX}
          className="text-xs px-2 py-1 h-auto hover:bg-faps-primary/10 hover:border-faps-primary/30"
        >
          <TwitterIcon className="w-3 h-3 mr-1" />
          Share on X
        </Button>
      )}
    </div>
  );
};

// Social Share Component
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

const SocialShare = ({ achievement, size = 'default', userStats, showPostOnX = false }: SocialShareProps) => {
  const shareUrl = window.location.href;
  const hashtags = 'FAPS,Crypto,Achievement';

  const generateAndShareAchievement = async () => {
    if (!userStats) {
      console.log("Cannot generate image");
      return;
    }

    console.log("Generating achievement image...");

    const twitterText = `🏆 ${achievement}

🎯 Rank: #${userStats.rank} 
💎 ${userStats.fapsCount} FAPS earned
👤 ${userStats.username}

Join the FAPS community and earn rewards for your social media engagement!

@Fractionai_xyz`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');

    console.log("Tweet opened!");
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
      console.log("Copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy");
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

// Achievement Badges Component
interface AchievementBadgesProps {
  totalEarnings: number;
  streak: number;
}

const AchievementBadges = ({ totalEarnings, streak }: AchievementBadgesProps) => {
  const achievements = [
    {
      id: 'first-touch',
      title: 'First Touch',
      description: 'Earn your first 100 FAPS',
      icon: Trophy,
      unlocked: totalEarnings >= 100,
      progress: Math.min(totalEarnings / 100, 1),
      shareText: 'Just had my First Touch with FAPS! 100 down, infinity to go! 🍑 @Fractionai_xyz'
    },
    {
      id: 'rhythm-keeper',
      title: 'Rhythm Keeper',
      description: '7-day engagement streak',
      icon: Flame,
      unlocked: streak >= 7,
      progress: Math.min(streak / 7, 1),
      shareText: 'Got my Rhythm Keeper badge! 7 days of non-stop FAPS action! 🔥💦 @Fractionai_xyz'
    },
    {
      id: 'rapid-fire',
      title: 'Rapid Fire',
      description: 'Post 30 original tweets',
      icon: Zap,
      unlocked: false,
      progress: 0.6,
      shareText: 'Rapid Fire mode ACTIVATED! Shooting off 30+ original tweets non-stop! 🔥💨 @Fractionai_xyz'
    },
    {
      id: 'almost-there',
      title: 'Almost There',
      description: 'Earn 5,000 FAPS',
      icon: Star,
      unlocked: totalEarnings >= 5000,
      progress: Math.min(totalEarnings / 5000, 1),
      shareText: 'Almost There! Halfway to the top with 5K FAPS! The tease is real! 😈⚡ @Fractionai_xyz'
    },
    {
      id: 'stroke-of-genius',
      title: 'Stroke of Genius',
      description: 'Get 500+ total likes',
      icon: Target,
      unlocked: false,
      progress: 0.4,
      shareText: 'Stroke of Genius unlocked! 500+ people loved my brilliant performance! 🧠💦 @Fractionai_xyz'
    },
    {
      id: 'fap-god',
      title: 'FAP God',
      description: 'Earn 10,000+ FAPS',
      icon: Crown,
      unlocked: totalEarnings >= 10000,
      progress: Math.min(totalEarnings / 10000, 1),
      shareText: 'FAP God ascended! 10K+ FAPS of pure domination! Bow down! 👑🔥 @Fractionai_xyz'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {achievements.map((achievement) => {
        const Icon = achievement.icon;
        
        return (
          <div
            key={achievement.id}
            className={`faps-card relative overflow-hidden ${
              achievement.unlocked ? 'faps-pulse-glow' : 'opacity-60'
            }`}
          >
            {!achievement.unlocked && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                <div 
                  className="h-full bg-gradient-to-r from-faps-primary to-faps-secondary transition-all duration-1000"
                  style={{ width: `${achievement.progress * 100}%` }}
                />
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`p-2 rounded-full ${
                achievement.unlocked 
                  ? 'bg-faps-primary text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div>
                <h4 className="text-sm font-semibold">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
              </div>
              
              {achievement.unlocked && (
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="achievement-badge text-xs">
                    Unlocked
                  </Badge>
                  <SocialShare achievement={achievement.shareText} size="sm" />
                </div>
              )}
              
              {!achievement.unlocked && achievement.progress > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Math.round(achievement.progress * 100)}% complete
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Activity Feed Component
const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'like',
      description: 'Liked a crypto tweet',
      timestamp: '2 hours ago',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 2,
      type: 'retweet',
      description: 'Retweeted FAPS announcement',
      timestamp: '4 hours ago',
      icon: Repeat2,
      color: 'text-green-400'
    },
    {
      id: 3,
      type: 'comment',
      description: 'Commented on DeFi discussion',
      timestamp: '6 hours ago',
      icon: MessageCircle,
      color: 'text-blue-400'
    },
    {
      id: 4,
      type: 'mention',
      description: 'Mentioned @FAPS in your post',
      timestamp: '1 day ago',
      icon: Zap,
      color: 'text-faps-primary'
    },
    {
      id: 5,
      type: 'like',
      description: 'Liked blockchain news',
      timestamp: '1 day ago',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 6,
      type: 'retweet',
      description: 'Retweeted market analysis',
      timestamp: '2 days ago',
      icon: Repeat2,
      color: 'text-green-400'
    }
  ];

  return (
    <Card className="faps-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="activity-item">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-1.5 rounded-full bg-muted ${activity.color}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Activities Today</span>
          <span className="font-bold text-faps-primary">6 actions</span>
        </div>
      </div>
    </Card>
  );
};

// Top Posts Component
const TopPosts = () => {
  const topPosts = [
    {
      id: 1,
      author: {
        name: "Ahmed ElSabahy",
        username: "@120230Arafa",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "Finally the target hit 100k fractals 🎉🔥\nBut a still not included in top 100 , the next step is top 100 😤\nCan I get congrats @FractionAI_xyz",
      hasMedia: true,
      mediaUrl: "/lovable-uploads/7a5722af-0572-4581-a24a-a97514d8a07d.png",
      tweetUrl: "https://twitter.com/120230Arafa/status/1808245789123456789",
      engagements: {
        likes: 46,
        comments: 26,
        retweets: 1,
        views: 2100
      },
      timestamp: 'Jul 3',
      isTop: true
    },
    {
      id: 2,
      author: {
        name: "CryptoWhale",
        username: "@whale_hunter",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: true
      },
      content: "",
      hasMedia: true,
      mediaUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format",
      tweetUrl: "https://twitter.com/whale_hunter/status/1807892345678901234",
      engagements: {
        likes: 89,
        comments: 12,
        retweets: 24,
        views: 3420
      },
      timestamp: 'Jul 2',
      isTop: true
    },
    {
      id: 3,
      author: {
        name: "Rafero",
        username: "@auguraemal323",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "A short introduction of @FractionAI_xyz building on @NEARProtocol\n\nFounder is @Oxshah🔥who worked as:\n\n- ML strat analyst at @GoldmanSachs\n- Software engineering intern at @Microsoft\n- Data scientist at @augutan\n- Graduate teaching assistant at @iitdelhi\n- Quantitative",
      hasMedia: true,
      mediaUrl: "/lovable-uploads/ee4e5e2c-64d4-41d7-8acd-36046f7a2da9.png",
      tweetUrl: "https://twitter.com/auguraemal323/status/1806789012345678901",
      engagements: {
        likes: 34,
        comments: 8,
        retweets: 5,
        views: 1580
      },
      timestamp: 'Jun 30',
      isTop: true
    },
    {
      id: 4,
      author: {
        name: "DeFi_Master",
        username: "@defi_insights",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "The future of decentralized finance is here! 🚀 Just discovered this amazing protocol that's revolutionizing yield farming. Early adoption is key! #DeFi #Crypto #YieldFarming",
      hasMedia: false,
      mediaUrl: "",
      tweetUrl: "https://twitter.com/defi_insights/status/1805456789012345678",
      engagements: {
        likes: 23,
        comments: 7,
        retweets: 12,
        views: 945
      },
      timestamp: 'Jun 28',
      isTop: false
    },
    {
      id: 5,
      author: {
        name: "BlockchainBuzz",
        username: "@blockchain_news",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c6?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: true
      },
      content: "Breaking: Major institutional adoption incoming! This could be the catalyst we've all been waiting for. The market is about to shift dramatically. Are you ready? 📈💎",
      hasMedia: true,
      mediaUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop&auto=format",
      tweetUrl: "https://twitter.com/blockchain_news/status/1804123456789012345",
      engagements: {
        likes: 67,
        comments: 15,
        retweets: 31,
        views: 2890
      },
      timestamp: 'Jun 26',
      isTop: false
    }
  ];

  const totalStats = {
    totalLikes: topPosts.reduce((sum, post) => sum + post.engagements.likes, 0),
    totalReposts: topPosts.reduce((sum, post) => sum + post.engagements.retweets, 0),
    totalComments: topPosts.reduce((sum, post) => sum + post.engagements.comments, 0),
    totalViews: topPosts.reduce((sum, post) => sum + post.engagements.views, 0)
  };

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Performing Posts</h3>
        <Badge variant="outline" className="text-xs">
          Last 7 days
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {topPosts.map((post, index) => (
          <div 
            key={post.id} 
            className={`p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer ${
              post.isTop ? 'bg-faps-primary/5 border-faps-primary/30' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{post.author.name}</span>
                    <span className="text-muted-foreground text-xs">{post.author.username}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-auto ml-2"
                      onClick={() => window.open(post.tweetUrl, '_blank')}
                    >
                      <TwitterIcon className="w-3 h-3 mr-1" />
                      View on X
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-xs">{post.timestamp}</span>
                </div>
              </div>
              {post.isTop && (
                <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50 text-xs">
                  🏆 Top #{index + 1}
                </Badge>
              )}
            </div>
            
            {post.content.trim() ? (
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm leading-relaxed line-clamp-3 mb-3">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      <span>{post.engagements.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-blue-400" />
                      <span>{post.engagements.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat2 className="w-3 h-3 text-green-400" />
                      <span>{post.engagements.retweets}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-purple-400" />
                      <span>{post.engagements.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {post.hasMedia && (
                  <div className="flex-shrink-0">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post media"
                      className="w-20 h-20 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {post.hasMedia && (
                  <div className="mb-3">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post media"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>{post.engagements.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-blue-400" />
                    <span>{post.engagements.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="w-3 h-3 text-green-400" />
                    <span>{post.engagements.retweets}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-purple-400" />
                    <span>{post.engagements.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-red-400">{totalStats.totalLikes}</p>
            <p className="text-xs text-muted-foreground">Total Likes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-400">{totalStats.totalReposts}</p>
            <p className="text-xs text-muted-foreground">Total Reposts</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-400">{totalStats.totalComments}</p>
            <p className="text-xs text-muted-foreground">Total Comments</p>
          </div>
          <div>
            <p className="text-lg font-bold text-purple-400">{totalStats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

// X Account Connection Component
const XAccountConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    username: "@cryptomaster2024",
    twitterScore: 847
  });

  const handleConnect = () => {
    console.log("Connecting to X...");
    
    setTimeout(() => {
      setIsConnected(true);
      console.log("Successfully connected!");
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    console.log("Account disconnected");
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
      
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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
          <div className="pr-16">
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
            className="absolute top-2 right-2 text-xs px-2 py-1 h-auto"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Mock data for the dashboard
const mockData = {
  totalEarnings: 2871.70,
  dailyEarnings: 0.00,
  weeklyEarnings: 0.00,
  userRank: 3,
  currentStreak: 7,
  chartData: [
    { date: '8 Jun', earnings: 0 },
    { date: '10 Jun', earnings: 170 },
    { date: '12 Jun', earnings: 95 },
    { date: '14 Jun', earnings: 0 },
    { date: '16 Jun', earnings: 0 },
    { date: '18 Jun', earnings: 0 },
    { date: '20 Jun', earnings: 250 },
    { date: '22 Jun', earnings: 0 },
    { date: '24 Jun', earnings: 300 },
    { date: '26 Jun', earnings: 0 },
    { date: '28 Jun', earnings: 0 },
    { date: '30 Jun', earnings: 0 },
    { date: '2 Jul', earnings: 0 },
  ],
  sparklineData: [0, 170, 95, 0, 0, 0, 250, 0, 300, 0, 0, 0, 0],
  totalEarningsData: [100, 120, 200, 180, 250, 300, 320]
};

// Main Dashboard Component
export const Dashboard = () => {
  const [animatedEarnings, setAnimatedEarnings] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEarnings(mockData.totalEarnings);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold faps-gradient-text">FAPs</h1>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-faps-warning" />
            <span className="text-2xl font-bold text-faps-warning">{mockData.currentStreak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>

        {/* Main Stats Cards - Equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold text-white animate-counter">
                  {animatedEarnings.toFixed(2)} FAPS
                </p>
                <p className="text-sm text-muted-foreground">Your Rank: #{mockData.userRank}</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={mockData.totalEarningsData} />
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm text-muted-foreground">Daily Earnings</p>
                <p className="text-3xl font-bold">{mockData.dailyEarnings.toFixed(2)} FAPS</p>
                <p className="text-sm text-faps-success">+0.0% vs last day</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={[0, 5, 10, 8, 12, 0, 0]} />
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Earnings</p>
                <p className="text-3xl font-bold">{mockData.weeklyEarnings.toFixed(2)} FAPS</p>
                <p className="text-sm text-destructive">-100.0% vs last week</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={[100, 120, 150, 180, 200, 0, 0]} />
              </div>
            </div>
          </Card>
        </div>

        {/* Engagement Rewards Section */}
        <XAccountConnection />

        {/* Achievement Badges */}
        <AchievementBadges totalEarnings={mockData.totalEarnings} streak={mockData.currentStreak} />

        {/* Main Content Grid - Equal height for chart and activity feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="faps-card h-96">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Daily Earnings, FAPS (Last 30 days)</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">7D</Button>
                  <Button variant="outline" size="sm" className="bg-faps-primary/20">30D</Button>
                  <Button variant="outline" size="sm">90D</Button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.chartData}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="hsl(var(--faps-chart))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--faps-chart))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--faps-primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Activity Feed - Matching height */}
          <div className="h-96">
            <ActivityFeed />
          </div>
        </div>

        {/* Top Performing Posts */}
        <TopPosts />

        {/* Leaderboard */}
        <Card className="faps-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm" className="bg-faps-primary/20">All time</Button>
            </div>
          </div>
          
          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 p-3 mb-2 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-2">Rank</div>
            <div className="col-span-7">Username</div>
            <div className="col-span-3 text-right">FAPS Count</div>
          </div>
          
          <div className="space-y-3">
            {[
              { rank: 1, username: "CryptoKing", faps: 5420, avatar: "🚀" },
              { rank: 2, username: "BlockchainBoss", faps: 4130, avatar: "⚡" },
              { rank: 3, username: "DefiMaster", faps: 3890, avatar: "💎" },
              { rank: 4, username: "FirmOrangutan3828", faps: 2871.70, avatar: "🦍", isCurrentUser: true },
              { rank: 5, username: "TokenTrader", faps: 2156, avatar: "📈" },
            ].map((user) => (
              <div key={user.rank} className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg ${
                user.isCurrentUser ? 'bg-faps-primary/20 border border-faps-primary/50' : 'bg-muted/30'
              }`}>
                <div className="col-span-2">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    #{user.rank}
                  </span>
                </div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{user.avatar}</span>
                    <span className={user.isCurrentUser ? 'font-bold text-faps-primary' : ''}>
                      {user.username}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold">{user.faps}</span>
                    <span className="text-sm text-muted-foreground">FAPS</span>
                    {user.isCurrentUser && (
                      <SocialShare 
                        achievement="Ranked #4 in FAPS Leaderboard!" 
                        userStats={{
                          rank: user.rank,
                          fapsCount: user.faps,
                          username: user.username
                        }}
                        showPostOnX={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};