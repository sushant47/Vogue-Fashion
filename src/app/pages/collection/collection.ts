import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, FormsModule],
  template: `
    <div class="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <a routerLink="/" class="hover:text-white transition-colors">Home</a>
          <mat-icon class="!w-3.5 !h-3.5 !text-xs">chevron_right</mat-icon>
          <span class="text-[#FF2A6D] font-medium">{{ collectionCategoryName() }}'s Wear</span>
        </nav>

        <!-- Heading & Subheading -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {{ collectionTitle() }}
          </h1>
          <p class="text-slate-400 text-sm mt-1">
            Discover the latest trends in {{ collectionCategoryName().toLowerCase() }}'s fashion.
          </p>
        </div>

        <!-- Layout Grid: Sidebar Filters + Main Product Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- MOBILE FILTER TOGGLE BAR -->
          <div class="lg:hidden col-span-1 flex items-center justify-between p-3 rounded-xl bg-[#161824] border border-white/5">
            <span class="text-sm font-bold text-white flex items-center gap-1.5">
              <mat-icon class="text-[#FF2A6D]">tune</mat-icon> Filters &amp; Sorting
            </span>
            <button 
              type="button" 
              (click)="mobileFiltersOpen.set(!mobileFiltersOpen())"
              class="px-3 py-1.5 rounded-lg bg-[#FF2A6D] text-white text-xs font-bold"
            >
              {{ mobileFiltersOpen() ? 'Close Filters' : 'Filter Products' }}
            </button>
          </div>

          <!-- SIDEBAR FILTERS (Desktop & Mobile Drawer) -->
          <aside 
            class="lg:col-span-3 bg-[#12141f] rounded-2xl p-5 border border-white/5 space-y-6"
            [class.hidden]="!mobileFiltersOpen() && isMobile()"
            [class.block]="mobileFiltersOpen() || !isMobile()"
          >
            <!-- Filter Header -->
            <div class="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 class="text-sm font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 text-[#FF2A6D]">filter_list</mat-icon>
                Filters
              </h2>
              <button 
                type="button" 
                (click)="clearAllFilters()"
                class="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
              >
                CLEAR ALL
              </button>
            </div>

            <!-- CATEGORIES -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                CATEGORIES
              </h3>
              <div class="space-y-2 text-xs sm:text-sm">
                @for (cat of availableSubcategories(); track cat.name) {
                  <label class="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer group">
                    <div class="flex items-center gap-2.5">
                      <input 
                        type="checkbox" 
                        [checked]="isSubcategorySelected(cat.name)"
                        (change)="toggleSubcategory(cat.name)"
                        class="w-4 h-4 rounded bg-[#1c1f2e] border-white/20 text-[#FF2A6D] focus:ring-[#FF2A6D] accent-[#FF2A6D]"
                      />
                      <span class="group-hover:text-white">{{ cat.name }}</span>
                    </div>
                    <span class="text-slate-500 text-xs">({{ cat.count }})</span>
                  </label>
                }
              </div>
            </div>

            <hr class="border-white/5" />

            <!-- BRANDS -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                BRANDS
              </h3>
              <!-- Brand Search Box -->
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Search brands..."
                  [value]="brandSearchText()"
                  (input)="onBrandSearch($event)"
                  class="w-full pl-3 pr-8 py-1.5 bg-[#181b26] border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF2A6D]"
                />
                <mat-icon class="absolute right-2.5 top-2 !w-3.5 !h-3.5 !text-xs text-slate-500">search</mat-icon>
              </div>

              <!-- Brand List -->
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs sm:text-sm">
                @for (brand of filteredBrandsList(); track brand) {
                  <label class="flex items-center gap-2.5 text-slate-300 hover:text-white cursor-pointer">
                    <input 
                      type="checkbox" 
                      [checked]="isBrandSelected(brand)"
                      (change)="toggleBrand(brand)"
                      class="w-4 h-4 rounded bg-[#1c1f2e] border-white/20 text-[#FF2A6D] focus:ring-[#FF2A6D] accent-[#FF2A6D]"
                    />
                    <span>{{ brand }}</span>
                  </label>
                }
              </div>
            </div>

            <hr class="border-white/5" />

            <!-- PRICE RANGE -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                PRICE
              </h3>
              <div class="space-y-2 text-xs sm:text-sm">
                @for (range of priceRanges; track range.id) {
                  <label class="flex items-center gap-2.5 text-slate-300 hover:text-white cursor-pointer">
                    <input 
                      type="checkbox" 
                      [checked]="selectedPriceRange() === range.id"
                      (change)="selectPriceRange(range.id)"
                      class="w-4 h-4 rounded bg-[#1c1f2e] border-white/20 text-[#FF2A6D] focus:ring-[#FF2A6D] accent-[#FF2A6D]"
                    />
                    <span>{{ range.label }}</span>
                  </label>
                }
              </div>
            </div>

            <hr class="border-white/5" />

            <!-- DISCOUNT -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                DISCOUNT
              </h3>
              <div class="space-y-2 text-xs sm:text-sm">
                @for (disc of discountOptions; track disc.value) {
                  <label class="flex items-center gap-2.5 text-slate-300 hover:text-white cursor-pointer">
                    <input 
                      type="radio" 
                      name="discountFilter"
                      [checked]="selectedDiscount() === disc.value"
                      (change)="selectDiscount(disc.value)"
                      class="w-4 h-4 bg-[#1c1f2e] border-white/20 text-[#FF2A6D] focus:ring-[#FF2A6D] accent-[#FF2A6D]"
                    />
                    <span>{{ disc.label }}</span>
                  </label>
                }
              </div>
            </div>

          </aside>

          <!-- MAIN PRODUCT LISTING -->
          <section class="lg:col-span-9 space-y-6">
            
            <!-- Top Controls Bar: Results Count & Sort Dropdown -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#12141f] border border-white/5">
              <span class="text-xs sm:text-sm text-slate-300 font-medium">
                Showing <strong class="text-white">1 - {{ filteredProducts().length }}</strong> of <strong class="text-white">1245</strong> items
              </span>

              <!-- Sort By Dropdown -->
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">SORT BY:</span>
                <select 
                  id="sort-by-select"
                  [value]="sortBy()"
                  (change)="onSortChange($event)"
                  class="bg-[#181b26] border border-white/10 text-slate-200 text-xs sm:text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF2A6D] cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Better Discount</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            <!-- Product Cards Grid (4 columns on large screens) -->
            @if (filteredProducts().length === 0) {
              <div class="text-center py-16 bg-[#12141f] rounded-2xl border border-white/5 p-8">
                <mat-icon class="!w-12 !h-12 !text-4xl text-slate-500 mb-3">inventory_2</mat-icon>
                <h3 class="text-lg font-bold text-white">No products found</h3>
                <p class="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                  Try adjusting your filter settings or search query to find what you are looking for.
                </p>
                <button 
                  type="button" 
                  (click)="clearAllFilters()"
                  class="mt-4 px-5 py-2 rounded-xl bg-[#FF2A6D] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                @for (prod of paginatedProducts(); track prod.id) {
                  <a 
                    [routerLink]="['/product', prod.id]"
                    class="group relative rounded-2xl bg-[#161824] border border-white/5 overflow-hidden hover:border-[#FF2A6D]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2A6D]"
                  >
                    <!-- Wishlist Toggle Button on top-right -->
                    <button 
                      type="button"
                      (click)="toggleWishlist($event, prod.id)"
                      class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-[#FF2A6D] transition-colors"
                      aria-label="Wishlist"
                    >
                      <mat-icon class="!w-4 !h-4" [class.text-[#FF2A6D]]="isInWishlist(prod.id)">
                        {{ isInWishlist(prod.id) ? 'favorite' : 'favorite_border' }}
                      </mat-icon>
                    </button>

                    <!-- Product Image Area -->
                    <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-[#10121a]">
                      <img 
                        [src]="prod.images[0]" 
                        [alt]="prod.name"
                        referrerpolicy="no-referrer"
                        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <!-- Overlay Promo Badge if defined (matching screenshot promo overlays) -->
                      @if (prod.promoCard) {
                        <div class="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-[#fff2e6]/95 text-slate-900 text-center shadow-lg border border-amber-200">
                          <p class="text-[11px] font-bold text-slate-800 leading-tight uppercase">{{ prod.promoCard.headline }}</p>
                          <p class="text-base font-extrabold text-amber-900 leading-none my-0.5">{{ prod.promoCard.discountText }}</p>
                          <span class="text-[10px] font-bold text-slate-700 underline tracking-wide">{{ prod.promoCard.actionText }}</span>
                        </div>
                      }
                    </div>

                    <!-- Card Body Details -->
                    <div class="p-4 bg-[#191c2b] border-t border-white/5 flex flex-col justify-between flex-1">
                      <div>
                        <!-- Brand -->
                        <h4 class="text-sm font-bold text-white group-hover:text-[#FF2A6D] transition-colors line-clamp-1">
                          {{ prod.brand }}
                        </h4>
                        <!-- Name -->
                        <p class="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {{ prod.name }}
                        </p>
                      </div>

                      <!-- Price & Discount -->
                      <div class="mt-3 flex items-center justify-between">
                        <div class="flex items-baseline gap-1.5">
                          <span class="text-sm font-bold text-white">₹{{ prod.price }}</span>
                          <span class="text-xs line-through text-slate-500">₹{{ prod.originalPrice }}</span>
                        </div>
                        <span class="text-xs text-cyan-400 font-bold">({{ prod.discountPercent }}% OFF)</span>
                      </div>
                    </div>
                  </a>
                }
              </div>
            }

            <!-- Pagination Bar matching Screenshot -->
            <div class="flex items-center justify-center gap-2 pt-8">
              <button 
                type="button" 
                (click)="setPage(currentPage() - 1)"
                [disabled]="currentPage() === 1"
                class="w-9 h-9 rounded-full bg-[#161824] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous Page"
              >
                <mat-icon class="!w-4 !h-4">chevron_left</mat-icon>
              </button>

              <button 
                type="button" 
                (click)="setPage(1)"
                [class.bg-[#FF2A6D]]="currentPage() === 1"
                [class.text-white]="currentPage() === 1"
                [class.bg-[#161824]]="currentPage() !== 1"
                [class.text-slate-300]="currentPage() !== 1"
                class="w-9 h-9 rounded-full border border-white/10 font-bold text-xs flex items-center justify-center hover:border-[#FF2A6D]"
              >
                1
              </button>

              <button 
                type="button" 
                (click)="setPage(2)"
                [class.bg-[#FF2A6D]]="currentPage() === 2"
                [class.text-white]="currentPage() === 2"
                [class.bg-[#161824]]="currentPage() !== 2"
                [class.text-slate-300]="currentPage() !== 2"
                class="w-9 h-9 rounded-full border border-white/10 font-bold text-xs flex items-center justify-center hover:border-[#FF2A6D]"
              >
                2
              </button>

              <button 
                type="button" 
                (click)="setPage(3)"
                [class.bg-[#FF2A6D]]="currentPage() === 3"
                [class.text-white]="currentPage() === 3"
                [class.bg-[#161824]]="currentPage() !== 3"
                [class.text-slate-300]="currentPage() !== 3"
                class="w-9 h-9 rounded-full border border-white/10 font-bold text-xs flex items-center justify-center hover:border-[#FF2A6D]"
              >
                3
              </button>

              <span class="text-slate-500 px-1">...</span>

              <button 
                type="button" 
                (click)="setPage(10)"
                [class.bg-[#FF2A6D]]="currentPage() === 10"
                [class.text-white]="currentPage() === 10"
                [class.bg-[#161824]]="currentPage() !== 10"
                [class.text-slate-300]="currentPage() !== 10"
                class="w-9 h-9 rounded-full border border-white/10 font-bold text-xs flex items-center justify-center hover:border-[#FF2A6D]"
              >
                10
              </button>

              <button 
                type="button" 
                (click)="setPage(currentPage() + 1)"
                [disabled]="currentPage() === 10"
                class="w-9 h-9 rounded-full bg-[#161824] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next Page"
              >
                <mat-icon class="!w-4 !h-4">chevron_right</mat-icon>
              </button>
            </div>

          </section>

        </div>
      </main>
    </div>
  `
})
export class CollectionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);

  readonly allProducts = this.shopService.products;
  readonly globalSearch = this.shopService.searchQuery;

  readonly categoryParam = signal<string>('men');
  readonly selectedSubcategories = signal<string[]>([]);
  readonly selectedBrands = signal<string[]>([]);
  readonly selectedPriceRange = signal<string | null>(null);
  readonly selectedDiscount = signal<number | null>(null);
  readonly brandSearchText = signal<string>('');
  readonly sortBy = signal<string>('recommended');
  readonly currentPage = signal<number>(1);
  readonly mobileFiltersOpen = signal<boolean>(false);

  readonly priceRanges = [
    { id: 'under-999', label: 'Under ₹999', min: 0, max: 999 },
    { id: '1000-1999', label: '₹1000 - ₹1999', min: 1000, max: 1999 },
    { id: '2000-3999', label: '₹2000 - ₹3999', min: 2000, max: 3999 },
    { id: 'over-4000', label: 'Over ₹4000', min: 4000, max: 999999 }
  ];

  readonly discountOptions = [
    { value: 50, label: '50% and above' },
    { value: 40, label: '40% and above' },
    { value: 30, label: '30% and above' }
  ];

  readonly allBrands = [
    'Puma', 'Levis', 'Adidas', 'Roadster', 'Louis Philippe', 'US Polo Assn', 'H&M', 'Fossil', 'VOGUE_VIBE EXCLUSIVE', 'URBAN STRIDE'
  ];

  constructor() {
    this.route.paramMap.subscribe(params => {
      const cat = params.get('category') || 'men';
      this.categoryParam.set(cat);
      this.currentPage.set(1);
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const q = queryParams.get('q');
      if (q) {
        this.shopService.setSearchQuery(q);
      }
    });
  }

  readonly collectionTitle = computed(() => {
    const cat = this.categoryParam();
    if (cat === 'women') return "Women's Collection";
    if (cat === 'kids') return "Kids' Collection";
    if (cat === 'home') return "Home & Living";
    if (cat === 'beauty') return "Beauty & Accessories";
    return "Men's Collection";
  });

  readonly collectionCategoryName = computed(() => {
    const cat = this.categoryParam();
    if (cat === 'women') return "Women";
    if (cat === 'kids') return "Kids";
    if (cat === 'home') return "Home";
    if (cat === 'beauty') return "Beauty";
    return "Men";
  });

  readonly availableSubcategories = computed(() => {
    return [
      { name: 'T-Shirts', count: 124 },
      { name: 'Casual Shirts', count: 89 },
      { name: 'Jeans', count: 156 },
      { name: 'Jackets', count: 42 },
      { name: 'Sneakers', count: 78 },
      { name: 'Accessories', count: 35 }
    ];
  });

  readonly filteredBrandsList = computed(() => {
    const q = this.brandSearchText().toLowerCase();
    if (!q) return this.allBrands;
    return this.allBrands.filter(b => b.toLowerCase().includes(q));
  });

  readonly filteredProducts = computed(() => {
    const cat = this.categoryParam();
    const subcats = this.selectedSubcategories();
    const brands = this.selectedBrands();
    const priceId = this.selectedPriceRange();
    const minDisc = this.selectedDiscount();
    const search = this.globalSearch().toLowerCase().trim();
    const sort = this.sortBy();

    let items = this.allProducts().filter(p => {
      // Category filter (if category is specified, match or keep broader products if none match)
      if (['men', 'women', 'kids', 'home', 'beauty'].includes(cat)) {
        if (p.category !== cat) {
          return false;
        }
      }

      // Subcategory filter
      if (subcats.length > 0 && !subcats.includes(p.subCategory)) {
        return false;
      }

      // Brand filter
      if (brands.length > 0 && !brands.includes(p.brand)) {
        return false;
      }

      // Price range
      if (priceId) {
        const range = this.priceRanges.find(r => r.id === priceId);
        if (range && (p.price < range.min || p.price > range.max)) {
          return false;
        }
      }

      // Discount
      if (minDisc !== null && p.discountPercent < minDisc) {
        return false;
      }

      // Global search text
      if (search) {
        const matchName = p.name.toLowerCase().includes(search);
        const matchBrand = p.brand.toLowerCase().includes(search);
        const matchSub = p.subCategory.toLowerCase().includes(search);
        if (!matchName && !matchBrand && !matchSub) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sort === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sort === 'discount') {
      items = [...items].sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sort === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  });

  readonly paginatedProducts = computed(() => {
    return this.filteredProducts();
  });

  isMobile(): boolean {
    return false; // Desktop first, handled by Tailwind responsive classes
  }

  isSubcategorySelected(name: string): boolean {
    return this.selectedSubcategories().includes(name);
  }

  toggleSubcategory(name: string) {
    const current = this.selectedSubcategories();
    if (current.includes(name)) {
      this.selectedSubcategories.set(current.filter(c => c !== name));
    } else {
      this.selectedSubcategories.set([...current, name]);
    }
  }

  isBrandSelected(brand: string): boolean {
    return this.selectedBrands().includes(brand);
  }

  toggleBrand(brand: string) {
    const current = this.selectedBrands();
    if (current.includes(brand)) {
      this.selectedBrands.set(current.filter(b => b !== brand));
    } else {
      this.selectedBrands.set([...current, brand]);
    }
  }

  onBrandSearch(event: Event) {
    this.brandSearchText.set((event.target as HTMLInputElement).value);
  }

  selectPriceRange(rangeId: string) {
    if (this.selectedPriceRange() === rangeId) {
      this.selectedPriceRange.set(null);
    } else {
      this.selectedPriceRange.set(rangeId);
    }
  }

  selectDiscount(discount: number) {
    if (this.selectedDiscount() === discount) {
      this.selectedDiscount.set(null);
    } else {
      this.selectedDiscount.set(discount);
    }
  }

  onSortChange(event: Event) {
    this.sortBy.set((event.target as HTMLSelectElement).value);
  }

  clearAllFilters() {
    this.selectedSubcategories.set([]);
    this.selectedBrands.set([]);
    this.selectedPriceRange.set(null);
    this.selectedDiscount.set(null);
    this.brandSearchText.set('');
    this.shopService.setSearchQuery('');
    this.shopService.showToast('Filters reset.', 'info');
  }

  setPage(page: number) {
    if (page >= 1 && page <= 10) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isInWishlist(id: string): boolean {
    return this.shopService.isInWishlist(id);
  }

  toggleWishlist(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.shopService.toggleWishlist(id);
  }
}
