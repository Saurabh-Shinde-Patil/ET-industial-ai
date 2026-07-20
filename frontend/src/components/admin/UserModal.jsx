import React, { useState } from 'react';
import { X, UserPlus, Shield, Building, KeyRound, Mail, User } from 'lucide-react';

const ROLES = [
  'Plant Operator',
  'Maintenance Engineer',
  'Reliability Engineer',
  'Safety Officer',
  'Production Engineer',
  'Plant Manager',
  'Knowledge Admin',
  'Admin',
];

export default function UserModal({ isOpen, onClose, onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password123!');
  const [role, setRole] = useState('Plant Operator');
  const [department, setDepartment] = useState('Plant Operations');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit({ username, email, password, role, department });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-industrial-bgSecondary border border-industrial-border rounded-2xl max-w-md w-full p-6 shadow-card relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">Create Plant Account</h3>
            <p className="text-xs text-industrial-textDim">Add new personnel & assign RBAC permissions</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-lg text-xs text-industrial-crimson">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-industrial-textDim" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tech_john"
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-industrial-textDim" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@plant.com"
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Initial Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-industrial-textDim" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Plant Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-industrial-bgTertiary border border-industrial-border text-xs text-industrial-textSub hover:text-industrial-textMain"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold text-xs transition-all shadow-glow disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Personnel Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
