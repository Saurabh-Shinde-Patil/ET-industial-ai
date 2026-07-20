import React, { useState, useEffect } from 'react';
import { searchService } from '../services/searchService';
import { assetService } from '../services/assetService';
import {
  Search,
  Zap,
  Filter,
  Cpu,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2,
  Layers,
  CheckCircle,
  Sliders,
  Target,
} from 'lucide-react';

const PRESET_QUERIES = [
  'Feedwater pump cold startup procedure',
  'Boiler hydrostatic pressure test limits',
  'Compressor lube oil starvation root cause',
  'Steam turbine 8000 hour maintenance checklist',
  'Hastelloy reactor operating MAWP pressure',
];

export default function KnowledgeSearchPage() {
  const [query, setQuery] = useState('');
  const [topK, setTopK] = useState(10);
  const [assetId, setAssetId] = useState('');
  const [searchMode, setSearchMode] = useState('hybrid'); // 'hybrid' | 'vector'
  const [assets, setAssets] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    assetService.getAssets().then((res) => setAssets(res.assets)).catch(console.error);
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      let res;
      if (searchMode === 'hybrid') {
        res = await searchService.searchHybridDatabase({
          query,
          topK,
          assetId: assetId || undefined,
        });
      } else {
        res = await searchService.searchVectorDatabase({
          query,
          topK,
          assetId: assetId || undefined,
        });
      }
      setMatches(res.matches || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const executePresetQuery = (presetText) => {
    setQuery(presetText);
    setLoading(true);
    setSearched(true);
    const searchFn = searchMode === 'hybrid' ? searchService.searchHybridDatabase : searchService.searchVectorDatabase;
    searchFn({ query: presetText, topK, assetId: assetId || undefined })
      .then((res) => setMatches(res.matches || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              HYBRID RRF SEARCH ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Unified Knowledge & Reciprocal Rank Fusion Search
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Fuses BM25 sparse keyword retrieval + FAISS 384-dim dense vector similarity to solve exact equipment code & semantic matches.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1.5 bg-industrial-bgTertiary border border-industrial-border rounded-xl font-mono text-xs">
          <button
            onClick={() => setSearchMode('hybrid')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              searchMode === 'hybrid'
                ? 'bg-industrial-cyan/20 text-industrial-cyan border border-industrial-cyan/40'
                : 'text-industrial-textSub hover:text-industrial-textMain'
            }`}
          >
            Hybrid RRF
          </button>

          <button
            onClick={() => setSearchMode('vector')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              searchMode === 'vector'
                ? 'bg-industrial-cyan/20 text-industrial-cyan border border-industrial-cyan/40'
                : 'text-industrial-textSub hover:text-industrial-textMain'
            }`}
          >
            FAISS Vector Only
          </button>
        </div>
      </div>

      {/* Search Input Form */}
      <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-industrial-cyan" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment tag (e.g. PUMP-101), procedure, or symptom..."
              className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-xl pl-11 pr-4 py-2.5 text-xs text-industrial-textMain placeholder-industrial-textDim focus:outline-none focus:border-industrial-cyan font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="bg-industrial-bgTertiary border border-industrial-border rounded-xl px-3 py-2.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
            >
              <option value="">All Machinery Assets</option>
              {assets.map((a) => (
                <option key={a._id} value={a._id}>{a.assetCode} - {a.name}</option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow shrink-0 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              <span>{searchMode === 'hybrid' ? 'Hybrid Search' : 'Vector Search'}</span>
            </button>
          </div>
        </form>

        {/* Preset Queries */}
        <div>
          <span className="text-[11px] text-industrial-textDim font-medium block mb-2">
            Try Preset Industrial Searches:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((preset, i) => (
              <button
                key={i}
                onClick={() => executePresetQuery(preset)}
                className="px-3 py-1.5 rounded-lg bg-industrial-bgTertiary/60 hover:bg-industrial-cyan/15 hover:border-industrial-cyan/40 border border-industrial-border/60 text-industrial-textSub hover:text-industrial-cyan text-xs transition-all text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="py-16 text-center text-industrial-textSub">
          <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
          <span className="text-xs font-mono">Fusing BM25 keyword ranks & FAISS 384-dim vector space...</span>
        </div>
      ) : searched && matches.length === 0 ? (
        <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
          No matches found for query. Make sure documents are vectorized in the Document Repository.
        </div>
      ) : matches.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-industrial-textDim">
            <span>Found <span className="text-industrial-cyan font-bold font-mono">{matches.length}</span> hybrid RRF ranked search results:</span>
            <span className="font-mono">RRF Formula: 1/(60 + Rank_BM25) + 1/(60 + Rank_FAISS)</span>
          </div>

          <div className="space-y-3">
            {matches.map((match, idx) => (
              <div
                key={idx}
                className="bg-industrial-bgSecondary/80 border border-industrial-border hover:border-industrial-cyan/40 rounded-2xl p-5 shadow-card transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-industrial-cyan px-2.5 py-0.5 rounded bg-industrial-cyan/15 border border-industrial-cyan/30">
                      RRF Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-industrial-textMain">
                      {match.metadata?.title || 'Industrial Document'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {match.bm25_rank && match.bm25_rank <= 50 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30">
                        BM25 Keyword Rank #{match.bm25_rank}
                      </span>
                    )}
                    {match.faiss_rank && match.faiss_rank <= 50 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-industrial-cyan/15 text-industrial-cyan border border-industrial-cyan/30">
                        FAISS Vector Rank #{match.faiss_rank}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30">
                      {match.score}% RRF Score
                    </span>
                  </div>
                </div>

                {/* Chunk Text */}
                <p className="text-xs text-industrial-textMain font-mono leading-relaxed bg-slate-950 p-4 rounded-xl border border-industrial-border/40">
                  {match.text}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-industrial-textDim">
                  <span>Doc Type: {match.metadata?.documentType || 'SOP'}</span>
                  <span>Version: {match.metadata?.version || 'v1.0'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
