
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, MoreHorizontal, Bookmark, Share, BarChart3, ExternalLink } from "lucide-react";

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
            {/* Compact header with rank badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{post.author.name}</span>
                    <span className="text-muted-foreground text-xs">{post.author.username}</span>
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
            
            
            {/* Content and media */}
            {post.content.trim() ? (
              // Post has text content
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm leading-relaxed line-clamp-3 mb-3">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </p>
                  
                  {/* Compact engagement metrics and View on X button */}
                  <div className="flex items-center justify-between">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-auto"
                      onClick={() => window.open(post.tweetUrl, '_blank')}
                    >
                      <TwitterIcon className="w-3 h-3 mr-1" />
                      View on X
                    </Button>
                  </div>
                </div>
                
                {/* Compact media thumbnail */}
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
              // Post has only media, no text
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
                
                {/* Engagement metrics and View on X button for media-only posts */}
                <div className="flex items-center justify-between">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-auto"
                    onClick={() => window.open(post.tweetUrl, '_blank')}
                  >
                    <TwitterIcon className="w-3 h-3 mr-1" />
                    View on X
                  </Button>
                </div>
              </div>
            )}
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
