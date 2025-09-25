# INGRES AI Assistant - API Contracts & Integration Plan

## Current State: Frontend with Mock Data
- ✅ Dark water-themed UI with glassmorphism effects  
- ✅ Chat interface with TLDR + expandable detailed responses
- ✅ Interactive charts (pie, bar, line, table) with mock data
- ✅ Map visualization with region status markers
- ✅ Dashboard with status distribution and quick stats
- ✅ CSV data stored in `/public/data/INGRES_data.csv`
- ✅ Mock responses handled by `getMockResponse()` in `mock.js`

## API Contracts Needed

### 1. OpenAI Integration (via Emergent LLM Key)
**Endpoint**: Internal chat processing
**Mock Location**: `getMockResponse()` in `/app/frontend/src/mock.js`
**Integration**: Replace mock with actual OpenAI API calls

**Request Format**:
```javascript
{
  query: string,
  contextData: Array<Object>, // Relevant CSV rows
  language: 'en' | 'hi'
}
```

**Response Format**:
```javascript
{
  summary: string, // 2-3 sentence TLDR
  detailed: string, // Longer technical explanation
  chartData: {
    chartType: 'pie' | 'bar' | 'line' | 'table',
    dataSeries: Array<Object>
  } | null
}
```

### 2. CSV Data Processing
**Current**: Static CSV file at `/public/data/INGRES_data.csv`
**Mock Location**: `mockGroundwaterData` in `mock.js`
**Integration**: Client-side CSV parsing with PapaParse + IndexedDB storage

**Data Schema**:
```javascript
{
  state: string,
  district: string, 
  block: string,
  year: number,
  preMonsoonLevel_m: number,
  postMonsoonLevel_m: number,
  recharge_MCM: number,
  extraction_MCM: number,
  status: 'Safe' | 'Semi-Critical' | 'Critical' | 'Over-Exploited',
  aquiferType: 'Sedimentary' | 'Alluvial' | 'Basalt' | 'Granite' | 'Coastal',
  qualityIndex: number,
  notes_en: string,
  notes_hi: string
}
```

## Frontend Integration Points

### Files to Modify:
1. **`/app/frontend/src/components/ChatInterface.jsx`**
   - Replace `getMockResponse(inputValue)` with actual AI API call
   - Add proper error handling and loading states

2. **Create `/app/frontend/src/lib/csvClient.ts`**
   - PapaParse integration for CSV processing
   - IndexedDB operations for data persistence
   - Data validation and cleaning functions

3. **Create `/app/frontend/src/lib/aiAdapter.ts`**
   - OpenAI integration via Emergent LLM key
   - Prompt engineering for groundwater analysis
   - Response formatting and error handling

4. **Update `/app/frontend/src/components/DataVisualization.jsx`**
   - Connect to actual chart data from AI responses
   - Remove mock chart generation

## Implementation Steps

### Phase 1: CSV Data Integration
1. Install PapaParse: `yarn add papaparse`
2. Create CSV client with IndexedDB persistence
3. Replace mock data with actual CSV parsing
4. Test data loading and chart generation

### Phase 2: AI Integration
1. Get Emergent LLM key from integration manager
2. Create OpenAI adapter using Emergent integrations
3. Replace mock responses with actual AI calls
4. Test chat functionality with real AI

### Phase 3: Enhanced Features
1. Add language toggle for Hindi support
2. Implement admin CSV upload interface
3. Add advanced filtering and search
4. Optimize for Vercel deployment

## Environment Variables Needed
- `REACT_APP_EMERGENT_LLM_KEY`: For OpenAI integration via Emergent
- `REACT_APP_OPENAI_MODEL`: Model to use (default: gpt-4-turbo)

## Mock Data Removal Checklist
- [ ] Remove `mock.js` file
- [ ] Remove mock badges from UI components
- [ ] Replace `getMockResponse()` calls
- [ ] Update chart data sources
- [ ] Test all functionality with real data

## Notes
- Frontend-only implementation for Vercel deployment
- No backend server required
- CSV data persists in browser IndexedDB
- AI calls made directly from client with proper error handling