import React, { useState, useEffect } from "react";
import ChatInterface from "./ChatInterface";
import DataVisualization from "./DataVisualization";
import MapView from "./MapView";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "./ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Droplets, BarChart3, Map, Menu, X } from "lucide-react";

const MainApp = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-teal-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                INGRES AI Assistant
              </h1>
            </div>
          </div>
          <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Online
          </Badge>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-5rem)] relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-30 w-80 h-full transition-transform duration-300 ease-in-out`}>
          <Card className="h-full rounded-none border-r border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-cyan-300">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-3">
                      <div className="text-xs text-gray-400">Total Blocks</div>
                      <div className="text-xl font-bold text-cyan-400">247</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-3">
                      <div className="text-xs text-gray-400">Critical</div>
                      <div className="text-xl font-bold text-red-400">98</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-cyan-300">Status Distribution</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Safe</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-[35%]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">Semi-Critical</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full w-[25%]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">Critical</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full w-[40%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Chat Interface */}
          <div className="flex-1 border-r border-white/10">
            <ChatInterface onChartGenerated={setSelectedChart} />
          </div>

          {/* Right Panel - Charts/Map */}
          <div className="w-full md:w-96 flex flex-col">
            <div className="flex-1">
              <DataVisualization selectedChart={selectedChart} />
            </div>
            <div className="h-64 border-t border-white/10">
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;