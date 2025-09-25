import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart3, PieChart, TrendingUp, Table, Sparkles } from "lucide-react";

const DataVisualization = ({ selectedChart }) => {
  const renderChart = () => {
    if (!selectedChart) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center relative">
            <BarChart3 className="h-10 w-10 text-white" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">AI Charts Ready</h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Ask the AI assistant about groundwater data to generate beautiful, interactive visualizations automatically.
            </p>
          </div>
          <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
            Try: "Show me critical areas" or "Analyze water trends"
          </div>
        </div>
      );
    }

    const { chartType, dataSeries } = selectedChart;

    if (chartType === "pie") {
      return (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              {/* Simple CSS-based pie chart visualization */}
              <div className="absolute inset-0 rounded-full border-8 border-green-400" 
                   style={{ 
                     borderRightColor: '#F59E0B', 
                     borderBottomColor: '#EF4444',
                     borderLeftColor: '#7C2D12',
                     transform: 'rotate(45deg)'
                   }}>
              </div>
              <div className="absolute inset-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Status Distribution</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dataSeries.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (chartType === "bar") {
      return (
        <div className="space-y-4">
          <div className="h-48 flex items-end justify-around p-4 bg-white/5 rounded">
            {dataSeries.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t w-12 transition-all duration-500"
                  style={{ height: `${(item.y / Math.max(...dataSeries.map(d => d.y))) * 120}px` }}
                ></div>
                <span className="text-xs text-center">{item.x}</span>
                <Badge variant="secondary" className="text-xs">{item.y}</Badge>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 text-center">Critical blocks by state</p>
        </div>
      );
    }

    if (chartType === "line") {
      return (
        <div className="space-y-4">
          <div className="h-48 bg-white/5 rounded p-4 relative">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <polyline
                points="20,120 180,80"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="20" cy="120" r="4" fill="#06B6D4" />
              <circle cx="180" cy="80" r="4" fill="#3B82F6" />
            </svg>
            <div className="absolute bottom-2 left-4 text-xs text-gray-400">Pre-Monsoon</div>
            <div className="absolute bottom-2 right-4 text-xs text-gray-400">Post-Monsoon</div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cyan-400">Seasonal Water Level Variation</span>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
        </div>
      );
    }

    if (chartType === "table") {
      return (
        <div className="space-y-4">
          <div className="bg-white/5 rounded overflow-hidden">
            <div className="grid grid-cols-3 gap-1 p-2 bg-white/10 text-xs font-medium">
              <div>Block</div>
              <div>Status</div>
              <div>Quality</div>
            </div>
            {dataSeries.slice(0, 4).map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-1 p-2 text-xs border-t border-white/10">
                <div className="truncate">{row.block}</div>
                <Badge 
                  variant={row.status === "Critical" ? "destructive" : row.status === "Safe" ? "default" : "secondary"}
                  className="text-xs h-5"
                >
                  {row.status}
                </Badge>
                <div>{row.qualityIndex}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="h-full rounded-none bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <BarChart3 className="h-5 w-5" />
          Data Visualization
          {selectedChart && (
            <Badge variant="outline" className="ml-auto border-cyan-400/50 text-cyan-400">
              **mocked charts**
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default DataVisualization;