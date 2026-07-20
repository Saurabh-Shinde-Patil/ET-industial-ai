import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../services/assetService';
import AssetTree from '../components/assets/AssetTree';
import AssetModal from '../components/assets/AssetModal';
import {
  Cpu,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Layers,
  Database,
  ArrowRight,
  Loader2,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function AssetsPage() {
  const [treeData, setTreeData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [treeRes, assetsRes] = await Promise.all([
        assetService.getAssetTree(),
        assetService.getAssets({ search, category: categoryFilter, status: statusFilter }),
      ]);
      setTreeData(treeRes.tree);
      setAssets(assetsRes.assets);
    } catch (err) {
      console.error('Failed to load asset graph data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, categoryFilter, statusFilter]);

  const handleCreateAsset = async (assetData) => {
    await assetService.createAsset(assetData);
    setMessage(`Asset '${assetData.assetCode}' registered successfully in graph.`);
    fetchData();
    setTimeout(() => setMessage(''), 4000);
  };

  const handleSeedAssets = async () => {
    try {
      setLoading(true);
      await assetService.seedAssets();
      setMessage('10 Industrial Physical Assets seeded successfully into database!');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to seed assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAsset = (asset) => {
    setSelectedAssetId(asset._id);
    navigate(`/assets/${asset._id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30 inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Operational
          </span>
        );
      case 'Under Maintenance':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30 inline-flex items-center gap-1">
            <Wrench className="w-3 h-3" /> Maintenance
          </span>
        );
      case 'Failed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-bgTertiary text-industrial-textDim border border-industrial-border">
            {status}
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
              PLANT ASSET BRAIN
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Physical Asset Graph & Machinery Hierarchy
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Hierarchical mapping of 10 primary industrial assets, sub-components, technical specs, linked SOPs, and work order history.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSeedAssets}
            className="bg-industrial-bgTertiary hover:bg-industrial-border/60 border border-industrial-border text-industrial-textMain font-semibold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
          >
            <Database className="w-4 h-4 text-industrial-cyan" />
            <span>Seed 10 Demo Assets</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset Node</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 bg-industrial-emerald/15 border border-industrial-emerald/40 rounded-xl text-xs text-industrial-emerald flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Interactive Asset Tree Browser */}
        <div className="lg:col-span-4 bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-industrial-border pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-industrial-cyan" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-industrial-textMain">
                Plant Hierarchy Tree
              </h3>
            </div>
            <span className="text-[10px] font-mono text-industrial-cyan bg-industrial-cyan/10 px-2 py-0.5 rounded border border-industrial-cyan/30">
              Parent-Child Nodes
            </span>
          </div>

          <AssetTree
            treeData={treeData}
            onSelectAsset={handleSelectAsset}
            selectedAssetId={selectedAssetId}
          />
        </div>

        {/* Right Side: Assets Grid & Filter Controls */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-4 shadow-card">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-industrial-textDim" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search equipment code, name, area..."
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-industrial-textDim" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                <option value="">All Categories</option>
                <option value="Pumps">Pumps</option>
                <option value="Boilers">Boilers</option>
                <option value="Compressors">Compressors</option>
                <option value="Turbines">Turbines</option>
                <option value="Heat Exchangers">Heat Exchangers</option>
                <option value="Valves">Valves</option>
                <option value="Conveyors">Conveyors</option>
                <option value="Transformers">Transformers</option>
                <option value="Reactors">Reactors</option>
                <option value="Chillers">Chillers</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                <option value="">All Statuses</option>
                <option value="Operational">Operational</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Asset Cards Grid */}
          {loading ? (
            <div className="py-16 text-center text-industrial-textSub">
              <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
              <span className="text-xs">Loading machinery asset graph...</span>
            </div>
          ) : assets.length === 0 ? (
            <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
              No industrial assets found matching your criteria. Click "Seed 10 Demo Assets" to populate initial data.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  onClick={() => navigate(`/assets/${asset._id}`)}
                  className="bg-industrial-bgSecondary/80 border border-industrial-border hover:border-industrial-cyan/50 rounded-2xl p-5 shadow-card transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-industrial-cyan px-2 py-0.5 rounded bg-industrial-cyan/10 border border-industrial-cyan/30">
                        {asset.assetCode}
                      </span>
                      {getStatusBadge(asset.status)}
                    </div>

                    <h4 className="text-sm font-bold text-industrial-textMain group-hover:text-industrial-cyan transition-colors mb-1">
                      {asset.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-industrial-textSub mb-3">
                      <MapPin className="w-3.5 h-3.5 text-industrial-textDim shrink-0" />
                      <span className="truncate">{asset.location}</span>
                    </div>

                    {/* Specifications Snippet Grid */}
                    {asset.specifications && Object.keys(asset.specifications).length > 0 && (
                      <div className="bg-industrial-bgTertiary/40 border border-industrial-border/60 rounded-xl p-3 mb-4 space-y-1 font-mono text-[11px]">
                        {Object.entries(asset.specifications)
                          .slice(0, 3)
                          .map(([key, val]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-industrial-textDim">{key}:</span>
                              <span className="text-industrial-textMain font-medium">{val}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-industrial-border flex items-center justify-between text-xs text-industrial-textDim">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(asset.installedDate).toLocaleDateString()}
                    </span>
                    <span className="text-industrial-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Add Asset Modal */}
      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAsset}
        parentAssets={assets}
      />
    </div>
  );
}
