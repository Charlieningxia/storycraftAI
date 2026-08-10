import React from 'react';
import { PromptBuildOutput } from '../types';
import { X, Copy, Check, Trash2, Sparkles, Clock, Download } from 'lucide-react';

interface PromptHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: PromptBuildOutput[];
  onLoadPrompt: (output: PromptBuildOutput) => void;
  onClearHistory: () => void;
  onRemovePrompt: (id: string) => void;
}

export const PromptHistoryModal: React.FC<PromptHistoryModalProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onLoadPrompt,
  onClearHistory,
  onRemovePrompt
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prompt_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl text-white p-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pr-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Saved Prompts & History Library</h2>
              <p className="text-xs text-slate-400">
                {savedPrompts.length} prompt configuration(s) stored locally in browser storage.
              </p>
            </div>
          </div>

          {savedPrompts.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportAll}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Export All</span>
              </button>

              <button
                onClick={onClearHistory}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-950/50 hover:bg-red-900/50 text-red-300 border border-red-800/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Saved List */}
        {savedPrompts.length === 0 ? (
          <div className="p-12 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-400">No Saved Prompts Yet</h3>
            <p className="text-xs text-slate-500">
              Generate a prompt and click "Save" to keep it in your local library.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {savedPrompts.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase text-[10px]">
                      {item.params.styleId}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onLoadPrompt(item)}
                      className="text-xs font-bold text-amber-400 hover:underline"
                    >
                      Load into Editor
                    </button>

                    <button
                      onClick={() => handleCopy(item.id, item.fullPrompt)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy Prompt"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onRemovePrompt(item.id)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-mono text-xs text-slate-200 line-clamp-2 bg-slate-900 p-2 rounded border border-slate-800">
                  {item.fullPrompt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
