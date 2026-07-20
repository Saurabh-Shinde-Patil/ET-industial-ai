import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService } from '../services/assetService';
import {
  Cpu,
  ArrowLeft,
  CheckCircle,
  Wrench,
  AlertTriangle,
  MapPin,
  Calendar,
  FileText,
  Clock,
  MessageSquare,
  ShieldCheck,
  Loader2,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function AssetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    const fetchAsset = async () => {
      setLoading(true);
      try {
        const data = await assetService.getAssetById(id);
        setAsset(data.asset);
      } catch (err) {
        console.error('Failed to load asset profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-industrial-textSub">
        <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
        <span className="text-xs">Loading machinery profile & technical specs...</span>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
        Asset node not found. <button onClick={() => navigate('/assets')} className="text-industrial-cyan underline">Return to Assets</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/assets')}
        className="flex items-center gap-1.5 text-xs text-industrial-textSub hover:text-industrial-textMain transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Plant Assets</span>
      </button>

      {/* Asset Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-industrial-cyan px-2.5 py-0.5 rounded bg-industrial-cyan/15 border border-industrial-cyan/40">
              {asset.assetCode}
            </span>
            <span className="text-xs text-industrial-textDim font-mono">
              Category: {asset.category}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            {asset.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-industrial-textSub">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-industrial-cyan" />
              {asset.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-industrial-textDim" />
              Installed: {new Date(asset.installedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/chat')}
            className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Query AI Brain</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-industrial-border pb-3">
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'specs'
              ? 'bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan shadow-glow'
              : 'text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary/50'
          }`}
        >
          Technical Specifications
        </button>

        <button
          onClick={() => setActiveTab('subcomponents')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'subcomponents'
              ? 'bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan shadow-glow'
              : 'text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary/50'
          }`}
        >
          Sub-Components ({asset.children?.length || 0})
        </button>
      </div>

      {/* TAB 1: TECHNICAL SPECIFICATIONS GRID */}
      {activeTab === 'specs' && (
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-industrial-textMain flex items-center gap-2">
            <Cpu className="w-4 h-4 text-industrial-cyan" />
            Engineering Parameters & Vendor Ratings
          </h3>

          {asset.specifications && Object.keys(asset.specifications).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(asset.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3.5 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl"
                >
                  <div className="text-[11px] font-mono text-industrial-textDim uppercase">{key}</div>
                  <div className="text-sm font-bold text-industrial-textMain font-mono mt-0.5">{val}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-industrial-textDim text-xs border border-dashed border-industrial-border rounded-xl">
              No parameters configured for this asset node.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUB-COMPONENTS */}
      {activeTab === 'subcomponents' && (
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl">
          <h3 className="text-sm font-bold text-industrial-textMain flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-industrial-cyan" />
            Linked Child Equipment Nodes
          </h3>

          {asset.children && asset.children.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {asset.children.map((child) => (
                <div
                  key={child._id}
                  onClick={() => navigate(`/assets/${child._id}`)}
                  className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border rounded-xl hover:border-industrial-cyan/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-industrial-cyan mr-2">
                      {child.assetCode}
                    </span>
                    <span className="text-xs text-industrial-textMain">{child.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30">
                    {child.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-industrial-textDim text-xs border border-dashed border-industrial-border rounded-xl">
              This machinery node has no child sub-components linked.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
