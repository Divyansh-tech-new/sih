import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const StatsModal = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Total Blocks</div>
                <div className="text-2xl font-bold text-cyan-400">247</div>
              </div>
              <BarChart3 className="h-8 w-8 text-cyan-400/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Critical Areas</div>
                <div className="text-2xl font-bold text-red-400">98</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Safe Areas</div>
                <div className="text-2xl font-bold text-green-400">87</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400/50" />
            </div>
          </CardContent>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Over-Exploited</div>
                <div className="text-2xl font-bold text-orange-400">24</div>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-cyan-400">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  Safe
                </span>
                <span>35% (87 blocks)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-green-400 h-3 rounded-full w-[35%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-yellow-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  Semi-Critical
                </span>
                <span>15% (38 blocks)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-yellow-400 h-3 rounded-full w-[15%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-red-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  Critical
                </span>
                <span>40% (98 blocks)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-red-400 h-3 rounded-full w-[40%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-orange-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  Over-Exploited
                </span>
                <span>10% (24 blocks)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-orange-400 h-3 rounded-full w-[10%]"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trends */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-cyan-400">Recent Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <span className="text-sm">Rajasthan Block-A water levels</span>
              <Badge variant="destructive" className="text-xs">↓ -15%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <span className="text-sm">Karnataka recharge rates</span>
              <Badge variant="default" className="text-xs bg-green-600">↑ +8%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <span className="text-sm">Gujarat extraction patterns</span>
              <Badge variant="secondary" className="text-xs bg-yellow-600">⚠ Monitoring</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsModal;