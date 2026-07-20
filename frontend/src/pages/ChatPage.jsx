import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';
import { assetService } from '../services/assetService';
import { useAuth } from '../context/AuthContext';
import {
  MessageSquare,
  Send,
  Cpu,
  ShieldCheck,
  FileText,
  Sparkles,
  Bot,
  User,
  Loader2,
  AlertTriangle,
  ChevronDown,
  Info,
  CheckCircle2,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'What is the cold startup procedure for PUMP-101?',
  'What were the hydrostatic test results for BOILER-02?',
  'What was the root cause of COMP-07 lube oil starvation?',
  'What is the 8000-hour maintenance checklist for TURBINE-04?',
  'What is the MAWP rating for REACTOR-05?',
];

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Welcome, ${user?.username || 'Engineer'}. I am your Industrial AI Operations Assistant. Ask any technical question about plant SOPs, maintenance logs, or equipment specifications.`,
      confidenceScore: 100,
      confidenceLevel: 'High Confidence',
      citations: [],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    assetService.getAssets().then((res) => setAssets(res.assets)).catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMessageText = inputQuery.trim();
    setInputQuery('');

    // Append User Message
    const updatedMessages = [
      ...messages,
      { sender: 'user', text: userMessageText },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await chatService.sendChatMessage({
        query: userMessageText,
        assetId: selectedAssetId || undefined,
      });

      setMessages([
        ...updatedMessages,
        {
          sender: 'assistant',
          text: res.answer,
          confidenceScore: res.confidenceScore,
          confidenceLevel: res.confidenceLevel,
          citations: res.citations || [],
        },
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          sender: 'assistant',
          text: 'An error occurred while querying the Industrial AI Brain. Please check microservice connectivity.',
          confidenceScore: 0,
          confidenceLevel: 'Error',
          citations: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const executeSuggestedPrompt = (promptText) => {
    setInputQuery(promptText);
  };

  const getConfidenceBadge = (score, level) => {
    if (score >= 80) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-emerald/15 text-industrial-emerald border border-industrial-emerald/30 inline-flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> {score}% High Confidence
        </span>
      );
    } else if (score >= 60) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-amber/15 text-industrial-amber border border-industrial-amber/30 inline-flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> {score}% Medium Confidence
        </span>
      );
    } else {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-industrial-crimson/15 text-industrial-crimson border border-industrial-crimson/30 inline-flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Suppressed / Low Confidence
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-6xl mx-auto space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-industrial-bgSecondary/90 border border-industrial-border rounded-2xl p-4 shadow-card backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-industrial-cyan/15 border border-industrial-cyan/30 rounded-xl text-industrial-cyan">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-industrial-textMain">AI Operations Assistant</h2>
            <p className="text-[11px] text-industrial-textDim">Zero-Hallucination Ground-Truth RAG Engine</p>
          </div>
        </div>

        {/* Plant Asset Context Selector Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Cpu className="w-4 h-4 text-industrial-cyan shrink-0" />
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="w-full sm:w-64 bg-industrial-bgTertiary border border-industrial-border rounded-xl px-3 py-1.5 text-xs text-industrial-textMain focus:outline-none focus:border-industrial-cyan"
          >
            <option value="">Context: Entire Plant (10 Assets)</option>
            {assets.map((a) => (
              <option key={a._id} value={a._id}>{a.assetCode} - {a.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 bg-industrial-bgSecondary/80 border border-industrial-border rounded-2xl p-4 shadow-card backdrop-blur-xl overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`p-2 rounded-xl shrink-0 border ${
                msg.sender === 'user'
                  ? 'bg-industrial-cyan/15 border-industrial-cyan/40 text-industrial-cyan'
                  : 'bg-industrial-bgTertiary border-industrial-border text-industrial-cyan'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Body */}
            <div
              className={`max-w-2xl space-y-2.5 ${
                msg.sender === 'user' ? 'text-right' : ''
              }`}
            >
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed inline-block text-left ${
                  msg.sender === 'user'
                    ? 'bg-industrial-cyan text-slate-950 font-medium shadow-glow'
                    : 'bg-industrial-bgTertiary/80 border border-industrial-border/80 text-industrial-textMain'
                }`}
              >
                {/* Confidence Meter Badge for Assistant */}
                {msg.sender === 'assistant' && msg.confidenceScore !== undefined && (
                  <div className="mb-2">
                    {getConfidenceBadge(msg.confidenceScore, msg.confidenceLevel)}
                  </div>
                )}

                <div className="whitespace-pre-wrap font-mono">{msg.text}</div>
              </div>

              {/* Source Citations Cards */}
              {msg.sender === 'assistant' && msg.citations && msg.citations.length > 0 && (
                <div className="space-y-1.5 text-left">
                  <div className="text-[10px] font-semibold text-industrial-textDim uppercase font-mono flex items-center gap-1">
                    <FileText className="w-3 h-3 text-industrial-cyan" />
                    Ground-Truth Source Citations ({msg.citations.length}):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.citations.map((cit, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 bg-industrial-bgTertiary/40 border border-industrial-border/60 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold text-industrial-cyan font-mono">
                          <span className="truncate">{cit.documentTitle}</span>
                          <span className="text-[10px] text-industrial-textDim">{cit.version}</span>
                        </div>
                        <p className="text-[10px] text-industrial-textSub font-mono truncate">
                          "{cit.snippet}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-industrial-bgTertiary border border-industrial-border text-industrial-cyan">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3.5 bg-industrial-bgTertiary/80 border border-industrial-border rounded-2xl text-xs text-industrial-textSub flex items-center gap-2 font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-industrial-cyan" />
              <span>Querying FAISS vector index & generating ground-truth response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts & Input Box */}
      <div className="space-y-2 shrink-0">
        {/* Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-mono text-industrial-textDim uppercase shrink-0">Suggested:</span>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => executeSuggestedPrompt(prompt)}
              className="px-2.5 py-1 rounded-lg bg-industrial-bgSecondary border border-industrial-border/60 hover:border-industrial-cyan/40 text-[11px] text-industrial-textSub hover:text-industrial-cyan transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AI Assistant about plant SOPs, maintenance procedures, or RCAs..."
            className="flex-1 bg-industrial-bgSecondary border border-industrial-border rounded-xl px-4 py-3 text-xs text-industrial-textMain placeholder-industrial-textDim focus:outline-none focus:border-industrial-cyan font-medium"
          />

          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="bg-industrial-cyan hover:bg-industrial-cyanHover text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow disabled:opacity-50 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
