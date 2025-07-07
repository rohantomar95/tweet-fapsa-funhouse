import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Target, Zap, Crown } from "lucide-react";
import { SocialShare } from "./SocialShare";

interface AchievementBadgesProps {
  totalEarnings: number;
  streak: number;
}

export const AchievementBadges = ({ totalEarnings, streak }: AchievementBadgesProps) => {
  const achievements = [
    {
      id: 'crypto-genesis',
      title: 'Crypto Genesis',
      description: 'Earn your first 100 FAPS',
      icon: Trophy,
      unlocked: totalEarnings >= 100,
      progress: Math.min(totalEarnings / 100, 1),
      shareText: 'Crypto Genesis achieved! First 100 FAPS in the bag! 🚀 @Fractionai_xyz'
    },
    {
      id: 'diamond-hands',
      title: 'Diamond Hands',
      description: '7-day engagement streak',
      icon: Flame,
      unlocked: streak >= 7,
      progress: Math.min(streak / 7, 1),
      shareText: 'Diamond Hands activated! 7-day FAPS streak! 💎🙌 @Fractionai_xyz'
    },
    {
      id: 'network-whale',
      title: 'Network Whale',
      description: 'Engage with 50 unique users',
      icon: Star,
      unlocked: false, // This would need real data
      progress: 0.8, // Mock progress
      shareText: 'Network Whale status! Connected with 50+ crypto minds! 🐋 @Fractionai_xyz'
    },
    {
      id: 'alpha-caller',
      title: 'Alpha Caller',
      description: 'Post 30 original tweets',
      icon: Zap,
      unlocked: false,
      progress: 0.6, // Mock progress
      shareText: 'Alpha Caller unlocked! Dropping 30+ original takes! 📢 @Fractionai_xyz'
    },
    {
      id: 'viral-degen',
      title: 'Viral Degen',
      description: 'Get 500+ total likes',
      icon: Target,
      unlocked: false,
      progress: 0.4, // Mock progress
      shareText: 'Viral Degen mode activated! 500+ likes achieved! 🔥 @Fractionai_xyz'
    },
    {
      id: 'faps-emperor',
      title: 'FAPS Emperor',
      description: 'Earn 10,000+ FAPS',
      icon: Crown,
      unlocked: totalEarnings >= 10000,
      progress: Math.min(totalEarnings / 10000, 1),
      shareText: 'FAPS Emperor crowned! 10K+ FAPS dominance! 👑 @Fractionai_xyz'
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
            {/* Progress bar for locked achievements */}
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