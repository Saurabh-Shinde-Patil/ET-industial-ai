import React, { useState, useEffect } from 'react';
import { pmService } from '../services/pmService';
import { assetService } from '../services/assetService';
import {
  Wrench,
  AlertTriangle,
  ShieldCheck,
  Clock,
  CheckCircle,
  Cpu,
  Sparkles,
  Database,
  Loader2,
  Filter,
  CheckSquare,
  Calendar,
  Layers,
  Activity,
} from 'lucide-react';

export default function PMRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingAssetId, setAnalyzingAssetId] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pmRes, assetsRes] = await Promise.all([
        pmService.getPMRecommendations({ priority: priorityFilter, status: statusFilter }),
        assetService.getAssets(),
      ]);
      setRecommendations(pmRes.recommendations || []);
      setAssets(assetsRes.assets || []);
    } catch (err) {
      console.error('Failed to load PM recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [priorityFilter, statusFilter]);

  const handleSeedPM = async () => {
    try {
      setLoading(true);
      await pmService.seedPMRecommendations();
      setMessage('Ground-truth AI Preventive Maintenance schedules seeded successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to seed PM recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeAsset = async (assetId) => {
    setAnalyzingAssetId(assetId);
    try {
      const res = await pmService.analyzeAssetPM(assetId);
      setMessage(`AI PM Analysis complete for asset '${res.recommendation?.assetCode}'!`);
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('PM Analysis failed:', err);
    } finally {
      setAnalyzingAssetId(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await pmService.updatePMStatus(id, newStatus);
      setMessage(`PM schedule status updated to '${newStatus}'.`);
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // KPIs
  const totalSchedules = recommendations.length;
  const criticalRiskCount = recommendations.filter((r) => r.priority === 'CRITICAL').length;
  const highPriorityCount = recommendations.filter((r) => r.priority === 'HIGH').length;
  const scheduledCount = recommendations.filter((r) => r.status === 'Scheduled').length;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> CRITICAL RISK
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> HIGH PRIORITY
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-industrial-cyan/15 text-industrial-cyan border border-industrial-cyan/30 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30 inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> LOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              AI PREDICTIVE MAINTENANCE ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Preventive Maintenance & Predictive Failure Recommendations
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Calculates equipment failure risk percentages (0-100%) and generates predictive overhaul schedules based on historical maintenance logs & RAG graph.
          </p>
        </div>

        <button
          onClick={handleSeedPM}
          className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow shrink-0"
        >
          <Database className="w-4 h-4" />
          <span>Seed 5 Ground-Truth PM Schedules</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 bg-industrial-emerald/15 border border-industrial-emerald/40 rounded-xl text-xs text-industrial-emerald flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Total PM Schedules</div>
          <div className="text-2xl font-bold text-industrial-textMain mt-1 font-mono">{totalSchedules}</div>
          <div className="text-[10px] text-industrial-cyan mt-1">Active Machinery Overhauls</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Critical Risk Assets</div>
          <div className="text-2xl font-bold text-industrial-crimson mt-1 font-mono">{criticalRiskCount}</div>
          <div className="text-[10px] text-industrial-crimson mt-1">Immediate Action Required</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">High Priority Tasks</div>
          <div className="text-2xl font-bold text-industrial-amber mt-1 font-mono">{highPriorityCount}</div>
          <div className="text-[10px] text-industrial-amber mt-1">Seal & Bearing Overhauls</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Scheduled Jobs</div>
          <div className="text-2xl font-bold text-industrial-emerald mt-1 font-mono">{scheduledCount}</div>
          <div className="text-[10px] text-industrial-emerald mt-1">Assigned to Plant Engineers</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-4 shadow-card">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-industrial-textDim" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Priorities</option>
            <option value="CRITICAL">Critical Risk Only</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Quick Trigger AI Analysis for any Asset */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Cpu className="w-4 h-4 text-industrial-cyan" />
          <select
            onChange={(e) => {
              if (e.target.value) handleAnalyzeAsset(e.target.value);
            }}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">Run AI PM Risk Analysis on Asset...</option>
            {assets.map((a) => (
              <option key={a._id} value={a._id}>{a.assetCode} - {a.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-industrial-textSub">
          <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
          <span className="text-xs">Loading AI Preventive Maintenance schedules...</span>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
          No PM recommendations found. Click "Seed 5 Ground-Truth PM Schedules" to populate sample overhauls.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {recommendations.map((pm) => (
            <div
              key={pm._id}
              className="bg-industrial-bgSecondary/80 border border-industrial-border hover:border-industrial-cyan/40 rounded-2xl p-6 shadow-card transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-industrial-cyan/15 border border-industrial-cyan/30 text-industrial-cyan">
                      {pm.assetCode}
                    </span>
                    {getPriorityBadge(pm.priority)}
                  </div>

                  <span className="text-[11px] font-mono text-industrial-textDim">
                    Status: <strong className="text-industrial-textMain">{pm.status}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-industrial-textMain leading-snug">
                  {pm.title}
                </h3>

                {/* Risk Score Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-industrial-textDim">Predictive Failure Risk Score</span>
                    <span className={`font-bold ${pm.riskScore >= 80 ? 'text-industrial-crimson' : pm.riskScore >= 60 ? 'text-industrial-amber' : 'text-industrial-cyan'}`}>
                      {pm.riskScore}% Risk
                    </span>
                  </div>
                  <div className="w-full bg-industrial-bgTertiary rounded-full h-2 overflow-hidden border border-industrial-border/60">
                    <div
                      className={`h-full transition-all duration-500 ${
                        pm.riskScore >= 80
                          ? 'bg-industrial-crimson'
                          : pm.riskScore >= 60
                          ? 'bg-industrial-amber'
                          : 'bg-industrial-cyan'
                      }`}
                      style={{ width: `${pm.riskScore}%` }}
                    />
                  </div>
                </div>

                {/* Justification Box */}
                <p className="text-xs text-industrial-textSub bg-industrial-bgTertiary/60 p-3 rounded-xl border border-industrial-border/60 font-mono leading-relaxed">
                  {pm.justification}
                </p>

                {/* Action Items List */}
                {pm.actionItems && pm.actionItems.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono font-semibold text-industrial-textDim block">
                      Recommended Preventive Actions ({pm.actionItems.length}):
                    </span>
                    <ul className="space-y-1">
                      {pm.actionItems.map((item, i) => (
                        <li key={i} className="text-xs text-industrial-textMain flex items-start gap-2 font-mono">
                          <CheckSquare className="w-3.5 h-3.5 text-industrial-cyan shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-industrial-border/60 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-industrial-textDim">
                  Interval: {pm.recommendedInterval}
                </span>

                <div className="flex items-center gap-2">
                  {pm.status !== 'Scheduled' && (
                    <button
                      onClick={() => handleStatusChange(pm._id, 'Scheduled')}
                      className="px-3 py-1.5 rounded-lg bg-industrial-cyan/15 hover:bg-industrial-cyan/25 border border-industrial-cyan/40 text-industrial-cyan text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule Job</span>
                    </button>
                  )}

                  {pm.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusChange(pm._id, 'Completed')}
                      className="px-3 py-1.5 rounded-lg bg-industrial-emerald/15 hover:bg-industrial-emerald/25 border border-industrial-emerald/40 text-industrial-emerald text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
