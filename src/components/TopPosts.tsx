
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, MoreHorizontal } from "lucide-react";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const TopPosts = () => {
  const topPosts = [
    {
      id: 1,
      author: {
        name: "CryptoKing",
        username: "@cryptoking2024",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: true
      },
      content: "Just discovered this amazing DeFi protocol that's changing everything! 🚀 @Fractionai_xyz #DeFi #Crypto",
      engagements: {
        likes: 45,
        comments: 12,
        retweets: 8,
        views: 1200
      },
      timestamp: '2h',
      isTop: true
    },
    {
      id: 2,
      author: {
        name: "BlockchainBoss",
        username: "@blockchainboss",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "The future of blockchain is here and I'm all in! Who else is excited about what's coming? 💎 @Fractionai_xyz",
      engagements: {
        likes: 32,
        comments: 7,
        retweets: 15,
        views: 890
      },
      timestamp: '4h',
      isTop: false
    },
    {
      id: 3,
      author: {
        name: "DeFi Master",
        username: "@defimaster",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: true
      },
      content: "Morning crypto fam! ☀️ What's everyone watching today? My portfolio is looking spicy 🌶️ @Fractionai_xyz",
      engagements: {
        likes: 28,
        comments: 19,
        retweets: 3,
        views: 650
      },
      timestamp: '6h',
      isTop: false
    },
    {
      id: 4,
      author: {
        name: "HODL Strong",
        username: "@hodlstrong",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "HODL strong! 💪 This dip is just another opportunity to accumulate. @Fractionai_xyz #Bitcoin #Ethereum",
      engagements: {
        likes: 21,
        comments: 5,
        retweets: 12,
        views: 480
      },
      timestamp: '1d',
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
          Last 30 days
        </Badge>
      </div>
      
      <div className="space-y-0 max-h-96 overflow-y-auto border border-border rounded-lg">
        {topPosts.map((post, index) => (
          <div 
            key={post.id} 
            className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer ${
              post.isTop ? 'bg-faps-primary/5' : ''
            }`}
          >
            {/* Post header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-bold text-sm">{post.author.name}</span>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-muted-foreground text-sm">{post.author.username}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {post.isTop && (
                  <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50 text-xs">
                    🏆 #{index + 1}
                  </Badge>
                )}
                <button className="p-1 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            {/* Post content */}
            <div className="mb-3 ml-13">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>
            
            {/* Engagement metrics */}
            <div className="flex items-center justify-between ml-13">
              <div className="flex items-center gap-8">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{post.engagements.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-green-400/10 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{post.engagements.retweets}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-red-400/10 transition-colors">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{post.engagements.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{post.engagements.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary stats */}
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
