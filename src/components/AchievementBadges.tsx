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
      id: 'first-1k',
      title: 'First 1K FAPS',
      description: 'Earned your first 1,000 FAPS',
      icon: Trophy,
      unlocked: totalEarnings >= 1000,
      progress: Math.min(totalEarnings / 1000, 1),
      shareText: 'Just earned my first 1K FAPS! 🚀'
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: '7 days engagement streak',
      icon: Flame,
      unlocked: streak >= 7,
      progress: Math.min(streak / 7, 1),
      shareText: 'On fire with a 7-day FAPS streak! 🔥'
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Ranked in top 5',
      icon: Star,
      unlocked: true, // User is rank 3
      progress: 1,
      shareText: 'Ranked #3 in FAPS leaderboard! ⭐'
    },
    {
      id: 'engagement-master',
      title: 'Engagement Master',
      description: '100+ daily interactions',
      icon: Zap,
      unlocked: false,
      progress: 0.6,
      shareText: 'Mastering engagement on X with FAPS! ⚡'
    },
    {
      id: 'milestone-hunter',
      title: 'Milestone Hunter',
      description: '5 achievements unlocked',
      icon: Target,
      unlocked: false,
      progress: 0.6,
      shareText: 'Achievement hunting mode activated! 🎯'
    },
    {
      id: 'faps-royalty',
      title: 'FAPS Royalty',
      description: 'Earned 10,000+ FAPS',
      icon: Crown,
      unlocked: false,
      progress: totalEarnings / 10000,
      shareText: 'Crowned FAPS royalty with 10K+ earnings! 👑'
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