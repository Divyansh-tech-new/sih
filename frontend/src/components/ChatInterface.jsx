import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Send, Bot, User, ChevronDown, ChevronUp, Loader2, BarChart3, PieChart, TrendingUp, Table } from "lucide-react";
import { getMockResponse } from "../mock";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      summary: "Hello! I'm your INGRES AI Assistant for groundwater analysis. I can help you analyze water levels, identify critical areas, compare regions, and provide insights about groundwater resources across India.",
      detailed: "I have access to comprehensive groundwater monitoring data including pre/post-monsoon water levels, recharge rates, extraction patterns, and quality indices across multiple states and districts. You can ask me about specific regions, compare different areas, analyze temporal trends, or get recommendations for water management strategies. Try asking about 'groundwater trends in Rajasthan' or 'critical areas needing attention'.",
      timestamp: new Date(),
      chartData: null
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = getMockResponse(inputValue);
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        summary: response.summary,
        detailed: response.detailed,
        chartData: response.chartData,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpanded = (messageId) => {
    setExpandedMessage(expandedMessage === messageId ? null : messageId);
  };

  const renderEmbeddedChart = (chartData) => {
    if (!chartData) return null;

    const { chartType, dataSeries } = chartData;

    if (chartType === "pie") {
      return (
        <Card className="mt-4 bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-cyan-300">
              <PieChart className="h-4 w-4" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-8 border-green-400" 
                     style={{ 
                       borderRightColor: '#F59E0B', 
                       borderBottomColor: '#EF4444',
                       borderLeftColor: '#EA580C',
                       transform: 'rotate(45deg)'
                     }}>
                </div>
                <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Distribution</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dataSeries.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.label}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (chartType === "bar") {
      return (
        <Card className="mt-4 bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-cyan-300">
              <BarChart3 className="h-4 w-4" />
              Critical Blocks by State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end justify-around p-3 bg-white/5 rounded">
              {dataSeries.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t w-8 transition-all duration-500"
                    style={{ height: `${(item.y / Math.max(...dataSeries.map(d => d.y))) * 80}px` }}
                  ></div>
                  <span className="text-xs text-center text-gray-300">{item.x}</span>
                  <Badge variant="secondary" className="text-xs h-4">{item.y}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (chartType === "line") {
      return (
        <Card className="mt-4 bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-cyan-300">
              <TrendingUp className="h-4 w-4" />
              Seasonal Water Level Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 bg-white/5 rounded p-3 relative">
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <polyline
                  points="20,60 120,30"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="60" r="3" fill="#06B6D4" />
                <circle cx="120" cy="30" r="3" fill="#3B82F6" />
              </svg>
              <div className="absolute bottom-1 left-3 text-xs text-gray-400">Pre-Monsoon</div>
              <div className="absolute bottom-1 right-3 text-xs text-gray-400">Post-Monsoon</div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (chartType === "table") {
      return (
        <Card className="mt-4 bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-cyan-300">
              <Table className="h-4 w-4" />
              Groundwater Data Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 rounded overflow-hidden">
              <div className="grid grid-cols-3 gap-1 p-2 bg-white/10 text-xs font-medium">
                <div>Block</div>
                <div>Status</div>
                <div>Quality Index</div>
              </div>
              {dataSeries.slice(0, 3).map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-1 p-2 text-xs border-t border-white/10">
                  <div className="truncate">{row.block}</div>
                  <Badge 
                    variant={row.status === "Critical" ? "destructive" : row.status === "Safe" ? "default" : "secondary"}
                    className="text-xs h-4"
                  >
                    {row.status}
                  </Badge>
                  <div>{row.qualityIndex}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const quickQuestions = [
    "Analyze groundwater trends in Karnataka",
    "Show critical areas in Rajasthan", 
    "Compare water levels across states",
    "Which regions need immediate attention?",
    "Seasonal water level variations"
  ];

  return (
    <Card className="h-full rounded-lg bg-white/5 backdrop-blur-md border-white/10 flex flex-col shadow-2xl">
      <CardHeader className="border-b border-white/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Bot className="h-6 w-6" />
          INGRES AI Chat Assistant
          <Badge variant="outline" className="ml-auto border-cyan-400/50 text-cyan-400">
            **mocked responses**
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {messages.map((message, index) => (
                <div key={message.id} className="space-y-3">
                  {message.type === "user" ? (
                    <div className="flex gap-4 justify-end">
                      <Card className="max-w-[80%] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-400/30 shadow-lg">
                        <CardContent className="p-4">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="text-xs text-gray-400 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </CardContent>
                      </Card>
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 relative shadow-lg">
                        <Bot className="h-5 w-5 text-white" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-30"></div>
                      </div>
                      <Card className="flex-1 bg-white/10 border-white/20 shadow-lg">
                        <CardContent className="p-5">
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-cyan-300 mb-2">Summary:</p>
                                <p className="text-sm leading-relaxed text-gray-100">{message.summary}</p>
                              </div>
                            </div>
                            
                            {message.chartData && (
                              <div className="mt-3">
                                <Badge variant="secondary" className="bg-blue-600/30 text-blue-200 border-blue-400/30 mb-3">
                                  📊 Generated {message.chartData.chartType} chart
                                </Badge>
                                {renderEmbeddedChart(message.chartData)}
                              </div>
                            )}

                            {message.detailed && (
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded(message.id)}
                                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0 h-auto font-normal"
                                >
                                  {expandedMessage === message.id ? (
                                    <>
                                      <ChevronUp className="h-4 w-4 mr-1" />
                                      Hide detailed analysis
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-4 w-4 mr-1" />
                                      Show detailed analysis
                                    </>
                                  )}
                                </Button>
                                
                                {expandedMessage === message.id && (
                                  <div className="mt-4 p-4 bg-white/5 rounded-md border border-white/10">
                                    <p className="text-sm text-gray-200 leading-relaxed">
                                      {message.detailed}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="text-xs text-gray-400 pt-2 border-t border-white/10">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                        <span className="text-sm text-cyan-300">Analyzing groundwater data...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <Separator className="bg-white/10" />

        {/* Input Area */}
        <div className="p-6 space-y-4">
          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputValue(question)}
                  className="text-xs text-gray-400 hover:text-cyan-300 hover:bg-cyan-400/10 h-7 px-3 rounded-full border border-white/10"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Row */}
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about groundwater data, trends, or specific regions..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-lg px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;