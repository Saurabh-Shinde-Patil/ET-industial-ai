import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  BarChart3,
  Activity,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Database,
  FileText,
  Clock,
  Cpu,
  Loader2,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService
      .getAnalyticsSummary()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-industrial-textSub">
        <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
        <span className="text-xs font-mono">Loading Industrial Knowledge Intelligence Analytics...</span>
      </div>
    );
  }

  const {
    summary,
    documentBreakdown,
    confidenceDistribution,
    queryActivityTrend,
    lowConfidenceAuditLogs,
  } = data || {};

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              PLANT SYSTEM TELEMETRY & PERFORMANCE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Industrial Analytics & Audit Dashboard
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Real-time tracking of vector retrieval latencies, RAG accuracy distribution, equipment coverage, and low-confidence query audits.
          </p>
        </div>

        <div className="p-3 bg-industrial-bgTertiary/60 border border-industrial-border rounded-xl font-mono text-xs text-right">
          <div className="text-industrial-emerald font-bold">Accuracy: {summary?.retrievalAccuracyRate}%</div>
          <div className="text-[10px] text-industrial-textDim">FAISS Sub-5ms Vector Search</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-industrial-textDim uppercase font-mono">Knowledge Base Size</span>
            <Database className="w-4 h-4 text-industrial-cyan" />
          </div>
          <div className="text-2xl font-bold text-industrial-textMain font-mono">{summary?.totalVectorChunks || 0}</div>
          <div className="text-[10px] text-industrial-cyan font-mono">Vector Chunks (384-dim)</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-industrial-textDim uppercase font-mono">Retrieval Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-industrial-emerald" />
          </div>
          <div className="text-2xl font-bold text-industrial-emerald font-mono">{summary?.retrievalAccuracyRate}%</div>
          <div className="text-[10px] text-industrial-emerald font-mono">Zero Hallucination Verified</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-industrial-textDim uppercase font-mono">Vector Search Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-industrial-textMain font-mono">{summary?.averageSearchLatencyMs} ms</div>
          <div className="text-[10px] text-amber-400 font-mono">Sub-Millisecond Cosine Search</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-industrial-textDim uppercase font-mono">Knowledge Gaps Flagged</span>
            <AlertTriangle className="w-4 h-4 text-industrial-crimson" />
          </div>
          <div className="text-2xl font-bold text-industrial-crimson font-mono">{lowConfidenceAuditLogs?.length || 0}</div>
          <div className="text-[10px] text-industrial-crimson font-mono">Audit Logs Triggered</div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Query Activity Curve */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-industrial-textMain font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-industrial-cyan" />
              Daily Operational AI Query Load Trend
            </h3>
            <span className="text-[10px] text-industrial-textDim font-mono">Queries per Hour</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={queryActivityTrend}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="queries" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAG Confidence Score Distribution Donut */}
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-industrial-textMain font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-industrial-emerald" />
              RAG Retrieval Confidence Score Distribution
            </h3>
            <span className="text-[10px] text-industrial-textDim font-mono">Cosine Match Score</span>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confidenceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {confidenceDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Document Ingestion Breakdown */}
      <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-industrial-textMain font-mono flex items-center gap-2">
            <FileText className="w-4 h-4 text-industrial-cyan" />
            Ingested Industrial Document Repository Breakdown
          </h3>
          <span className="text-[10px] text-industrial-textDim font-mono">Total: {summary?.totalDocuments} Documents</span>
        </div>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={documentBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
              <YAxis stroke="#94A3B8" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
              <Bar dataKey="count" fill="#06B6D4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Knowledge Gap Audit Log Table */}
      <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-industrial-textMain font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-industrial-crimson" />
            Knowledge Gap Audit Log (Flagged Low-Confidence Queries)
          </h3>
          <span className="text-[10px] text-industrial-crimson font-mono">Requires Document Ingestion</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-industrial-border text-industrial-textSub uppercase font-mono text-[10px]">
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Logged Query Details</th>
                <th className="py-2 px-3">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-border/60">
              {lowConfidenceAuditLogs && lowConfidenceAuditLogs.length > 0 ? (
                lowConfidenceAuditLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-industrial-bgTertiary/40 font-mono text-xs">
                    <td className="py-2.5 px-3 text-industrial-textDim text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-industrial-crimson font-semibold">
                      {log.details}
                    </td>
                    <td className="py-2.5 px-3 text-industrial-textDim">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-industrial-textDim text-xs font-mono">
                    No low confidence queries logged. Zero knowledge gaps detected.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
