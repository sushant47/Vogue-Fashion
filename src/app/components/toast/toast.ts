import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      @for (toast of toasts(); track toast.id) {
        <div 
          class="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0"
          [class.bg-[#12141f]/95]="toast.type === 'info'"
          [class.border-slate-700]="toast.type === 'info'"
          [class.text-slate-100]="toast.type === 'info'"
          [class.bg-[#121c17]/95]="toast.type === 'success'"
          [class.border-emerald-500/40]="toast.type === 'success'"
          [class.text-emerald-200]="toast.type === 'success'"
          [class.bg-[#221017]/95]="toast.type === 'error'"
          [class.border-rose-500/40]="toast.type === 'error'"
          [class.text-rose-200]="toast.type === 'error'"
        >
          <div class="flex items-center gap-2.5">
            @if (toast.type === 'success') {
              <mat-icon class="text-emerald-400">check_circle</mat-icon>
            } @else if (toast.type === 'error') {
              <mat-icon class="text-rose-400">error</mat-icon>
            } @else {
              <mat-icon class="text-[#FF2A6D]">info</mat-icon>
            }
            <span class="text-sm font-medium leading-tight text-white">{{ toast.message }}</span>
          </div>

          <button 
            type="button" 
            (click)="shopService.removeToast(toast.id)"
            class="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss toast"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  readonly shopService = inject(ShopService);
  readonly toasts = this.shopService.toasts;
}
