import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react";

export const TopPosts = () => {
  const topPosts = [
    {
      id: 1,
      content: "Just discovered this amazing DeFi protocol that's changing everything! 🚀 #DeFi #Crypto",
      fapsEarned: 125.5,
      engagements: {
        likes: 45,
        comments: 12,
        retweets: 8
      },
      timestamp: '2 days ago',
      isTop: true
    },
    {
      id: 2,
      content: "The future of blockchain is here and I'm all in! Who else is excited about what's coming? 💎",
      fapsEarned: 89.0,
      engagements: {
        likes: 32,
        comments: 7,
        retweets: 15
      },
      timestamp: '4 days ago',
      isTop: false
    },
    {
      id: 3,
      content: "Morning crypto fam! ☀️ What's everyone watching today? My portfolio is looking spicy 🌶️",
      fapsEarned: 67.5,
      engagements: {
        likes: 28,
        comments: 19,
        retweets: 3
      },
      timestamp: '6 days ago',
      isTop: false
    },
    {
      id: 4,
      content: "HODL strong! 💪 This dip is just another opportunity to accumulate. #Bitcoin #Ethereum",
      fapsEarned: 45.0,
      engagements: {
        likes: 21,
        comments: 5,
        retweets: 12
      },
      timestamp: '1 week ago',
      isTop: false
    }
  ];

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-faps-primary" />
          <h3 className="text-lg font-semibold">Top Performing Posts</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          Last 30 days
        </Badge>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {topPosts.map((post, index) => (
          <div 
            key={post.id} 
            className={`p-4 rounded-lg border transition-all duration-200 hover:border-faps-primary/50 ${
              post.isTop ? 'bg-faps-primary/10 border-faps-primary/30' : 'bg-muted/30 border-border'
            }`}
          >
            {/* Post rank and performance */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  post.isTop ? 'bg-faps-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  #{index + 1}
                </span>
                {post.isTop && (
                  <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50">
                    🏆 Top Performer
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-faps-success">
                  +{post.fapsEarned} FAPS
                </p>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>
            
            {/* Post content */}
            <div className="mb-3">
              <p className="text-sm leading-relaxed">{post.content}</p>
            </div>
            
            {/* Engagement metrics */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-red-400">
                  <Heart className="w-3 h-3" />
                  <span className="text-xs">{post.engagements.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{post.engagements.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <Repeat2 className="w-3 h-3" />
                  <span className="text-xs">{post.engagements.retweets}</span>
                </div>
              </div>
              <button className="p-1 hover:bg-muted rounded-full transition-colors">
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-faps-primary">
              {topPosts.reduce((sum, post) => sum + post.fapsEarned, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total FAPS</p>
          </div>
          <div>
            <p className="text-lg font-bold text-faps-success">
              {topPosts.reduce((sum, post) => 
                sum + post.engagements.likes + post.engagements.comments + post.engagements.retweets, 0
              )}
            </p>
            <p className="text-xs text-muted-foreground">Total Engagements</p>
          </div>
        </div>
      </div>
    </Card>
  );
};