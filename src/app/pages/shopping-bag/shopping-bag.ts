import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shopping-bag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, FormsModule],
  template: `
    <div class="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        <!-- Header -->
        <div class="flex items-baseline gap-3 mb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Shopping Bag
          </h1>
          <span class="text-slate-400 text-sm font-semibold">
            ({{ cartCount() }} {{ cartCount() === 1 ? 'item' : 'items' }})
          </span>
        </div>

        @if (cartItems().length === 0) {
          <!-- Empty Cart State -->
          <div class="text-center py-20 bg-[#12141f] rounded-3xl border border-white/5 p-8 max-w-xl mx-auto space-y-4">
            <div class="w-20 h-20 rounded-full bg-[#1c1f2e] mx-auto flex items-center justify-center text-slate-400">
              <mat-icon class="!w-10 !h-10 !text-4xl text-[#FF2A6D]">shopping_bag</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-white">Your bag is empty</h2>
            <p class="text-slate-400 text-sm max-w-sm mx-auto">
              Explore our nocturnal luxury collection and add your favorite streetwear pieces to your bag.
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
          <!-- Two-Column Checkout Layout (Matching Image 6) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- LEFT COLUMN: CART ITEMS LIST -->
            <div class="lg:col-span-7 space-y-4">
              
              @for (item of cartItems(); track item.id) {
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#161824] border border-white/5 hover:border-white/10 transition-all">
                  
                  <!-- Remove Item Button (Top Right) -->
                  <button 
                    type="button" 
                    (click)="removeItem(item.id)"
                    class="absolute top-3.5 right-3.5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Remove item"
                  >
                    <mat-icon class="!w-4 !h-4">close</mat-icon>
                  </button>

                  <!-- Product Image -->
                  <div class="w-24 sm:w-28 h-28 sm:h-32 rounded-xl overflow-hidden bg-[#10121a] shrink-0">
                    <img 
                      [src]="item.image" 
                      [alt]="item.name"
                      referrerpolicy="no-referrer"
                      class="w-full h-full object-cover object-center"
                    />
                  </div>

                  <!-- Item Info & Controls -->
                  <div class="flex-1 min-w-0 pr-6 space-y-2">
                    <div>
                      <span class="text-[10px] uppercase font-bold text-[#FF2A6D] tracking-wider block">
                        {{ item.brand }}
                      </span>
                      <h3 class="text-base sm:text-lg font-bold text-white truncate">
                        {{ item.name }}
                      </h3>
                    </div>

                    <!-- Size & Quantity Selectors -->
                    <div class="flex items-center gap-3 pt-1">
                      <!-- Size Dropdown -->
                      <div class="flex items-center gap-1.5 text-xs text-slate-400 bg-[#12141f] border border-white/10 rounded-lg px-2.5 py-1">
                        <span class="font-medium">Size:</span>
                        <select 
                          [value]="item.size" 
                          (change)="onSizeChange(item.id, $event)"
                          class="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                          @for (sz of item.availableSizes; track sz) {
                            <option [value]="sz" class="bg-[#161824] text-white">{{ sz }}</option>
                          }
                        </select>
                      </div>

                      <!-- Quantity Dropdown -->
                      <div class="flex items-center gap-1.5 text-xs text-slate-400 bg-[#12141f] border border-white/10 rounded-lg px-2.5 py-1">
                        <span class="font-medium">Qty:</span>
                        <select 
                          [value]="item.quantity" 
                          (change)="onQtyChange(item.id, $event)"
                          class="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                          <option [value]="1" class="bg-[#161824] text-white">1</option>
                          <option [value]="2" class="bg-[#161824] text-white">2</option>
                          <option [value]="3" class="bg-[#161824] text-white">3</option>
                          <option [value]="4" class="bg-[#161824] text-white">4</option>
                          <option [value]="5" class="bg-[#161824] text-white">5</option>
                        </select>
                      </div>
                    </div>

                    <!-- Price breakdown -->
                    <div class="flex items-baseline gap-2 pt-1">
                      <span class="text-base font-bold text-white">
                        ₹{{ item.price * item.quantity }}
                      </span>
                      @if (item.originalPrice > item.price) {
                        <span class="text-xs line-through text-slate-500">
                          ₹{{ item.originalPrice * item.quantity }}
                        </span>
                      }
                    </div>
                  </div>

                </div>
              }

              <!-- Add More From Wishlist Button -->
              <a 
                routerLink="/wishlist"
                class="flex items-center justify-between p-4 rounded-2xl bg-[#12141f] border border-dashed border-white/10 hover:border-[#FF2A6D]/40 text-slate-300 hover:text-white transition-all group"
              >
                <div class="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                  <mat-icon class="text-[#FF2A6D]">favorite_border</mat-icon>
                  <span>Add more from your wishlist</span>
                </div>
                <mat-icon class="!w-4 !h-4 group-hover:translate-x-1 transition-transform">chevron_right</mat-icon>
              </a>

            </div>

            <!-- RIGHT COLUMN: PROMO BANNER & ORDER SUMMARY -->
            <div class="lg:col-span-5 space-y-6">
              
              <!-- FESTIVE GLOW BANNER (Matching Image 6) -->
              <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d2238] via-[#123153] to-[#0a4263] border border-cyan-500/30 p-5 shadow-[0_0_25px_rgba(5,217,232,0.2)]">
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <span class="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                      FESTIVE GLOW
                    </span>
                    <h4 class="text-sm sm:text-base font-black text-white tracking-wide">
                      USE CODE: <span class="text-cyan-300 font-mono">NEON20</span>
                    </h4>
                    <p class="text-xs text-slate-300">
                      Get extra 20% off on all orders above ₹1,000
                    </p>
                  </div>
                  <button 
                    type="button" 
                    (click)="applyNeonCode()"
                    class="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <!-- COUPONS INPUT SECTION -->
              <div class="p-5 rounded-2xl bg-[#161824] border border-white/5 space-y-3">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <mat-icon class="!w-4 !h-4 text-[#FF2A6D]">local_offer</mat-icon>
                  APPLY COUPON
                </span>

                <div class="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code"
                    [(ngModel)]="couponInputText"
                    (keydown.enter)="applyCustomCoupon()"
                    class="flex-1 bg-[#12141f] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-[#FF2A6D]"
                  />
                  <button 
                    type="button" 
                    (click)="applyCustomCoupon()"
                    class="px-5 py-2 bg-[#FF2A6D] hover:bg-[#ff145e] text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all"
                  >
                    APPLY
                  </button>
                </div>

                @if (appliedCoupon(); as coup) {
                  <div class="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                    <div class="flex items-center gap-1.5">
                      <mat-icon class="!w-4 !h-4 text-emerald-400">check_circle</mat-icon>
                      <span>Coupon <strong>{{ coup.code }}</strong> applied ({{ coup.discountPercent }}% OFF)</span>
                    </div>
                    <button type="button" (click)="shopService.removeCoupon()" class="text-slate-400 hover:text-white p-1">
                      <mat-icon class="!w-3.5 !h-3.5">close</mat-icon>
                    </button>
                  </div>
                }
              </div>

              <!-- ORDER SUMMARY (Matching Image 6) -->
              <div class="p-6 rounded-2xl bg-[#161824] border border-white/5 space-y-4">
                
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-white/5">
                  PRICE DETAILS ({{ cartCount() }} Items)
                </h3>

                <div class="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <!-- Total MRP -->
                  <div class="flex justify-between">
                    <span>Total MRP</span>
                    <span class="text-white font-medium">₹{{ cartSubtotal() }}</span>
                  </div>

                  <!-- Discount on MRP -->
                  <div class="flex justify-between text-cyan-400 font-medium">
                    <span>Discount on MRP</span>
                    <span>-₹{{ cartBaseDiscount() }}</span>
                  </div>

                  <!-- Coupon Discount -->
                  @if (cartCouponDiscount() > 0) {
                    <div class="flex justify-between text-emerald-400 font-medium">
                      <span>Coupon Discount</span>
                      <span>-₹{{ cartCouponDiscount() }}</span>
                    </div>
                  }

                  <!-- Convenience / Shipping Fee -->
                  <div class="flex justify-between">
                    <span>Shipping Fee</span>
                    <span class="text-emerald-400 font-bold uppercase">FREE</span>
                  </div>
                </div>

                <hr class="border-white/5" />

                <!-- Total Amount -->
                <div class="flex justify-between items-baseline pt-1">
                  <span class="text-base font-bold text-white">Total Amount</span>
                  <span class="text-2xl font-extrabold text-[#FF2A6D]">
                    ₹{{ cartGrandTotal() }}
                  </span>
                </div>

                <!-- PLACE ORDER BUTTON -->
                <button 
                  id="place-order-btn"
                  type="button" 
                  (click)="openCheckoutModal()"
                  class="w-full py-4 rounded-2xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,42,109,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <span>PLACE ORDER</span>
                  <mat-icon class="!w-4 !h-4">arrow_forward</mat-icon>
                </button>

                <!-- Security Trust Label -->
                <div class="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <mat-icon class="!w-3.5 !h-3.5 text-cyan-400">lock</mat-icon>
                  <span>256-Bit SSL Encrypted Secure Checkout</span>
                </div>

              </div>

            </div>

          </div>
        }

      </main>

      <!-- MULTI-STEP CHECKOUT & CONFIRMATION MODAL -->
      @if (checkoutStep() > 0) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          
          <!-- STEP 1: ADDRESS SELECTION -->
          @if (checkoutStep() === 1) {
            <div class="max-w-lg w-full rounded-3xl bg-[#161824] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span class="text-[10px] font-bold text-[#FF2A6D] uppercase tracking-widest">Step 1 of 2</span>
                  <h3 class="text-xl font-bold text-white">Select Delivery Address</h3>
                </div>
                <button type="button" (click)="checkoutStep.set(0)" class="text-slate-400 hover:text-white">
                  <mat-icon>close</mat-icon>
                </button>
              </div>

              <!-- Address Cards -->
              <div class="space-y-3">
                <button 
                  type="button"
                  (click)="selectedAddress.set('home')"
                  class="w-full text-left flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all focus:outline-none"
                  [class.border-[#FF2A6D]]="selectedAddress() === 'home'"
                  [class.bg-[#1a1325]]="selectedAddress() === 'home'"
                  [class.border-white/10]="selectedAddress() !== 'home'"
                  [class.bg-[#12141f]]="selectedAddress() !== 'home'"
                >
                  <mat-icon class="mt-0.5 text-xs" [class.text-[#FF2A6D]]="selectedAddress() === 'home'" [class.text-slate-500]="selectedAddress() !== 'home'">
                    {{ selectedAddress() === 'home' ? 'radio_button_checked' : 'radio_button_unchecked' }}
                  </mat-icon>
                  <div class="space-y-1 text-xs">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-white">Alex Mercer (Home)</span>
                      <span class="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold uppercase">Default</span>
                    </div>
                    <p class="text-slate-300">402, Cyber Tower A, Indiranagar 100ft Road</p>
                    <p class="text-slate-400">Bengaluru, Karnataka - 560038 &bull; +91 98765 43210</p>
                  </div>
                </button>

                <button 
                  type="button"
                  (click)="selectedAddress.set('work')"
                  class="w-full text-left flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all focus:outline-none"
                  [class.border-[#FF2A6D]]="selectedAddress() === 'work'"
                  [class.bg-[#1a1325]]="selectedAddress() === 'work'"
                  [class.border-white/10]="selectedAddress() !== 'work'"
                  [class.bg-[#12141f]]="selectedAddress() !== 'work'"
                >
                  <mat-icon class="mt-0.5 text-xs" [class.text-[#FF2A6D]]="selectedAddress() === 'work'" [class.text-slate-500]="selectedAddress() !== 'work'">
                    {{ selectedAddress() === 'work' ? 'radio_button_checked' : 'radio_button_unchecked' }}
                  </mat-icon>
                  <div class="space-y-1 text-xs">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-white">Alex Mercer (Office)</span>
                    </div>
                    <p class="text-slate-300">Tech Hub Nexus, 7th Floor, Whitefield Outer Ring</p>
                    <p class="text-slate-400">Bengaluru, Karnataka - 560066 &bull; +91 98765 43210</p>
                  </div>
                </button>
              </div>

              <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-400">Total Payable: <strong class="text-white">₹{{ cartGrandTotal() }}</strong></span>
                <button 
                  type="button" 
                  (click)="checkoutStep.set(2)"
                  class="px-6 py-3 rounded-xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(255,42,109,0.4)]"
                >
                  <span>Proceed to Pay</span>
                  <mat-icon class="!w-4 !h-4">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          }

          <!-- STEP 2: PAYMENT METHOD -->
          @if (checkoutStep() === 2) {
            <div class="max-w-lg w-full rounded-3xl bg-[#161824] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Step 2 of 2</span>
                  <h3 class="text-xl font-bold text-white">Payment Method</h3>
                </div>
                <button type="button" (click)="checkoutStep.set(1)" class="text-slate-400 hover:text-white">
                  <mat-icon>arrow_back</mat-icon>
                </button>
              </div>

              <!-- Payment Options -->
              <div class="space-y-3">
                <button 
                  type="button"
                  (click)="selectedPayment.set('upi')"
                  class="w-full text-left flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all focus:outline-none"
                  [class.border-[#FF2A6D]]="selectedPayment() === 'upi'"
                  [class.bg-[#1a1325]]="selectedPayment() === 'upi'"
                  [class.border-white/10]="selectedPayment() !== 'upi'"
                  [class.bg-[#12141f]]="selectedPayment() !== 'upi'"
                >
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-cyan-400">qr_code_2</mat-icon>
                    <div>
                      <h4 class="text-xs font-bold text-white">Instant UPI / QR / Google Pay</h4>
                      <p class="text-[10px] text-slate-400">Fast zero-fee payment with instant authorization</p>
                    </div>
                  </div>
                  <mat-icon class="text-xs" [class.text-[#FF2A6D]]="selectedPayment() === 'upi'" [class.text-slate-500]="selectedPayment() !== 'upi'">
                    {{ selectedPayment() === 'upi' ? 'radio_button_checked' : 'radio_button_unchecked' }}
                  </mat-icon>
                </button>

                <button 
                  type="button"
                  (click)="selectedPayment.set('card')"
                  class="w-full text-left flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all focus:outline-none"
                  [class.border-[#FF2A6D]]="selectedPayment() === 'card'"
                  [class.bg-[#1a1325]]="selectedPayment() === 'card'"
                  [class.border-white/10]="selectedPayment() !== 'card'"
                  [class.bg-[#12141f]]="selectedPayment() !== 'card'"
                >
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-emerald-400">credit_card</mat-icon>
                    <div>
                      <h4 class="text-xs font-bold text-white">Credit / Debit Card</h4>
                      <p class="text-[10px] text-slate-400">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <mat-icon class="text-xs" [class.text-[#FF2A6D]]="selectedPayment() === 'card'" [class.text-slate-500]="selectedPayment() !== 'card'">
                    {{ selectedPayment() === 'card' ? 'radio_button_checked' : 'radio_button_unchecked' }}
                  </mat-icon>
                </button>

                <button 
                  type="button"
                  (click)="selectedPayment.set('cod')"
                  class="w-full text-left flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all focus:outline-none"
                  [class.border-[#FF2A6D]]="selectedPayment() === 'cod'"
                  [class.bg-[#1a1325]]="selectedPayment() === 'cod'"
                  [class.border-white/10]="selectedPayment() !== 'cod'"
                  [class.bg-[#12141f]]="selectedPayment() !== 'cod'"
                >
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-amber-400">payments</mat-icon>
                    <div>
                      <h4 class="text-xs font-bold text-white">Cash on Delivery</h4>
                      <p class="text-[10px] text-slate-400">Pay via cash or UPI at delivery doorstep</p>
                    </div>
                  </div>
                  <mat-icon class="text-xs" [class.text-[#FF2A6D]]="selectedPayment() === 'cod'" [class.text-slate-500]="selectedPayment() !== 'cod'">
                    {{ selectedPayment() === 'cod' ? 'radio_button_checked' : 'radio_button_unchecked' }}
                  </mat-icon>
                </button>
              </div>

              <div class="flex items-center justify-between pt-2">
                <button 
                  type="button" 
                  (click)="checkoutStep.set(1)"
                  class="text-xs font-bold text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button 
                  type="button" 
                  (click)="authorizeAndPlaceOrder()"
                  class="px-8 py-3.5 rounded-xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,109,0.5)]"
                >
                  <span>Pay ₹{{ cartGrandTotal() }}</span>
                  <mat-icon class="!w-4 !h-4">check</mat-icon>
                </button>
              </div>
            </div>
          }

          <!-- STEP 3: ORDER SUCCESS STATE WITH TRACKING -->
          @if (checkoutStep() === 3) {
            <div class="max-w-md w-full rounded-3xl bg-[#161824] border border-fuchsia-500/30 p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <mat-icon class="!w-8 !h-8 !text-3xl">check</mat-icon>
              </div>

              <div class="space-y-1">
                <span class="text-xs uppercase tracking-widest text-[#FF2A6D] font-bold">Payment Authorized</span>
                <h2 class="text-2xl font-black text-white font-['Outfit']">Order Confirmed!</h2>
                <p class="text-slate-400 text-xs sm:text-sm">
                  Invoice <strong class="text-cyan-400 font-mono">#VV-{{ orderId() }}</strong> has been created.
                </p>
              </div>

              <!-- Order Tracking Timeline -->
              <div class="p-4 rounded-2xl bg-[#12141f] border border-white/5 text-left text-xs space-y-3 text-slate-300">
                <div class="flex items-center justify-between border-b border-white/5 pb-2">
                  <span class="font-bold text-white">Live Tracking</span>
                  <span class="text-cyan-400 text-[10px] font-semibold uppercase">Processing Dispatch</span>
                </div>
                <div class="space-y-2.5">
                  <div class="flex items-center gap-2.5 text-emerald-400">
                    <mat-icon class="!w-4 !h-4 text-emerald-400">radio_button_checked</mat-icon>
                    <span>Order Placed &amp; Payment Received</span>
                  </div>
                  <div class="flex items-center gap-2.5 text-slate-400">
                    <mat-icon class="!w-4 !h-4">schedule</mat-icon>
                    <span>Packaging &amp; Nocturne Quality Check</span>
                  </div>
                  <div class="flex items-center gap-2.5 text-slate-500">
                    <mat-icon class="!w-4 !h-4">local_shipping</mat-icon>
                    <span>Express Priority Delivery (48 hrs)</span>
                  </div>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-[#181b26] text-left text-xs flex justify-between text-slate-300">
                <span>Amount Paid:</span>
                <span class="font-extrabold text-[#FF2A6D]">₹{{ orderTotal() }}</span>
              </div>

              <button 
                type="button" 
                (click)="finishOrder()"
                class="w-full py-3.5 rounded-xl bg-[#FF2A6D] hover:bg-[#ff1259] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,42,109,0.4)]"
              >
                Continue Shopping
              </button>
            </div>
          }

        </div>
      }

    </div>
  `
})
export class ShoppingBagPage {
  readonly shopService = inject(ShopService);
  private readonly router = inject(Router);

  readonly cartItems = this.shopService.cart;
  readonly cartCount = this.shopService.cartCount;
  readonly cartSubtotal = this.shopService.cartSubtotal;
  readonly cartBaseDiscount = this.shopService.cartBaseDiscount;
  readonly cartCouponDiscount = this.shopService.cartCouponDiscount;
  readonly cartGrandTotal = this.shopService.cartGrandTotal;
  readonly appliedCoupon = this.shopService.appliedCoupon;

  couponInputText = '';
  readonly checkoutStep = signal<number>(0);
  readonly selectedAddress = signal<'home' | 'work'>('home');
  readonly selectedPayment = signal<'upi' | 'card' | 'cod'>('upi');
  readonly orderId = signal<string>('');
  readonly orderItemCount = signal<number>(0);
  readonly orderTotal = signal<number>(0);

  removeItem(cartItemId: string) {
    this.shopService.removeFromCart(cartItemId);
  }

  onSizeChange(cartItemId: string, event: Event) {
    const sz = (event.target as HTMLSelectElement).value;
    this.shopService.updateCartItemSize(cartItemId, sz);
  }

  onQtyChange(cartItemId: string, event: Event) {
    const qty = parseInt((event.target as HTMLSelectElement).value, 10);
    this.shopService.updateCartItemQty(cartItemId, qty);
  }

  applyNeonCode() {
    this.shopService.applyCoupon('NEON20');
  }

  applyCustomCoupon() {
    if (this.couponInputText) {
      const res = this.shopService.applyCoupon(this.couponInputText);
      if (res.success) {
        this.couponInputText = '';
      }
    }
  }

  openCheckoutModal() {
    this.checkoutStep.set(1);
  }

  authorizeAndPlaceOrder() {
    this.orderId.set(Math.floor(100000 + Math.random() * 900000).toString());
    this.orderItemCount.set(this.cartCount());
    this.orderTotal.set(this.cartGrandTotal());
    this.checkoutStep.set(3);
  }

  finishOrder() {
    this.checkoutStep.set(0);
    this.shopService.clearCart();
    this.router.navigate(['/']);
  }
}
