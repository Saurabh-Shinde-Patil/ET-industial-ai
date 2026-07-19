import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Cpu,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Plus,
  Zap,
  Search,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

// Synthetic Query Activity Data for AreaChart
const QUERY_ACTIVITY_DATA = [
  { month: 'Jan', queries: 120, accuracy: 92 },
  { month: 'Feb', queries: 180, accuracy: 94 },
  { month: 'Mar', queries: 250, accuracy: 93 },
  { month: 'Apr', queries: 310, accuracy: 95 },
  { month: 'May', queries: 290, accuracy: 96 },
  { month: 'Jun', queries: 410, accuracy: 94 },
  { month: 'Jul', queries: 480, accuracy: 97 },
];

// Document Breakdown Data for BarChart
const DOC_CATEGORY_DATA = [
  { category: 'SOPs', count: 20, color: '#06B6D4' },
  { category: 'Maintenance Logs', count: 15, color: '#10B981' },
  { category: 'RCA Reports', count: 10, color: '#F59E0B' },
  { category: 'Vendor Manuals', count: 5, color: '#6366F1' },
  { category: 'PM Schedules', count: 5, color: '#EC4899' },
];

// Low Confidence Query Log Data
const LOW_CONFIDENCE_LOGS = [
  {
    id: 'LOG-01',
    query: 'What is the optimal coolant temperature for Nuclear Reactor Core-9?',
    user: 'operator',
    role: 'Plant Operator',
    similarity: 35,
    timestamp: '2026-07-19 14:20',
    status: 'Suppressed / Missing Doc',
  },
  {
    id: 'LOG-02',
    query: 'Boiler-3 draft damper position during emergency hot restart',
    user: 'maint_eng',
    role: 'Maintenance Engineer',
    similarity: 58,
    timestamp: '2026-07-19 11:05',
    status: 'Review Recommended',
  },
  {
    id: 'LOG-03',
    query: 'Vibration frequency tolerance for Conveyor-04 drive motor',
    user: 'reliability_eng',
    role: 'Reliability Engineer',
    similarity: 54,
    timestamp: '2026-07-18 16:40',
    status: 'Review Recommended',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome & Command Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              PLANT COMMAND CENTER
            </span>
            <span className="text-xs text-industrial-textDim">
              Welcome back, <span className="text-industrial-textMain font-semibold">{user?.username}</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Unified Asset & Operations Intelligence
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Real-time RAG operational metrics, document vector coverage, and zero-hallucination query activity logs across 10 machinery nodes.
          </p>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={() => navigate('/chat')}
          className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Launch AI Operations Assistant</span>
        </button>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Ingested Documents */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-5 shadow-card hover:border-industrial-cyan/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-industrial-textSub">Ingested Documents</span>
            <div className="p-2 bg-industrial-cyan/10 rounded-lg text-industrial-cyan">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-industrial-textMain tracking-tight">55</div>
          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-industrial-textDim">20 SOPs, 10 RCAs, 15 Logs</span>
            <span className="text-industrial-emerald flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
        </div>

        {/* KPI 2: Covered Assets */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-5 shadow-card hover:border-industrial-cyan/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-industrial-textSub">Assets Covered</span>
            <div className="p-2 bg-industrial-emerald/10 rounded-lg text-industrial-emerald">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-industrial-textMain tracking-tight">10</div>
          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-industrial-textDim">Pumps, Boilers, Turbines</span>
            <span className="text-industrial-emerald font-mono">100% Tree Mapped</span>
          </div>
        </div>

        {/* KPI 3: Total Queries Handled */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-5 shadow-card hover:border-industrial-cyan/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-industrial-textSub">RAG Queries Handled</span>
            <div className="p-2 bg-industrial-amber/10 rounded-lg text-industrial-amber">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-industrial-textMain tracking-tight">1,420</div>
          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-industrial-textDim">Avg Latency: 1.8s</span>
            <span className="text-industrial-amber font-mono">Zero Hallucinations</span>
          </div>
        </div>

        {/* KPI 4: Retrieval Confidence */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-5 shadow-card hover:border-industrial-cyan/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-industrial-textSub">Avg Retrieval Confidence</span>
            <div className="p-2 bg-industrial-emerald/10 rounded-lg text-industrial-emerald">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-industrial-textMain tracking-tight">94.2%</div>
          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-industrial-textDim">High Confidence Match</span>
            <span className="px-2 py-0.5 rounded bg-industrial-emerald/15 text-industrial-emerald font-mono text-[10px]">
              FAISS Index
            </span>
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Query Volume & Accuracy Over Time */}
        <div className="lg:col-span-8 bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-industrial-textMain">
                RAG Query Activity & Retrieval Precision
              </h3>
              <p className="text-[11px] text-industrial-textDim">Monthly operational query volume vs average citation match accuracy</p>
            </div>
            <span className="text-xs font-mono text-industrial-cyan bg-industrial-cyan/10 px-2.5 py-1 rounded-lg border border-industrial-cyan/30">
              2026 Analytics
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={QUERY_ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="queryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(55, 65, 81, 0.4)" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F9FAFB',
                  }}
                />
                <Area type="monotone" dataKey="queries" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#queryGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Document Category Breakdown */}
        <div className="lg:col-span-4 bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-industrial-textMain mb-1">
              Document Catalog Breakdown
            </h3>
            <p className="text-[11px] text-industrial-textDim mb-4">Ingested docs by industrial type</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DOC_CATEGORY_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                  <XAxis type="number" stroke="#9CA3AF" fontSize={10} hide />
                  <YAxis dataKey="category" type="category" stroke="#9CA3AF" fontSize={11} width={100} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderColor: '#374151',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {DOC_CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-industrial-border flex items-center justify-between text-[11px] text-industrial-textDim">
            <span>Total Ingested Pages: ~1,850 Pages</span>
            <button
              onClick={() => navigate('/documents')}
              className="text-industrial-cyan hover:underline flex items-center gap-1"
            >
              <span>View Repository</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Low-Confidence Query Audit Log Table */}
      <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-industrial-amber" />
              <h3 className="text-sm font-semibold text-industrial-textMain">
                Low-Confidence Query Audit Log
              </h3>
            </div>
            <p className="text-[11px] text-industrial-textDim">Queries where document retrieval similarity was below threshold (Knowledge Gaps)</p>
          </div>
          <span className="text-[11px] text-industrial-textSub font-mono bg-industrial-bgTertiary px-2.5 py-1 rounded-lg border border-industrial-border self-start sm:self-auto">
            Knowledge Admin Review Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-industrial-border text-industrial-textSub uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Log ID</th>
                <th className="py-2.5 px-3">Query Statement</th>
                <th className="py-2.5 px-3">User / Role</th>
                <th className="py-2.5 px-3">Similarity</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">System Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-border/60">
              {LOW_CONFIDENCE_LOGS.map((item) => (
                <tr key={item.id} className="hover:bg-industrial-bgTertiary/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-industrial-cyan font-medium">{item.id}</td>
                  <td className="py-3 px-3 text-industrial-textMain max-w-md truncate">{item.query}</td>
                  <td className="py-3 px-3">
                    <div className="text-industrial-textMain">{item.user}</div>
                    <div className="text-[10px] text-industrial-textDim">{item.role}</div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      item.similarity < 40
                        ? 'bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30'
                        : 'bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30'
                    }`}>
                      {item.similarity}% Match
                    </span>
                  </td>
                  <td className="py-3 px-3 text-industrial-textDim font-mono">{item.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] text-industrial-textSub flex items-center gap-1">
                      <Clock className="w-3 h-3 text-industrial-amber" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
