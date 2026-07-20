import React, { useState, useEffect } from 'react';
import { documentService } from '../services/documentService';
import { assetService } from '../services/assetService';
import UploadModal from '../components/documents/UploadModal';
import ExtractionModal from '../components/documents/ExtractionModal';
import {
  FileText,
  UploadCloud,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Database,
  Cpu,
  Trash2,
  Sparkles,
  Loader2,
} from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extractingId, setExtractingId] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [assetFilter, setAssetFilter] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isExtractionModalOpen, setIsExtractionModalOpen] = useState(false);
  const [extractionResult, setExtractionResult] = useState(null);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docsRes, assetsRes] = await Promise.all([
        documentService.getDocuments({ search, documentType: typeFilter, assetId: assetFilter }),
        assetService.getAssets(),
      ]);
      setDocuments(docsRes.documents);
      setAssets(assetsRes.assets);
    } catch (err) {
      console.error('Failed to load document catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, typeFilter, assetFilter]);

  const handleSeedDocuments = async () => {
    try {
      setLoading(true);
      await documentService.seedDocuments();
      setMessage('Ground-truth industrial documents seeded successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to seed documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractText = async (docId) => {
    setExtractingId(docId);
    try {
      const res = await documentService.extractDocumentText(docId);
      setExtractionResult(res);
      setIsExtractionModalOpen(true);
      fetchData();
    } catch (err) {
      console.error('Extraction failed:', err);
    } finally {
      setExtractingId(null);
    }
  };

  const handleDeleteDoc = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove document '${title}'?`)) {
      try {
        await documentService.deleteDocument(id);
        setMessage(`Document '${title}' removed.`);
        fetchData();
        setTimeout(() => setMessage(''), 4000);
      } catch (err) {
        console.error('Failed to delete document:', err);
      }
    }
  };

  const getExtractionStatusBadge = (status) => {
    switch (status) {
      case 'Extracted':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30 inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Extracted
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending OCR
          </span>
        );
      case 'Failed':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-6 shadow-card backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-industrial-cyan/15 border border-industrial-cyan/40 text-industrial-cyan font-mono text-[11px]">
              KNOWLEDGE REPOSITORY & OCR ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-textMain">
            Document Catalog & PyTesseract OCR Engine
          </h1>
          <p className="text-xs text-industrial-textSub mt-1 max-w-2xl">
            Multi-format industrial text extraction, PyTesseract OCR for scanned schematics, noise cleaning, and asset linking.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSeedDocuments}
            className="bg-industrial-bgTertiary hover:bg-industrial-border/60 border border-industrial-border text-industrial-textMain font-semibold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
          >
            <Database className="w-4 h-4 text-industrial-cyan" />
            <span>Seed 5 Ground-Truth Docs</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Industrial Doc</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 bg-industrial-emerald/15 border border-industrial-emerald/40 rounded-xl text-xs text-industrial-emerald flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-bgSecondary/80 border border-industrial-border rounded-xl p-4 shadow-card">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-industrial-textDim" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search document title, filename..."
            className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-industrial-textDim" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Document Types</option>
            <option value="SOP">SOP</option>
            <option value="Maintenance Log">Maintenance Log</option>
            <option value="Root Cause Analysis">Root Cause Analysis</option>
            <option value="Preventive Maintenance">Preventive Maintenance</option>
            <option value="Engineering Manual">Engineering Manual</option>
          </select>

          <select
            value={assetFilter}
            onChange={(e) => setAssetFilter(e.target.value)}
            className="bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">All Linked Assets</option>
            {assets.map((a) => (
              <option key={a._id} value={a._id}>{a.assetCode} - {a.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Document Catalog Table */}
      {loading ? (
        <div className="py-16 text-center text-industrial-textSub">
          <Loader2 className="w-8 h-8 animate-spin text-industrial-cyan mx-auto mb-2" />
          <span className="text-xs">Loading document catalog...</span>
        </div>
      ) : documents.length === 0 ? (
        <div className="py-16 text-center text-industrial-textDim border border-dashed border-industrial-border rounded-2xl">
          No industrial documents found matching criteria. Click "Seed 5 Ground-Truth Docs" to populate sample SOPs.
        </div>
      ) : (
        <div className="bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-5 shadow-card backdrop-blur-xl overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-industrial-border text-industrial-textSub uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Document Title</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Linked Machinery Assets</th>
                <th className="py-2.5 px-3">Vector & OCR Status</th>
                <th className="py-2.5 px-3">Size & Ver</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-border/60">
              {documents.map((doc) => (
                <tr key={doc._id} className="hover:bg-industrial-bgTertiary/40 transition-colors">
                  <td className="py-3.5 px-3 max-w-md">
                    <div className="font-semibold text-industrial-textMain truncate">{doc.title}</div>
                    <div className="text-[10px] text-industrial-textDim font-mono truncate">{doc.fileName}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded font-mono text-[10px] bg-industrial-cyan/10 border border-industrial-cyan/30 text-industrial-cyan">
                      {doc.documentType}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {doc.linkedAssetIds && doc.linkedAssetIds.length > 0 ? (
                        doc.linkedAssetIds.map((a) => (
                          <span key={a._id} className="px-2 py-0.5 rounded text-[10px] font-mono bg-industrial-bgTertiary border border-industrial-border text-industrial-textMain flex items-center gap-1">
                            <Cpu className="w-2.5 h-2.5 text-industrial-cyan" />
                            {a.assetCode}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-industrial-textDim">Unlinked</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    {getExtractionStatusBadge(doc.extractionStatus)}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-industrial-textDim text-[11px]">
                    <div>{(doc.fileSize / (1024 * 1024)).toFixed(2)} MB</div>
                    <div className="text-industrial-cyan text-[10px]">{doc.version}</div>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleExtractText(doc._id)}
                        disabled={extractingId === doc._id}
                        className="px-2.5 py-1.5 rounded-lg bg-industrial-cyan/15 hover:bg-industrial-cyan/25 border border-industrial-cyan/40 text-industrial-cyan text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
                        title="Extract Text & OCR"
                      >
                        {extractingId === doc._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        <span>OCR</span>
                      </button>

                      <button
                        onClick={() => handleDeleteDoc(doc._id, doc.title)}
                        className="p-1.5 rounded border bg-industrial-crimson/10 border-industrial-crimson/30 text-industrial-crimson hover:bg-industrial-crimson/20 transition-colors"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={fetchData}
      />

      <ExtractionModal
        isOpen={isExtractionModalOpen}
        onClose={() => setIsExtractionModalOpen(false)}
        result={extractionResult}
      />
    </div>
  );
}
