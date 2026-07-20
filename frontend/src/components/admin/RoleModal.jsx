import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

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

export default function RoleModal({ isOpen, user, onClose, onSubmit }) {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'Plant Operator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(user._id, selectedRole);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-industrial-bgSecondary border border-industrial-border rounded-2xl max-w-sm w-full p-6 shadow-card relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">Modify User Role</h3>
            <p className="text-xs text-industrial-textDim">User: <span className="text-industrial-cyan font-mono">{user.username}</span></p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-lg text-xs text-industrial-crimson">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-2">
              Select New RBAC Role
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {ROLES.map((r) => (
                <label
                  key={r}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedRole === r
                      ? 'bg-industrial-cyan/15 border-industrial-cyan text-industrial-textMain font-semibold'
                      : 'bg-industrial-bgTertiary/40 border-industrial-border/60 text-industrial-textSub hover:border-industrial-cyan/40'
                  }`}
                >
                  <span>{r}</span>
                  <input
                    type="radio"
                    name="roleSelection"
                    value={r}
                    checked={selectedRole === r}
                    onChange={() => setSelectedRole(r)}
                    className="accent-industrial-cyan"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
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
              {loading ? 'Updating...' : 'Save Role Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
