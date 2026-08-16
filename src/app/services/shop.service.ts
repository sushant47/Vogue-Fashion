import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product, Coupon } from '../models/product.model';
import { MOCK_PRODUCTS } from '../data/mock-products';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private readonly productsSignal = signal<Product[]>(MOCK_PRODUCTS);
  
  // Initial cart items matching screenshot (Cyber-Tech Bomber Jacket & Aero-Step Neo Sneakers)
  private readonly cartSignal = signal<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'prod-cyber-tech-bomber',
      name: 'Cyber-Tech Bomber Jacket',
      brand: 'VOGUE_VIBE EXCLUSIVE',
      size: 'M',
      quantity: 1,
      price: 4599,
      originalPrice: 6999,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'cart-2',
      productId: 'prod-aero-step-sneakers',
      name: 'Aero-Step Neo Sneakers',
      brand: 'URBAN STRIDE',
      size: 'UK 9',
      quantity: 1,
      price: 3299,
      originalPrice: 5499,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
    }
  ]);

  private readonly wishlistSignal = signal<string[]>(['prod-rosa-jumpsuit', 'prod-urban-edge-bomber']);
  private readonly appliedCouponSignal = signal<Coupon | null>({
    code: 'NEON20',
    discountPercent: 20,
    minOrder: 1000,
    description: 'Festive Glow 20% Discount'
  });

  private readonly toastsSignal = signal<Toast[]>([]);
  private readonly selectedCategorySignal = signal<string>('all');
  private readonly searchQuerySignal = signal<string>('');

  // Public readonly signals
  readonly products = this.productsSignal.asReadonly();
  readonly cart = this.cartSignal.asReadonly();
  readonly wishlist = this.wishlistSignal.asReadonly();
  readonly appliedCoupon = this.appliedCouponSignal.asReadonly();
  readonly toasts = this.toastsSignal.asReadonly();
  readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  readonly searchQuery = this.searchQuerySignal.asReadonly();

  // Computed state
  readonly cartCount = computed(() => {
    return this.cartSignal().reduce((acc, item) => acc + item.quantity, 0);
  });

  readonly cartSubtotal = computed(() => {
    return this.cartSignal().reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  });

  readonly cartCurrentPrice = computed(() => {
    return this.cartSignal().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });

  readonly cartBaseDiscount = computed(() => {
    return this.cartSubtotal() - this.cartCurrentPrice();
  });

  readonly cartCouponDiscount = computed(() => {
    const coupon = this.appliedCouponSignal();
    if (!coupon) return 0;
    // Calculate 20% off on current price
    return Math.round((this.cartCurrentPrice() * coupon.discountPercent) / 100);
  });

  readonly cartTotalDiscount = computed(() => {
    return this.cartBaseDiscount() + this.cartCouponDiscount();
  });

  readonly cartGrandTotal = computed(() => {
    const total = this.cartCurrentPrice() - this.cartCouponDiscount();
    return Math.max(0, total);
  });

  readonly wishlistCount = computed(() => {
    return this.wishlistSignal().length;
  });

  setSearchQuery(q: string) {
    this.searchQuerySignal.set(q);
  }

  setCategory(cat: string) {
    this.selectedCategorySignal.set(cat);
  }

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  addToCart(product: Product, size: string, quantity = 1) {
    const current = this.cartSignal();
    const existingIndex = current.findIndex(item => item.productId === product.id && item.size === size);

    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity
      };
      this.cartSignal.set(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        size: size || product.sizes[0] || 'M',
        quantity: quantity,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        availableSizes: product.sizes
      };
      this.cartSignal.set([...current, newItem]);
    }

    this.showToast(`Added "${product.name}" (${size}) to bag!`, 'success');
  }

  updateCartItemQty(cartItemId: string, qty: number) {
    if (qty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    this.cartSignal.update(items =>
      items.map(item => item.id === cartItemId ? { ...item, quantity: qty } : item)
    );
  }

  updateCartItemSize(cartItemId: string, size: string) {
    this.cartSignal.update(items =>
      items.map(item => item.id === cartItemId ? { ...item, size } : item)
    );
    this.showToast('Item size updated.', 'info');
  }

  removeFromCart(cartItemId: string) {
    const item = this.cartSignal().find(i => i.id === cartItemId);
    this.cartSignal.update(items => items.filter(i => i.id !== cartItemId));
    if (item) {
      this.showToast(`Removed "${item.name}" from your bag.`, 'info');
    }
  }

  toggleWishlist(productId: string) {
    const current = this.wishlistSignal();
    const exists = current.includes(productId);
    const product = this.getProductById(productId);
    const prodName = product ? product.name : 'Product';

    if (exists) {
      this.wishlistSignal.set(current.filter(id => id !== productId));
      this.showToast(`Removed "${prodName}" from wishlist.`, 'info');
    } else {
      this.wishlistSignal.set([...current, productId]);
      this.showToast(`Saved "${prodName}" to wishlist!`, 'success');
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistSignal().includes(productId);
  }

  applyCoupon(rawCode: string): { success: boolean; message: string } {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    if (code === 'NEON20' || code === 'FESTIVE20' || code === 'VIVID20') {
      this.appliedCouponSignal.set({
        code,
        discountPercent: 20,
        minOrder: 1000,
        description: 'Festive Glow 20% Discount'
      });
      this.showToast(`Coupon ${code} applied successfully! (20% OFF)`, 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (code === 'VOGUE50' || code === 'GENZ50') {
      this.appliedCouponSignal.set({
        code,
        discountPercent: 50,
        minOrder: 3000,
        description: 'Vogue Mega 50% Discount'
      });
      this.showToast(`Mega coupon ${code} applied! (50% OFF)`, 'success');
      return { success: true, message: 'Mega Coupon applied!' };
    } else {
      this.showToast('Invalid coupon code. Try using NEON20', 'error');
      return { success: false, message: 'Invalid or expired promo code.' };
    }
  }

  removeCoupon() {
    this.appliedCouponSignal.set(null);
    this.showToast('Coupon removed.', 'info');
  }

  clearCart() {
    this.cartSignal.set([]);
  }

  showToast(message: string, type: 'success' | 'info' | 'error' = 'info') {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    this.toastsSignal.update(toasts => [...toasts.slice(-3), newToast]);

    setTimeout(() => {
      this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
    }, 3500);
  }

  removeToast(id: number) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}
