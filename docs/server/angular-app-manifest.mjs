
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/collection/*"
  },
  {
    "renderMode": 0,
    "route": "/product/*"
  },
  {
    "renderMode": 2,
    "route": "/bag"
  },
  {
    "renderMode": 2,
    "route": "/wishlist"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 32999, hash: 'deb1b4d292068ff45c32dbe6e131e7d937bc77d0ae5abee12340dca8b32d7eac', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 23343, hash: 'd404dae4cafbcaa90e50d71d9a1f6cb785f2e59b48b404649f9d1273de912261', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'wishlist/index.html': {size: 60094, hash: '29c5f8cde8ab32f1ae379ed80b80c13c725a47fd110b8c60b17d510613389a83', text: () => import('./assets-chunks/wishlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 80521, hash: 'e293ba0ba2f2449750a8622cac2a039213e8049b5aafe99264050291a8bae2f2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'bag/index.html': {size: 70476, hash: '4f0e447fdd4ebee6734d2c71a7f836a10939e97a252ac40338459fa19c3d7ee0', text: () => import('./assets-chunks/bag_index_html.mjs').then(m => m.default)},
    'styles-XSQYLCXS.css': {size: 55262, hash: 'Ha8fV9S8+kA', text: () => import('./assets-chunks/styles-XSQYLCXS_css.mjs').then(m => m.default)}
  },
};
