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
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" style={{ width: "3rem", height: "3rem" }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Mobile Dashboard Component - All sizes in rem (rem = vw with your global CSS)
const MobileDashboard = () => {
  // Mock data for charts
  const mockData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 }
  ];

  return (
    <div style={{ padding: "3rem", minHeight: "100vh" }} className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: "4rem" }}>
        <div>
          <h1 style={{ fontSize: "5rem", fontWeight: "bold", marginBottom: "1rem" }} className="faps-gradient-text">
            FAPS Dashboard
          </h1>
          <p style={{ fontSize: "3rem", color: "hsl(var(--muted-foreground))" }}>
            Track your earnings and performance
          </p>
        </div>
        <Trophy style={{ width: "4rem", height: "4rem" }} className="text-primary" />
      </div>

      {/* Main Stats Grid - Single Column for Mobile */}
      <div className="grid grid-cols-1" style={{ gap: "3rem", marginBottom: "4rem" }}>
        {/* Total FAPS Card */}
        <Card style={{ padding: "3rem", borderRadius: "1.5rem" }} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="text-muted-foreground">
                Total FAPS
              </p>
              <p style={{ fontSize: "6rem", fontWeight: "bold", lineHeight: "1" }} className="text-primary">
                12,547
              </p>
              <p style={{ fontSize: "2.5rem", marginTop: "0.5rem" }} className="text-green-500 flex items-center">
                <TrendingUp style={{ width: "2.5rem", height: "2.5rem", marginRight: "0.5rem" }} />
                +12.5%
              </p>
            </div>
            <div style={{ 
              width: "8rem", 
              height: "8rem", 
              borderRadius: "50%",
              backgroundColor: "hsl(var(--primary) / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Star style={{ width: "4rem", height: "4rem" }} className="text-primary" />
            </div>
          </div>
        </Card>

        {/* Current Rank Card */}
        <Card style={{ padding: "3rem", borderRadius: "1.5rem" }} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="text-muted-foreground">
                Current Rank
              </p>
              <p style={{ fontSize: "6rem", fontWeight: "bold", lineHeight: "1" }} className="text-accent">
                #247
              </p>
              <p style={{ fontSize: "2.5rem", marginTop: "0.5rem" }} className="text-green-500">
                Top 2.1%
              </p>
            </div>
            <div style={{ 
              width: "8rem", 
              height: "8rem", 
              borderRadius: "50%",
              backgroundColor: "hsl(var(--accent) / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Crown style={{ width: "4rem", height: "4rem" }} className="text-accent" />
            </div>
          </div>
        </Card>

        {/* Today's FAPS Card */}
        <Card style={{ padding: "3rem", borderRadius: "1.5rem" }} className="faps-card">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="text-muted-foreground">
                Today's FAPS
              </p>
              <p style={{ fontSize: "6rem", fontWeight: "bold", lineHeight: "1" }} className="text-primary">
                89
              </p>
              <p style={{ fontSize: "2.5rem", marginTop: "0.5rem" }} className="text-blue-400">
                +23 from yesterday
              </p>
            </div>
            <div style={{ 
              width: "8rem", 
              height: "8rem", 
              borderRadius: "50%",
              backgroundColor: "hsl(var(--blue-500) / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Zap style={{ width: "4rem", height: "4rem" }} className="text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card style={{ padding: "3rem", borderRadius: "1.5rem", marginBottom: "3rem" }} className="faps-card">
        <h3 style={{ fontSize: "3.5rem", fontWeight: "600", marginBottom: "2rem" }} className="text-foreground">
          FAPS Trend
        </h3>
        <div style={{ height: "30rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: "2.5rem", fill: "hsl(var(--muted-foreground))" }}
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
      <Card style={{ padding: "3rem", borderRadius: "1.5rem", marginBottom: "3rem" }} className="faps-card">
        <h3 style={{ fontSize: "3.5rem", fontWeight: "600", marginBottom: "2rem" }} className="text-foreground">
          Recent Activity
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            { action: "Completed daily quest", faps: "+15", time: "2 min ago", icon: Target },
            { action: "Shared achievement", faps: "+5", time: "1 hour ago", icon: Share2 },
            { action: "Invited friend", faps: "+25", time: "3 hours ago", icon: Users },
            { action: "Weekly milestone", faps: "+50", time: "1 day ago", icon: Trophy }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: "2rem",
                borderRadius: "1rem",
                backgroundColor: "hsl(var(--muted) / 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <div style={{ 
                    width: "5rem", 
                    height: "5rem", 
                    borderRadius: "50%",
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Icon style={{ width: "2.5rem", height: "2.5rem" }} className="text-primary" />
                  </div>
                  <div>
                    <p style={{ fontSize: "3rem", fontWeight: "500" }} className="text-foreground">
                      {activity.action}
                    </p>
                    <p style={{ fontSize: "2.5rem", marginTop: "0.5rem" }} className="text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <Badge style={{ 
                  padding: "1rem 2rem", 
                  fontSize: "2.5rem",
                  borderRadius: "0.8rem"
                }} className="bg-primary/10 text-primary border-primary/20">
                  {activity.faps}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements Section */}
      <Card style={{ padding: "3rem", borderRadius: "1.5rem", marginBottom: "4rem" }} className="faps-card">
        <h3 style={{ fontSize: "3.5rem", fontWeight: "600", marginBottom: "2rem" }} className="text-foreground">
          Recent Achievements
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            { title: "FAPS Collector", desc: "Earned 10,000+ FAPS", icon: "🏆" },
            { title: "Social Butterfly", desc: "Shared 50+ achievements", icon: "🦋" },
            { title: "Streak Master", desc: "30-day active streak", icon: "🔥" }
          ].map((achievement, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <span style={{ fontSize: "4rem" }}>{achievement.icon}</span>
                <div>
                  <p style={{ fontSize: "3rem", fontWeight: "500" }} className="text-foreground">
                    {achievement.title}
                  </p>
                  <p style={{ fontSize: "2.5rem", marginTop: "0.5rem" }} className="text-muted-foreground">
                    {achievement.desc}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                style={{ 
                  padding: "1.5rem 3rem",
                  fontSize: "2.5rem",
                  borderRadius: "1rem"
                }}
                className="text-primary border-primary/30"
              >
                <TwitterIcon />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2" style={{ gap: "2rem" }}>
        <Button 
          style={{ 
            padding: "2.5rem 3rem",
            fontSize: "3rem",
            borderRadius: "1.2rem",
            fontWeight: "600"
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Share2 style={{ width: "3rem", height: "3rem", marginRight: "1rem" }} />
          Share Stats
        </Button>
        <Button 
          variant="outline" 
          style={{ 
            padding: "2.5rem 3rem",
            fontSize: "3rem",
            borderRadius: "1.2rem",
            fontWeight: "600"
          }}
          className="border-primary/30 text-primary"
        >
          <BarChart3 style={{ width: "3rem", height: "3rem", marginRight: "1rem" }} />
          View More
        </Button>
      </div>
    </div>
  );
};

export default MobileDashboard;