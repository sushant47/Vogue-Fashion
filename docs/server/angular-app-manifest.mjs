
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/browser/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/browser"
  },
  {
    "renderMode": 0,
    "route": "/browser/collection/*"
  },
  {
    "renderMode": 0,
    "route": "/browser/product/*"
  },
  {
    "renderMode": 2,
    "route": "/browser/bag"
  },
  {
    "renderMode": 2,
    "route": "/browser/wishlist"
  },
  {
    "renderMode": 2,
    "redirectTo": "/browser",
    "route": "/browser/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 33007, hash: '4a995f15b55fb5960adfbad09479a7bf826146fc4c39e9abea50e80417df564b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 23351, hash: '00d035547528170c12605fcf3ab4bc307f14aabeb18a7eae2c4d2f2a53df1012', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'wishlist/index.html': {size: 60198, hash: '0dcbac80bd08ffaf15e3dc9d8a93747f0fe78e41a9a06d270329e7d66e62025d', text: () => import('./assets-chunks/wishlist_index_html.mjs').then(m => m.default)},
    'bag/index.html': {size: 70588, hash: '2887981b092bb990905782fd1fd8df18dbabcb0ac4bacbf9c1fca79c6429ecfe', text: () => import('./assets-chunks/bag_index_html.mjs').then(m => m.default)},
    'index.html': {size: 80697, hash: '3dd777aef9cbb9d984c5237d36ff58e7530b14b77f3b72fd8c7504eb810dce00', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-25UX4UMT.css': {size: 56966, hash: 'ojQG0gqMngY', text: () => import('./assets-chunks/styles-25UX4UMT_css.mjs').then(m => m.default)}
  },
};
