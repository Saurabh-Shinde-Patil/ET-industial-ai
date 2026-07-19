import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="p-6 bg-industrial-bgSecondary border border-industrial-crimson/40 rounded-xl text-center max-w-lg mx-auto my-12 shadow-card">
        <ShieldAlert className="w-12 h-12 text-industrial-crimson mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-industrial-textMain mb-1">
          Access Restricted by RBAC Policy
        </h3>
        <p className="text-xs text-industrial-textSub mb-4">
          Your active role (<span className="text-industrial-cyan font-semibold">{user?.role || 'Guest'}</span>) does not have authorization to view this section. Required roles: [{allowedRoles.join(', ')}].
        </p>
        <span className="inline-block px-3 py-1 bg-industrial-crimson/10 border border-industrial-crimson/30 rounded text-xs text-industrial-crimson font-mono">
          Security Alert Logged
        </span>
      </div>
    );
  }

  return children;
};
