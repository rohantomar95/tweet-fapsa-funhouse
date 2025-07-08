import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
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

  const copyImageToClipboard = async (canvas: HTMLCanvasElement) => {
    if (!navigator.clipboard || !navigator.clipboard.write) {
      throw new Error('Clipboard API not supported in this browser');
    }
    
    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, 'image/png', 0.9);
    });
    
    if (!blob) {
      throw new Error('Failed to create blob from canvas');
    }
    
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
  };

  const generateCard = async () => {
    if (!cardRef.current) return;

    try {
      console.log("Generating card...");

      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f0f23',
        scale: 2,
        width: 800,
        height: 400,
        useCORS: true,
        allowTaint: true
      });

      await copyImageToClipboard(canvas);
      
      console.log("Achievement card copied!");

    } catch (error) {
      console.error('Error generating/copying card:', error);
      
      const shareText = `🎉 ${achievement}

💎 FAPS Count: ${userStats.fapsCount}
${userStats.rank ? `🏆 Rank: #${userStats.rank}
` : ''}👤 User: ${userStats.username}

#FAPS #Achievement #Crypto`;
      
      try {
        await navigator.clipboard.writeText(shareText);
        console.log("Text copied instead");
      } catch (textError) {
        console.log("Copy failed");
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
      <div 
        ref={cardRef}
        className="fixed -left-[9999px] -top-[9999px] w-[800px] h-[400px] bg-gradient-to-br from-faps-primary via-faps-secondary to-faps-accent p-8 text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold">FAPS</div>
          <div className="text-right">
            <div className="text-xl font-bold">🎉 Achievement Unlocked!</div>
          </div>
        </div>

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
          
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <div className="text-6xl">🏆</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="text-lg opacity-80">#FAPS #Achievement #Crypto</div>
          <div className="text-lg opacity-80">Share your success!</div>
        </div>
      </div>

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

// Achievement Image Generator Component
interface AchievementImageGeneratorProps {
  achievement: string;
  userStats: {
    fapsCount: number;
    username: string;
  };
}

const AchievementImageGenerator = ({ achievement, userStats }: AchievementImageGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAchievementImage = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Set canvas size for Twitter optimal dimensions
      canvas.width = 1200;
      canvas.height = 675;

      // Create modern gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.3, '#16213e');
      gradient.addColorStop(0.7, '#0f1419');
      gradient.addColorStop(1, '#0a0a0a');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add geometric shapes for modern look
      ctx.save();
      
      // Large geometric shape - top right
      ctx.fillStyle = 'rgba(255, 215, 0, 0.08)';
      ctx.beginPath();
      ctx.moveTo(canvas.width - 200, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(canvas.width, 300);
      ctx.lineTo(canvas.width - 400, 200);
      ctx.closePath();
      ctx.fill();

      // Medium geometric shape - bottom left
      ctx.fillStyle = 'rgba(255, 215, 0, 0.05)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 250);
      ctx.lineTo(350, canvas.height - 100);
      ctx.lineTo(200, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Small accent shape - top left
      ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(180, 0);
      ctx.lineTo(120, 120);
      ctx.lineTo(0, 80);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // User profile section (top left)
      const profileY = 80;
      
      // Profile picture placeholder (circular)
      ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(100, profileY, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.stroke();

      // User info next to profile
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.fillText(userStats.username, 150, profileY - 5);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.fillText('@' + userStats.username.toLowerCase(), 150, profileY + 20);

      // Main achievement text - large and bold
      const centerY = canvas.height / 2;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      
      // Simple achievement text
      const achievementText = `Earned ${achievement} in FAPS on Fraction AI`;
      
      // Handle multi-line text if needed
      const maxWidth = canvas.width - 120;
      const words = achievementText.split(' ');
      let line = '';
      let currentY = centerY - 20;
      const lineHeight = 50;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), canvas.width / 2, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), canvas.width / 2, currentY);

      // FAPS count highlight
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
      ctx.fillText(`${userStats.fapsCount} FAPS`, canvas.width / 2, centerY + 80);

      // Load and draw logo (bottom left)
      try {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          logo.onload = resolve;
          logo.onerror = reject;
          logo.src = '/lovable-uploads/97f53de6-1265-49ee-8cce-799b9e43802c.png';
        });

        // Draw logo at bottom left
        const logoSize = 40;
        ctx.drawImage(logo, 60, canvas.height - logoSize - 40, logoSize, logoSize);
        
        // Company name next to logo
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'start';
        ctx.fillText('FRACTION AI', 115, canvas.height - 35);
        
      } catch (logoError) {
        console.warn('Could not load logo, using text fallback');
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'start';
        ctx.fillText('FRACTION AI', 60, canvas.height - 35);
      }

      // Website URL (bottom right)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'end';
      ctx.fillText('fractionai.xyz', canvas.width - 60, canvas.height - 35);

      ctx.textAlign = 'start'; // Reset text alignment
      return canvas;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

  const copyImageToClipboard = async (canvas: HTMLCanvasElement) => {
    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });

      if (!blob) throw new Error('Failed to create blob');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);

      return true;
    } catch (error) {
      console.error('Clipboard error:', error);
      return false;
    }
  };

  const handleShare = async () => {
    try {
      const canvas = await generateAchievementImage();
      if (!canvas) {
        throw new Error('Failed to generate image');
      }

      const success = await copyImageToClipboard(canvas);
      
      if (success) {
        // Show success toast
        const { toast } = await import("sonner");
        toast.success("Achievement image copied to clipboard!");
        
        // Small delay to show toast, then open Twitter
        setTimeout(() => {
          const twitterText = `${achievement} @Fractionai_xyz`;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
          window.open(twitterUrl, '_blank', 'width=550,height=420');
        }, 1000);
      } else {
        // Fallback to text copy
        const twitterText = `🏆 ${achievement}\n\n💎 ${userStats.fapsCount} FAPS\n👤 ${userStats.username}\n\n#FAPS #Achievement #Crypto @Fractionai_xyz`;
        await navigator.clipboard.writeText(twitterText);
        
        const { toast } = await import("sonner");
        toast.info("Text copied to clipboard! Image copy failed.");
        
        setTimeout(() => {
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
          window.open(twitterUrl, '_blank', 'width=550,height=420');
        }, 1000);
      }
    } catch (error) {
      console.error('Share error:', error);
      const { toast } = await import("sonner");
      toast.error("Failed to copy. Opening Twitter...");
      
      const twitterText = `${achievement} @Fractionai_xyz`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button 
        onClick={handleShare}
        className="social-share-btn"
        title="Share achievement"
      >
        <TwitterIcon className="w-3 h-3" />
      </button>
    </>
  );
};

// Social Share Component
interface SocialShareProps {
  achievement: string;
  size?: 'sm' | 'default' | 'lg';
  userStats?: {
    rank?: number;
    fapsCount: number;
    username: string;
  };
  showPostOnX?: boolean;
}

const SocialShare = ({ achievement, size = 'default', userStats, showPostOnX = false }: SocialShareProps) => {
  const shareToTwitter = () => {
    const twitterText = `${achievement} @Fractionai_xyz`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-1">
        <AchievementImageGenerator 
          achievement={achievement}
          userStats={{
            fapsCount: userStats?.fapsCount || 0,
            username: userStats?.username || 'User'
          }}
        />
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
        <TwitterIcon />
        Share on X
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
      <Card className="faps-card bg-card/80 backdrop-blur-sm border border-border/50 relative overflow-hidden">
        <div className="absolute top-4 left-4 text-muted-foreground/40">
          <TwitterIcon className="w-5 h-5" />
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Engagement Rewards</h3>
            <Button 
              className="bg-faps-primary hover:bg-faps-primary/90 text-primary-foreground rounded-lg px-4 py-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleConnect}
            >
              Connect <TwitterIcon className="w-4 h-4 ml-2" /> account
            </Button>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Connect your <TwitterIcon className="w-4 h-4 inline mx-1" /> account and earn FAPS for every like, comment, retweet, or tag — including when you mention us in your own posts.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="faps-card bg-card/80 backdrop-blur-sm border border-border/50 relative overflow-hidden">
      <div className="absolute top-4 left-4 text-muted-foreground/40">
        <TwitterIcon className="w-5 h-5" />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Engagement Rewards</h3>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
            Connected
          </Badge>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Your <TwitterIcon className="w-4 h-4 inline mx-1" /> account is connected! Earn FAPS for every like, comment, retweet, or tag — including when you mention us in your own posts.
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={userProfile.profilePicture} 
                  alt="Profile"
                  className="w-12 h-12 rounded-full ring-2 ring-faps-primary/30"
                />
                <div>
                  <p className="font-semibold text-foreground">{userProfile.username}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50 text-xs">
                      {userProfile.twitterScore}/1000
                    </Badge>
                    <div className="relative group">
                      <button className="p-1 hover:bg-muted rounded-full transition-colors">
                        <Info className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
                      </button>
                      <div className="absolute z-50 invisible group-hover:visible bg-popover border border-border text-popover-foreground p-3 rounded-md shadow-lg text-xs max-w-xs -mt-24 -ml-32">
                        Twitter score is assigned by Twitterscore.io based on engagement metrics. 
                        FAPS are calculated based on Engagement and Twitter score. Scores range from 1 to 1000.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="text-xs px-3 py-1 h-auto border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                Disconnect
              </Button>
            </div>
          </div>
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
        </div>

        {/* Main Stats Cards - 4 cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="faps-card h-32">
            <div className="flex flex-col justify-center h-full p-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Total Earnings</p>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {animatedEarnings.toFixed(2)}
                  </p>
                  <span className="text-sm md:text-base text-faps-primary font-medium">FAPS</span>
                </div>
                <p className="text-xs text-muted-foreground">Your Rank: #{mockData.userRank}</p>
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex flex-col justify-center h-full p-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Daily Earnings</p>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {mockData.dailyEarnings.toFixed(2)}
                  </p>
                  <span className="text-sm md:text-base text-faps-primary font-medium">FAPS</span>
                </div>
                <p className="text-xs text-muted-foreground">+0.0% vs last day</p>
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex flex-col justify-center h-full p-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Weekly Earnings</p>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {mockData.weeklyEarnings.toFixed(2)}
                  </p>
                  <span className="text-sm md:text-base text-faps-primary font-medium">FAPS</span>
                </div>
                <p className="text-xs text-muted-foreground">-100.0% vs last week</p>
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex flex-col justify-center h-full p-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Current Streak</p>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {mockData.currentStreak}
                  </p>
                  <Flame className="w-5 h-5 md:w-6 md:h-6 text-faps-warning" />
                  <span className="text-sm md:text-base text-faps-primary font-medium">days</span>
                </div>
                <p className="text-xs text-muted-foreground">in a row</p>
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