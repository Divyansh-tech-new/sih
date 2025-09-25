// Mock data for INGRES AI Assistant
export const mockGroundwaterData = [
  {
    state: "Rajasthan",
    district: "Jaipur", 
    block: "Block-A",
    year: 2023,
    preMonsoonLevel_m: 6.886,
    postMonsoonLevel_m: 7.152,
    recharge_MCM: 71.52,
    extraction_MCM: -6.9,
    status: "Critical",
    aquiferType: "Sedimentary",
    qualityIndex: 92
  },
  {
    state: "Karnataka",
    district: "Bengaluru",
    block: "Block-D", 
    year: 2024,
    preMonsoonLevel_m: 7.625,
    postMonsoonLevel_m: 1.366,
    recharge_MCM: 71.99,
    extraction_MCM: -6.1,
    status: "Critical",
    aquiferType: "Alluvial",
    qualityIndex: 66
  },
  {
    state: "Rajasthan",
    district: "Jaipur",
    block: "Block-B",
    year: 2024,
    preMonsoonLevel_m: 1.267,
    postMonsoonLevel_m: 8.297,
    recharge_MCM: 37.4,
    extraction_MCM: -14.5,
    status: "Safe",
    aquiferType: "Basalt",
    qualityIndex: 54
  }
];

export const mockChatResponses = {
  "analyze groundwater": {
    summary: "Groundwater analysis shows mixed conditions across regions with 40% areas in Critical status requiring immediate attention.",
    chartData: {
      chartType: "pie",
      dataSeries: [
        { label: "Safe", value: 35, color: "#10B981" },
        { label: "Semi-Critical", value: 15, color: "#F59E0B" },
        { label: "Critical", value: 40, color: "#EF4444" },
        { label: "Over-Exploited", value: 10, color: "#7C2D12" }
      ]
    },
    detailed: "Based on the latest data analysis, groundwater status varies significantly across regions. Critical areas like Rajasthan's Block-A and Karnataka's Block-D show declining water levels with negative extraction rates. Immediate intervention is needed including water conservation measures and alternative water sources."
  },
  "water levels": {
    summary: "Water levels show seasonal variation with post-monsoon levels generally higher than pre-monsoon levels across most regions.",
    chartData: {
      chartType: "line",
      dataSeries: [
        { x: "Pre-Monsoon", y: 6.2, label: "Average Level (m)" },
        { x: "Post-Monsoon", y: 7.8, label: "Average Level (m)" }
      ]
    },
    detailed: "Seasonal analysis reveals that post-monsoon water levels are typically 1.6 meters higher than pre-monsoon levels. However, areas like Karnataka Block-D show concerning drops even post-monsoon, indicating over-extraction or poor recharge conditions."
  },
  "critical areas": {
    summary: "15 blocks identified as Critical or Over-Exploited status requiring urgent groundwater management interventions.",
    chartData: {
      chartType: "bar",
      dataSeries: [
        { x: "Rajasthan", y: 8, label: "Critical Blocks" },
        { x: "Karnataka", y: 4, label: "Critical Blocks" },
        { x: "Madhya Pradesh", y: 2, label: "Critical Blocks" },
        { x: "Gujarat", y: 1, label: "Critical Blocks" }
      ]
    },
    detailed: "Critical areas are concentrated in Rajasthan (8 blocks) and Karnataka (4 blocks). These regions show extraction rates exceeding recharge rates by 50-80%. Recommended actions include bore well regulation, rainwater harvesting, and industrial water recycling programs."
  }
};

export const getMockResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('analyze') || lowerQuery.includes('groundwater')) {
    return mockChatResponses["analyze groundwater"];
  }
  if (lowerQuery.includes('water level') || lowerQuery.includes('level')) {
    return mockChatResponses["water levels"];
  }
  if (lowerQuery.includes('critical') || lowerQuery.includes('status')) {
    return mockChatResponses["critical areas"];
  }
  
  // Default response
  return {
    summary: "Based on the INGRES groundwater database, I can help analyze water levels, recharge patterns, and identify critical areas needing attention.",
    chartData: {
      chartType: "table",
      dataSeries: mockGroundwaterData.slice(0, 3)
    },
    detailed: "I have access to comprehensive groundwater data across multiple states and time periods. I can analyze trends, compare regions, identify critical areas, and provide recommendations for water management. Ask me about specific regions, water level trends, or conservation strategies."
  };
};