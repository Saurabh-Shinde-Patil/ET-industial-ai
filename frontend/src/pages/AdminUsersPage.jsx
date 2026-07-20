import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import UserModal from '../components/admin/UserModal';
import RoleModal from '../components/admin/RoleModal';
import AuditLogViewer from '../components/admin/AuditLogViewer';
import {
  Users,
  Shield,
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit2,
  RefreshCw,
  Loader2,
  Lock,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUserForRole, setSelectedUserForRole] = useState(null);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers({ search, role: roleFilter });
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to load plant personnel users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [search, roleFilter, activeTab]);

  const handleCreateUser = async (userData) => {
    await userService.createUser(userData);
    setMessage(`User '${userData.username}' created successfully.`);
    fetchUsers();
    setTimeout(() => setMessage(''), 4000);
  };

  const handleUpdateRole = async (userId, newRole) => {
    await userService.updateUserRole(userId, newRole);
    setMessage(`Role updated successfully to '${newRole}'.`);
    fetchUsers();
    setTimeout(() => setMessage(''), 4000);
  };

  const handleToggleStatus = async (userId, currentUsername) => {
    try {
      const res = await userService.toggleUserStatus(userId);
      setMessage(`User '${currentUsername}' ${res.isActive ? 'activated' : 'deactivated'}.`);
      fetchUsers();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const openRoleModal = (u) => {
    setSelectedUserForRole(u);
    setIsRoleModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              ADMINISTRATION & CONTROL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Personnel Directory & Security Control
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Manage plant personnel accounts, RBAC permission roles, activation status, and immutable security audit trails.
          </p>
        </div>

        <button
          onClick={() => setIsUserModalOpen(true)}
          className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create Personnel Account</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 bg-industrial-emerald/15 border border-industrial-emerald/40 rounded-xl text-xs text-industrial-emerald flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-industrial-border pb-3">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'users'
              ? 'bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan shadow-glow'
              : 'text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Personnel Directory ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'audit'
              ? 'bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan shadow-glow'
              : 'text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security Audit Trail</span>
        </button>
      </div>

      {/* TAB 1: USER PERSONNEL DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-4 shadow-card">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-industrial-textDim" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search username, email, department..."
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-industrial-textDim" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                <option value="">All Roles (8)</option>
                <option value="Plant Operator">Plant Operator</option>
                <option value="Maintenance Engineer">Maintenance Engineer</option>
                <option value="Reliability Engineer">Reliability Engineer</option>
                <option value="Safety Officer">Safety Officer</option>
                <option value="Production Engineer">Production Engineer</option>
                <option value="Plant Manager">Plant Manager</option>
                <option value="Knowledge Admin">Knowledge Admin</option>
                <option value="Admin">Admin</option>
              </select>

              <button
                onClick={fetchUsers}
                className="p-2 bg-industrial-bgTertiary hover:bg-industrial-border border border-industrial-border rounded-lg text-industrial-textSub hover:text-industrial-textMain transition-colors"
                title="Refresh Table"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="py-16 text-center text-industrial-textSub">
              <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
              <span className="text-xs">Loading plant personnel records...</span>
            </div>
          ) : (
            <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-industrial-border text-industrial-textSub uppercase font-mono text-[10px]">
                    <th className="py-2.5 px-3">Personnel</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">RBAC Role</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Registered</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-border/60">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-industrial-bgTertiary/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-industrial-textMain">{u.username}</div>
                        <div className="text-[10px] text-industrial-textDim font-mono">{u.email}</div>
                      </td>
                      <td className="py-3 px-3 text-industrial-textSub">{u.department || 'Operations'}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-industrial-cyan/10 border border-industrial-cyan/30 text-industrial-cyan">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-industrial-emerald">
                            <CheckCircle className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-industrial-crimson">
                            <XCircle className="w-3.5 h-3.5" /> Deactivated
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-industrial-textDim text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openRoleModal(u)}
                            className="p-1.5 rounded bg-industrial-bgTertiary hover:bg-industrial-cyan/20 text-industrial-cyan transition-colors"
                            title="Edit Role"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(u._id, u.username)}
                            className={`p-1.5 rounded border transition-colors ${
                              u.isActive
                                ? 'bg-industrial-crimson/10 border-industrial-crimson/30 text-industrial-crimson hover:bg-industrial-crimson/20'
                                : 'bg-industrial-emerald/10 border-industrial-emerald/30 text-industrial-emerald hover:bg-industrial-emerald/20'
                            }`}
                            title={u.isActive ? 'Deactivate User' : 'Activate User'}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AUDIT TRAIL LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl">
          <AuditLogViewer />
        </div>
      )}

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleCreateUser}
      />

      <RoleModal
        isOpen={isRoleModalOpen}
        user={selectedUserForRole}
        onClose={() => setIsRoleModalOpen(false)}
        onSubmit={handleUpdateRole}
      />
    </div>
  );
}
