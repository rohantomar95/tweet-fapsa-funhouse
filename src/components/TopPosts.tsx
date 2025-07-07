
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, MoreHorizontal, Bookmark, Share, BarChart3 } from "lucide-react";

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
        name: "Rafero",
        username: "@auguraemal323",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
        verified: false
      },
      content: "A short introduction of @FractionAI_xyz building on @NEARProtocol\n\nFounder is @Oxshah🔥who worked as:\n\n- ML strat analyst at @GoldmanSachs\n- Software engineering intern at @Microsoft\n- Data scientist at @augutan\n- Graduate teaching assistant at @iitdelhi\n- Quantitative\nShow more",
      hasMedia: true,
      mediaUrl: "/lovable-uploads/ee4e5e2c-64d4-41d7-8acd-36046f7a2da9.png",
      engagements: {
        likes: 2,
        comments: 1,
        retweets: 0,
        views: 107
      },
      timestamp: 'Jun 27',
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
      
      <div className="space-y-0 max-h-[600px] overflow-y-auto border border-border rounded-lg">
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
                    <span className="font-bold text-sm hover:underline cursor-pointer">{post.author.name}</span>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-muted-foreground text-sm hover:underline cursor-pointer">{post.author.username}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm hover:underline cursor-pointer">{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {post.isTop && (
                  <Badge className="bg-faps-warning/20 text-faps-warning border-faps-warning/50 text-xs">
                    🏆 #{index + 1}
                  </Badge>
                )}
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            {/* Post content */}
            <div className="mb-3 ml-13">
              <p className="text-sm leading-relaxed whitespace-pre-wrap mb-3">{post.content}</p>
              
              {/* Media attachment */}
              {post.hasMedia && (
                <div className="border border-border rounded-2xl overflow-hidden">
                  <img 
                    src={post.mediaUrl} 
                    alt="Post media"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Engagement metrics - X/Twitter style */}
            <div className="flex items-center justify-between ml-13 max-w-md">
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
              
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-sm">{post.engagements.views.toLocaleString()}</span>
              </button>
              
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Bookmark className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Share className="w-4 h-4 text-muted-foreground" />
                </button>
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
