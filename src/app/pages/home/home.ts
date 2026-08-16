import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VividLogo } from '../../components/vivid-logo/vivid-logo';
import { DealTimer } from '../../components/deal-timer/deal-timer';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, VividLogo, DealTimer],
  template: `
    <div class="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      
      <!-- HERO BANNER SECTION -->
      <section class="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden flex items-center justify-center">
        
        <!-- Background Hero Lifestyle Image with High-Fashion Look -->
        <img 
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1920&auto=format&fit=crop&q=80" 
          alt="Vivid Fashion High-Fashion Lifestyle" 
          referrerpolicy="no-referrer"
          class="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />
        
        <!-- Subtle Top & Bottom Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-[#0c0e14]/60"></div>
        <div class="absolute inset-0 bg-black/20"></div>

        <!-- Centered Frosted Glassmorphic Hero Card -->
        <div class="relative z-10 mx-4 max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-[#12141f]/75 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center flex flex-col items-center animate-fade-in">
          
          <!-- Vivid Fashion Logo Badge -->
          <div class="mb-4">
            <app-vivid-logo [size]="'md'" [showText]="false"></app-vivid-logo>
          </div>

          <!-- Headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-['Outfit']">
            Vivid Fashion
          </h1>

          <!-- Subtitle -->
          <p class="text-slate-300 text-sm sm:text-base font-normal max-w-md leading-relaxed mb-6">
            Embrace the vibrant dark mode aesthetic. Shop the latest trends in nocturnal luxury and modern digital craft.
          </p>

          <!-- CTA Pill Button -->
          <a 
            id="hero-shop-now-btn"
            routerLink="/collection/men" 
            class="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF2A6D] to-[#FF0055] hover:from-[#ff145e] hover:to-[#e6004c] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,42,109,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>SHOP NOW</span>
            <mat-icon class="!w-4 !h-4">arrow_forward</mat-icon>
          </a>
        </div>
      </section>

      <!-- MAIN CONTENT WRAPPER -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 w-full">
        
        <!-- SECTION 1: DEAL OF THE DAY -->
        <section id="deal-of-the-day-section" class="space-y-6">
          
          <!-- Section Header with Countdown -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/5">
            <div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
                Deal of the Day
              </h2>
              <p class="text-slate-400 text-sm mt-1">
                Exclusive offers ending soon.
              </p>
            </div>
            
            <!-- Live Ticking Countdown Timer -->
            <app-deal-timer></app-deal-timer>
          </div>

          <!-- 3 Deal Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <!-- Card 1 (Large Feature Card: Urban Edge Bomber Jacket) -->
            <a 
              [routerLink]="['/product', 'prod-urban-edge-bomber']"
              class="md:col-span-6 group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
            >
              <!-- 50% OFF Pill Badge -->
              <div class="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#FF2A6D] text-white text-xs font-bold shadow-lg">
                50% OFF
              </div>

              <!-- Wishlist Button -->
              <button 
                type="button"
                (click)="toggleWishlist($event, 'prod-urban-edge-bomber')"
                class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-[#FF2A6D] transition-colors"
                aria-label="Save to Wishlist"
              >
                <mat-icon [class.text-[#FF2A6D]]="isInWishlist('prod-urban-edge-bomber')">
                  {{ isInWishlist('prod-urban-edge-bomber') ? 'favorite' : 'favorite_border' }}
                </mat-icon>
              </button>

              <!-- Image Container -->
              <div class="relative h-72 sm:h-80 w-full overflow-hidden bg-[#10121a]">
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80" 
                  alt="Urban Edge Bomber Jacket"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <!-- Card Details -->
              <div class="p-5 flex items-center justify-between bg-[#191c2b] border-t border-white/5">
                <div>
                  <h3 class="text-lg font-bold text-white group-hover:text-[#FF2A6D] transition-colors">
                    Urban Edge Bomber Jacket
                  </h3>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-sm line-through text-[#FF2A6D]">₹4,999</span>
                    <span class="text-base font-bold text-white">₹2,499</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  (click)="quickAdd($event, 'prod-urban-edge-bomber')"
                  class="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#FF2A6D] text-slate-200 hover:text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
                >
                  <mat-icon class="!w-4 !h-4">shopping_bag</mat-icon>
                  <span>Add</span>
                </button>
              </div>
            </a>

            <!-- Card 2 (Cyberpunk Sneakers) -->
            <a 
              [routerLink]="['/product', 'prod-cyberpunk-sneakers']"
              class="md:col-span-3 group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
            >
              <button 
                type="button"
                (click)="toggleWishlist($event, 'prod-cyberpunk-sneakers')"
                class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-[#FF2A6D] transition-colors"
                aria-label="Save to Wishlist"
              >
                <mat-icon [class.text-[#FF2A6D]]="isInWishlist('prod-cyberpunk-sneakers')">
                  {{ isInWishlist('prod-cyberpunk-sneakers') ? 'favorite' : 'favorite_border' }}
                </mat-icon>
              </button>

              <div class="relative h-48 sm:h-56 w-full overflow-hidden bg-[#10121a]">
                <img 
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80" 
                  alt="Cyberpunk Sneakers"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div class="p-4 bg-[#191c2b] border-t border-white/5 flex flex-col justify-between flex-1">
                <div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#FF2A6D] transition-colors">
                    Cyberpunk Sneakers
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">Women's Footwear</p>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm font-bold text-white">₹1,899</span>
                  <span class="text-xs text-cyan-400 font-semibold">50% OFF</span>
                </div>
              </div>
            </a>

            <!-- Card 3 (Nocturnal Chronograph) -->
            <a 
              [routerLink]="['/product', 'prod-nocturnal-chronograph']"
              class="md:col-span-3 group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
            >
              <button 
                type="button"
                (click)="toggleWishlist($event, 'prod-nocturnal-chronograph')"
                class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-[#FF2A6D] transition-colors"
                aria-label="Save to Wishlist"
              >
                <mat-icon [class.text-[#FF2A6D]]="isInWishlist('prod-nocturnal-chronograph')">
                  {{ isInWishlist('prod-nocturnal-chronograph') ? 'favorite' : 'favorite_border' }}
                </mat-icon>
              </button>

              <div class="relative h-48 sm:h-56 w-full overflow-hidden bg-[#10121a]">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80" 
                  alt="Nocturnal Chronograph"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div class="p-4 bg-[#191c2b] border-t border-white/5 flex flex-col justify-between flex-1">
                <div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#FF2A6D] transition-colors">
                    Nocturnal Chronograph
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">Accessories</p>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm font-bold text-white">₹3,499</span>
                  <span class="text-xs text-cyan-400 font-semibold">50% OFF</span>
                </div>
              </div>
            </a>

          </div>
        </section>

        <!-- SECTION 2: SHOP BY CATEGORY -->
        <section id="shop-by-category-section" class="space-y-6">
          
          <div class="flex items-center justify-between pb-2 border-b border-white/5">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
              Shop by Category
            </h2>
            <a 
              routerLink="/collection/men" 
              class="text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
            >
              <span>VIEW ALL</span>
              <mat-icon class="!w-4 !h-4 group-hover:translate-x-0.5 transition-transform">arrow_forward</mat-icon>
            </a>
          </div>

          <!-- Category Bento Grid -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <!-- Category 1 (Left Tall: Gen-Z Fashion / Loungewear) -->
            <a 
              routerLink="/product/prod-rosa-jumpsuit"
              class="md:col-span-6 group relative rounded-3xl overflow-hidden bg-[#161824] border border-white/5 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
            >
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80" 
                alt="Gen-Z Fashion"
                referrerpolicy="no-referrer"
                class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              
              <!-- Subtle promo watermark overlay banner -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/40 to-transparent"></div>
              
              <!-- Floating Promo Banner Tag in Background -->
              <div class="absolute bottom-20 left-6 sm:left-8 opacity-40 font-black text-3xl sm:text-5xl text-white tracking-tighter pointer-events-none select-none">
                30-60% OFF
              </div>

              <div class="relative z-10 space-y-1">
                <span class="text-xs uppercase tracking-widest font-bold text-pink-400">Loungewear</span>
                <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit']">
                  Gen-Z Fashion
                </h3>
                <p class="text-slate-300 text-xs sm:text-sm">
                  Bold styles for the trend-conscious.
                </p>
              </div>
            </a>

            <!-- Right Column Grid -->
            <div class="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <!-- Top Left: Men's Apparel (Sportswear) -->
              <a 
                routerLink="/collection/men"
                class="group relative rounded-2xl overflow-hidden bg-[#161824] border border-white/5 h-48 sm:h-52 flex flex-col justify-end p-5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80" 
                  alt="Men's Apparel"
                  referrerpolicy="no-referrer"
                  class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/50 to-transparent"></div>
                <div class="relative z-10">
                  <span class="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Sportswear 30-80% OFF</span>
                  <h4 class="text-lg font-bold text-white">Men's Apparel</h4>
                </div>
              </a>

              <!-- Top Right: Women's Styles (Western Wear) -->
              <a 
                routerLink="/collection/women"
                class="group relative rounded-2xl overflow-hidden bg-[#161824] border border-white/5 h-48 sm:h-52 flex flex-col justify-end p-5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80" 
                  alt="Women's Styles"
                  referrerpolicy="no-referrer"
                  class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/50 to-transparent"></div>
                <div class="relative z-10">
                  <span class="text-[10px] uppercase font-bold text-[#FF2A6D] tracking-wider">Western Wear 40-80% OFF</span>
                  <h4 class="text-lg font-bold text-white">Women's Styles</h4>
                </div>
              </a>

              <!-- Bottom Wide: Accessories & Gear -->
              <a 
                routerLink="/collection/beauty"
                class="sm:col-span-2 group relative rounded-2xl overflow-hidden bg-[#161824] border border-white/5 h-48 sm:h-52 flex flex-col justify-end p-5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&auto=format&fit=crop&q=80" 
                  alt="Accessories & Gear"
                  referrerpolicy="no-referrer"
                  class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/50 to-transparent"></div>
                <div class="relative z-10">
                  <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Fitness &amp; Tech</span>
                  <h4 class="text-lg font-bold text-white">Accessories &amp; Gear</h4>
                </div>
              </a>

            </div>

          </div>

        </section>

      </main>

    </div>
  `
})
export class HomePage {
  private readonly shopService = inject(ShopService);

  isInWishlist(id: string): boolean {
    return this.shopService.isInWishlist(id);
  }

  toggleWishlist(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.shopService.toggleWishlist(id);
  }

  quickAdd(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    const product = this.shopService.getProductById(id);
    if (product) {
      this.shopService.addToCart(product, product.sizes[0] || 'M', 1);
    }
  }
}
