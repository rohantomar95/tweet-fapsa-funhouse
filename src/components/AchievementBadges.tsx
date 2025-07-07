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