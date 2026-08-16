import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-deal-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="deal-countdown-timer" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181d2a]/90 border border-cyan-500/20 text-xs sm:text-sm font-semibold tracking-wider text-slate-200">
      <span class="text-cyan-400 font-bold uppercase tracking-widest text-[11px]">ENDS IN:</span>
      <div class="flex items-center gap-1 font-mono text-cyan-300 font-bold">
        <span class="bg-black/40 px-1.5 py-0.5 rounded text-white min-w-[22px] text-center">{{ hours() }}</span>
        <span class="text-cyan-400">:</span>
        <span class="bg-black/40 px-1.5 py-0.5 rounded text-white min-w-[22px] text-center">{{ minutes() }}</span>
        <span class="text-cyan-400">:</span>
        <span class="bg-black/40 px-1.5 py-0.5 rounded text-cyan-300 min-w-[22px] text-center animate-pulse">{{ seconds() }}</span>
      </div>
    </div>
  `
})
export class DealTimer implements OnInit, OnDestroy {
  readonly hours = signal<string>('04');
  readonly minutes = signal<string>('45');
  readonly seconds = signal<string>('12');

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private totalSeconds = 4 * 3600 + 45 * 60 + 12;

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        const h = Math.floor(this.totalSeconds / 3600);
        const m = Math.floor((this.totalSeconds % 3600) / 60);
        const s = this.totalSeconds % 60;
        this.hours.set(h.toString().padStart(2, '0'));
        this.minutes.set(m.toString().padStart(2, '0'));
        this.seconds.set(s.toString().padStart(2, '0'));
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
