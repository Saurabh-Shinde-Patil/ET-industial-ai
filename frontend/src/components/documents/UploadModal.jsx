import React, { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';
import { assetService } from '../../services/assetService';
import { X, UploadCloud, FileText, Cpu, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const DOCUMENT_TYPES = [
  'SOP',
  'Maintenance Log',
  'Root Cause Analysis',
  'Preventive Maintenance',
  'Engineering Manual',
  'General',
];

export default function UploadModal({ isOpen: externalIsOpen, onClose: externalOnClose, onUploadSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('SOP');
  const [version, setVersion] = useState('v1.0');
  const [isOCR, setIsOCR] = useState(false);
  const [selectedAssetIds, setSelectedAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle external prop or custom event
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-upload-modal', handleOpenEvent);
    return () => window.removeEventListener('open-upload-modal', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      assetService.getAssets().then((res) => setAssets(res.assets)).catch(console.error);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const toggleAssetSelect = (assetId) => {
    if (selectedAssetIds.includes(assetId)) {
      setSelectedAssetIds(selectedAssetIds.filter((id) => id !== assetId));
    } else {
      setSelectedAssetIds([...selectedAssetIds, assetId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('documentType', documentType);
      formData.append('version', version);
      formData.append('isOCR', isOCR);
      formData.append('linkedAssetIds', JSON.stringify(selectedAssetIds));

      await documentService.uploadDocument(formData);
      if (onUploadSuccess) onUploadSuccess();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-industrial-bgSecondary border border-industrial-border rounded-2xl max-w-lg w-full p-6 shadow-card relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-industrial-textSub hover:text-industrial-textMain hover:bg-industrial-bgTertiary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-industrial-textMain">Ingest Industrial Document</h3>
            <p className="text-xs text-industrial-textDim">Upload SOPs, manuals, or RCAs and link to physical assets</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-industrial-crimson/15 border border-industrial-crimson/40 rounded-lg text-xs text-industrial-crimson flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Dropzone */}
          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1.5">File Upload Zone</label>
            <div className="border-2 border-dashed border-industrial-border hover:border-industrial-cyan/60 rounded-xl p-5 text-center bg-industrial-bgTertiary/40 transition-all cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-industrial-cyan text-xs font-medium">
                  <FileText className="w-5 h-5" />
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="text-industrial-textDim font-mono text-[11px]">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <div>
                  <UploadCloud className="w-8 h-8 mx-auto text-industrial-cyan mb-2 opacity-80" />
                  <p className="text-xs text-industrial-textMain font-semibold">Click or drag document file here</p>
                  <p className="text-[11px] text-industrial-textDim mt-1">PDF, DOCX, TXT, PNG, JPG (Up to 50MB)</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1">Document Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="SOP-PUMP-101 Startup Sequence"
              className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-2.5 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
              >
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-textSub mb-1">Version</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-industrial-bgTertiary border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan font-mono"
              />
            </div>
          </div>

          {/* Asset Association Selection Grid */}
          <div>
            <label className="block text-xs font-medium text-industrial-textSub mb-1.5">
              Link to Plant Assets ({selectedAssetIds.length} selected)
            </label>
            <div className="bg-industrial-bgTertiary/40 border border-industrial-border/60 rounded-xl p-3 max-h-40 overflow-y-auto space-y-1.5">
              {assets.map((asset) => {
                const isSelected = selectedAssetIds.includes(asset._id);
                return (
                  <div
                    key={asset._id}
                    onClick={() => toggleAssetSelect(asset._id)}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-industrial-cyan/15 border-industrial-cyan text-industrial-textMain font-semibold'
                        : 'bg-industrial-bgTertiary border-industrial-border/60 text-industrial-textSub hover:border-industrial-cyan/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-industrial-cyan" />
                      <span className="font-mono text-industrial-cyan font-semibold">{asset.assetCode}</span>
                      <span className="truncate">{asset.name}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-industrial-cyan" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-lg bg-industrial-bgTertiary border border-industrial-border text-xs text-industrial-textSub hover:text-industrial-textMain"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-semibold text-xs transition-all shadow-glow disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              <span>{loading ? 'Ingesting...' : 'Ingest Document'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
