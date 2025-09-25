import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Map, MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react";

const MapView = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 1, name: "Rajasthan", x: 25, y: 30, status: "Critical", blocks: 8 },
    { id: 2, name: "Karnataka", x: 60, y: 75, status: "Critical", blocks: 4 },
    { id: 3, name: "Madhya Pradesh", x: 45, y: 45, status: "Semi-Critical", blocks: 3 },
    { id: 4, name: "Gujarat", x: 20, y: 50, status: "Safe", blocks: 2 },
    { id: 5, name: "Uttar Pradesh", x: 55, y: 25, status: "Over-Exploited", blocks: 1 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Safe": return "bg-green-500";
      case "Semi-Critical": return "bg-yellow-500";
      case "Critical": return "bg-red-500";
      case "Over-Exploited": return "bg-orange-600";
      default: return "bg-gray-500";
    }
  };

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5));

  return (
    <Card className="h-full rounded-none bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="border-b border-white/10 py-3">
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            India Groundwater Map
          </div>
          <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 text-xs">
            **mocked map**
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[calc(100%-4rem)] relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={handleZoomIn}
            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={handleZoomOut}
            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
        </div>

        {/* Map Container */}
        <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg overflow-hidden border border-white/20">
          {/* India outline (simplified) */}
          <div 
            className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-600"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Simplified India shape */}
            <div className="absolute inset-4 bg-gradient-to-br from-slate-600 to-slate-500 opacity-80"
                 style={{
                   clipPath: "polygon(20% 10%, 80% 15%, 85% 40%, 75% 80%, 60% 85%, 40% 80%, 20% 70%, 15% 40%)"
                 }}>
            </div>

            {/* Region markers */}
            {regions.map((region) => (
              <div
                key={region.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ 
                  left: `${region.x}%`, 
                  top: `${region.y}%` 
                }}
                onClick={() => setSelectedRegion(region)}
              >
                <div className={`w-4 h-4 rounded-full ${getStatusColor(region.status)} border-2 border-white shadow-lg animate-pulse`}>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {region.name} - {region.status}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="text-xs font-medium text-cyan-300 mb-2">Status Legend</div>
          {[
            { status: "Safe", color: "bg-green-500", count: "35%" },
            { status: "Semi-Critical", color: "bg-yellow-500", count: "25%" },
            { status: "Critical", color: "bg-red-500", count: "30%" },
            { status: "Over-Exploited", color: "bg-orange-600", count: "10%" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-gray-300">{item.status}</span>
              <span className="text-gray-400 ml-auto">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="font-medium text-cyan-300">{selectedRegion.name}</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge variant={selectedRegion.status === "Critical" ? "destructive" : "secondary"} className="text-xs h-4">
                  {selectedRegion.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Blocks:</span>
                <span className="text-white">{selectedRegion.blocks}</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setSelectedRegion(null)}
              className="mt-2 text-xs text-gray-400 hover:text-white p-0 h-auto"
            >
              Close
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;