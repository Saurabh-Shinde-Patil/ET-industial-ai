import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Cpu,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export default function AssetTree({ treeData, onSelectAsset, selectedAssetId }) {
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleExpand = (nodeId, e) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30">
            <CheckCircle className="w-2.5 h-2.5" /> Operational
          </span>
        );
      case 'Under Maintenance':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30">
            <Wrench className="w-2.5 h-2.5" /> Maintenance
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30">
            <AlertTriangle className="w-2.5 h-2.5" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-bgTertiary text-industrial-textDim border border-industrial-border">
            {status}
          </span>
        );
    }
  };

  const renderTreeNode = (node) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = !!expandedNodes[node._id];
    const isSelected = selectedAssetId === node._id;

    return (
      <div key={node._id} className="select-none">
        <div
          onClick={() => onSelectAsset(node)}
          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
            isSelected
              ? 'bg-industrial-cyan/15 border-industrial-cyan text-industrial-textMain shadow-glow'
              : 'bg-industrial-bgTertiary/40 border-industrial-border/60 text-industrial-textSub hover:border-industrial-cyan/40 hover:text-industrial-textMain'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node._id, e)}
                className="p-1 text-industrial-textDim hover:text-industrial-cyan transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <span className="w-4 h-4 inline-block" />
            )}

            <Cpu className="w-4 h-4 text-industrial-cyan shrink-0" />
            <div className="truncate">
              <span className="font-mono text-industrial-cyan font-semibold mr-1.5">
                {node.assetCode}
              </span>
              <span className="truncate">{node.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {getStatusBadge(node.status)}
          </div>
        </div>

        {/* Child Sub-components Tree */}
        {hasChildren && isExpanded && (
          <div className="pl-6 pt-1.5 space-y-1.5 border-l border-industrial-border/60 ml-4">
            {node.children.map((child) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  if (!treeData || treeData.length === 0) {
    return (
      <div className="py-8 text-center text-industrial-textDim text-xs border border-dashed border-industrial-border rounded-xl">
        <Layers className="w-6 h-6 mx-auto mb-2 opacity-50" />
        No plant hierarchy tree nodes found.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {treeData.map((rootNode) => renderTreeNode(rootNode))}
    </div>
  );
}
