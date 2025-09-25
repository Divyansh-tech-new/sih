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
                              <Badge variant="secondary" className="bg-blue-600/30 text-blue-200 border-blue-400/30">
                                📊 Chart Generated: {message.chartData.chartType}
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