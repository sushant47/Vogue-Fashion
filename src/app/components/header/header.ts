import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShopService } from '../../services/shop.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule, FormsModule],
  template: `
    <header class="sticky top-0 z-40 w-full bg-[#0c0e14]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        <!-- Mobile Menu Toggle Button -->
        <button 
          id="mobile-menu-btn"
          type="button" 
          (click)="toggleMobileMenu()"
          class="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>

        <!-- Brand Logo -->
        <a 
          id="brand-logo-link"
          routerLink="/" 
          class="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span class="text-2xl sm:text-3xl font-black tracking-wider text-[#FF2A6D] font-['Outfit',sans-serif] drop-shadow-[0_0_12px_rgba(255,42,109,0.4)] group-hover:opacity-90 transition-opacity">
            VOGUE_VIBE
          </span>
        </a>

        <!-- Desktop Navigation Categories -->
        <nav class="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-300">
          <a 
            id="nav-men-link"
            routerLink="/collection/men" 
            routerLinkActive="text-white border-b-2 border-[#FF2A6D] pb-1 font-bold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Men
          </a>
          <a 
            id="nav-women-link"
            routerLink="/collection/women" 
            routerLinkActive="text-white border-b-2 border-[#FF2A6D] pb-1 font-bold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Women
          </a>
          <a 
            id="nav-kids-link"
            routerLink="/collection/kids" 
            routerLinkActive="text-white border-b-2 border-[#FF2A6D] pb-1 font-bold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Kids
          </a>
          <a 
            id="nav-home-link"
            routerLink="/collection/home" 
            routerLinkActive="text-white border-b-2 border-[#FF2A6D] pb-1 font-bold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Home &amp; Living
          </a>
          <a 
            id="nav-beauty-link"
            routerLink="/collection/beauty" 
            routerLinkActive="text-white border-b-2 border-[#FF2A6D] pb-1 font-bold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Beauty
          </a>
        </nav>

        <!-- Right Action Items: Search, Wishlist, Bag, Profile -->
        <div class="flex items-center gap-3 sm:gap-5">
          
          <!-- Search Bar (Desktop) with Live Autocomplete Dropdown -->
          <div class="relative hidden sm:block w-48 md:w-72">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <mat-icon class="!w-4 !h-4 !text-base">search</mat-icon>
            </div>
            <input 
              id="header-search-input"
              type="text" 
              placeholder="Search products, brands..."
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              (focus)="isSearchFocused.set(true)"
              (keydown.enter)="executeSearch()"
              class="w-full pl-9 pr-8 py-1.5 bg-[#181b26] border border-white/10 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#FF2A6D] focus:ring-1 focus:ring-[#FF2A6D] transition-all"
            />
            @if (searchQuery()) {
              <button 
                type="button" 
                (click)="clearSearch()"
                class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
              >
                <mat-icon class="!w-4 !h-4 !text-sm">close</mat-icon>
              </button>
            }

            <!-- Live Search Suggestions Dropdown -->
            @if (isSearchFocused() && searchQuery().trim().length > 1) {
              <div 
                class="absolute left-0 right-0 top-full mt-2 bg-[#12141f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-200"
              >
                <div class="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between border-b border-white/5">
                  <span>Quick Results ({{ searchResults().length }})</span>
                  <button 
                    type="button"
                    (click)="isSearchFocused.set(false)"
                    class="text-slate-400 hover:text-white"
                  >
                    Esc
                  </button>
                </div>

                @if (searchResults().length === 0) {
                  <div class="py-4 text-center text-xs text-slate-400">
                    No products found for "{{ searchQuery() }}"
                  </div>
                } @else {
                  <div class="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scroll">
                    @for (prod of searchResults(); track prod.id) {
                      <a 
                        [routerLink]="['/product', prod.id]" 
                        (click)="selectSearchResult()"
                        class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                      >
                        <img 
                          [src]="prod.images[0]" 
                          [alt]="prod.name" 
                          referrerpolicy="no-referrer"
                          class="w-10 h-12 object-cover rounded-lg bg-black/40 shrink-0"
                        />
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-bold text-white group-hover:text-[#FF2A6D] truncate transition-colors">
                            {{ prod.name }}
                          </p>
                          <p class="text-[10px] text-slate-400 capitalize">{{ prod.brand }} &bull; {{ prod.category }}</p>
                        </div>
                        <div class="text-right shrink-0">
                          <span class="text-xs font-bold text-[#FF2A6D]">₹{{ prod.price }}</span>
                          <span class="block text-[9px] text-cyan-400">{{ prod.discountPercent }}% off</span>
                        </div>
                      </a>
                    }
                  </div>
                  <button 
                    type="button"
                    (click)="executeSearch()"
                    class="w-full py-2 text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    View All Results &rarr;
                  </button>
                }
              </div>
            }
          </div>

          <!-- Mobile Search Toggle -->
          <button 
            type="button"
            (click)="showMobileSearch.set(!showMobileSearch())"
            class="sm:hidden p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/5"
            aria-label="Search"
          >
            <mat-icon>search</mat-icon>
          </button>

          <!-- Wishlist Heart Button -->
          <a 
            id="header-wishlist-link"
            routerLink="/wishlist" 
            class="relative p-2 text-slate-300 hover:text-[#FF2A6D] rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="View Wishlist"
          >
            <mat-icon>favorite_border</mat-icon>
            @if (wishlistCount() > 0) {
              <span class="absolute top-1 right-1 w-4 h-4 bg-[#FF2A6D] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,42,109,0.6)]">
                {{ wishlistCount() }}
              </span>
            }
          </a>

          <!-- Shopping Bag Button -->
          <a 
            id="header-bag-link"
            routerLink="/bag" 
            class="relative p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Shopping Bag"
          >
            <mat-icon>shopping_bag</mat-icon>
            @if (cartCount() > 0) {
              <span class="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-[#FF2A6D] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,42,109,0.7)] animate-pulse">
                {{ cartCount() }}
              </span>
            }
          </a>

          <!-- User Account VIP Icon -->
          <button 
            id="header-profile-btn"
            type="button"
            (click)="showProfileModal.set(true)"
            class="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="User Profile"
          >
            <mat-icon>person_outline</mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Search Expandable Bar -->
      @if (showMobileSearch()) {
        <div class="sm:hidden px-4 pb-3 border-t border-white/5 bg-[#0c0e14]">
          <div class="relative mt-2">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <mat-icon class="!w-4 !h-4">search</mat-icon>
            </div>
            <input 
              type="text" 
              placeholder="Search men, women, jackets, sneakers..."
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              (keydown.enter)="executeSearch()"
              class="w-full pl-9 pr-3 py-2 bg-[#181b26] border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#FF2A6D]"
            />
          </div>
        </div>
      }

      <!-- Mobile Menu Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t border-white/10 bg-[#12141f] px-4 py-5 shadow-2xl transition-all">
          <div class="flex flex-col space-y-3 font-semibold">
            <a 
              routerLink="/collection/men" 
              (click)="mobileMenuOpen.set(false)"
              class="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[#FF2A6D]"
            >
              <span>Men's Collection</span>
              <mat-icon class="text-xs">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/collection/women" 
              (click)="mobileMenuOpen.set(false)"
              class="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[#FF2A6D]"
            >
              <span>Women's Styles</span>
              <mat-icon class="text-xs">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/collection/kids" 
              (click)="mobileMenuOpen.set(false)"
              class="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[#FF2A6D]"
            >
              <span>Kids</span>
              <mat-icon class="text-xs">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/collection/home" 
              (click)="mobileMenuOpen.set(false)"
              class="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[#FF2A6D]"
            >
              <span>Home &amp; Living</span>
              <mat-icon class="text-xs">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/collection/beauty" 
              (click)="mobileMenuOpen.set(false)"
              class="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[#FF2A6D]"
            >
              <span>Beauty</span>
              <mat-icon class="text-xs">chevron_right</mat-icon>
            </a>
            <div class="pt-3 border-t border-white/5 flex gap-2">
              <a 
                routerLink="/bag"
                (click)="mobileMenuOpen.set(false)"
                class="flex-1 text-center py-2.5 rounded-xl bg-[#FF2A6D] text-white font-bold"
              >
                Shopping Bag ({{ cartCount() }})
              </a>
              <a 
                routerLink="/wishlist"
                (click)="mobileMenuOpen.set(false)"
                class="px-4 py-2.5 rounded-xl bg-white/5 text-white font-bold flex items-center justify-center"
              >
                <mat-icon>favorite</mat-icon>
              </a>
            </div>
          </div>
        </div>
      }

      <!-- VIP Member Profile Modal Drawer -->
      @if (showProfileModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div class="bg-[#12141f] border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              type="button" 
              (click)="showProfileModal.set(false)"
              class="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5"
            >
              <mat-icon>close</mat-icon>
            </button>

            <!-- VIP Badge Header -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2A6D] to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(255,42,109,0.5)]">
                V
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-bold text-white">Vogue Nocturne Elite</h3>
                  <span class="px-2 py-0.5 rounded-full bg-[#FF2A6D]/20 text-[#FF2A6D] text-[10px] font-extrabold uppercase">VIP</span>
                </div>
                <p class="text-xs text-slate-400">member&#64;voguevibe.com</p>
              </div>
            </div>

            <!-- Stats Bar -->
            <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#181b26] border border-white/5">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">VIBE COINS</span>
                <p class="text-xl font-black text-cyan-400">2,450 <span class="text-xs font-normal text-slate-400">pts</span></p>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TIER STATUS</span>
                <p class="text-sm font-bold text-[#FF2A6D]">Diamond Tier</p>
              </div>
            </div>

            <!-- Quick Access Links -->
            <div class="space-y-2">
              <a 
                routerLink="/wishlist" 
                (click)="showProfileModal.set(false)"
                class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-200 transition-colors"
              >
                <div class="flex items-center gap-2.5">
                  <mat-icon class="!w-4 !h-4 text-[#FF2A6D]">favorite</mat-icon>
                  <span>My Wishlist ({{ wishlistCount() }})</span>
                </div>
                <mat-icon class="!w-4 !h-4 text-slate-400">chevron_right</mat-icon>
              </a>
              <a 
                routerLink="/bag" 
                (click)="showProfileModal.set(false)"
                class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-200 transition-colors"
              >
                <div class="flex items-center gap-2.5">
                  <mat-icon class="!w-4 !h-4 text-cyan-400">shopping_bag</mat-icon>
                  <span>Shopping Bag ({{ cartCount() }})</span>
                </div>
                <mat-icon class="!w-4 !h-4 text-slate-400">chevron_right</mat-icon>
              </a>
            </div>

            <button 
              type="button" 
              (click)="showProfileModal.set(false); shopService.showToast('Vogue VIP Session active with Free Priority Shipping unlocked!', 'success')"
              class="w-full py-3 rounded-xl bg-[#FF2A6D] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,42,109,0.4)] hover:bg-[#ff1259] transition-all"
            >
              Close Profile
            </button>

          </div>
        </div>
      }

    </header>
  `
})
export class Header {
  readonly shopService = inject(ShopService);
  private readonly router = inject(Router);

  readonly cartCount = this.shopService.cartCount;
  readonly wishlistCount = this.shopService.wishlistCount;
  readonly searchQuery = this.shopService.searchQuery;
  readonly allProducts = this.shopService.products;

  readonly mobileMenuOpen = signal<boolean>(false);
  readonly showMobileSearch = signal<boolean>(false);
  readonly isSearchFocused = signal<boolean>(false);
  readonly showProfileModal = signal<boolean>(false);

  readonly searchResults = computed<Product[]>(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return this.allProducts().filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q))
    ).slice(0, 5);
  });

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.shopService.setSearchQuery(val);
  }

  clearSearch() {
    this.shopService.setSearchQuery('');
  }

  selectSearchResult() {
    this.isSearchFocused.set(false);
    this.showMobileSearch.set(false);
    this.shopService.setSearchQuery('');
  }

  executeSearch() {
    if (this.searchQuery().trim()) {
      this.isSearchFocused.set(false);
      this.router.navigate(['/collection/men'], { queryParams: { q: this.searchQuery() } });
      this.showMobileSearch.set(false);
      this.mobileMenuOpen.set(false);
    }
  }
}

