import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        <div class="flex items-baseline gap-3 mb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            My Wishlist
          </h1>
          <span class="text-slate-400 text-sm font-semibold">
            ({{ wishlistProducts().length }} {{ wishlistProducts().length === 1 ? 'item' : 'items' }})
          </span>
        </div>

        @if (wishlistProducts().length === 0) {
          <div class="text-center py-20 bg-[#12141f] rounded-3xl border border-white/5 p-8 max-w-xl mx-auto space-y-4">
            <div class="w-20 h-20 rounded-full bg-[#1c1f2e] mx-auto flex items-center justify-center text-slate-400">
              <mat-icon class="!w-10 !h-10 !text-4xl text-[#FF2A6D]">favorite_border</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-white">Your wishlist is empty</h2>
            <p class="text-slate-400 text-sm max-w-sm mx-auto">
              Save items you love by clicking the heart icon on any product card or detail screen.
            </p>
            <a 
              routerLink="/collection/men"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2A6D] text-white font-bold text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(255,42,109,0.4)] transition-all hover:scale-105"
            >
              <span>Explore Collection</span>
              <mat-icon class="!w-4 !h-4">arrow_forward</mat-icon>
            </a>
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @for (prod of wishlistProducts(); track prod.id) {
              <div class="group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 flex flex-col justify-between">
                
                <!-- Remove from wishlist -->
                <button 
                  type="button" 
                  (click)="shopService.toggleWishlist(prod.id)"
                  class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-rose-400 hover:text-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <mat-icon class="!w-4 !h-4">close</mat-icon>
                </button>

                <!-- Image -->
                <div [routerLink]="['/product', prod.id]" class="relative h-64 w-full overflow-hidden bg-[#10121a] cursor-pointer">
                  <img 
                    [src]="prod.images[0]" 
                    [alt]="prod.name"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <!-- Content -->
                <div class="p-4 bg-[#191c2b] border-t border-white/5 space-y-3">
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-[#FF2A6D] transition-colors truncate">
                      {{ prod.name }}
                    </h4>
                    <p class="text-xs text-slate-400 mt-0.5">{{ prod.brand }}</p>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-white">₹{{ prod.price }}</span>
                    <span class="text-xs text-cyan-400 font-bold">({{ prod.discountPercent }}% OFF)</span>
                  </div>

                  <!-- Move to bag button -->
                  <button 
                    type="button" 
                    (click)="moveToBag(prod)"
                    class="w-full py-2.5 rounded-xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <mat-icon class="!w-4 !h-4">shopping_bag</mat-icon>
                    <span>MOVE TO BAG</span>
                  </button>
                </div>

              </div>
            }
          </div>
        }

      </main>
    </div>
  `
})
export class WishlistPage {
  readonly shopService = inject(ShopService);
  private readonly router = inject(Router);

  readonly wishlistIds = this.shopService.wishlist;
  readonly allProducts = this.shopService.products;

  readonly wishlistProducts = computed(() => {
    const ids = this.wishlistIds();
    return this.allProducts().filter(p => ids.includes(p.id));
  });

  moveToBag(prod: Product) {
    this.shopService.addToCart(prod, prod.sizes[0] || 'M', 1);
    this.shopService.toggleWishlist(prod.id);
  }
}
