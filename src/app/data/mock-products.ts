import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-rosa-jumpsuit',
    name: 'Radiant Rosa Plunge Jumpsuit',
    brand: 'VOGUE_VIBE Western',
    category: 'women',
    subCategory: 'Western Wear',
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.8,
    ratingCount: 342,
    trending: true,
    badgeText: 'TRENDING',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&auto=format&fit=crop&q=80'
    ],
    description: "Women's Western Wear Collection - Redefining elegance with vibrant magenta tones and tailored silhouette.",
    styleNote: "Look hip and stay comfortable with this statement piece. Whether you're heading to a rooftop party or a casual brunch, this striped jumpsuit represents the vibrant spirit of modern fashion. Team it up with chunky sneakers for a Gen-Z vibe or sleek heels for a nocturnal luxury look.",
    productDetails: [
      'Pink and burgundy striped woven jumpsuit',
      'V-neck short puff sleeves',
      'Straight legs with tailored fit',
      'Concealed zip closure at back',
      'Material: 100% Premium Polyester blend'
    ]
  },
  {
    id: 'prod-urban-edge-bomber',
    name: 'Urban Edge Bomber Jacket',
    brand: 'VOGUE_VIBE EXCLUSIVE',
    category: 'men',
    subCategory: 'Jackets',
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 512,
    trending: true,
    dealOfTheDay: true,
    badgeText: '50% OFF',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Midnight black faux leather matte bomber with neon aqua storm-zip detailing and insulated quilted interior lining.',
    styleNote: 'A centerpiece for nocturnal streetwear. Engineered with water-repellent shell and dual storm zippers that catch ambient city lights.',
    productDetails: [
      'Matte midnight black technical finish',
      'Contrast electric cyan waterproof zippers',
      'Ribbed knit collar and cuffs',
      'Internal discreet tech pocket for smartphones',
      'Material: Shell 100% PU, Lining 100% Satin'
    ]
  },
  {
    id: 'prod-cyber-tech-bomber',
    name: 'Cyber-Tech Bomber Jacket',
    brand: 'VOGUE_VIBE EXCLUSIVE',
    category: 'men',
    subCategory: 'Jackets',
    price: 4599,
    originalPrice: 6999,
    discountPercent: 34,
    rating: 4.9,
    ratingCount: 188,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Futuristic technical outerwear with magenta neon trim, modular storage pockets, and magnetic chest fasteners.',
    styleNote: 'Designed for the nocturnal explorer. Pairs seamlessly with relaxed tactical trousers or dark distressed denim.',
    productDetails: [
      'Neon magenta piping and modular pockets',
      'Thermal reflective insulated core',
      'Elasticized storm hem',
      'Machine washable cold gentle cycle'
    ]
  },
  {
    id: 'prod-aero-step-sneakers',
    name: 'Aero-Step Neo Sneakers',
    brand: 'URBAN STRIDE',
    category: 'men',
    subCategory: 'Sneakers',
    price: 3299,
    originalPrice: 5499,
    discountPercent: 40,
    rating: 4.7,
    ratingCount: 290,
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Glow-accented air-cushioned chunky sneakers designed for maximum urban rebound and breathable support.',
    styleNote: 'Features ambient glow soles and triple-density EVA foam midsole for all-night comfort.',
    productDetails: [
      'Breathable engineered mesh upper',
      'Cyan glow-in-the-dark responsive sole capsule',
      'Ergonomic memory foam insole',
      'Lace-up lockdown support'
    ]
  },
  {
    id: 'prod-cyberpunk-sneakers',
    name: 'Cyberpunk Sneakers',
    brand: 'VIVID STEP',
    category: 'women',
    subCategory: "Women's Footwear",
    price: 1899,
    originalPrice: 3799,
    discountPercent: 50,
    rating: 4.6,
    ratingCount: 420,
    dealOfTheDay: true,
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'High-contrast black and electric magenta running trainers with shock-absorbent sculpted rubber outsoles.',
    styleNote: 'Pairs impeccably with vibrant athletic tights or Gen-Z oversized streetwear.',
    productDetails: [
      'Contrast magenta and carbon black mesh',
      'Lightweight shock-damping sole',
      'Padded ankle collar for zero fatigue'
    ]
  },
  {
    id: 'prod-nocturnal-chronograph',
    name: 'Nocturnal Chronograph',
    brand: 'FOSSIL',
    category: 'men',
    subCategory: 'Accessories',
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 165,
    dealOfTheDay: true,
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Matte black ion-plated stainless steel timepiece with cyan luminescent indices and precision quartz movement.',
    styleNote: 'Water resistant to 50M. The subtle cyan illumination makes it an understated yet unmistakable accessory.',
    productDetails: [
      '44mm matte black stainless steel case',
      'Mineral crystal scratch-resistant glass',
      'Luminescent hands & date window',
      'Fold-over clasp with push-button release'
    ]
  },
  {
    id: 'prod-puma-tshirt',
    name: 'Men Black Solid Sports T-Shirt',
    brand: 'Puma',
    category: 'men',
    subCategory: 'T-Shirts',
    price: 799,
    originalPrice: 1599,
    discountPercent: 50,
    rating: 4.4,
    ratingCount: 890,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80'
    ],
    promoCard: {
      headline: "Men's Activewear",
      discountText: '30-70% OFF',
      actionText: 'Shop Now'
    },
    description: 'DryCELL moisture-wicking athletic training t-shirt built for active performance and casual style.',
    productDetails: ['Lightweight breathable fabric', 'Reflective Puma cat logo', 'Regular fit crew neck']
  },
  {
    id: 'prod-levis-jeans',
    name: 'Men Blue Slim Fit Jeans',
    brand: 'Levis',
    category: 'men',
    subCategory: 'Jeans',
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    rating: 4.7,
    ratingCount: 1205,
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop&q=80'
    ],
    promoCard: {
      headline: 'Casual Wear',
      discountText: '40-80% OFF',
      actionText: 'Shop Now'
    },
    description: 'Authentic medium-wash 511 slim fit denim with stretch technology for unmatched mobility.',
    productDetails: ['5-pocket styling', 'Zip fly with button closure', '99% Cotton, 1% Elastane']
  },
  {
    id: 'prod-adidas-sneakers',
    name: 'Men White & Black Sneakers',
    brand: 'Adidas',
    category: 'men',
    subCategory: 'Sneakers',
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.8,
    ratingCount: 760,
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&auto=format&fit=crop&q=80'
    ],
    promoCard: {
      headline: 'Ethnic Wear',
      discountText: '50-80% OFF',
      actionText: 'Shop Now'
    },
    description: 'Heritage court-inspired low top sneakers featuring iconic serrated 3-stripes.',
    productDetails: ['Smooth leather upper', 'Durable rubber cupsole', 'Comfort textile lining']
  },
  {
    id: 'prod-roadster-bomber',
    name: 'Men Olive Green Bomber Jacket',
    brand: 'Roadster',
    category: 'men',
    subCategory: 'Jackets',
    price: 1299,
    originalPrice: 2599,
    discountPercent: 50,
    rating: 4.5,
    ratingCount: 430,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Classic olive military-inspired zip bomber jacket with snap hand pockets and ribbed trim.',
    productDetails: ['Water-resistant poly shell', 'Full front metallic zipper', 'Side welt pockets']
  },
  {
    id: 'prod-louis-philippe-shirt',
    name: 'Men Navy Blue Formal Shirt',
    brand: 'Louis Philippe',
    category: 'men',
    subCategory: 'Casual Shirts',
    price: 1699,
    originalPrice: 2499,
    discountPercent: 32,
    rating: 4.6,
    ratingCount: 310,
    sizes: ['39', '40', '42', '44'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Premium Egyptian cotton slim fit formal shirt with semi-cutaway collar and pearlized buttons.',
    productDetails: ['100% Superfine Cotton', 'Single cuffs with button closure', 'Wrinkle-resistant finish']
  },
  {
    id: 'prod-us-polo-shoes',
    name: 'Men Black Casual Shoes',
    brand: 'US Polo Assn',
    category: 'men',
    subCategory: 'Sneakers',
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    rating: 4.3,
    ratingCount: 540,
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Lightweight knit slip-on sneakers with contrast white platform sole and embroidered horse logo.',
    productDetails: ['Breathable stretch mesh', 'Shock-absorbing EVA sole', 'Easy slip-on collar']
  },
  {
    id: 'prod-hm-sweatshirt',
    name: 'Men Grey Solid Sweatshirt',
    brand: 'H&M',
    category: 'men',
    subCategory: 'T-Shirts',
    price: 799,
    originalPrice: 1499,
    discountPercent: 46,
    rating: 4.4,
    ratingCount: 680,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Relaxed-fit sweatshirt in soft French terry with dropped shoulders and ribbed neckline.',
    productDetails: ['Soft cotton-blend terry', 'Ribbing at neckline, cuffs and hem', 'Sustainable BCI Cotton']
  },
  {
    id: 'prod-fossil-sunglasses-watch',
    name: 'Men Analogue Leather Watch & Shades',
    brand: 'Fossil',
    category: 'men',
    subCategory: 'Accessories',
    price: 4500,
    originalPrice: 8995,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 210,
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Curated gift set featuring UV400 pink-rimmed dark sunglasses and genuine leather strap chronograph.',
    productDetails: ['Polarized UV400 protection', 'Genuine leather strap', 'Stainless steel caseback']
  },
  {
    id: 'prod-women-neon-dress',
    name: 'Cyberpunk Neon Wrap Dress',
    brand: 'VOGUE_VIBE Western',
    category: 'women',
    subCategory: 'Dresses',
    price: 3199,
    originalPrice: 5999,
    discountPercent: 47,
    rating: 4.9,
    ratingCount: 420,
    trending: true,
    badgeText: 'BESTSELLER',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Electric fuchsia structured asymmetrical wrap dress with metallic buckle hardware.',
    styleNote: 'Command the night with this tailored wrap dress. Pair with chunky knee-high combat boots or minimalist clear heels for high-impact presence.',
    productDetails: ['Asymmetrical surplice front', 'Metallic belt buckle fastening', 'Premium sculpting crepe fabric']
  },
  {
    id: 'prod-women-streetwear-hoodie',
    name: 'Oversized Lavender Matrix Hoodie',
    brand: 'URBAN STRIDE',
    category: 'women',
    subCategory: 'T-Shirts',
    price: 1899,
    originalPrice: 3499,
    discountPercent: 45,
    rating: 4.7,
    ratingCount: 312,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Heavyweight organic cotton dropped-shoulder fleece hoodie with holographic typography print.',
    styleNote: 'Cozy yet bold. Style with distressed biker shorts or wide-leg cargo pants for effortlessly elevated street aesthetic.',
    productDetails: ['100% Organic 420 GSM French Terry', 'Double-lined hood with drawstring', 'Kangaroo pocket']
  },
  {
    id: 'prod-women-wide-cargo',
    name: 'High-Waist Technical Cargo Pants',
    brand: 'VOGUE_VIBE EXCLUSIVE',
    category: 'women',
    subCategory: 'Jeans',
    price: 2799,
    originalPrice: 4999,
    discountPercent: 44,
    rating: 4.8,
    ratingCount: 280,
    sizes: ['26', '28', '30', '32'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Relaxed fit parachute cargos with tactical side utility pockets and toggle ankle cuffs.',
    styleNote: 'Switch between wide leg and tapered silhouette using the adjustable toggle fasteners at hem.',
    productDetails: ['6 modular utility pockets', 'Water-repellent matte ripstop', 'Elasticated drawstring waist']
  },
  {
    id: 'prod-kids-denim-jacket',
    name: 'Junior Cyber Street Denim Jacket',
    brand: 'VOGUE_VIBE EXCLUSIVE',
    category: 'kids',
    subCategory: 'Jackets',
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 154,
    trending: true,
    badgeText: 'KIDS TOP PICK',
    sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y'],
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Kids retro wash denim trucker jacket with graffiti neon patches and soft sherpa collar.',
    styleNote: 'Durable, stylish, and comfortable for school outings, weekend adventures, and playdates.',
    productDetails: ['100% Breathable denim cotton', 'Buttoned chest flap pockets', 'Reinforced stitching']
  },
  {
    id: 'prod-kids-lightup-sneakers',
    name: 'Kids Neo Flash Glide Sneakers',
    brand: 'URBAN STRIDE',
    category: 'kids',
    subCategory: 'Sneakers',
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    rating: 4.8,
    ratingCount: 230,
    sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4', 'UK 5'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Ultra-lightweight knit kids sneakers with rechargeable ambient sole glow lights and velcro strap.',
    productDetails: ['Breathable mesh upper', 'Easy dual velcro strap', 'Memory foam comfort insole']
  },
  {
    id: 'prod-home-neon-lamp',
    name: 'Aura Prism Geometric LED Table Lamp',
    brand: 'VOGUE_VIBE Living',
    category: 'home',
    subCategory: 'Decor',
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 195,
    trending: true,
    badgeText: 'HOT LIVING',
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Architectural acrylic ambient prism light that casts neon magenta and cyan refractions across room walls.',
    styleNote: 'Transform any desk, nightstand, or studio gaming corner into a tranquil, neon-lit oasis.',
    productDetails: ['16M RGB spectrum with touch dimmer', 'USB-C rechargeable 4000mAh battery', 'Solid brushed aluminum base']
  },
  {
    id: 'prod-home-silk-cushions',
    name: 'Midnight Velvet Cushion Cover Set (Pack of 4)',
    brand: 'VOGUE_VIBE Living',
    category: 'home',
    subCategory: 'Decor',
    price: 1199,
    originalPrice: 2499,
    discountPercent: 52,
    rating: 4.7,
    ratingCount: 310,
    sizes: ['16x16 inch', '18x18 inch'],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Plush velvet decorative cushion covers with gold foil geometric accents and invisible zip closures.',
    productDetails: ['Set of 4 covers', 'Heavyweight Dutch velvet', 'Machine wash gentle']
  },
  {
    id: 'prod-beauty-nocturne-perfume',
    name: 'Nocturne Amber & Orchid Eau De Parfum (100ml)',
    brand: 'VOGUE_VIBE Beauty',
    category: 'beauty',
    subCategory: 'Fragrances',
    price: 2699,
    originalPrice: 4500,
    discountPercent: 40,
    rating: 4.9,
    ratingCount: 460,
    trending: true,
    badgeText: 'LUXURY SCENT',
    sizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Hypnotic nocturnal fragrance blending dark amber, wild midnight orchid, pink pepper, and smoky vanilla wood.',
    styleNote: 'Long-lasting 12+ hour sillage designed for evening wear and special events.',
    productDetails: ['Top notes: Pink Pepper, Black Cherry', 'Heart notes: Midnight Orchid, Jasmine', 'Base notes: Amber, Smoked Cedar']
  },
  {
    id: 'prod-beauty-glow-serum',
    name: 'Radiance 24K Gold Hydra Glow Serum',
    brand: 'VOGUE_VIBE Beauty',
    category: 'beauty',
    subCategory: 'Skincare',
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    rating: 4.8,
    ratingCount: 520,
    sizes: ['30ml', '50ml'],
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-0097c2718e22?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Revitalizing anti-oxidant facial oil with pure gold flakes, Hyaluronic Acid, and botanical Rosehip extract.',
    productDetails: ['Dermatologist tested & cruelty-free', 'Intense 72-hour moisture lock', 'Suitable for all skin types']
  }
];
