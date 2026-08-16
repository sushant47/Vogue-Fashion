import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        <!-- Breadcrumb Navigation -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <a routerLink="/" class="hover:text-white transition-colors">Home</a>
          <mat-icon class="!w-3.5 !h-3.5 !text-xs">chevron_right</mat-icon>
          <a [routerLink]="['/collection', product().category]" class="hover:text-white transition-colors capitalize">
            {{ product().category }}'s Wear
          </a>
          <mat-icon class="!w-3.5 !h-3.5 !text-xs">chevron_right</mat-icon>
          <span class="text-[#FF2A6D] font-medium truncate max-w-[200px] sm:max-w-none">{{ product().name }}</span>
        </nav>

        <!-- Product Showcase Grid (Matching Image 8) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- LEFT: IMAGE GALLERY WITH THUMBNAILS -->
          <div class="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            <!-- Vertical Thumbnails Stack (Desktop left / Mobile bottom) -->
            <div class="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 sm:w-20 shrink-0">
              @for (img of product().images; track img; let i = $index) {
                <button 
                  type="button" 
                  (click)="selectedImageIndex.set(i)"
                  class="relative w-16 sm:w-20 h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0"
                  [class.border-[#FF2A6D]]="selectedImageIndex() === i"
                  [class.border-white/10]="selectedImageIndex() !== i"
                  [class.opacity-60]="selectedImageIndex() !== i"
                  [class.opacity-100]="selectedImageIndex() === i"
                  aria-label="View product image"
                >
                  <img 
                    [src]="img" 
                    [alt]="product().name"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover object-center"
                  />
                </button>
              }
            </div>

            <!-- Main High-Res Image Display -->
            <div class="relative flex-1 rounded-3xl overflow-hidden bg-[#161824] border border-white/5 shadow-2xl h-[420px] sm:h-[540px] lg:h-[620px]">
              
              <!-- Trending Badge -->
              @if (product().trending || product().badgeText) {
                <div class="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full bg-[#FF2A6D] text-white text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,42,109,0.5)]">
                  {{ product().badgeText || 'TRENDING' }}
                </div>
              }

              <!-- Main Image -->
              <img 
                [src]="currentImage()" 
                [alt]="product().name"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
              />

              <!-- Zoom Hint Indicator -->
              <div class="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 pointer-events-none">
                <mat-icon class="!w-3.5 !h-3.5">zoom_in</mat-icon>
                <span>Roll over to zoom</span>
              </div>
            </div>

          </div>

          <!-- RIGHT: PRODUCT SPECIFICATIONS & ACTIONS (Matching Image 8) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Title & Brand -->
            <div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {{ product().name }}
              </h1>
              <p class="text-slate-400 text-sm sm:text-base mt-1">
                {{ product().description }}
              </p>
            </div>

            <!-- Price Box -->
            <div class="p-4 rounded-2xl bg-[#12141f] border border-white/5 space-y-1">
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-extrabold text-[#FF2A6D]">
                  ₹{{ product().price }}
                </span>
                <span class="text-base line-through text-slate-500">
                  ₹{{ product().originalPrice }}
                </span>
                <span class="text-sm font-bold text-cyan-400">
                  ({{ product().discountPercent }}% OFF)
                </span>
              </div>
              <p class="text-xs text-emerald-400 font-medium">inclusive of all taxes</p>
            </div>

            <!-- Size Selector -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-300">
                  SELECT SIZE
                </span>
                <button 
                  type="button" 
                  (click)="showSizeChart.set(true)"
                  class="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1"
                >
                  <mat-icon class="!w-3.5 !h-3.5">straighten</mat-icon>
                  SIZE CHART
                </button>
              </div>

              <div class="flex flex-wrap gap-2.5">
                @for (sz of product().sizes; track sz) {
                  <button 
                    type="button" 
                    (click)="selectedSize.set(sz)"
                    class="min-w-[48px] h-12 px-4 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer"
                    [class.border-[#FF2A6D]]="selectedSize() === sz"
                    [class.bg-[#FF2A6D]]="selectedSize() === sz"
                    [class.text-white]="selectedSize() === sz"
                    [class.shadow-[0_0_15px_rgba(255,42,109,0.4)]]="selectedSize() === sz"
                    [class.border-white/10]="selectedSize() !== sz"
                    [class.bg-[#181b26]]="selectedSize() !== sz"
                    [class.text-slate-200]="selectedSize() !== sz"
                    [class.hover:border-slate-500]="selectedSize() !== sz"
                  >
                    {{ sz }}
                  </button>
                }
              </div>
            </div>

            <!-- Quantity & Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              
              <!-- Add to Bag Primary CTA -->
              <button 
                id="product-add-to-bag-btn"
                type="button" 
                (click)="addToBag()"
                class="flex-1 py-4 px-6 rounded-2xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,42,109,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <mat-icon class="!w-5 !h-5">shopping_bag</mat-icon>
                <span>ADD TO BAG</span>
              </button>

              <!-- Wishlist CTA -->
              <button 
                id="product-wishlist-btn"
                type="button" 
                (click)="toggleWishlist()"
                class="py-4 px-6 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider"
                [class.border-[#FF2A6D]]="isInWishlist()"
                [class.bg-[#FF2A6D]/10]="isInWishlist()"
                [class.text-[#FF2A6D]]="isInWishlist()"
                [class.border-white/10]="!isInWishlist()"
                [class.bg-[#161824]]="!isInWishlist()"
                [class.text-slate-200]="!isInWishlist()"
              >
                <mat-icon [class.text-[#FF2A6D]]="isInWishlist()">
                  {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
                </mat-icon>
                <span>WISHLIST</span>
              </button>

            </div>

            <!-- STYLE NOTE BOX (Matching Image 8 Style Note Card) -->
            @if (product().styleNote) {
              <div class="p-5 rounded-2xl bg-[#161824] border border-white/5 space-y-2">
                <div class="flex items-center gap-2 text-[#FF2A6D] text-xs font-bold uppercase tracking-wider">
                  <mat-icon class="!w-4 !h-4">auto_awesome</mat-icon>
                  <span>STYLE NOTE</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {{ product().styleNote }}
                </p>
              </div>
            }

            <!-- PRODUCT DETAILS BULLETS -->
            @if (product().productDetails && product().productDetails!.length > 0) {
              <div class="space-y-3 pt-2">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <mat-icon class="!w-4 !h-4 text-cyan-400">format_list_bulleted</mat-icon>
                  PRODUCT DETAILS
                </h3>
                <ul class="space-y-1.5 text-xs sm:text-sm text-slate-400 list-disc list-inside">
                  @for (detail of product().productDetails; track detail) {
                    <li>{{ detail }}</li>
                  }
                </ul>
              </div>
            }

            <!-- Delivery & Returns Checklist -->
            <div class="p-4 rounded-2xl bg-[#12141f] border border-white/5 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 text-cyan-400">local_shipping</mat-icon>
                DELIVERY OPTIONS
              </span>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Pincode (e.g. 560001)"
                  class="flex-1 bg-[#181b26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2A6D]"
                />
                <button 
                  type="button" 
                  (click)="shopService.showToast('Delivery available within 2-3 business days. Free shipping!', 'success')"
                  class="px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-400 font-bold text-xs rounded-xl"
                >
                  Check
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                <div class="flex items-center gap-1">
                  <mat-icon class="!w-3.5 !h-3.5 text-emerald-400">check_circle</mat-icon>
                  <span>100% Original Guarantee</span>
                </div>
                <div class="flex items-center gap-1">
                  <mat-icon class="!w-3.5 !h-3.5 text-emerald-400">sync</mat-icon>
                  <span>14 Days Easy Return</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- CUSTOMER REVIEWS & RATINGS SECTION -->
        <section class="mt-16 pt-8 border-t border-white/5 space-y-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                Customer Ratings &amp; Reviews
              </h2>
              <p class="text-xs text-slate-400 mt-1">Verified buyer impressions and styling feedback</p>
            </div>
            <button 
              type="button" 
              (click)="showReviewModal.set(true)"
              class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all hover:border-[#FF2A6D]"
            >
              <mat-icon class="!w-4 !h-4 text-[#FF2A6D]">rate_review</mat-icon>
              <span>Write a Review</span>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Overall Score & Rating Bars -->
            <div class="lg:col-span-4 p-6 rounded-2xl bg-[#12141f] border border-white/5 space-y-5">
              <div class="flex items-baseline gap-3">
                <span class="text-4xl font-extrabold text-white">{{ product().rating }}</span>
                <div class="flex items-center text-amber-400">
                  <mat-icon class="!w-5 !h-5 text-amber-400">star</mat-icon>
                  <mat-icon class="!w-5 !h-5 text-amber-400">star</mat-icon>
                  <mat-icon class="!w-5 !h-5 text-amber-400">star</mat-icon>
                  <mat-icon class="!w-5 !h-5 text-amber-400">star</mat-icon>
                  <mat-icon class="!w-5 !h-5 text-amber-400">star_half</mat-icon>
                </div>
                <span class="text-xs text-slate-400">({{ product().ratingCount }} Verified Ratings)</span>
              </div>

              <!-- Rating Bars Breakdown -->
              <div class="space-y-2 text-xs">
                <div class="flex items-center gap-2 text-slate-300">
                  <span class="w-6 font-bold">5 ★</span>
                  <div class="flex-1 h-2 rounded-full bg-[#181b26] overflow-hidden">
                    <div class="h-full bg-emerald-400 rounded-full" style="width: 82%"></div>
                  </div>
                  <span class="w-8 text-right text-slate-400">82%</span>
                </div>
                <div class="flex items-center gap-2 text-slate-300">
                  <span class="w-6 font-bold">4 ★</span>
                  <div class="flex-1 h-2 rounded-full bg-[#181b26] overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" style="width: 12%"></div>
                  </div>
                  <span class="w-8 text-right text-slate-400">12%</span>
                </div>
                <div class="flex items-center gap-2 text-slate-300">
                  <span class="w-6 font-bold">3 ★</span>
                  <div class="flex-1 h-2 rounded-full bg-[#181b26] overflow-hidden">
                    <div class="h-full bg-amber-400 rounded-full" style="width: 4%"></div>
                  </div>
                  <span class="w-8 text-right text-slate-400">4%</span>
                </div>
                <div class="flex items-center gap-2 text-slate-300">
                  <span class="w-6 font-bold">2 ★</span>
                  <div class="flex-1 h-2 rounded-full bg-[#181b26] overflow-hidden">
                    <div class="h-full bg-orange-400 rounded-full" style="width: 1%"></div>
                  </div>
                  <span class="w-8 text-right text-slate-400">1%</span>
                </div>
                <div class="flex items-center gap-2 text-slate-300">
                  <span class="w-6 font-bold">1 ★</span>
                  <div class="flex-1 h-2 rounded-full bg-[#181b26] overflow-hidden">
                    <div class="h-full bg-rose-500 rounded-full" style="width: 1%"></div>
                  </div>
                  <span class="w-8 text-right text-slate-400">1%</span>
                </div>
              </div>
            </div>

            <!-- Customer Reviews List -->
            <div class="lg:col-span-8 space-y-4">
              <div class="p-5 rounded-2xl bg-[#161824] border border-white/5 space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1">
                      5 <mat-icon class="!w-3 !h-3 !text-[12px]">star</mat-icon>
                    </span>
                    <h4 class="text-sm font-bold text-white">Insane silhouette and fabric quality!</h4>
                  </div>
                  <span class="text-[11px] text-slate-400">3 days ago</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-300">
                  The cut is tailored to perfection. Color vibrancy under night lighting is incredible. Got tons of compliments on this piece!
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span class="font-semibold text-slate-300">Devansh M.</span>
                  <span>&bull;</span>
                  <span class="text-cyan-400 flex items-center gap-0.5">
                    <mat-icon class="!w-3 !h-3 !text-[12px]">verified</mat-icon> Verified Buyer
                  </span>
                </div>
              </div>

              <div class="p-5 rounded-2xl bg-[#161824] border border-white/5 space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1">
                      5 <mat-icon class="!w-3 !h-3 !text-[12px]">star</mat-icon>
                    </span>
                    <h4 class="text-sm font-bold text-white">True to size and very comfortable</h4>
                  </div>
                  <span class="text-[11px] text-slate-400">1 week ago</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-300">
                  Zippers and hardware feel premium. Shipping was super quick within 2 days to Bangalore.
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span class="font-semibold text-slate-300">Ananya R.</span>
                  <span>&bull;</span>
                  <span class="text-cyan-400 flex items-center gap-0.5">
                    <mat-icon class="!w-3 !h-3 !text-[12px]">verified</mat-icon> Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SIMILAR PRODUCTS CAROUSEL -->
        <section class="mt-16 space-y-6 pt-8 border-t border-white/5">
          <div class="flex items-center justify-between">
            <h2 class="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
              Complete The Nocturnal Look
            </h2>
            <a routerLink="/collection/men" class="text-xs font-bold text-cyan-400 hover:text-cyan-300">
              EXPLORE ALL &rarr;
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            @for (rec of recommendedProducts(); track rec.id) {
              <a 
                [routerLink]="['/product', rec.id]"
                class="group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 cursor-pointer block focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
              >
                <div class="h-56 overflow-hidden bg-[#10121a]">
                  <img 
                    [src]="rec.images[0]" 
                    [alt]="rec.name"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div class="p-3.5 bg-[#191c2b]">
                  <h4 class="text-xs font-bold text-white group-hover:text-[#FF2A6D] transition-colors truncate">
                    {{ rec.name }}
                  </h4>
                  <div class="mt-1 flex items-center justify-between">
                    <span class="text-xs font-bold text-white">₹{{ rec.price }}</span>
                    <span class="text-[11px] text-cyan-400 font-semibold">{{ rec.discountPercent }}% OFF</span>
                  </div>
                </div>
              </a>
            }
          </div>
        </section>

      </main>

      <!-- SIZE CHART MODAL -->
      @if (showSizeChart()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div class="max-w-md w-full rounded-2xl bg-[#161824] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <mat-icon class="text-[#FF2A6D]">straighten</mat-icon> Size Guide ({{ sizeUnit() === 'in' ? 'Inches' : 'CM' }})
              </h3>
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  (click)="toggleSizeUnit()"
                  class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-bold uppercase"
                >
                  Switch to {{ sizeUnit() === 'in' ? 'CM' : 'IN' }}
                </button>
                <button type="button" (click)="showSizeChart.set(false)" class="text-slate-400 hover:text-white">
                  <mat-icon>close</mat-icon>
                </button>
              </div>
            </div>
            <table class="w-full text-xs text-slate-300 text-left border-collapse">
              <thead>
                <tr class="border-b border-white/10 text-white font-bold">
                  <th class="py-2">Size</th>
                  <th class="py-2">Bust / Chest</th>
                  <th class="py-2">Waist</th>
                  <th class="py-2">Length</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                @if (sizeUnit() === 'in') {
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">XS</td><td>34"</td><td>26"</td><td>54"</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">S</td><td>36"</td><td>28"</td><td>55"</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">M</td><td>38"</td><td>30"</td><td>56"</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">L</td><td>40"</td><td>32"</td><td>57"</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">XL</td><td>42"</td><td>34"</td><td>58"</td></tr>
                } @else {
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">XS</td><td>86 cm</td><td>66 cm</td><td>137 cm</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">S</td><td>91 cm</td><td>71 cm</td><td>140 cm</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">M</td><td>96 cm</td><td>76 cm</td><td>142 cm</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">L</td><td>101 cm</td><td>81 cm</td><td>145 cm</td></tr>
                  <tr><td class="py-2 font-bold text-[#FF2A6D]">XL</td><td>106 cm</td><td>86 cm</td><td>147 cm</td></tr>
                }
              </tbody>
            </table>
            <button 
              type="button" 
              (click)="showSizeChart.set(false)"
              class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      }

      <!-- WRITE A REVIEW MODAL -->
      @if (showReviewModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div class="max-w-md w-full rounded-3xl bg-[#161824] border border-white/10 p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <mat-icon class="text-[#FF2A6D]">rate_review</mat-icon> Rate &amp; Review Product
              </h3>
              <button type="button" (click)="showReviewModal.set(false)" class="text-slate-400 hover:text-white">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Star Selection -->
            <div class="space-y-1.5">
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-300">Your Rating</span>
              <div class="flex items-center gap-2">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <button 
                    type="button" 
                    (click)="userRatingScore.set(star)"
                    class="p-1 text-2xl transition-colors cursor-pointer"
                    [class.text-amber-400]="star <= userRatingScore()"
                    [class.text-slate-600]="star > userRatingScore()"
                  >
                    ★
                  </button>
                }
              </div>
            </div>

            <!-- Review Title -->
            <div class="space-y-1.5">
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-300">Headline</span>
              <input 
                type="text" 
                placeholder="e.g. Great fit, stunning color!"
                class="w-full bg-[#181b26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2A6D]"
              />
            </div>

            <!-- Review Details -->
            <div class="space-y-1.5">
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-300">Detailed Feedback</span>
              <textarea 
                rows="3"
                placeholder="Share your thoughts on material, sizing, styling and comfort..."
                class="w-full bg-[#181b26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2A6D]"
              ></textarea>
            </div>

            <div class="flex gap-3 pt-2">
              <button 
                type="button" 
                (click)="showReviewModal.set(false)"
                class="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase"
              >
                Cancel
              </button>
              <button 
                type="button" 
                (click)="submitReview()"
                class="flex-1 py-3 rounded-xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-bold text-xs uppercase shadow-[0_0_15px_rgba(255,42,109,0.4)]"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly shopService = inject(ShopService);

  readonly productId = signal<string>('prod-rosa-jumpsuit');
  readonly selectedImageIndex = signal<number>(0);
  readonly selectedSize = signal<string>('M');
  readonly showSizeChart = signal<boolean>(false);
  readonly sizeUnit = signal<'in' | 'cm'>('in');
  readonly showReviewModal = signal<boolean>(false);
  readonly userRatingScore = signal<number>(5);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'prod-rosa-jumpsuit';
      this.productId.set(id);
      this.selectedImageIndex.set(0);
      const prod = this.shopService.getProductById(id);
      if (prod && prod.sizes.length > 0) {
        this.selectedSize.set(prod.sizes[0]);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  readonly product = computed<Product>(() => {
    const prod = this.shopService.getProductById(this.productId());
    return prod || this.shopService.products()[0];
  });

  readonly currentImage = computed(() => {
    const images = this.product().images;
    const idx = this.selectedImageIndex();
    return images[idx] || images[0];
  });

  readonly recommendedProducts = computed(() => {
    return this.shopService.products().filter(p => p.id !== this.productId()).slice(0, 4);
  });

  isInWishlist(): boolean {
    return this.shopService.isInWishlist(this.product().id);
  }

  toggleWishlist() {
    this.shopService.toggleWishlist(this.product().id);
  }

  addToBag() {
    this.shopService.addToCart(this.product(), this.selectedSize(), 1);
  }

  toggleSizeUnit() {
    this.sizeUnit.update(u => u === 'in' ? 'cm' : 'in');
  }

  submitReview() {
    this.showReviewModal.set(false);
    this.shopService.showToast('Thank you! Your verified review has been submitted.', 'success');
  }
}
