import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Copy, Download, Flame, MessageCircle, Share2, Sparkles, X } from 'lucide-react';

interface ShareStreakModalProps {
  currentStreak: number;
  longestStreak: number;
  todayMinutes: number;
  onClose: () => void;
}

const drawShareCard = (canvas: HTMLCanvasElement, streak: number, longest: number, minutes: number) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;

  const goalReached = minutes >= 30;
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#071B1C');
  gradient.addColorStop(0.55, '#0A1014');
  gradient.addColorStop(1, '#14100A');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(820, 260, 30, 820, 260, 620);
  glow.addColorStop(0, 'rgba(200, 255, 0, 0.28)');
  glow.addColorStop(1, 'rgba(200, 255, 0, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(200, 255, 0, 0.34)';
  context.lineWidth = 2;
  context.strokeRect(54, 54, width - 108, height - 108);
  context.fillStyle = '#C8FF00';
  context.fillRect(102, 142, 14, 14);
  context.font = '700 28px Arial, sans-serif';
  context.fillText('ELITE MOBILITY  /  STREAK SIGNAL', 138, 154);

  context.fillStyle = '#D5DCE1';
  context.font = '700 30px Arial, sans-serif';
  context.fillText('CONSISTENCY MAKES', 102, 500);
  context.fillStyle = '#C8FF00';
  context.font = '800 38px Arial, sans-serif';
  context.fillText('THE DIFFERENCE.', 102, 552);

  context.fillStyle = '#FFFFFF';
  context.font = '900 390px Arial, sans-serif';
  context.fillText(String(streak), 86, 920);
  context.fillStyle = '#F3A33C';
  context.font = '190px Arial, sans-serif';
  context.fillText('🔥', Math.min(770, 100 + String(streak).length * 225), 898);
  context.fillStyle = '#D5DCE1';
  context.font = '800 50px Arial, sans-serif';
  context.fillText(streak === 1 ? 'DAY — YOU SHOWED UP' : 'DAYS — YOU SHOWED UP', 106, 1000);

  context.fillStyle = 'rgba(255, 255, 255, 0.06)';
  context.roundRect(94, 1120, 892, 282, 34);
  context.fill();
  context.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = '#98A6AD';
  context.font = '700 25px Arial, sans-serif';
  context.fillText('TODAY’S MOBILITY', 138, 1194);
  context.fillStyle = '#FFFFFF';
  context.font = '800 72px Arial, sans-serif';
  context.fillText(`${minutes} MIN`, 138, 1282);
  context.fillStyle = goalReached ? '#70E000' : '#C8FF00';
  context.font = '700 27px Arial, sans-serif';
  context.fillText(goalReached ? '30-MIN DAILY GOAL COMPLETE' : `${Math.max(0, 30 - minutes)} MIN UNTIL TODAY’S GOAL`, 138, 1350);

  context.fillStyle = '#98A6AD';
  context.font = '700 28px Arial, sans-serif';
  context.fillText(`PERSONAL BEST  ·  ${longest} ${longest === 1 ? 'DAY' : 'DAYS'}`, 102, 1635);
  context.fillStyle = '#FFFFFF';
  context.font = '700 34px Arial, sans-serif';
  context.fillText('Mobility is my competitive edge.', 102, 1730);
};

export const ShareStreakModal: React.FC<ShareStreakModalProps> = ({ currentStreak, longestStreak, todayMinutes, onClose }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const dateLabel = useMemo(() => new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric' }).format(new Date()), []);
  const goalReached = todayMinutes >= 30;
  const shareText = `🔥 ${currentStreak}-day mobility streak!\n${todayMinutes} minutes moved today${goalReached ? ' — 30-min goal complete ✅' : ''}\n\nShow up. Move better. Play longer.`;

  const createImage = async (): Promise<File | null> => {
    const canvas = document.createElement('canvas');
    drawShareCard(canvas, currentStreak, longestStreak, todayMinutes);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    return blob ? new File([blob], `mobility-streak-${currentStreak}-days.png`, { type: 'image/png' }) : null;
  };

  const downloadImage = async () => {
    const file = await createImage();
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareImage = async () => {
    setIsSharing(true);
    try {
      const file = await createImage();
      if (!file) return;
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: 'My mobility streak', text: shareText, files: [file] });
      } else {
        await downloadImage();
      }
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') await downloadImage();
    } finally {
      setIsSharing(false);
    }
  };

  const copyText = async () => {
    await navigator.clipboard?.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-5" role="dialog" aria-modal="true" aria-label="Share your streak">
      <div className="w-full max-w-lg max-h-[96dvh] overflow-y-auto bg-surface-card border border-surface-border rounded-t-[2rem] sm:rounded-[2rem] shadow-elevated">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-[10px] text-volt font-bold font-mono tracking-[0.18em]">STREAK SIGNAL</p>
            <h2 className="text-xl font-extrabold text-content-primary">Make your progress visible.</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface-elevated border border-surface-border text-content-muted hover:text-content-primary hover:border-volt/50 flex items-center justify-center transition-colors" aria-label="Back to dashboard"><X className="w-5 h-5" /></button>
        </div>

        <div className="mx-5 rounded-[1.65rem] p-5 overflow-hidden relative bg-[#0a1014] border border-white/10 aspect-[9/12] shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(200,255,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'linear-gradient(to bottom, black, transparent 80%)' }} />
          <div className="absolute -top-20 -right-12 h-60 w-60 rounded-full bg-volt/30 blur-3xl" />
          <div className="absolute bottom-0 -left-20 h-52 w-52 rounded-full bg-ember/20 blur-3xl" />
          <div className="relative h-full flex flex-col">
            <div className="flex justify-between items-center text-[9px] font-bold tracking-[0.16em]"><span className="text-volt flex items-center gap-1"><Sparkles className="w-3 h-3" />ELITE MOBILITY</span><span className="text-content-muted">{dateLabel.toUpperCase()}</span></div>
            <div className="mt-8">
              <p className="text-[10px] font-bold tracking-[0.24em] text-content-muted">THE ONLY WAY OUT IS</p>
              <p className="text-[10px] font-black tracking-[0.24em] text-volt">THROUGH.</p>
            </div>
            <div className="mt-auto mb-4">
              <div className="flex items-end gap-2"><span className="text-[7.5rem] sm:text-[8rem] leading-[0.75] font-black tracking-tighter text-white font-mono drop-shadow-2xl">{currentStreak}</span><div className="mb-1.5"><div className="w-11 h-11 rounded-2xl rotate-6 bg-ember/15 border border-ember/30 flex items-center justify-center"><Flame className="w-7 h-7 text-ember fill-ember/30" /></div></div></div>
              <div className="flex items-center gap-2 mt-2"><span className="h-px w-7 bg-volt" /><p className="text-xs font-black tracking-[0.2em] text-white">{currentStreak === 1 ? 'DAY OF DISCIPLINE' : 'DAYS OF DISCIPLINE'}</p></div>
            </div>
            <div className="rounded-2xl bg-black/30 backdrop-blur border border-white/10 px-4 py-3">
              <div className="flex items-center justify-between"><div><p className="text-[9px] tracking-[0.15em] text-content-muted font-bold">TODAY’S WORK</p><p className="font-mono font-black text-2xl text-white">{todayMinutes}<span className="text-sm text-content-muted"> MIN</span></p></div><div className={`max-w-[150px] text-right text-[9px] leading-relaxed font-bold ${goalReached ? 'text-state-success' : 'text-volt'}`}>{goalReached ? 'GOAL LOCKED IN ✓' : `${Math.max(0, 30 - todayMinutes)} MIN TO LOCK IT IN`}</div></div>
              <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden"><div className={`h-full rounded-full ${goalReached ? 'bg-state-success' : 'bg-volt'}`} style={{ width: `${Math.min(100, todayMinutes / 30 * 100)}%` }} /></div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <button onClick={shareImage} disabled={isSharing} className="w-full py-3.5 rounded-2xl bg-[#25D366] text-[#062D16] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_22px_rgba(37,211,102,0.2)] hover:brightness-105 disabled:opacity-60 transition-all"><Share2 className="w-4 h-4" />{isSharing ? 'Preparing your card…' : 'Share my streak image'}</button>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={downloadImage} className="py-3 rounded-xl border border-surface-border text-content-primary text-xs font-bold flex items-center justify-center gap-2 hover:border-volt/60"><Download className="w-4 h-4 text-volt" />Save Status Card</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" className="py-3 rounded-xl border border-surface-border text-content-primary text-xs font-bold flex items-center justify-center gap-2 hover:border-[#25D366]/60"><MessageCircle className="w-4 h-4 text-[#25D366]" />Send in Chat</a>
          </div>
          <button onClick={copyText} className="w-full py-2 text-xs text-content-muted hover:text-content-primary flex items-center justify-center gap-1.5">{copied ? <Check className="w-3.5 h-3.5 text-state-success" /> : <Copy className="w-3.5 h-3.5" />}{copied ? 'Caption copied' : 'Copy caption'}</button>
          <p className="text-[10px] text-content-muted text-center leading-relaxed">The image is optimized for a 9:16 WhatsApp Status. Use the share sheet to pick WhatsApp, then choose Status or any chat.</p>
          {/* <button onClick={onClose} className="w-full py-3 rounded-xl text-xs font-bold text-content-muted hover:text-content-primary flex items-center justify-center gap-2 transition-colors"><ArrowLeft className="w-4 h-4" />Back to dashboard</button> */}
        </div>
      </div>
    </div>
  );
};
