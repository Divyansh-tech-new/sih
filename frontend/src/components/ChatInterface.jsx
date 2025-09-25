import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Send, Bot, User, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { getMockResponse } from "../mock";

const ChatInterface = ({ onChartGenerated }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      summary: "Hello! I'm your INGRES AI Assistant. I can help you analyze groundwater data, identify trends, and provide insights about water resources across different regions.",
      detailed: "I have access to comprehensive groundwater monitoring data including water levels, recharge rates, extraction patterns, and quality indices. You can ask me about specific regions, compare different areas, analyze temporal trends, or get recommendations for water management strategies.",
      timestamp: new Date(),
      chartData: null
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
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

      // Send chart data to parent component
      if (response.chartData) {
        onChartGenerated(response.chartData);
      }
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

  return (
    <Card className="h-full rounded-none bg-white/5 backdrop-blur-md border-white/10 flex flex-col">
      <CardHeader className="border-b border-white/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Bot className="h-5 w-5" />
          AI Chat Assistant
          <Badge variant="outline" className="ml-auto border-cyan-400/50 text-cyan-400">
            **mocked responses**
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className="space-y-2">
                {message.type === "user" ? (
                  <div className="flex gap-3 justify-end">
                    <Card className="max-w-[80%] bg-cyan-600/20 border-cyan-400/30">
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </CardContent>
                    </Card>
                    <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 relative">
                      <Bot className="h-4 w-4 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-50"></div>
                    </div>
                    <Card className="flex-1 bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-cyan-300">Summary:</p>
                          <p className="text-sm leading-relaxed">{message.summary}</p>
                          
                          {message.chartData && (
                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                              Chart Generated: {message.chartData.chartType}
                            </Badge>
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
                                    <ChevronUp className="h-3 w-3 mr-1" />
                                    Hide detailed analysis
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-3 w-3 mr-1" />
                                    Show detailed analysis
                                  </>
                                )}
                              </Button>
                              
                              {expandedMessage === message.id && (
                                <div className="mt-3 p-3 bg-white/5 rounded-md border border-white/10">
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {message.detailed}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="text-xs text-gray-400 mt-2">
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
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                      <span className="text-sm text-cyan-300">Analyzing data...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator className="bg-white/10" />

        <div className="p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about groundwater data, trends, or specific regions..."
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {["Analyze groundwater trends", "Show critical areas", "Water level comparison"].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputValue(suggestion)}
                  className="text-xs text-gray-400 hover:text-cyan-300 hover:bg-cyan-400/10 h-6 px-2"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;