import React from 'react';
import { Activity, ShieldCheck, Database, Cpu } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl w-full bg-industrial-bgSecondary border border-industrial-border rounded-xl p-8 shadow-card backdrop-blur-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-industrial-cyan/10 border border-industrial-cyan/30 rounded-lg text-industrial-cyan">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-industrial-textMain">
            Industrial Knowledge Intelligence
          </h1>
        </div>

        <p className="text-industrial-textSub text-sm md:text-base mb-8 max-w-xl mx-auto">
          Unified Asset & Operations Brain — Zero-Hallucination Enterprise RAG Platform for Manufacturing & Process Industries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-industrial-bgTertiary/50 border border-industrial-border rounded-lg text-left">
            <div className="flex items-center gap-2 text-industrial-cyan font-semibold text-sm mb-1">
              <Database className="w-4 h-4" /> Asset Brain
            </div>
            <p className="text-xs text-industrial-textDim">
              10 Physical Machinery Assets mapped with specs & work logs.
            </p>
          </div>

          <div className="p-4 bg-industrial-bgTertiary/50 border border-industrial-border rounded-lg text-left">
            <div className="flex items-center gap-2 text-industrial-emerald font-semibold text-sm mb-1">
              <ShieldCheck className="w-4 h-4" /> Zero Hallucinations
            </div>
            <p className="text-xs text-industrial-textDim">
              Strict document citations, page numbers, & confidence scoring.
            </p>
          </div>

          <div className="p-4 bg-industrial-bgTertiary/50 border border-industrial-border rounded-lg text-left">
            <div className="flex items-center gap-2 text-industrial-amber font-semibold text-sm mb-1">
              <Activity className="w-4 h-4" /> Microservice Architecture
            </div>
            <p className="text-xs text-industrial-textDim">
              React + Vite | Node.js Express Gateway | Python FastAPI RAG.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-industrial-border flex items-center justify-between text-xs text-industrial-textDim">
          <span>ET AI Hackathon 2.0 (Problem Statement 8)</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-industrial-emerald/10 text-industrial-emerald font-mono">
            <span className="w-2 h-2 rounded-full bg-industrial-emerald animate-ping" />
            Phase 1: Environment Ready
          </span>
        </div>
      </div>
    </div>
  );
}
