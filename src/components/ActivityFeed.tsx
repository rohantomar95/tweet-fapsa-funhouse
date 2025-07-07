import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, Zap, Clock } from "lucide-react";

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'like',
      description: 'Liked a crypto tweet',
      faps: 2.5,
      timestamp: '2 hours ago',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 2,
      type: 'retweet',
      description: 'Retweeted FAPS announcement',
      faps: 5.0,
      timestamp: '4 hours ago',
      icon: Repeat2,
      color: 'text-green-400'
    },
    {
      id: 3,
      type: 'comment',
      description: 'Commented on DeFi discussion',
      faps: 10.0,
      timestamp: '6 hours ago',
      icon: MessageCircle,
      color: 'text-blue-400'
    },
    {
      id: 4,
      type: 'mention',
      description: 'Mentioned @FAPS in your post',
      faps: 15.0,
      timestamp: '1 day ago',
      icon: Zap,
      color: 'text-faps-primary'
    },
    {
      id: 5,
      type: 'like',
      description: 'Liked blockchain news',
      faps: 2.5,
      timestamp: '1 day ago',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 6,
      type: 'retweet',
      description: 'Retweeted market analysis',
      faps: 5.0,
      timestamp: '2 days ago',
      icon: Repeat2,
      color: 'text-green-400'
    }
  ];

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-faps-primary" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          Live
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
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
              <div className="text-right">
                <p className="text-sm font-bold text-faps-success">
                  +{activity.faps}
                </p>
                <p className="text-xs text-muted-foreground">FAPS</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Today's Total</span>
          <span className="font-bold text-faps-primary">+40.0 FAPS</span>
        </div>
      </div>
    </Card>
  );
};