import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  GitMerge, 
  X, 
  Database,
  CloudCheck,
  ShieldCheck
} from 'lucide-react';

export const SyncCenter: React.FC = () => {
  const { 
    language, 
    syncModalOpen, 
    setSyncModalOpen,
    offlineMode,
    setOfflineMode,
    syncQueue,
    triggerSmartSync,
    isSyncing
  } = useApp();

  if (!syncModalOpen) return null;

  const pendingItems = syncQueue.filter(i => i.status === 'pending_sync');
  const syncedItems = syncQueue.filter(i => i.status !== 'pending_sync');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSyncModalOpen(false)}
          className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Multi-Device Cloud Synchronization Engine</span>
          </div>
          <h2 className="font-display text-xl font-bold text-stone-900">
            {language === 'en' ? 'Offline Mode & SmartSync Center' : 'Sinkronisasi Cloud & Mode Luring'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Automatic background synchronization with smart conflict resolution for low-coverage environments.
          </p>
        </div>

        {/* Offline Toggle Bar */}
        <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {offlineMode ? (
              <WifiOff className="w-5 h-5 text-amber-600" />
            ) : (
              <Wifi className="w-5 h-5 text-emerald-600" />
            )}
            <div>
              <span className="font-bold text-xs text-stone-900 block">
                {offlineMode ? 'Offline Emulation Active' : 'Connected to Global Sync Cloud'}
              </span>
              <span className="text-[11px] text-stone-500">
                {offlineMode 
                  ? 'All local edits, essay drafts, and test answers are cached offline.' 
                  : 'Real-time synchronization across connected devices.'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (offlineMode) {
                setOfflineMode(false);
                triggerSmartSync();
              } else {
                setOfflineMode(true);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              offlineMode
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
            }`}
          >
            {offlineMode ? 'Go Online & Sync' : 'Simulate Offline'}
          </button>
        </div>

        {/* Smart Sync Trigger Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-stone-600">
            <strong>{pendingItems.length}</strong> items waiting for sync · <strong>{syncedItems.length}</strong> synced
          </div>
          <button
            onClick={triggerSmartSync}
            disabled={isSyncing || offlineMode}
            className="px-3.5 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Reconciling State...' : 'Force Smart Sync'}</span>
          </button>
        </div>

        {/* Smart Conflict Resolution Algorithm Info */}
        <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <GitMerge className="w-3.5 h-3.5 text-indigo-600" />
            <span>Automatic Conflict Resolution Rules:</span>
          </div>
          <p>
            When reconnecting from offline zones, the engine merges newer timestamps (Vector Clocks) and preserves concurrent essay drafts through non-destructive branch revisions.
          </p>
        </div>

        {/* Sync Queue List */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Sync Ledger & Audit Logs
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {syncQueue.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded-lg border border-stone-200 bg-white flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-stone-900">{item.title}</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {item.payloadSummary} · {item.timestamp}
                  </div>
                </div>

                <div>
                  {item.status === 'synced' ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Synced</span>
                    </span>
                  ) : item.status === 'pending_sync' ? (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Queued Offline</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-indigo-700 font-semibold font-mono text-[11px]">
                      <GitMerge className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Auto-Merged</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 flex justify-end">
          <button
            onClick={() => setSyncModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
