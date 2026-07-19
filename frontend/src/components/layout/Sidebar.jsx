import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Cpu,
  FileText,
  MessageSquare,
  Search,
  AlertTriangle,
  Shield,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar({ isOpen, onToggle }) {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Asset Brain', path: '/assets', icon: Cpu },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'AI Assistant', path: '/chat', icon: MessageSquare },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Incidents & RCA', path: '/incidents', icon: AlertTriangle },
  ];

  // Admin routes restricted by RBAC
  if (user?.role === 'Admin' || user?.role === 'Knowledge Admin') {
    navItems.push({ label: 'Admin Panel', path: '/admin', icon: Shield });
  }

  return (
    <aside
      className={`bg-industrial-bgSecondary/95 border-r border-industrial-border h-[calc(100vh-4rem)] sticky top-16 flex flex-col justify-between transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Nav Items */}
      <div className="p-3">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan shadow-glow'
                      : 'text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary/60'
                  }`
                }
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status & Collapse Button */}
      <div className="p-3 border-t border-industrial-border">
        {isOpen ? (
          <div className="p-3 bg-industrial-bgTertiary/40 border border-industrial-border/60 rounded-xl mb-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-industrial-textSub mb-2">
              <Activity className="w-3.5 h-3.5 text-industrial-emerald" />
              <span>Microservice Status</span>
            </div>
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between">
                <span className="text-industrial-textDim">API Gateway</span>
                <span className="text-industrial-emerald flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-industrial-emerald animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-industrial-textDim">Vector Engine</span>
                <span className="text-industrial-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-industrial-cyan animate-pulse" />
                  FAISS Ready
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-industrial-bgTertiary hover:bg-industrial-border/60 text-industrial-textSub hover:text-industrial-textMain transition-colors text-xs"
        >
          {isOpen ? (
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
