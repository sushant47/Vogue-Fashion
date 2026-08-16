import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-vivid-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex items-center gap-3" [id]="id() || 'vivid-logo-box'">
      <!-- Ribbon V Icon in Glowing Rounded Box -->
      <div 
        class="relative flex items-center justify-center rounded-2xl p-2 bg-gradient-to-br from-[#1b1c2b] to-[#12131f] border border-fuchsia-500/30 shadow-[0_0_20px_rgba(255,42,109,0.3)] transition-transform duration-300 hover:scale-105"
        [class.w-12]="size() === 'sm'"
        [class.h-12]="size() === 'sm'"
        [class.w-16]="size() === 'md'"
        [class.h-16]="size() === 'md'"
        [class.w-24]="size() === 'lg'"
        [class.h-24]="size() === 'lg'"
      >
        <!-- SVG Ribbon V -->
        <svg 
          viewBox="0 0 100 100" 
          class="w-full h-full drop-shadow-[0_2px_10px_rgba(255,42,109,0.5)]" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vividGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF3366" />
              <stop offset="60%" stop-color="#FF0055" />
              <stop offset="100%" stop-color="#9900FF" />
            </linearGradient>
            <linearGradient id="vividGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FF007F" />
              <stop offset="50%" stop-color="#8A2BE2" />
              <stop offset="100%" stop-color="#00D2FF" />
            </linearGradient>
          </defs>
          <!-- Left Wing of V -->
          <path 
            d="M20 28 C26 28, 42 55, 48 76 C46 80, 42 82, 38 80 C26 68, 20 42, 20 28 Z" 
            fill="url(#vividGradLeft)" 
          />
          <!-- Right Ribbon Loop of V -->
          <path 
            d="M80 30 C72 28, 56 36, 46 54 C40 65, 48 78, 54 74 C64 64, 76 46, 80 30 Z" 
            fill="url(#vividGradRight)" 
            opacity="0.95"
          />
          <!-- Center Fold Shadow/Highlight -->
          <path 
            d="M38 80 C44 82, 48 76, 52 68 C46 56, 36 68, 38 80 Z" 
            fill="#FF2A6D" 
          />
        </svg>
      </div>

      <!-- Typography -->
      @if (showText()) {
        <div class="flex flex-col">
          <span class="font-extrabold tracking-tight text-white leading-none text-xl sm:text-2xl font-['Plus_Jakarta_Sans']">
            Vivid
          </span>
          <span class="font-light tracking-wide text-slate-300 leading-tight text-base sm:text-lg">
            Fashion
          </span>
        </div>
      }
    </div>
  `
})
export class VividLogo {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showText = input<boolean>(true);
  readonly id = input<string>('vivid-logo');
}
