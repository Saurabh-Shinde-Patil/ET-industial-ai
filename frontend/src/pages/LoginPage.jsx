import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Cpu, KeyRound, User, AlertCircle, Sparkles, Database } from 'lucide-react';

const DEMO_ROLES = [
  { role: 'Plant Operator', username: 'operator', dept: 'Boiler & Turbine Ops' },
  { role: 'Maintenance Engineer', username: 'maint_eng', dept: 'Mechanical Maint' },
  { role: 'Reliability Engineer', username: 'reliability_eng', dept: 'Asset Health' },
  { role: 'Safety Officer', username: 'safety_officer', dept: 'EHS & Compliance' },
  { role: 'Production Engineer', username: 'prod_eng', dept: 'Process Opt' },
  { role: 'Plant Manager', username: 'plant_mgr', dept: 'Plant Exec' },
  { role: 'Knowledge Admin', username: 'doc_admin', dept: 'Doc Admin' },
  { role: 'Admin', username: 'admin', dept: 'System Admin' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('admin@plant.com');
  const [password, setPassword] = useState('Password123!');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [seedSuccess, setSeedSuccess] = useState(false);

  const { login, seedAccounts } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Invalid email/username or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectRole = (acc) => {
    setEmail(`${acc.username}@plant.com`);
    setPassword('Password123!');
    setErrorMessage('');
  };

  const handleSeedDatabase = async () => {
    try {
      setSubmitting(true);
      await seedAccounts();
      setSeedSuccess(true);
      setErrorMessage('');
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (err) {
      setErrorMessage('Failed to seed demo accounts. Verify database connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-bgPrimary text-industrial-textMain flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-industrial-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-industrial-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-10">
        
        {/* Left Side: Login Form Card */}
        <div className="lg:col-span-7 bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 sm:p-8 shadow-card backdrop-blur-xl flex flex-col justify-between">
          <div>
            {/* Header Branding */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-industrial-textMain">
                  Industrial Knowledge Intelligence
                </h1>
                <p className="text-xs text-industrial-textSub">Unified Asset & Operations Brain</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-industrial-textMain mb-1">
              Plant Personnel Authentication
            </h2>
            <p className="text-xs text-industrial-textSub mb-6">
              Enter your credentials to access zero-hallucination operational knowledge.
            </p>

            {errorMessage && (
              <div className="mb-6 p-3 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-lg flex items-start gap-2 text-xs text-industrial-crimson animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {seedSuccess && (
              <div className="mb-6 p-3 bg-industrial-emerald/15 border border-industrial-emerald/40 rounded-lg flex items-center gap-2 text-xs text-industrial-emerald">
                <Sparkles className="w-4 h-4" />
                <span>8 Demo Plant Accounts successfully seeded in database!</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-industrial-textSub mb-1">
                  Email or Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-industrial-textDim" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@plant.com"
                    className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-4 py-2.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan focus:ring-1 focus:ring-industrial-cyan transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-textSub mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-industrial-textDim" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-4 py-2.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan focus:ring-1 focus:ring-industrial-cyan transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-xs transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure Sign In</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-industrial-border flex items-center justify-between text-[11px] text-industrial-textDim">
            <span>ET AI Hackathon 2.0 (PS-8)</span>
            <button
              onClick={handleSeedDatabase}
              disabled={submitting}
              className="text-industrial-cyan hover:underline flex items-center gap-1 text-[11px]"
            >
              <Database className="w-3 h-3" /> Seed Demo DB Accounts
            </button>
          </div>
        </div>

        {/* Right Side: 8 Demo Accounts Quick Selector Grid */}
        <div className="lg:col-span-5 bg-industrial-bgSecondary/70 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-industrial-textSub">
                Quick Demo Role Selector
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-industrial-cyan/10 border border-industrial-cyan/30 text-[10px] text-industrial-cyan font-mono">
                8 RBAC Roles
              </span>
            </div>
            <p className="text-[11px] text-industrial-textDim mb-4">
              Click any plant role below to auto-fill credentials for testing:
            </p>

            <div className="grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {DEMO_ROLES.map((item) => {
                const isSelected = email.startsWith(item.username);
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleSelectRole(item)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-industrial-cyan/15 border-industrial-cyan text-industrial-textMain shadow-glow'
                        : 'bg-industrial-bgTertiary/40 border-industrial-border/60 text-industrial-textSub hover:border-industrial-cyan/40 hover:text-industrial-textMain'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium">{item.role}</div>
                      <div className="text-[10px] text-industrial-textDim">{item.dept}</div>
                    </div>
                    <span className="text-[10px] font-mono text-industrial-cyan px-1.5 py-0.5 rounded bg-industrial-bgPrimary border border-industrial-border">
                      {item.username}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-industrial-bgTertiary/50 border border-industrial-border rounded-lg text-[11px] text-industrial-textDim">
            Default Demo Password: <span className="font-mono text-industrial-cyan">Password123!</span>
          </div>
        </div>

      </div>
    </div>
  );
}
