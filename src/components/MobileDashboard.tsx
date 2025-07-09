import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, Flame, Calendar, Users, MessageCircle, Repeat2, Heart, 
  Trophy, Star, Target, Zap, Crown, Info, Share2, Facebook, Link, 
  Download, Copy, BarChart3, ExternalLink, MoreHorizontal, Bookmark, Share
} from "lucide-react";

// Twitter Icon Component
const TwitterIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" style={{ width: "4vw", height: "4vw" }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Mobile Dashboard Component - All sizes based on VW
const MobileDashboard = () => {
  // Style object for VW-based sizing
  const vwStyles = {
    container: {
      padding: "4vw",
      gap: "4vw"
    },
    card: {
      padding: "4vw",
      borderRadius: "2vw",
      marginBottom: "3vw"
    },
    title: {
      fontSize: "6vw", // With calc(1vw) base, this becomes 6 times bigger
      fontWeight: "bold",
      marginBottom: "2vw"
    },
    subtitle: {
      fontSize: "4vw",
      fontWeight: "600",
      marginBottom: "2vw"
    },
    bodyText: {
      fontSize: "3.5vw",
      marginBottom: "1vw"
    },
    smallText: {
      fontSize: "3vw",
      marginBottom: "1vw"
    },
    number: {
      fontSize: "8vw",
      fontWeight: "bold",
      lineHeight: "1"
    },
    button: {
      padding: "2vw 4vw",
      fontSize: "3.5vw",
      borderRadius: "1.5vw"
    },
    icon: {
      width: "5vw",
      height: "5vw"
    },
    badge: {
      padding: "1vw 2vw",
      fontSize: "2.5vw",
      borderRadius: "1vw"
    },
    spacing: {
      small: "2vw",
      medium: "4vw",
      large: "6vw"
    }
  };

  const mockData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 }
  ];

  return (
    <div style={vwStyles.container} className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: vwStyles.spacing.large }}>
        <div>
          <h1 style={vwStyles.title} className="faps-gradient-text">FAPS Dashboard</h1>
          <p style={vwStyles.bodyText} className="text-muted-foreground">Track your earnings and performance</p>
        </div>
        <div style={vwStyles.icon}>
          <Trophy style={{ width: "100%", height: "100%" }} className="text-primary" />
        </div>
      </div>

      {/* Main Stats Grid - Single Column for Mobile */}
      <div className="grid grid-cols-1" style={{ gap: vwStyles.spacing.medium, marginBottom: vwStyles.spacing.large }}>
        {/* Total FAPS Card */}
        <Card style={vwStyles.card} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={vwStyles.smallText} className="text-muted-foreground">Total FAPS</p>
              <p style={vwStyles.number} className="text-primary">12,547</p>
              <p style={vwStyles.smallText} className="text-green-500 flex items-center">
                <TrendingUp style={{ width: "3vw", height: "3vw", marginRight: "1vw" }} />
                +12.5%
              </p>
            </div>
            <div style={{ width: "12vw", height: "12vw" }} className="bg-primary/10 rounded-full flex items-center justify-center">
              <Star style={{ width: "6vw", height: "6vw" }} className="text-primary" />
            </div>
          </div>
        </Card>

        {/* Current Rank Card */}
        <Card style={vwStyles.card} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={vwStyles.smallText} className="text-muted-foreground">Current Rank</p>
              <p style={vwStyles.number} className="text-accent">#247</p>
              <p style={vwStyles.smallText} className="text-green-500">Top 2.1%</p>
            </div>
            <div style={{ width: "12vw", height: "12vw" }} className="bg-accent/10 rounded-full flex items-center justify-center">
              <Crown style={{ width: "6vw", height: "6vw" }} className="text-accent" />
            </div>
          </div>
        </Card>

        {/* Today's FAPS Card */}
        <Card style={vwStyles.card} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={vwStyles.smallText} className="text-muted-foreground">Today's FAPS</p>
              <p style={vwStyles.number} className="text-primary">89</p>
              <p style={vwStyles.smallText} className="text-blue-400">+23 from yesterday</p>
            </div>
            <div style={{ width: "12vw", height: "12vw" }} className="bg-blue-500/10 rounded-full flex items-center justify-center">
              <Zap style={{ width: "6vw", height: "6vw" }} className="text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card style={vwStyles.card} className="faps-card">
        <h3 style={vwStyles.subtitle} className="text-foreground mb-4">FAPS Trend</h3>
        <div style={{ height: "50vw" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: "3vw", fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Activity Feed */}
      <Card style={vwStyles.card} className="faps-card">
        <h3 style={vwStyles.subtitle} className="text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Completed daily quest", faps: "+15", time: "2 min ago", icon: Target },
            { action: "Shared achievement", faps: "+5", time: "1 hour ago", icon: Share2 },
            { action: "Invited friend", faps: "+25", time: "3 hours ago", icon: Users },
            { action: "Weekly milestone", faps: "+50", time: "1 day ago", icon: Trophy }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3" style={{ borderRadius: "1.5vw" }}>
                <div className="flex items-center" style={{ gap: vwStyles.spacing.small }}>
                  <div style={{ width: "8vw", height: "8vw" }} className="bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon style={{ width: "4vw", height: "4vw" }} className="text-primary" />
                  </div>
                  <div>
                    <p style={vwStyles.bodyText} className="text-foreground">{activity.action}</p>
                    <p style={vwStyles.smallText} className="text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge style={vwStyles.badge} className="bg-primary/10 text-primary border-primary/20">
                  {activity.faps}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements Section */}
      <Card style={vwStyles.card} className="faps-card">
        <h3 style={vwStyles.subtitle} className="text-foreground">Recent Achievements</h3>
        <div className="grid grid-cols-1" style={{ gap: vwStyles.spacing.medium }}>
          {[
            { title: "FAPS Collector", desc: "Earned 10,000+ FAPS", icon: "🏆" },
            { title: "Social Butterfly", desc: "Shared 50+ achievements", icon: "🦋" },
            { title: "Streak Master", desc: "30-day active streak", icon: "🔥" }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: vwStyles.spacing.small }}>
                <span style={{ fontSize: "6vw" }}>{achievement.icon}</span>
                <div>
                  <p style={vwStyles.bodyText} className="text-foreground font-medium">{achievement.title}</p>
                  <p style={vwStyles.smallText} className="text-muted-foreground">{achievement.desc}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                style={vwStyles.button}
                className="text-primary border-primary/30"
              >
                <TwitterIcon />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2" style={{ gap: vwStyles.spacing.medium, marginTop: vwStyles.spacing.large }}>
        <Button 
          style={vwStyles.button}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Share2 style={{ width: "4vw", height: "4vw", marginRight: "2vw" }} />
          Share Stats
        </Button>
        <Button 
          variant="outline" 
          style={vwStyles.button}
          className="border-primary/30 text-primary"
        >
          <BarChart3 style={{ width: "4vw", height: "4vw", marginRight: "2vw" }} />
          View More
        </Button>
      </div>
    </div>
  );
};

export default MobileDashboard;