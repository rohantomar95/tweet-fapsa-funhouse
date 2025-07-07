import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp } from "lucide-react";

export const EngagementHeatmap = () => {
  // Generate mock heatmap data for the last 12 weeks
  const generateHeatmapData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 84); // 12 weeks ago
    
    for (let i = 0; i < 84; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Simulate engagement patterns
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let intensity = 0;
      if (Math.random() > 0.3) { // 70% chance of activity
        intensity = isWeekend ? 
          Math.floor(Math.random() * 2) + 1 : // Weekend: 1-2
          Math.floor(Math.random() * 4) + 1;   // Weekday: 1-4
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        intensity,
        faps: intensity * 12.5 // Rough FAPS estimate
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();
  const totalWeeks = 12;
  const daysPerWeek = 7;

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-muted/30';
      case 1: return 'bg-faps-primary/25';
      case 2: return 'bg-faps-primary/50';
      case 3: return 'bg-faps-primary/75';
      case 4: return 'bg-faps-primary';
      default: return 'bg-muted/30';
    }
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="faps-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-faps-primary" />
          <h3 className="text-lg font-semibold">Engagement Heatmap</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>Last 12 weeks</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Days of week labels */}
            <div className="flex items-center mb-2">
              <div className="w-8"></div>
              {Array.from({ length: totalWeeks }, (_, weekIndex) => (
                <div key={weekIndex} className="w-16 text-center">
                  {weekIndex % 4 === 0 && (
                    <span className="text-xs text-muted-foreground">
                      {monthLabels[new Date(heatmapData[weekIndex * 7]?.date || '').getMonth()]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            {Array.from({ length: daysPerWeek }, (_, dayIndex) => (
              <div key={dayIndex} className="flex items-center mb-1">
                <div className="w-8 text-xs text-muted-foreground text-right pr-2">
                  {dayIndex % 2 === 0 ? dayLabels[dayIndex] : ''}
                </div>
                {Array.from({ length: totalWeeks }, (_, weekIndex) => {
                  const dataIndex = weekIndex * 7 + dayIndex;
                  const dayData = heatmapData[dataIndex];
                  
                  return (
                    <div key={weekIndex} className="w-16 flex justify-center">
                      <div
                        className={`heatmap-cell ${getIntensityColor(dayData?.intensity || 0)}`}
                        title={`${dayData?.date}: ${dayData?.faps || 0} FAPS`}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((intensity) => (
              <div
                key={intensity}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-faps-primary">
              {heatmapData.filter(d => d.intensity > 0).length}
            </p>
            <p className="text-xs text-muted-foreground">Active Days</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-faps-success">
              {Math.round(heatmapData.reduce((sum, d) => sum + d.faps, 0))}
            </p>
            <p className="text-xs text-muted-foreground">Total FAPS</p>
          </div>
        </div>
      </div>
    </Card>
  );
};