import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Cpu,
  Search,
  Upload,
  Sun,
  Moon,
  LogOut,
  UserCheck,
  Bell,
  Menu,
} from 'lucide-react';

export default function Navbar({ onToggleSidebar, isSidebarOpen, onOpenUploadModal }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-industrial-bgSecondary/90 border-b border-industrial-border backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between transition-all">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-lg text-industrial-cyan">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-industrial-textMain tracking-tight hidden sm:inline-block">
              Industrial Knowledge Intelligence
            </span>
            <span className="font-bold text-sm text-industrial-textMain tracking-tight sm:hidden">
              IKI Brain
            </span>
            <span className="text-[10px] text-industrial-cyan font-mono block -mt-0.5">
              UNIFIED ASSET & OPERATIONS BRAIN
            </span>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-industrial-textDim" />
          <input
            type="text"
            readOnly
            placeholder="Search plant knowledge, SOPs, work logs... (Ctrl + K)"
            className="w-full bg-industrial-bgTertiary/60 border border-industrial-border rounded-lg pl-9 pr-12 py-1.5 text-xs text-industrial-textMain placeholder-industrial-textDim focus:outline-none focus:border-industrial-cyan cursor-pointer transition-all"
            onClick={() => window.dispatchEvent(new CustomEvent('open-search-modal'))}
          />
          <kbd className="absolute right-2.5 top-2 px-1.5 py-0.5 text-[10px] font-mono text-industrial-textDim bg-industrial-bgPrimary border border-industrial-border rounded">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right: Actions, Theme, User Badge */}
      <div className="flex items-center gap-2.5">
        {/* Quick Upload Button */}
        <button
          onClick={onOpenUploadModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-industrial-cyan/15 hover:bg-industrial-cyan/25 border border-industrial-cyan/40 text-industrial-cyan text-xs font-semibold rounded-lg transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Doc</span>
        </button>

        {/* System Notifications Badge */}
        <button className="p-2 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-industrial-cyan" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        <div className="h-6 w-px bg-industrial-border mx-1" />

        {/* User Info & Role Tag */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block text-right">
            <div className="text-xs font-medium text-industrial-textMain">
              {user?.username}
            </div>
            <div className="text-[10px] text-industrial-cyan font-mono">
              {user?.role}
            </div>
          </div>

          <div className="p-2 bg-industrial-bgTertiary border border-industrial-border rounded-lg text-industrial-cyan">
            <UserCheck className="w-4 h-4" />
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-lg text-industrial-crimson/80 hover:text-industrial-crimson hover:bg-industrial-crimson/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
