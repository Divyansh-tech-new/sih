import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Map, MapPin, Layers, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ isModal = false }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Indian groundwater monitoring locations
  const regions = [
    { 
      id: 1, 
      name: "Rajasthan - Jaipur Block-A", 
      lat: 26.9124, 
      lng: 75.7873, 
      status: "Critical", 
      blocks: 8,
      extraction: -6.9,
      recharge: 71.52
    },
    { 
      id: 2, 
      name: "Karnataka - Bengaluru Block-D", 
      lat: 12.9716, 
      lng: 77.5946, 
      status: "Critical", 
      blocks: 4,
      extraction: -6.1,
      recharge: 71.99
    },
    { 
      id: 3, 
      name: "Madhya Pradesh - Indore Block-C", 
      lat: 22.7196, 
      lng: 75.8577, 
      status: "Semi-Critical", 
      blocks: 3,
      extraction: -8.4,
      recharge: 76.46
    },
    { 
      id: 4, 
      name: "Gujarat - Ahmedabad Block-G", 
      lat: 23.0225, 
      lng: 72.5714, 
      status: "Over-Exploited", 
      blocks: 2,
      extraction: -1.8,
      recharge: 71.44
    },
    { 
      id: 5, 
      name: "Uttar Pradesh - Lucknow Block-F", 
      lat: 26.8467, 
      lng: 80.9462, 
      status: "Critical", 
      blocks: 1,
      extraction: -14.2,
      recharge: 87.54
    },
    {
      id: 6,
      name: "Tamil Nadu - Coimbatore Block-E",
      lat: 11.0168,
      lng: 76.9558,
      status: "Safe",
      blocks: 5,
      extraction: -8.4,
      recharge: 45.4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Safe": return "#10B981";
      case "Semi-Critical": return "#F59E0B";
      case "Critical": return "#EF4444";
      case "Over-Exploited": return "#EA580C";
      default: return "#6B7280";
    }
  };

  const createCustomIcon = (status) => {
    const color = getStatusColor(status);
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  // India bounds for initial view
  const indiaCenter = [20.5937, 78.9629];
  const indiaZoom = isModal ? 5 : 4;

  return (
    <Card className={`${isModal ? 'h-full' : 'h-64'} rounded-none bg-white/5 backdrop-blur-md border-white/10`}>
      {!isModal && (
        <CardHeader className="border-b border-white/10 py-3">
          <CardTitle className="flex items-center justify-between text-cyan-400">
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              India Map
            </div>
            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 text-xs">
              Real Map Data
            </Badge>
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={`${isModal ? 'p-0 h-full' : 'p-2 h-[calc(100%-4rem)]'} relative`}>
        <div className="h-full w-full rounded-lg overflow-hidden relative z-10">
          <MapContainer
            center={indiaCenter}
            zoom={indiaZoom}
            className="h-full w-full"
            style={{ background: '#1e293b' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {regions.map((region) => (
              <CircleMarker
                key={region.id}
                center={[region.lat, region.lng]}
                radius={isModal ? 12 : 8}
                fillColor={getStatusColor(region.status)}
                color="white"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{
                  click: () => setSelectedRegion(region)
                }}
              >
                <Popup className="custom-popup">
                  <div className="bg-slate-800 text-white p-3 rounded-lg border border-cyan-400/30">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span className="font-medium text-cyan-300">{region.name}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge 
                          variant={region.status === "Critical" || region.status === "Over-Exploited" ? "destructive" : region.status === "Safe" ? "default" : "secondary"} 
                          className="text-xs h-4"
                        >
                          {region.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Blocks:</span>
                        <span className="text-white">{region.blocks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Recharge:</span>
                        <span className="text-green-400">{region.recharge} MCM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Extraction:</span>
                        <span className="text-red-400">{region.extraction} MCM</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        {isModal && (
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 space-y-2 z-20">
            <div className="text-xs font-medium text-cyan-300 mb-2">Status Legend</div>
            {[
              { status: "Safe", color: "#10B981", count: "35%" },
              { status: "Semi-Critical", color: "#F59E0B", count: "15%" },
              { status: "Critical", color: "#EF4444", count: "40%" },
              { status: "Over-Exploited", color: "#EA580C", count: "10%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-300">{item.status}</span>
                <span className="text-gray-400 ml-auto">{item.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Selected Region Info (Modal only) */}
        {isModal && selectedRegion && (
          <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/50 z-20 max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="font-medium text-cyan-300">{selectedRegion.name}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge variant={selectedRegion.status === "Critical" ? "destructive" : "secondary"} className="text-xs h-4">
                  {selectedRegion.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monitoring Blocks:</span>
                <span className="text-white">{selectedRegion.blocks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recharge Rate:</span>
                <span className="text-green-400">{selectedRegion.recharge} MCM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Extraction Rate:</span>
                <span className="text-red-400">{selectedRegion.extraction} MCM</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setSelectedRegion(null)}
              className="mt-3 text-xs text-gray-400 hover:text-white p-0 h-auto"
            >
              Close Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;