import React, { useState } from 'react';
import { Activity, Plus, History, CheckCircle2, Info } from 'lucide-react';
import { MOBILITY_ASSESSMENTS } from '../../data/mobility-assessments';
import { useUserStore } from '../../store/useUserStore';

export const MobilityAssessment: React.FC = () => {
  const assessmentRecords = useUserStore((state) => state.assessmentRecords);
  const addAssessmentRecord = useUserStore((state) => state.actions.addAssessmentRecord);

  const [selectedAssessmentId, setSelectedAssessmentId] = useState(MOBILITY_ASSESSMENTS[0].id);
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const currentAssessment = MOBILITY_ASSESSMENTS.find((a) => a.id === selectedAssessmentId)!;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addAssessmentRecord({
      assessmentId: selectedAssessmentId,
      date: new Date().toISOString().split('T')[0],
      leftValue,
      rightValue,
      notes,
    });
    setLeftValue('');
    setRightValue('');
    setNotes('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredHistory = assessmentRecords.filter((r) => r.assessmentId === selectedAssessmentId);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-2 shadow-elevated">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-content-primary tracking-tight">
              Bi-Weekly Mobility Self-Assessment
            </h2>
            <p className="text-xs text-content-muted">Track side-to-side symmetry & movement quality over time</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated/70 border border-surface-border rounded-xl p-3.5 text-xs text-content-secondary flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-volt flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Run these tests every 1–2 weeks on a recovery day. Side-to-side symmetry is often the most meaningful marker for volleyball injury risk.
        </p>
      </div>

      {/* Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {MOBILITY_ASSESSMENTS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedAssessmentId(item.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
              selectedAssessmentId === item.id
                ? 'bg-volt text-surface-base border-volt shadow-volt-sm'
                : 'bg-surface-card border-surface-border text-content-muted hover:text-content-primary'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Selected Test Instructions */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <div>
          <span className="text-[10px] font-mono text-volt uppercase font-bold">
            Target Region: {currentAssessment.targetRegion.toUpperCase()}
          </span>
          <h3 className="text-lg font-bold text-content-primary mt-0.5">
            {currentAssessment.name}
          </h3>
          <p className="text-xs text-content-muted">{currentAssessment.description}</p>
        </div>

        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 space-y-1 text-xs">
          <span className="font-mono font-bold text-volt uppercase block">Testing Protocol:</span>
          <ol className="list-decimal list-inside space-y-1 text-content-secondary">
            {currentAssessment.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Record Entry Form */}
        <form onSubmit={handleSave} className="pt-2 space-y-3">
          <span className="text-xs font-mono font-bold text-content-primary uppercase block">
            Record New Measurement
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-content-muted block mb-1">Left Side</label>
              <input
                type="text"
                placeholder="e.g. 3.5 inches or Clean"
                value={leftValue}
                onChange={(e) => setLeftValue(e.target.value)}
                className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-xs text-content-primary focus:outline-none focus:border-volt"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-content-muted block mb-1">Right Side</label>
              <input
                type="text"
                placeholder="e.g. 4.0 inches or Tight"
                value={rightValue}
                onChange={(e) => setRightValue(e.target.value)}
                className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-xs text-content-primary focus:outline-none focus:border-volt"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-content-muted block mb-1">Qualitative Notes / Photo Ref</label>
            <input
              type="text"
              placeholder="e.g. Left heel felt tight; smooth thoracic rotation right"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-xs text-content-primary focus:outline-none focus:border-volt"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-volt hover:bg-volt/90 transition-all flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>SAVE ASSESSMENT LOG</span>
          </button>

          {showSuccess && (
            <p className="text-xs font-mono font-bold text-state-success text-center animate-fade-in flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Assessment recorded successfully!</span>
            </p>
          )}
        </form>
      </div>

      {/* History Log for this test */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <h3 className="text-sm font-bold text-content-primary flex items-center space-x-2">
            <History className="w-4 h-4 text-volt" />
            <span>Assessment History ({filteredHistory.length})</span>
          </h3>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="text-xs text-content-muted py-3 text-center">
            No assessment logs recorded for this test yet. Complete a test above to start tracking.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((rec) => (
              <div key={rec.id} className="bg-surface-elevated border border-surface-border rounded-xl p-3 space-y-1 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-volt font-bold">{rec.date}</span>
                  <span className="text-content-muted">
                    L: <strong className="text-content-primary">{rec.leftValue || 'N/A'}</strong> | R: <strong className="text-content-primary">{rec.rightValue || 'N/A'}</strong>
                  </span>
                </div>
                {rec.notes && <p className="text-content-muted italic">{rec.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
