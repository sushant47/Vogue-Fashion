import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { CollectionPage } from './pages/collection/collection';
import { ProductDetailPage } from './pages/product-detail/product-detail';
import { ShoppingBagPage } from './pages/shopping-bag/shopping-bag';
import { WishlistPage } from './pages/wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'VOGUE_VIBE | Vivid Fashion - Home' },
  { path: 'collection/:category', component: CollectionPage, title: 'VOGUE_VIBE | Collection' },
  { path: 'product/:id', component: ProductDetailPage, title: 'VOGUE_VIBE | Product Details' },
  { path: 'bag', component: ShoppingBagPage, title: 'VOGUE_VIBE | Shopping Bag' },
  { path: 'wishlist', component: WishlistPage, title: 'VOGUE_VIBE | Wishlist' },
  { path: '**', redirectTo: '' }
];
