import React from 'react';
import { X, Sparkles, FileText, CheckCircle, Eye } from 'lucide-react';

export default function ExtractionModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

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
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">AI Text & OCR Extraction Output</h3>
            <p className="text-xs text-industrial-textDim">Cleaned industrial text, page count, and OCR status</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-xs">
          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">Status</div>
            <div className="text-industrial-emerald font-bold flex items-center gap-1 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5" /> Extracted
            </div>
          </div>

          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">OCR Engine</div>
            <div className="text-industrial-cyan font-bold mt-0.5">
              {result.is_ocr ? 'PyTesseract Active' : 'Native Parser'}
            </div>
          </div>

          <div className="p-3 bg-industrial-bgTertiary/50 border border-industrial-border/60 rounded-xl">
            <div className="text-[10px] text-industrial-textDim uppercase">Word Count</div>
            <div className="text-industrial-textMain font-bold mt-0.5">
              {result.wordCount || 0} Words
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-industrial-textSub mb-1.5 flex items-center gap-1">
            <Eye className="w-4 h-4 text-industrial-cyan" />
            Extracted Text Content (Cleaned & Normalized)
          </label>
          <div className="bg-slate-950 border border-industrial-border rounded-xl p-4 font-mono text-xs text-industrial-textMain max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {result.extractedSnippet || result.text || 'No text extracted.'}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold text-xs transition-all shadow-glow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
