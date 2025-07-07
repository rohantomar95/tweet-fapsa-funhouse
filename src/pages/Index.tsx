
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SparklineChart } from "@/components/SparklineChart";
import { AchievementBadges } from "@/components/AchievementBadges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { TopPosts } from "@/components/TopPosts";
import { XAccountConnection } from "@/components/XAccountConnection";
import { SocialShare } from "@/components/SocialShare";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Flame, Calendar, Users, MessageCircle, Repeat2, Heart } from "lucide-react";

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
  sparklineData: [0, 170, 95, 0, 0, 0, 250, 0, 300, 0, 0, 0, 0],
  totalEarningsData: [100, 120, 200, 180, 250, 300, 320]
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
            <h1 className="text-3xl font-bold faps-gradient-text">FAPs</h1>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-faps-warning" />
            <span className="text-2xl font-bold text-faps-warning">{mockData.currentStreak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>

        {/* Main Stats Cards - Equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold text-white animate-counter">
                  {animatedEarnings.toFixed(2)} FAPS
                </p>
                <p className="text-sm text-muted-foreground">Your Rank: #{mockData.userRank}</p>
              </div>
              <div className="sparkline-container">
                <SparklineChart data={mockData.totalEarningsData} />
              </div>
            </div>
          </Card>

          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
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

          <Card className="faps-card h-32">
            <div className="flex items-center justify-between h-full">
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
        <XAccountConnection />

        {/* Achievement Badges */}
        <AchievementBadges totalEarnings={mockData.totalEarnings} streak={mockData.currentStreak} />

        {/* Main Content Grid - Equal height for chart and activity feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="faps-card h-96">
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

          {/* Activity Feed - Matching height */}
          <div className="h-96">
            <ActivityFeed />
          </div>
        </div>

        {/* Top Performing Posts */}
        <TopPosts />

        {/* Leaderboard */}
        <Card className="faps-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm" className="bg-faps-primary/20">All time</Button>
            </div>
          </div>
          
          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 p-3 mb-2 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-2">Rank</div>
            <div className="col-span-7">Username</div>
            <div className="col-span-3 text-right">FAPS Count</div>
          </div>
          
          <div className="space-y-3">
            {[
              { rank: 1, username: "CryptoKing", faps: 5420, avatar: "🚀" },
              { rank: 2, username: "BlockchainBoss", faps: 4130, avatar: "⚡" },
              { rank: 3, username: "DefiMaster", faps: 3890, avatar: "💎" },
              { rank: 4, username: "FirmOrangutan3828", faps: 2871.70, avatar: "🦍", isCurrentUser: true },
              { rank: 5, username: "TokenTrader", faps: 2156, avatar: "📈" },
            ].map((user) => (
              <div key={user.rank} className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg ${
                user.isCurrentUser ? 'bg-faps-primary/20 border border-faps-primary/50' : 'bg-muted/30'
              }`}>
                <div className="col-span-2">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    #{user.rank}
                  </span>
                </div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{user.avatar}</span>
                    <span className={user.isCurrentUser ? 'font-bold text-faps-primary' : ''}>
                      {user.username}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold">{user.faps}</span>
                    <span className="text-sm text-muted-foreground">FAPS</span>
                    {user.isCurrentUser && (
                      <SocialShare 
                        achievement="Ranked #4 in FAPS Leaderboard!" 
                        userStats={{
                          rank: user.rank,
                          fapsCount: user.faps,
                          username: user.username
                        }}
                        showPostOnX={true}
                      />
                    )}
                  </div>
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
