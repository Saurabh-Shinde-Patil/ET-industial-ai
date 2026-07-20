import React, { useState } from 'react';
import { X, Cpu, Plus, Trash2 } from 'lucide-react';

const CATEGORIES = [
  'Pumps',
  'Boilers',
  'Compressors',
  'Turbines',
  'Heat Exchangers',
  'Valves',
  'Conveyors',
  'Transformers',
  'Reactors',
  'Chillers',
  'General Machinery',
];

export default function AssetModal({ isOpen, onClose, onSubmit, parentAssets = [] }) {
  const [assetCode, setAssetCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Pumps');
  const [parentAssetId, setParentAssetId] = useState('');
  const [location, setLocation] = useState('Boiler House - Sector 1A');
  const [status, setStatus] = useState('Operational');
  const [specPairs, setSpecPairs] = useState([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddSpecPair = () => {
    setSpecPairs([...specPairs, { key: '', value: '' }]);
  };

  const handleRemoveSpecPair = (index) => {
    setSpecPairs(specPairs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, val) => {
    const updated = [...specPairs];
    updated[index][field] = val;
    setSpecPairs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert spec pairs to Object Map
      const specifications = {};
      specPairs.forEach((pair) => {
        if (pair.key.trim() && pair.value.trim()) {
          specifications[pair.key.trim()] = pair.value.trim();
        }
      });

      await onSubmit({
        assetCode,
        name,
        category,
        parentAssetId: parentAssetId || null,
        location,
        status,
        specifications,
      });

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create asset node');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-industrial-bgSecondary border border-industrial-border rounded-2xl max-w-lg w-full p-6 shadow-card relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">Add Physical Asset Node</h3>
            <p className="text-xs text-industrial-textDim">Register equipment in plant knowledge graph</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-lg text-xs text-industrial-crimson">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Equipment Code</label>
              <input
                type="text"
                required
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value.toUpperCase())}
                placeholder="PUMP-103"
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-textMain font-mono focus:outline-none focus:border-industrial-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Asset Description / Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="High-Pressure Feedwater Pump Line B"
              className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Parent Asset (Hierarchy)</label>
              <select
                value={parentAssetId}
                onChange={(e) => setParentAssetId(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                <option value="">None (Top Level Asset)</option>
                {parentAssets.map((pa) => (
                  <option key={pa._id} value={pa._id}>{pa.assetCode} - {pa.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Operational Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                <option value="Operational">Operational</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Failed">Failed</option>
                <option value="Decommissioned">Decommissioned</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Plant Location / Area</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Boiler House - Sector 1A"
              className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
            />
          </div>

          {/* Key-Value Specifications Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-industrial-textSub">
                Technical Specifications (Key-Value Pairs)
              </label>
              <button
                type="button"
                onClick={handleAddSpecPair}
                className="text-[11px] text-industrial-cyan hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Specification
              </button>
            </div>

            <div className="space-y-2">
              {specPairs.map((pair, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. flowRate)"
                    value={pair.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    className="flex-1 bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 450 m³/h)"
                    value={pair.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    className="flex-1 bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan font-mono"
                  />
                  {specPairs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecPair(idx)}
                      className="p-1.5 text-industrial-crimson hover:bg-industrial-crimson/10 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
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
              {loading ? 'Registering...' : 'Register Asset Node'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
