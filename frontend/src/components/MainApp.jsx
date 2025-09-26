import React, { useState, useEffect } from "react";
import ChatInterface from "./ChatInterface";
import MapView from "./MapView";
import StatsModal from "./StatsModal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Droplets, BarChart3, Map, Settings, TrendingUp, Activity } from "lucide-react";

const MainApp = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

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
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                INGRES AI Assistant
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quick Stats Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStatsModalOpen(true)}
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </Button>

            {/* Map Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMapModalOpen(true)}
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
            >
              <Map className="h-4 w-4 mr-2" />
              View Map
            </Button>

            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Layout - Full Width Chat */}
      <div className="h-[calc(100vh-5rem)] p-4">
        {/* Full Width Chat Interface */}
        <div className="max-w-6xl mx-auto h-full">
          <ChatInterface />
        </div>
      </div>

      {/* Stats Modal */}
      <Dialog open={isStatsModalOpen} onOpenChange={setIsStatsModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-md border-white/20">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Groundwater Dashboard
            </DialogTitle>
          </DialogHeader>
          <StatsModal />
        </DialogContent>
      </Dialog>

      {/* Map Modal */}
      <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-slate-900/95 backdrop-blur-md border-white/20">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 flex items-center gap-2">
              <Map className="h-5 w-5" />
              India Groundwater Map
            </DialogTitle>
          </DialogHeader>
          <div className="h-[70vh]">
            <MapView isModal={true} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainApp;