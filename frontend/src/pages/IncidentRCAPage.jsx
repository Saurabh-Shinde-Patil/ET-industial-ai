import React, { useState, useEffect } from 'react';
import { rcaService } from '../services/rcaService';
import { assetService } from '../services/assetService';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldCheck,
  Cpu,
  Sparkles,
  Database,
  Loader2,
  Filter,
  HelpCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
} from 'lucide-react';

export default function IncidentRCAPage() {
  const [incidents, setIncidents] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);
  const [expandedRCAId, setExpandedRCAId] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [incRes, assetsRes] = await Promise.all([
        rcaService.getIncidents({ severity: severityFilter, status: statusFilter }),
        assetService.getAssets(),
      ]);
      setIncidents(incRes.incidents || []);
      setAssets(assetsRes.assets || []);
    } catch (err) {
      console.error('Failed to load incident RCAs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [severityFilter, statusFilter]);

  const handleSeedIncidents = async () => {
    try {
      setLoading(true);
      await rcaService.seedIncidents();
      setMessage('Ground-truth Incident RCA reports seeded successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to seed incident RCAs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate5Whys = async (id, incidentNumber) => {
    setGeneratingId(id);
    try {
      await rcaService.generateAI5Whys(id);
      setMessage(`AI 5-Whys Root Cause Analysis generated for '${incidentNumber}'!`);
      setExpandedRCAId(id);
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('5-Whys generation failed:', err);
    } finally {
      setGeneratingId(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await rcaService.updateIncidentStatus(id, newStatus);
      setMessage(`Incident status updated to '${newStatus}'.`);
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const toggleExpandRCA = (id) => {
    setExpandedRCAId(expandedRCAId === id ? null : id);
  };

  // KPIs
  const totalIncidents = incidents.length;
  const criticalOutages = incidents.filter((i) => i.severity === 'CRITICAL').length;
  const openInvestigations = incidents.filter((i) => i.status === 'Under Investigation').length;
  const closedRCAs = incidents.filter((i) => i.status === 'Closed' || i.status === 'Actions Implemented').length;

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30 inline-flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> CRITICAL SEVERITY
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> HIGH SEVERITY
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-cyan/15 text-industrial-cyan border border-industrial-cyan/30 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> MEDIUM
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
              INCIDENT COMMAND & 5-WHYS ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Incident & Root Cause Analysis (RCA) Workspace
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Structured 5-Whys methodology, automated AI failure root cause synthesis, and corrective action lifecycle tracking.
          </p>
        </div>

        <button
          onClick={handleSeedIncidents}
          className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow shrink-0"
        >
          <Database className="w-4 h-4" />
          <span>Seed Ground-Truth RCA Reports</span>
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
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Total Incidents</div>
          <div className="text-2xl font-bold text-industrial-textMain mt-1 font-mono">{totalIncidents}</div>
          <div className="text-[10px] text-industrial-cyan mt-1">Logged Plant Outages</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Critical Outages</div>
          <div className="text-2xl font-bold text-industrial-crimson mt-1 font-mono">{criticalOutages}</div>
          <div className="text-[10px] text-industrial-crimson mt-1">Trips & Leaks</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Open Investigations</div>
          <div className="text-2xl font-bold text-industrial-amber mt-1 font-mono">{openInvestigations}</div>
          <div className="text-[10px] text-industrial-amber mt-1">Under Active Audit</div>
        </div>

        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] text-industrial-textDim uppercase font-mono">Closed RCA Audits</div>
          <div className="text-2xl font-bold text-industrial-emerald mt-1 font-mono">{closedRCAs}</div>
          <div className="text-[10px] text-industrial-emerald mt-1">Actions Implemented</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-4 shadow-card">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-industrial-textDim" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">Critical Outages Only</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Lifecycle Statuses</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="RCA Completed">RCA Completed</option>
            <option value="Actions Implemented">Actions Implemented</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Incident RCA List Cards */}
      {loading ? (
        <div className="py-16 text-center text-industrial-textSub">
          <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
          <span className="text-xs">Loading plant incident RCA reports...</span>
        </div>
      ) : incidents.length === 0 ? (
        <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
          No incident reports found. Click "Seed Ground-Truth RCA Reports" to populate sample plant outages.
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.map((inc) => {
            const isExpanded = expandedRCAId === inc._id;
            return (
              <div
                key={inc._id}
                className="bg-industrial-bgSecondary/80 border border-industrial-border hover:border-industrial-cyan/40 rounded-2xl p-6 shadow-card transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-industrial-cyan/15 border border-industrial-cyan/30 text-industrial-cyan">
                      {inc.incidentNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-industrial-bgTertiary border border-industrial-border text-industrial-textMain">
                      {inc.assetCode}
                    </span>
                    {getSeverityBadge(inc.severity)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-industrial-textDim">
                      Status: <strong className="text-industrial-textMain">{inc.status}</strong>
                    </span>

                    <button
                      onClick={() => toggleExpandRCA(inc._id)}
                      className="p-1.5 rounded-lg bg-industrial-bgTertiary border border-industrial-border text-industrial-textMain text-xs font-semibold flex items-center gap-1 hover:text-industrial-cyan transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide 5-Whys Trace' : 'View 5-Whys Trace'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-industrial-textMain leading-snug">
                    {inc.title}
                  </h3>
                  <p className="text-xs text-industrial-textSub font-mono bg-industrial-bgTertiary/50 p-3 rounded-xl border border-industrial-border/60">
                    {inc.summary}
                  </p>
                </div>

                {/* 5-Whys Trace Accordion Block */}
                {isExpanded && (
                  <div className="p-4 bg-slate-950 border border-industrial-border/80 rounded-xl space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-industrial-cyan font-mono flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        5-Whys Root Cause Methodological Trace:
                      </span>
                      <span className="text-[10px] font-mono text-industrial-textDim">Category: {inc.rootCauseCategory}</span>
                    </div>

                    {inc.fiveWhys && inc.fiveWhys.length > 0 ? (
                      <div className="space-y-2 font-mono text-xs">
                        {inc.fiveWhys.map((why) => (
                          <div key={why.whyNumber} className="p-2.5 bg-industrial-bgTertiary/40 border border-industrial-border/40 rounded-lg space-y-1">
                            <div className="text-industrial-cyan font-bold text-[11px]">
                              Why #{why.whyNumber}: {why.question}
                            </div>
                            <div className="text-industrial-textMain text-[11px] pl-3 border-l-2 border-industrial-cyan/50">
                              → {why.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-industrial-textDim text-xs font-mono">
                        No 5-Whys trace generated yet. Click "Generate AI 5-Whys Analysis" below.
                      </div>
                    )}

                    {/* Corrective Actions */}
                    {inc.correctiveActions && inc.correctiveActions.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <span className="text-[11px] font-bold text-industrial-emerald font-mono block">
                          Assigned Corrective Actions ({inc.correctiveActions.length}):
                        </span>
                        <div className="space-y-1">
                          {inc.correctiveActions.map((act, aIdx) => (
                            <div key={aIdx} className="flex items-center justify-between text-xs font-mono bg-industrial-bgTertiary/30 p-2 rounded border border-industrial-border/40">
                              <span className="text-industrial-textMain flex items-center gap-2">
                                <CheckSquare className="w-3.5 h-3.5 text-industrial-emerald" />
                                {act.action}
                              </span>
                              <span className="text-[10px] text-industrial-textDim">Owner: {act.owner}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-industrial-border/60 text-xs">
                  <span className="text-[10px] font-mono text-industrial-textDim">
                    Logged: {new Date(inc.incidentDate).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {(!inc.fiveWhys || inc.fiveWhys.length === 0) && (
                      <button
                        onClick={() => handleGenerate5Whys(inc._id, inc.incidentNumber)}
                        disabled={generatingId === inc._id}
                        className="px-3 py-1.5 rounded-lg bg-industrial-cyan/15 hover:bg-industrial-cyan/25 border border-industrial-cyan/40 text-industrial-cyan text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        {generatingId === inc._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>Generate AI 5-Whys</span>
                      </button>
                    )}

                    {inc.status !== 'Closed' && (
                      <button
                        onClick={() => handleStatusChange(inc._id, 'Closed')}
                        className="px-3 py-1.5 rounded-lg bg-industrial-emerald/15 hover:bg-industrial-emerald/25 border border-industrial-emerald/40 text-industrial-emerald text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Close Incident</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
