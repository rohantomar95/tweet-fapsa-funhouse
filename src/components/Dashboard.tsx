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
const TwitterIcon = ({ className = "w-[1rem] h-[1rem]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Sparkline Chart Component - responsive with rem units
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

// Achievement Card Generator Component - responsive
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
    <div className="flex items-center gap-[0.5rem]">
      <div 
        ref={cardRef}
        className="fixed -left-[999rem] -top-[999rem] w-[50rem] h-[25rem] bg-gradient-to-br from-faps-primary via-faps-secondary to-faps-accent p-[2rem] text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <div className="flex items-center justify-between mb-[1.5rem]">
          <div className="text-[1.875rem] font-bold">FAPS</div>
          <div className="text-right">
            <div className="text-[1.25rem] font-bold">🎉 Achievement Unlocked!</div>
          </div>
        </div>

        <div className="flex items-center justify-between h-[12rem]">
          <div className="flex-1">
            <h2 className="text-[2.5rem] font-bold mb-[1rem] leading-tight">{achievement}</h2>
            <div className="space-y-[0.5rem] text-[1.25rem]">
              <div className="flex items-center gap-[0.75rem]">
                <span className="text-[1.5rem]">💎</span>
                <span>FAPS Count: <strong>{userStats.fapsCount}</strong></span>
              </div>
              {userStats.rank && (
                <div className="flex items-center gap-[0.75rem]">
                  <span className="text-[1.5rem]">🏆</span>
                  <span>Rank: <strong>#{userStats.rank}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-[0.75rem]">
                <span className="text-[1.5rem]">👤</span>
                <span>User: <strong>{userStats.username}</strong></span>
              </div>
            </div>
          </div>
          
          <div className="w-[8rem] h-[8rem] bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <div className="text-[3.75rem]">🏆</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-[1.5rem] pt-[1rem] border-t border-white/20">
          <div className="text-[1.125rem] opacity-80">#FAPS #Achievement #Crypto</div>
          <div className="text-[1.125rem] opacity-80">Share your success!</div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={generateCard}
        className="text-[0.75rem] px-[0.5rem] py-[0.25rem] h-auto"
      >
        <Copy className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
        Copy Card
      </Button>
      
      {showPostOnX && (
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnX}
          className="text-[0.75rem] px-[0.5rem] py-[0.25rem] h-auto"
        >
          <TwitterIcon className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
          Post on X
        </Button>
      )}
    </div>
  );
};

// Achievement Image Generator Component - responsive
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
        <TwitterIcon className="w-[0.75rem] h-[0.75rem]" />
      </button>
    </>
  );
};

// Social Share Component - responsive with rem
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
      <div className="flex items-center gap-[0.25rem]">
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
    <div className="flex items-center gap-[0.5rem]">
      <Button
        onClick={shareToTwitter}
        variant="outline"
        size="sm"
        className="flex items-center gap-[0.5rem]"
      >
        <TwitterIcon />
        Share on X
      </Button>
    </div>
  );
};

// Achievement Badges Component - responsive grid with rem units
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[1rem] md:gap-[1.5rem]">
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
              <div className="absolute top-0 left-0 right-0 h-[0.25rem] bg-muted">
                <div 
                  className="h-full bg-gradient-to-r from-faps-primary to-faps-secondary transition-all duration-1000"
                  style={{ width: `${achievement.progress * 100}%` }}
                />
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-[0.5rem]">
              <div className={`p-[0.5rem] rounded-full ${
                achievement.unlocked 
                  ? 'bg-faps-primary text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-[1rem] h-[1rem]" />
              </div>
              
              <div>
                <h4 className="text-[0.875rem] font-semibold">{achievement.title}</h4>
                <p className="text-[0.75rem] text-muted-foreground mt-[0.25rem]">
                  {achievement.description}
                </p>
              </div>
              
              {achievement.unlocked && (
                <div className="flex items-center gap-[0.25rem]">
                  <Badge variant="secondary" className="achievement-badge text-[0.75rem]">
                    Unlocked
                  </Badge>
                  <SocialShare achievement={achievement.shareText} size="sm" />
                </div>
              )}
              
              {!achievement.unlocked && achievement.progress > 0 && (
                <div className="text-[0.75rem] text-muted-foreground">
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

// Activity Feed Component - responsive with rem units
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
      <div className="flex items-center justify-between mb-[1rem]">
        <h3 className="text-[1.125rem] font-semibold">Recent Activity</h3>
      </div>
      
      <div className="space-y-[0.75rem] flex-1 overflow-y-auto">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="activity-item">
              <div className="flex items-start gap-[0.75rem] flex-1">
                <div className={`p-[0.375rem] rounded-full bg-muted ${activity.color}`}>
                  <Icon className="w-[0.75rem] h-[0.75rem]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.875rem] font-medium truncate">
                    {activity.description}
                  </p>
                  <p className="text-[0.75rem] text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-[1rem] pt-[1rem] border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-[0.875rem] text-muted-foreground">Activities Today</span>
          <span className="font-bold text-faps-primary">6 actions</span>
        </div>
      </div>
    </Card>
  );
};

// Top Posts Component - responsive with rem and mobile adjustments
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
      <div className="flex items-center justify-between mb-[1rem]">
        <h3 className="text-[1.125rem] font-semibold">Top Performing Posts</h3>
        <Badge variant="outline" className="text-[0.75rem]">
          Last 7 days
        </Badge>
      </div>
      
      <div className="space-y-[0.75rem] max-h-[31.25rem] overflow-y-auto">
        {topPosts.map((post, index) => (
          <div 
            key={post.id} 
            className={`p-[1rem] border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer ${
              post.isTop ? 'bg-faps-primary/5 border-faps-primary/30' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-[0.75rem]">
              <div className="flex items-center gap-[0.75rem] flex-1">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-[2rem] h-[2rem] rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-[0.5rem]">
                    <span className="font-semibold text-[0.875rem]">{post.author.name}</span>
                    <span className="text-muted-foreground text-[0.75rem]">{post.author.username}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[0.75rem] px-[0.5rem] py-[0.25rem] h-auto ml-[0.5rem] hidden sm:flex"
                      onClick={() => window.open(post.tweetUrl, '_blank')}
                    >
                      <TwitterIcon className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
                      View on X
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-[0.75rem]">{post.timestamp}</span>
                </div>
              </div>
              {post.isTop && (
                <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50 text-[0.75rem]">
                  🏆 Top #{index + 1}
                </Badge>
              )}
            </div>
            
            {post.content.trim() ? (
              <div className="flex gap-[1rem]">
                <div className="flex-1">
                  <p className="text-[0.875rem] leading-relaxed line-clamp-3 mb-[0.75rem]">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </p>
                  
                  <div className="flex items-center gap-[1rem] text-[0.75rem] text-muted-foreground">
                    <div className="flex items-center gap-[0.25rem]">
                      <Heart className="w-[0.75rem] h-[0.75rem] text-red-400" />
                      <span>{post.engagements.likes}</span>
                    </div>
                    <div className="flex items-center gap-[0.25rem]">
                      <MessageCircle className="w-[0.75rem] h-[0.75rem] text-blue-400" />
                      <span>{post.engagements.comments}</span>
                    </div>
                    <div className="flex items-center gap-[0.25rem]">
                      <Repeat2 className="w-[0.75rem] h-[0.75rem] text-green-400" />
                      <span>{post.engagements.retweets}</span>
                    </div>
                    <div className="flex items-center gap-[0.25rem]">
                      <BarChart3 className="w-[0.75rem] h-[0.75rem] text-purple-400" />
                      <span>{post.engagements.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {post.hasMedia && (
                  <div className="flex-shrink-0">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post media"
                      className="w-[5rem] h-[5rem] sm:w-[6rem] sm:h-[6rem] object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {post.hasMedia && (
                  <div className="mb-[0.75rem]">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post media"
                      className="w-full h-[8rem] object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-[1rem] text-[0.75rem] text-muted-foreground">
                  <div className="flex items-center gap-[0.25rem]">
                    <Heart className="w-[0.75rem] h-[0.75rem] text-red-400" />
                    <span>{post.engagements.likes}</span>
                  </div>
                  <div className="flex items-center gap-[0.25rem]">
                    <MessageCircle className="w-[0.75rem] h-[0.75rem] text-blue-400" />
                    <span>{post.engagements.comments}</span>
                  </div>
                  <div className="flex items-center gap-[0.25rem]">
                    <Repeat2 className="w-[0.75rem] h-[0.75rem] text-green-400" />
                    <span>{post.engagements.retweets}</span>
                  </div>
                  <div className="flex items-center gap-[0.25rem]">
                    <BarChart3 className="w-[0.75rem] h-[0.75rem] text-purple-400" />
                    <span>{post.engagements.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-[1rem] pt-[1rem] border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1rem] text-center">
          <div>
            <p className="text-[1.125rem] font-bold text-red-400">{totalStats.totalLikes}</p>
            <p className="text-[0.75rem] text-muted-foreground">Total Likes</p>
          </div>
          <div>
            <p className="text-[1.125rem] font-bold text-green-400">{totalStats.totalReposts}</p>
            <p className="text-[0.75rem] text-muted-foreground">Total Reposts</p>
          </div>
          <div>
            <p className="text-[1.125rem] font-bold text-blue-400">{totalStats.totalComments}</p>
            <p className="text-[0.75rem] text-muted-foreground">Total Comments</p>
          </div>
          <div>
            <p className="text-[1.125rem] font-bold text-purple-400">{totalStats.totalViews.toLocaleString()}</p>
            <p className="text-[0.75rem] text-muted-foreground">Total Views</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

// X Account Connection Component - responsive with rem units and mobile optimized
const XAccountConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  if (!isConnected) {
    return (
      <Card className="faps-card">
        <div className="p-[0.75rem] sm:p-[1rem]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[1rem]">
            <div className="flex items-center gap-[0.75rem]">
              <div className="w-[2rem] h-[2rem] bg-faps-primary/10 rounded-lg flex items-center justify-center">
                <TwitterIcon className="w-[1rem] h-[1rem] text-faps-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-[1rem] sm:text-[1.125rem]">Engagement Rewards</h3>
                <p className="text-[0.75rem] text-muted-foreground">Connect and earn FAPS</p>
              </div>
            </div>
            
            <Button 
              className="bg-faps-primary hover:bg-faps-primary/90 text-primary-foreground px-[1rem] py-[0.5rem] text-[0.875rem] w-full sm:w-auto"
              onClick={handleConnect}
            >
              Connect <TwitterIcon className="w-[0.75rem] h-[0.75rem] ml-[0.25rem]" /> account
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="faps-card">
      <div className="p-[0.75rem] sm:p-[1rem]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[1rem] mb-[1rem]">
          <div className="flex items-center gap-[0.75rem]">
            <div className="w-[2rem] h-[2rem] bg-green-500/10 rounded-lg flex items-center justify-center">
              <TwitterIcon className="w-[1rem] h-[1rem] text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-[1rem] sm:text-[1.125rem]">Engagement Rewards</h3>
              <p className="text-[0.75rem] text-muted-foreground">Account connected</p>
            </div>
          </div>
          
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-[0.5rem] py-[0.25rem] text-[0.75rem]">
            Connected
          </Badge>
        </div>
        
        <div className="space-y-[0.75rem]">
          <div className="flex items-center justify-between p-[0.75rem] bg-faps-primary/5 rounded-lg border border-faps-primary/20">
            <div>
              <p className="text-[0.875rem] font-medium">Today's Actions</p>
              <p className="text-[0.75rem] text-muted-foreground">Likes, retweets, replies</p>
            </div>
            <div className="text-right">
              <p className="text-[1.25rem] font-bold text-faps-primary">12</p>
              <p className="text-[0.75rem] text-faps-primary">+240 FAPS</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-[0.75rem] bg-muted/30 rounded-lg">
            <div>
              <p className="text-[0.875rem] font-medium">Weekly Streak</p>
              <p className="text-[0.75rem] text-muted-foreground">Keep engaging daily</p>
            </div>
            <div className="text-right">
              <p className="text-[1.25rem] font-bold text-faps-secondary">5</p>
              <p className="text-[0.75rem] text-faps-secondary">days</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Heatmap Component - responsive with rem units
const EngagementHeatmap = () => {
  const generateHeatmapData = () => {
    const days = 35;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 4),
        day: date.getDay()
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();
  const weeks = [];
  
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count === 1) return 'bg-faps-primary/20';
    if (count === 2) return 'bg-faps-primary/40';
    if (count === 3) return 'bg-faps-primary/60';
    return 'bg-faps-primary';
  };

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-[1rem]">
        <h3 className="text-[1.125rem] font-semibold">Engagement Activity</h3>
        <div className="flex items-center gap-[0.5rem] text-[0.75rem] text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-[0.125rem]">
            <div className="w-[0.75rem] h-[0.75rem] rounded-sm bg-muted"></div>
            <div className="w-[0.75rem] h-[0.75rem] rounded-sm bg-faps-primary/20"></div>
            <div className="w-[0.75rem] h-[0.75rem] rounded-sm bg-faps-primary/40"></div>
            <div className="w-[0.75rem] h-[0.75rem] rounded-sm bg-faps-primary/60"></div>
            <div className="w-[0.75rem] h-[0.75rem] rounded-sm bg-faps-primary"></div>
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex gap-[0.125rem] overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[0.125rem]">
            {week.map((day, dayIndex) => (
              <div
                key={day.date}
                className={`heatmap-cell ${getIntensityClass(day.count)}`}
                title={`${day.date}: ${day.count} actions`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-[1rem] pt-[1rem] border-t border-border">
        <div className="grid grid-cols-2 gap-[1rem] text-center">
          <div>
            <p className="text-[1.125rem] font-bold text-faps-primary">156</p>
            <p className="text-[0.75rem] text-muted-foreground">Total actions last 35 days</p>
          </div>
          <div>
            <p className="text-[1.125rem] font-bold text-faps-secondary">23</p>
            <p className="text-[0.75rem] text-muted-foreground">Most active day</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main Dashboard Component - responsive container with rem units and mobile optimizations
export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Mock data
  const mockData = {
    totalEarnings: 8420,
    dailyEarnings: 124,
    currentStreak: 12,
    totalActions: 245,
    chartData: [
      { day: 'Mon', earnings: 45 },
      { day: 'Tue', earnings: 78 },
      { day: 'Wed', earnings: 62 },
      { day: 'Thu', earnings: 89 },
      { day: 'Fri', earnings: 124 },
      { day: 'Sat', earnings: 95 },
      { day: 'Sun', earnings: 67 },
    ]
  };

  return (
    <div className="w-full min-h-[100vh] bg-background">
      {/* Mobile optimized container with proper spacing */}
      <div className="max-w-[90rem] mx-auto p-[1rem] sm:p-[1.5rem] lg:p-[2rem] space-y-[1.5rem] lg:space-y-[2rem]">
        {/* Header Section - responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[1rem]">
          <div>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold faps-gradient-text">
              FAPS Dashboard
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-[0.5rem]">
              Track your engagement rewards and earnings
            </p>
          </div>
          
          <div className="flex items-center gap-[0.75rem] w-full sm:w-auto">
            <Badge className="bg-faps-primary/20 text-faps-primary border-faps-primary/30 px-2 sm:px-3 py-1">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{mockData.currentStreak} day streak</span>
            </Badge>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
              <Share className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Share Progress</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards Grid - responsive with vw consideration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1rem] sm:gap-[1.5rem]">
          {/* Total Earnings Card */}
          <Card className="faps-card-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-faps-primary animate-counter">
                  {mockData.totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">FAPS tokens</p>
              </div>
              <div className="p-2 sm:p-3 bg-faps-primary/10 rounded-full">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-faps-primary" />
              </div>
            </div>
          </Card>

          {/* Daily Earnings Card */}
          <Card className="faps-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Today's Earnings</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-faps-secondary animate-counter">
                  +{mockData.dailyEarnings}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-xs sm:text-sm text-green-400">+12% from yesterday</span>
                </div>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={[45, 52, 48, 61, 78, 95, 124]} />
              </div>
            </div>
          </Card>

          {/* Total Actions Card */}
          <Card className="faps-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Total Actions</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground animate-counter">
                  {mockData.totalActions}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">engagements</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-500/10 rounded-full">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          {/* Current Streak Card */}
          <Card className="faps-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.875rem] font-medium text-muted-foreground">Current Streak</p>
                <div className="flex items-end gap-[0.5rem]">
                  <span className="text-[2rem] sm:text-[2.5rem] font-bold text-faps-warning animate-counter">
                    {mockData.currentStreak}
                  </span>
                  <Flame className="w-[1.25rem] h-[1.5rem] sm:w-[1.5rem] sm:h-[1.5rem] text-faps-warning" />
                  <span className="text-[0.875rem] sm:text-[1rem] text-faps-primary font-medium">days</span>
                </div>
                <p className="text-[0.75rem] text-muted-foreground">in a row</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Engagement Rewards Section */}
        <XAccountConnection />

        {/* Achievement Badges */}
        <AchievementBadges totalEarnings={mockData.totalEarnings} streak={mockData.currentStreak} />

        {/* Main Content Grid - responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.5rem]">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="faps-card h-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-[1rem] gap-[1rem]">
                <h3 className="text-[1.125rem] font-semibold">Earnings Overview</h3>
                <div className="flex items-center gap-[0.5rem]">
                  <Button variant="outline" size="sm" className="text-[0.75rem] px-[0.75rem]">
                    <Calendar className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
                    Last 7 days
                  </Button>
                  <Button variant="outline" size="sm" className="text-[0.75rem] px-[0.75rem]">
                    <ExternalLink className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="h-[20rem] sm:h-[25rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.chartData}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="hsl(var(--faps-primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--faps-primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: 'hsl(var(--faps-primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        {/* Bottom Grid - responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
          {/* Top Posts */}
          <TopPosts />
          
          {/* Engagement Heatmap */}
          <EngagementHeatmap />
        </div>
      </div>
    </div>
  );
};