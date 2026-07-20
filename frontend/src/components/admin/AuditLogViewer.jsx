import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { Shield, Filter, Clock, User, Terminal, Loader2 } from 'lucide-react';

export default function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getAuditLogs({ action: actionFilter || undefined });
      setLogs(data.logs);
    } catch (err) {
      setError('Failed to load security audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  return (
    <div className="space-y-4">
      {/* Header Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-industrial-bgTertiary/40 p-4 rounded-xl border border-industrial-border">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-industrial-cyan" />
          <div>
            <h4 className="text-xs font-semibold text-industrial-textMain">Security & Compliance Audit Logs</h4>
            <p className="text-[11px] text-industrial-textDim">Immutable record of authentication, role updates, and system events</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-industrial-textDim" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-industrial-bgSecondary border border-industrial-border rounded-lg px-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Action Types</option>
            <option value="AUTH_LOGIN">AUTH_LOGIN</option>
            <option value="USER_CREATE">USER_CREATE</option>
            <option value="ROLE_CHANGE">ROLE_CHANGE</option>
            <option value="USER_DEACTIVATE">USER_DEACTIVATE</option>
            <option value="DOC_UPLOAD">DOC_UPLOAD</option>
            <option value="DOC_DELETE">DOC_DELETE</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-industrial-textSub">
          <Loader2 className="w-6 h-6 animate-spin text-industrial-cyan mx-auto mb-2" />
          <span className="text-xs">Fetching audit trail logs...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-xl text-xs text-industrial-crimson">
          {error}
        </div>
      ) : logs.length === 0 ? (
        <div className="py-12 text-center text-industrial-textDim text-xs border border-dashed border-industrial-border rounded-xl">
          No audit logs recorded for the selected filter.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-industrial-border text-industrial-textSub uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Action Event</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-border/60">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-industrial-bgTertiary/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-industrial-textDim text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-industrial-cyan" />
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                      log.action.includes('AUTH')
                        ? 'bg-industrial-cyan/15 text-industrial-cyan border border-industrial-cyan/30'
                        : log.action.includes('ROLE') || log.action.includes('CREATE')
                        ? 'bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30'
                        : 'bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-industrial-textMain font-medium">{log.userId?.username || 'System'}</div>
                    <div className="text-[10px] text-industrial-textDim font-mono">{log.userId?.role || '-'}</div>
                  </td>
                  <td className="py-3 px-3 text-industrial-textMain max-w-md truncate">{log.details}</td>
                  <td className="py-3 px-3 font-mono text-industrial-textDim text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
