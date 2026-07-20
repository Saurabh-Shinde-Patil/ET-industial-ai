import React from 'react';
import { X, Cpu, Layers, CheckCircle, Database, FileText } from 'lucide-react';

export default function VectorizeModal({ isOpen, onClose, result, chunks }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-industrial-bgSecondary border border-industrial-border rounded-2xl max-w-2xl w-full p-6 shadow-card relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">Vector Embedding Pipeline Output</h3>
            <p className="text-xs text-industrial-textDim">Sliding-window chunking & SentenceTransformers 384-dim vectors</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-xs">
          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">Total Vector Chunks</div>
            <div className="text-industrial-cyan font-bold text-sm mt-0.5">
              {result?.chunkCount || chunks?.length || 0} Chunks
            </div>
          </div>

          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">Vector Model</div>
            <div className="text-industrial-emerald font-bold text-xs mt-0.5">
              all-MiniLM-L6-v2
            </div>
          </div>

          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">Dimensions</div>
            <div className="text-industrial-textMain font-bold mt-0.5">
              384 Dense Float32
            </div>
          </div>
        </div>

        {/* Chunks Preview List */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-industrial-textSub mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Database className="w-4 h-4 text-industrial-cyan" />
              Generated Text Chunks ({chunks?.length || 0})
            </span>
            <span className="text-[10px] font-mono text-industrial-cyan bg-industrial-cyan/10 px-2 py-0.5 rounded border border-industrial-cyan/30">
              500-char Window / 100 Overlap
            </span>
          </label>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {chunks && chunks.length > 0 ? (
              chunks.map((c, i) => (
                <div
                  key={c._id || i}
                  className="p-3.5 bg-industrial-bgTertiary/40 border border-industrial-border/60 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-industrial-cyan font-bold">Chunk #{c.chunkIndex ?? i + 1}</span>
                    <span className="text-industrial-textDim">{c.tokenCount || c.text?.split(' ').length || 0} Tokens</span>
                  </div>
                  <p className="text-xs text-industrial-textMain font-mono leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-industrial-border/40">
                    {c.text}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-industrial-textDim text-xs border border-dashed border-industrial-border rounded-xl">
                No chunks generated yet.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold text-xs transition-all shadow-glow"
          >
            Close Pipeline Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
