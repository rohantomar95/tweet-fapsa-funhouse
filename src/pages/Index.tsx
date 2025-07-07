import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SparklineChart } from "@/components/SparklineChart";
import { AchievementBadges } from "@/components/AchievementBadges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { EngagementHeatmap } from "@/components/EngagementHeatmap";
import { TopPosts } from "@/components/TopPosts";
import { SocialShare } from "@/components/SocialShare";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Flame, Calendar, Trophy, Users, MessageCircle, Repeat2, Heart } from "lucide-react";

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
  sparklineData: [0, 170, 95, 0, 0, 0, 250, 0, 300, 0, 0, 0, 0]
};

const Index = () => {
  const [animatedEarnings, setAnimatedEarnings] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEarnings(mockData.totalEarnings);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold faps-gradient-text">FAPS Earnings Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your engagement rewards and milestones</p>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-faps-warning" />
            <span className="text-2xl font-bold text-faps-warning">{mockData.currentStreak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>

        {/* Achievement Badges */}
        <AchievementBadges totalEarnings={mockData.totalEarnings} streak={mockData.currentStreak} />

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="faps-card faps-card-glow faps-pulse-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold text-faps-primary animate-counter">
                  {animatedEarnings.toFixed(2)} FAPS
                </p>
                <p className="text-sm text-muted-foreground">Your Rank: #{mockData.userRank}</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={mockData.sparklineData} />
              </div>
            </div>
          </Card>

          <Card className="faps-card faps-card-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Earnings</p>
                <p className="text-3xl font-bold">{mockData.dailyEarnings.toFixed(2)} FAPS</p>
                <p className="text-sm text-faps-success">+0.0% vs last day</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={[0, 5, 10, 8, 12, 0, 0]} />
              </div>
            </div>
          </Card>

          <Card className="faps-card faps-card-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Earnings</p>
                <p className="text-3xl font-bold">{mockData.weeklyEarnings.toFixed(2)} FAPS</p>
                <p className="text-sm text-destructive">-100.0% vs last week</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={[100, 120, 150, 180, 200, 0, 0]} />
              </div>
            </div>
          </Card>
        </div>

        {/* Engagement Rewards Section */}
        <Card className="faps-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-faps-primary" />
              <h3 className="text-lg font-semibold">Engagement Rewards</h3>
            </div>
            <Button className="bg-faps-primary hover:bg-faps-secondary">
              Connect X Account
            </Button>
          </div>
          <p className="text-muted-foreground">
            Connect your X account and earn FAPS for every like, comment, retweet, or tag — 
            including when you mention us in your own posts.
          </p>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="faps-card">
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

          {/* Activity Feed */}
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Secondary Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Heatmap */}
          <EngagementHeatmap />
          
          {/* Top Performing Posts */}
          <TopPosts />
        </div>

        {/* Leaderboard */}
        <Card className="faps-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-faps-warning" />
              <h3 className="text-lg font-semibold">Leaderboard</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm" className="bg-faps-primary/20">All time</Button>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, username: "CryptoKing", faps: 5420, avatar: "🚀" },
              { rank: 2, username: "BlockchainBoss", faps: 4130, avatar: "⚡" },
              { rank: 3, username: "DefiMaster", faps: 3890, avatar: "💎" },
              { rank: 4, username: "FirmOrangutan3828", faps: 2871.70, avatar: "🦍", isCurrentUser: true },
              { rank: 5, username: "TokenTrader", faps: 2156, avatar: "📈" },
            ].map((user) => (
              <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                user.isCurrentUser ? 'bg-faps-primary/20 border border-faps-primary/50' : 'bg-muted/30'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    #{user.rank}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{user.avatar}</span>
                    <span className={user.isCurrentUser ? 'font-bold text-faps-primary' : ''}>
                      {user.username}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{user.faps}</span>
                  <span className="text-sm text-muted-foreground">FAPS</span>
                  {user.isCurrentUser && <SocialShare achievement="Ranked #4 in FAPS Leaderboard!" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;