import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer id="app-footer" class="w-full bg-[#08090d] border-t border-white/5 text-slate-400 text-sm mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          
          <!-- Brand Info -->
          <div class="md:col-span-6 lg:col-span-5 space-y-4">
            <span class="text-2xl font-black tracking-wider text-white font-['Outfit'] block">
              VOGUE_VIBE
            </span>
            <p class="text-slate-400 text-sm max-w-md leading-relaxed">
              Redefining digital fashion with nocturnal luxury and vibrant aesthetics. Shop the latest trends with complete convenience.
            </p>

            <!-- Social Action Icons -->
            <div class="flex items-center gap-3 pt-2">
              <button 
                type="button" 
                (click)="onShare()"
                class="w-10 h-10 rounded-full bg-[#181b26] hover:bg-[#FF2A6D] hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm"
                aria-label="Share Store"
              >
                <mat-icon class="!w-5 !h-5">share</mat-icon>
              </button>
              <button 
                type="button" 
                (click)="onNewsletter()"
                class="w-10 h-10 rounded-full bg-[#181b26] hover:bg-[#FF2A6D] hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm"
                aria-label="Email Newsletter"
              >
                <mat-icon class="!w-5 !h-5">mail_outline</mat-icon>
              </button>
            </div>
          </div>

          <!-- Quick Navigation Links (Collections) -->
          <div class="md:col-span-2 lg:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">
              SHOP
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm">
              <li>
                <a routerLink="/collection/men" class="hover:text-white transition-colors">Men</a>
              </li>
              <li>
                <a routerLink="/collection/women" class="hover:text-white transition-colors">Women</a>
              </li>
              <li>
                <a routerLink="/collection/kids" class="hover:text-white transition-colors">Kids</a>
              </li>
              <li>
                <a routerLink="/collection/home" class="hover:text-white transition-colors">Home & Living</a>
              </li>
            </ul>
          </div>

          <!-- Customer Policies -->
          <div class="md:col-span-2 lg:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400">
              CUSTOMER POLICIES
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm">
              <li>
                <button type="button" (click)="infoModal('Contact Us')" class="hover:text-white transition-colors text-left">Contact Us</button>
              </li>
              <li>
                <button type="button" (click)="infoModal('Track Orders')" class="hover:text-white transition-colors text-left">Track Orders</button>
              </li>
              <li>
                <button type="button" (click)="infoModal('Shipping')" class="hover:text-white transition-colors text-left">Shipping</button>
              </li>
              <li>
                <button type="button" (click)="infoModal('Returns')" class="hover:text-white transition-colors text-left">Returns</button>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="md:col-span-2 lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400">
              LEGAL
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm">
              <li>
                <button type="button" (click)="infoModal('Privacy Policy')" class="hover:text-white transition-colors text-left">Privacy Policy</button>
              </li>
              <li>
                <button type="button" (click)="infoModal('Terms of Use')" class="hover:text-white transition-colors text-left">Terms of Use</button>
              </li>
              <li>
                <button type="button" (click)="infoModal('Grievance Redressal')" class="hover:text-white transition-colors text-left">Grievance Redressal</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright / Guarantee Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 VOGUE_VIBE. Digital Craft &amp; Nocturnal Luxury.</p>
          <div class="flex items-center gap-2 text-slate-400">
            <mat-icon class="!w-4 !h-4 text-cyan-400">verified_user</mat-icon>
            <span>100% ORIGINAL guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  private readonly shopService = inject(ShopService);

  onShare() {
    this.shopService.showToast('VOGUE_VIBE link copied to clipboard!', 'success');
  }

  onNewsletter() {
    this.shopService.showToast('Subscribed to Nocturnal Luxury drops!', 'success');
  }

  infoModal(title: string) {
    this.shopService.showToast(`Navigating to ${title}...`, 'info');
  }
}
