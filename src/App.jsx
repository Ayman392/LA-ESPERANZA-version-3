import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Facebook,
  Filter,
  Heart,
  LayoutDashboard,
  Lock,
  LogIn,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Upload,
  User,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const disclaimer =
  "LA ESPERANZA fragrances are inspired by popular scent profiles. We are not affiliated with, endorsed by, or connected to the original designer brands.";

const products = [
  {
    id: "noir-oud",
    name: "Noir Oud",
    inspired: "Aventus-style scent profile",
    gender: "Men",
    longevity: "8-10 hours",
    sizes: ["30ml", "50ml", "100ml"],
    price: 1290,
    rating: 4.9,
    reviews: 186,
    image: "/assets/product-noir.svg",
    notes: {
      top: "Bergamot, blackcurrant, pineapple leaf",
      middle: "Birch smoke, jasmine, dry woods",
      base: "Musk, ambergris accord, oakmoss",
    },
    occasion: ["Day", "Office", "Date"],
    category: "Best Sellers",
    stock: 42,
  },
  {
    id: "velvet-bloom",
    name: "Velvet Bloom",
    inspired: "Good Girl-style scent profile",
    gender: "Women",
    longevity: "7-9 hours",
    sizes: ["30ml", "50ml", "100ml"],
    price: 1190,
    rating: 4.8,
    reviews: 142,
    image: "/assets/product-rose.svg",
    notes: {
      top: "Almond, coffee, luminous citrus",
      middle: "Jasmine sambac, tuberose, rose",
      base: "Cocoa, tonka, vanilla woods",
    },
    occasion: ["Night", "Date"],
    category: "Women",
    stock: 28,
  },
  {
    id: "amber-silk",
    name: "Amber Silk",
    inspired: "Tobacco Vanille-style scent profile",
    gender: "Unisex",
    longevity: "10-12 hours",
    sizes: ["30ml", "50ml", "100ml"],
    price: 1490,
    rating: 5.0,
    reviews: 97,
    image: "/assets/product-amber.svg",
    notes: {
      top: "Spiced tobacco leaf, ginger, warm citrus",
      middle: "Cacao, tonka bean, dried fruit",
      base: "Vanilla resin, amber, smoky woods",
    },
    occasion: ["Night", "Date", "Office"],
    category: "Unisex",
    stock: 19,
  },
  {
    id: "aqua-elite",
    name: "Aqua Elite",
    inspired: "Sauvage-style scent profile",
    gender: "Men",
    longevity: "6-8 hours",
    sizes: ["30ml", "50ml", "100ml"],
    price: 990,
    rating: 4.7,
    reviews: 214,
    image: "/assets/product-aqua.svg",
    notes: {
      top: "Calabrian bergamot, pepper, marine air",
      middle: "Lavender, geranium, elemi",
      base: "Ambroxan accord, cedar, clean musk",
    },
    occasion: ["Day", "Office"],
    category: "Best Sellers",
    stock: 64,
  },
];

const navItems = ["Home", "Shop", "Collections", "About", "Contact"];
const categories = [
  { title: "Men", detail: "Clean woods, fresh spice, confident signatures", image: "/assets/product-noir.svg" },
  { title: "Women", detail: "Florals, vanilla, amber, intimate evening trails", image: "/assets/product-rose.svg" },
  { title: "Unisex", detail: "Modern profiles designed to move with you", image: "/assets/product-amber.svg" },
  { title: "Best Sellers", detail: "Most reordered scents across Bangladesh", image: "/assets/product-aqua.svg" },
];

function App() {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quickView, setQuickView] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlistItems");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      return [];
    }
  });
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlistItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return products.filter((product) => {
      const searchableText = `${product.name} ${product.inspired} ${product.gender} ${product.longevity} ${product.notes.top} ${product.notes.middle} ${product.notes.base}`.toLowerCase();
      return searchableText.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const alreadyWishlisted = prevItems.some((item) => item.id === product.id);

      if (alreadyWishlisted) {
        return prevItems.filter((item) => item.id !== product.id);
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          inspired: product.inspired,
          gender: product.gender,
        },
      ];
    });
  };

  const isWishlisted = (productId) => wishlistItems.some((item) => item.id === productId);

  const addToCart = (product, size = product.sizes[0], quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && item.size === size);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size,
          quantity,
        },
      ];
    });
  };

  const buyNow = (product, size = product.sizes[0], quantity = 1) => {
    addToCart(product, size, quantity);
    goTo("checkout");
  };

  const updateCartQuantity = (id, size, nextQuantity) => {
    if (nextQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const removeCartItem = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (nextView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-porcelain font-rubik text-ink">
      <Nav
        activeView={view}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onNavigate={goTo}
        onSearchOpen={() => setSearchOpen(true)}
      />
      {view === "home" && (
        <Home
          onNavigate={goTo}
          onOpenProduct={openProduct}
          onQuickView={setQuickView}
          onAddCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      )}
      {view === "shop" && (
        <ShopPage
          onOpenProduct={openProduct}
          onQuickView={setQuickView}
          onAddCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      )}
      {view === "product" && (
        <ProductDetail
          product={selectedProduct}
          onOpenProduct={openProduct}
          onQuickView={setQuickView}
          onAddCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      )}
      {view === "wishlist" && (
        <WishlistPage
          wishlistItems={wishlistItems}
          onOpenProduct={openProduct}
          onRemoveWishlist={(product) => toggleWishlist(product)}
          onAddCart={(product) => addToCart(product, product.sizes?.[0] || "30ml", 1)}
          onNavigate={goTo}
        />
      )}
      {view === "checkout" && (
        <CartCheckout
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeCartItem}
          onNavigate={goTo}
        />
      )}
      {view === "admin" && <AdminDashboard />}
      <Footer onNavigate={goTo} />
      {searchOpen && (
        <SearchModal
          query={searchQuery}
          setQuery={setSearchQuery}
          products={searchedProducts}
          onClose={() => setSearchOpen(false)}
          onOpenProduct={(product) => {
            setSearchOpen(false);
            setSearchQuery("");
            openProduct(product);
          }}
        />
      )}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onOpenProduct={openProduct}
          onAddCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      )}
    </div>
  );
}

function Nav({ activeView, cartCount, wishlistCount, onNavigate, onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHeroTheme = activeView === "home";
  const linkMap = {
    Home: "home",
    Shop: "shop",
    Collections: "home",
    About: "home",
    Contact: "home",
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto mt-3 flex h-16 w-[min(1180px,calc(100%-1rem))] items-center justify-between rounded-full px-3 shadow-glass backdrop-blur-2xl transition-colors md:h-20 md:px-5 lg:h-24 ${
          isHeroTheme ? "border border-white/15 bg-black/28 text-white" : "border border-line bg-white/86 text-ink"
        }`}
      >
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="min-w-0 text-left text-[clamp(1.1rem,2.5vw,1.7rem)] font-semibold tracking-[0.08em]"
          aria-label="LA ESPERANZA home"
        >
          LA ESPERANZA
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onNavigate(linkMap[item])}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isHeroTheme
                  ? `text-white/78 hover:bg-white/10 hover:text-white ${activeView === linkMap[item] ? "bg-white/10 text-white" : ""}`
                  : `text-ink/68 hover:bg-black/5 hover:text-ink ${activeView === linkMap[item] ? "bg-black/5 text-ink" : ""}`
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton label="Search" tone={isHeroTheme ? "dark" : "light"} onClick={onSearchOpen}>
            <Search size={19} />
          </IconButton>
          <button
            type="button"
            onClick={() => onNavigate("wishlist")}
            className={`icon-button relative hidden sm:inline-flex ${
              isHeroTheme ? "border border-white/15 bg-white/8 text-white hover:bg-white/14" : "border border-line bg-white text-ink hover:bg-black/5"
            }`}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-champagne px-1 text-[11px] font-bold text-black">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("checkout")}
            className={`icon-button relative ${
              isHeroTheme ? "border border-white/15 bg-white/8 text-white hover:bg-white/14" : "border border-line bg-white text-ink hover:bg-black/5"
            }`}
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
            <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-champagne px-1 text-[11px] font-bold text-black">
              {cartCount}
            </span>
          </button>
          <IconButton label="Login" tone={isHeroTheme ? "dark" : "light"} className="hidden sm:inline-flex">
            <LogIn size={19} />
          </IconButton>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`icon-button lg:hidden ${
              isHeroTheme ? "border border-white/15 bg-white/8 text-white hover:bg-white/14" : "border border-line bg-white text-ink hover:bg-black/5"
            }`}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className={`mx-auto mt-2 w-[min(1180px,calc(100%-1rem))] rounded-[1.75rem] p-3 shadow-glass backdrop-blur-2xl lg:hidden ${
            isHeroTheme ? "border border-white/15 bg-black/78 text-white" : "border border-line bg-white/94 text-ink"
          }`}
        >
          <div className="grid gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate(linkMap[item]);
                }}
                className={`rounded-2xl px-4 py-3 text-left text-base font-medium ${
                  isHeroTheme ? "text-white/86 hover:bg-white/10" : "text-ink/78 hover:bg-black/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onNavigate("wishlist");
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm font-medium text-white/84"
            >
              <Heart size={17} />
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </button>
            <SmallAction icon={LogIn} label="Login" />
          </div>
        </div>
      )}
    </header>
  );
}

function IconButton({ children, label, tone = "dark", className = "", onClick }) {
  const toneClass =
    tone === "light"
      ? "border border-line bg-white text-ink hover:bg-black/5"
      : "border border-white/15 bg-white/8 text-white hover:bg-white/14";
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={`icon-button ${toneClass} ${className}`}>
      {children}
    </button>
  );
}

function SmallAction({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm font-medium text-white/84">
      <Icon size={17} />
      {label}
    </button>
  );
}

function Home({ onNavigate, onOpenProduct, onQuickView, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <FeaturedCategories onNavigate={onNavigate} />
      <BestSellers
        onOpenProduct={onOpenProduct}
        onQuickView={onQuickView}
        onAddCart={onAddCart}
        onBuyNow={onBuyNow}
        onToggleWishlist={onToggleWishlist}
        isWishlisted={isWishlisted}
      />
      <WhyChoose />
      <TrustSection />
      <EditorialShowcase onNavigate={onNavigate} onOpenProduct={onOpenProduct} />
      <Testimonials />
      <FAQ />
      <WhatsAppSection />
      <Newsletter />
    </main>
  );
}

function Hero({ onNavigate }) {
  const trust = ["Long-lasting scents", "Inspired luxury", "Premium quality", "Delivery all over Bangladesh"];

  return (
    <section className="hero-bg relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(201,169,106,0.24),transparent_28rem)]" />
      <div className="luxury-container relative flex min-h-[100svh] items-center pb-14 pt-32 md:pt-36">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-champagne backdrop-blur-xl">
            <Sparkles size={15} />
            Inspired by luxury
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-0 text-white">
            Luxury in Every Drop.
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(0.95rem,2vw,1.35rem)] leading-8 text-white/78">
            Premium inspired fragrances crafted for confidence, elegance, and everyday luxury.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onNavigate("shop")} className="premium-button bg-white text-black shadow-glass hover:bg-champagne">
              Shop Collection
              <ArrowRight size={18} />
            </button>
            <a href="https://wa.me/" className="premium-button border border-white/22 bg-white/8 text-white hover:border-champagne/70 hover:bg-white/14">
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>
          <div className="mt-9 flex max-w-3xl flex-wrap gap-2">
            {trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-2 text-sm text-white/80 backdrop-blur-xl">
                <Check size={15} className="text-champagne" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-porcelain to-transparent" />
    </section>
  );
}

function FeaturedCategories({ onNavigate }) {
  return (
    <section className="section-pad bg-porcelain">
      <div className="luxury-container">
        <SectionHeader
          eyebrow="Collections"
          title="Designed around the way Bangladesh wears fragrance."
          copy="Distinct scent wardrobes for workdays, evenings, weddings, Eid gifting, and daily confidence."
          action="Shop all"
          onAction={() => onNavigate("shop")}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => onNavigate("shop")}
              className="group overflow-hidden rounded-[2rem] border border-line bg-white text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="aspect-[4/3] overflow-hidden bg-chalk">
                <img src={category.image} alt={`${category.title} perfume collection`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <ArrowRight size={18} className="text-champagne transition group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm leading-6 text-smoke">{category.detail}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers({ onOpenProduct, onQuickView, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  return (
    <section className="section-pad bg-chalk">
      <div className="luxury-container">
        <SectionHeader
          eyebrow="Best sellers"
          title="Signature scent profiles, refined for everyday luxury."
          copy="Premium compositions, tested for Bangladeshi weather, available in 30ml, 50ml, and 100ml."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={onOpenProduct}
              onQuickView={onQuickView}
              onAddCart={onAddCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={isWishlisted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onOpenProduct, onQuickView, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  return (
    <article className="product-card rounded-[1.75rem] border border-line bg-white p-3 transition duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-chalk">
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className={`absolute right-3 top-3 z-10 icon-button border border-white/70 shadow-soft hover:bg-white ${
            isWishlisted(product.id) ? "bg-champagne text-black" : "bg-white/80 text-ink"
          }`}
          aria-label={`${isWishlisted(product.id) ? "Remove" : "Add"} ${product.name} ${isWishlisted(product.id) ? "from" : "to"} wishlist`}
          title={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={isWishlisted(product.id) ? "fill-current" : ""} />
        </button>
        <button type="button" onClick={() => onOpenProduct(product)} className="block w-full">
          <img src={product.image} alt={`${product.name} perfume bottle`} className="aspect-[4/4.6] h-full w-full object-cover" />
        </button>
      </div>
      <div className="p-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <button type="button" onClick={() => onOpenProduct(product)} className="text-left text-xl font-semibold">
              {product.name}
            </button>
            <p className="mt-1 text-sm text-smoke">Inspired by: {product.inspired}</p>
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-smoke">{product.gender}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-smoke">
          <span className="rounded-full bg-porcelain px-3 py-1.5">{product.longevity}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-porcelain px-3 py-1.5">
            <Star size={13} className="fill-champagne text-champagne" />
            {product.rating} ({product.reviews})
          </span>
        </div>
        <SizePills sizes={product.sizes} />
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-smoke">From</p>
            <p className="text-xl font-semibold">BDT {product.price.toLocaleString()}</p>
          </div>
          <button type="button" onClick={() => onQuickView(product)} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-champagne hover:text-champagne">
            Quick view
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onAddCart(product, product.sizes[0], 1)} className="premium-button min-h-12 bg-ink px-3 py-2 text-sm text-white hover:bg-black">
            <ShoppingBag size={16} />
            Add
          </button>
          <button type="button" onClick={() => onBuyNow(product, product.sizes[0], 1)} className="premium-button min-h-12 border border-champagne/50 bg-champagne/12 px-3 py-2 text-sm text-ink hover:bg-champagne/20">
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function SizePills({ sizes }) {
  return (
    <div className="mt-4 flex gap-2">
      {sizes.map((size) => (
        <span key={size} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-smoke">
          {size}
        </span>
      ))}
    </div>
  );
}

function WhyChoose() {
  const items = [
    { icon: ShieldCheck, title: "Premium quality", copy: "Each batch is sampled for projection, finish, and skin-friendly wear." },
    { icon: Zap, title: "Long-lasting performance", copy: "Built for Bangladesh's heat, humidity, commutes, and long evenings." },
    { icon: WalletCards, title: "Affordable luxury", copy: "Designer-inspired scent stories without the designer-bottle markup." },
    { icon: Truck, title: "Bangladesh delivery", copy: "COD-first ordering with clear delivery status and support across the country." },
  ];

  return (
    <section className="section-pad bg-obsidian text-white">
      <div className="luxury-container">
        <SectionHeader dark eyebrow="Why LA ESPERANZA" title="Quietly premium from first click to final drydown." copy="A clean buying experience, honest scent information, and secure checkout options designed for trust." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-champagne/15 text-champagne">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    ["4.8/5", "Average customer rating"],
    ["24-72h", "Typical Bangladesh delivery"],
    ["COD", "Cash on Delivery first"],
    ["3 sizes", "30ml, 50ml, 100ml SKUs"],
  ];

  return (
    <section className="bg-porcelain py-12">
      <div className="luxury-container grid gap-4 md:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-[1.5rem] border border-line bg-white px-6 py-7 text-center shadow-soft">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-smoke">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EditorialShowcase({ onNavigate, onOpenProduct }) {
  return (
    <section className="section-pad overflow-hidden bg-chalk">
      <div className="luxury-container grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">Product spotlight</p>
          <h2 className="mt-4 max-w-xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[1.02]">A scent wardrobe with cinematic restraint.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-smoke">Move from fresh office signatures to rich evening amber without losing the clean, modern confidence of the brand.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onOpenProduct(products[2])} className="premium-button bg-ink text-white hover:bg-black">
              View Amber Silk
              <ArrowRight size={18} />
            </button>
            <button type="button" onClick={() => onNavigate("shop")} className="premium-button border border-line bg-white text-ink hover:border-champagne">
              Compare scents
            </button>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className="absolute left-0 top-8 w-[58%] animate-slow-float overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-premium">
            <img src="/assets/product-amber.svg" alt="Amber Silk perfume bottle" className="aspect-[3/4] w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[56%] overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-premium">
            <img src="/assets/product-aqua.svg" alt="Aqua Elite perfume bottle" className="aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    ["The bottle feels premium and the scent lasted through office and dinner.", "Nusrat A.", "Dhaka"],
    ["Clean checkout, fast COD delivery, and the drydown was surprisingly elegant.", "Rafi H.", "Chattogram"],
    ["I bought the 30ml first. Reordered 100ml after one week.", "Mim S.", "Sylhet"],
  ];

  return (
    <section className="section-pad bg-porcelain">
      <div className="luxury-container">
        <SectionHeader eyebrow="Reviews" title="Built for repeat orders, not impulse regret." copy="Trust signals stay clear, useful, and close to conversion moments." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map(([quote, name, city]) => (
            <figure key={name} className="rounded-[1.75rem] border border-line bg-white p-6 shadow-soft">
              <div className="mb-5 flex gap-1 text-champagne">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} className="fill-champagne" />
                ))}
              </div>
              <blockquote className="text-lg leading-8">&quot;{quote}&quot;</blockquote>
              <figcaption className="mt-6 text-sm font-medium text-smoke">
                {name} - {city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ["Are these original designer perfumes?", disclaimer],
    ["Do you deliver outside Dhaka?", "Yes. LA ESPERANZA supports delivery all over Bangladesh with COD-first checkout."],
    ["Can I checkout without login?", "Yes. Guest checkout is supported, with account creation offered after order placement."],
    ["Which payment methods are planned?", "Cash on Delivery launches first. bKash, Nagad, Rocket, and SSLCOMMERZ are planned for future support."],
  ];

  return (
    <section className="section-pad bg-chalk">
      <div className="luxury-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">FAQ</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight">Transparent fragrance buying.</h2>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-[1.5rem] border border-line bg-white p-5 shadow-soft" open={question.startsWith("Are")}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {question}
                <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-7 text-smoke">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppSection() {
  return (
    <section className="bg-obsidian py-16 text-white">
      <div className="luxury-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">Instant order</p>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,3.4rem)] font-semibold">Order directly on WhatsApp.</h2>
          <p className="mt-3 max-w-2xl text-white/64">Share your scent, size, phone number, and delivery address. Facebook ordering is supported too.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="https://wa.me/" className="premium-button bg-champagne text-black hover:bg-white">
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a href="https://facebook.com/" className="premium-button border border-white/15 bg-white/8 text-white hover:bg-white/14">
            <Facebook size={18} />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-porcelain py-16">
      <div className="luxury-container rounded-[2rem] border border-line bg-white p-5 shadow-soft md:p-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold">New drops, restocks, and private offers.</h2>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Email address" className="min-h-14 flex-1 rounded-full border border-line bg-chalk px-5 outline-none transition focus:border-champagne" />
            <button className="premium-button bg-ink text-white hover:bg-black">Join list</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ShopPage({ onOpenProduct, onQuickView, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("All");
  const [sort, setSort] = useState("Best sellers");

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const matchesGender = gender === "All" || product.gender === gender;
      const searchableText = `${product.name} ${product.inspired} ${product.notes.top} ${product.notes.middle} ${product.notes.base}`.toLowerCase();
      const matchesQuery = searchableText.includes(query.toLowerCase());
      return matchesGender && matchesQuery;
    });

    if (sort === "Price") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Popularity" || sort === "Best sellers") {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }

    if (sort === "Newest") {
      result = [...result].reverse();
    }

    return result;
  }, [gender, query, sort]);

  return (
    <main className="pt-32">
      <section className="section-pad bg-porcelain pt-10">
        <div className="luxury-container">
          <SectionHeader eyebrow="Shop" title="Find the right inspired scent profile." copy="Search, filter, compare, wishlist, and quick view without slowing down the order flow." />
          <div className="mt-8 rounded-[2rem] border border-line bg-white p-4 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <label className="flex min-h-14 items-center gap-3 rounded-full border border-line bg-chalk px-5">
                <Search size={19} className="text-smoke" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by perfume, notes, or inspired profile" className="w-full bg-transparent outline-none" />
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
                <Select label="Gender" value={gender} onChange={setGender} options={["All", "Men", "Women", "Unisex"]} />
                <Select label="Sort" value={sort} onChange={setSort} options={["Best sellers", "Popularity", "Price", "Newest"]} />
                <button className="premium-button border border-line bg-ink text-white hover:bg-black">
                  <Filter size={17} />
                  Filters
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["Inspired brand", "Notes", "Longevity", "Size", "Price", "Occasion"].map((filter) => (
                <button key={filter} className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium text-smoke hover:border-champagne hover:text-ink">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[260px_1fr]">
            <aside className="rounded-[1.75rem] border border-line bg-white p-5 shadow-soft xl:sticky xl:top-32 xl:self-start">
              <h3 className="font-semibold">Refine</h3>
              {["Gender", "Inspired brand", "Notes", "Longevity", "Size", "Price", "Occasion"].map((group) => (
                <div key={group} className="mt-5 border-t border-line pt-5">
                  <button className="flex w-full items-center justify-between text-left font-medium">
                    {group}
                    <ChevronDown size={17} />
                  </button>
                  <div className="mt-3 grid gap-2 text-sm text-smoke">
                    {["Fresh", "Amber", "Woody"].map((option) => (
                      <label key={`${group}-${option}`} className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 accent-champagne" />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
            <div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={onOpenProduct}
              onQuickView={onQuickView}
              onAddCart={onAddCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={isWishlisted}
            />
                ))}
              </div>
              <ComparisonTable />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="flex min-h-14 items-center gap-2 rounded-full border border-line bg-chalk px-4">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="bg-transparent text-sm font-medium outline-none">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ComparisonTable() {
  return (
    <section className="mt-10 rounded-[2rem] border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Product comparison</h3>
        <button className="rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-champagne">Clear</button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-smoke">
              <th className="py-3 font-medium">Perfume</th>
              <th className="py-3 font-medium">Gender</th>
              <th className="py-3 font-medium">Longevity</th>
              <th className="py-3 font-medium">Occasion</th>
              <th className="py-3 font-medium">From</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 3).map((product) => (
              <tr key={product.id} className="border-b border-line/70">
                <td className="py-4 font-medium">{product.name}</td>
                <td className="py-4 text-smoke">{product.gender}</td>
                <td className="py-4 text-smoke">{product.longevity}</td>
                <td className="py-4 text-smoke">{product.occasion.join(", ")}</td>
                <td className="py-4 font-semibold">BDT {product.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductDetail({ product, onOpenProduct, onQuickView, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes[1]);
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  useEffect(() => {
    setQuantity(1);
    setSize(product.sizes[1] || product.sizes[0]);
  }, [product]);

  return (
    <main className="pt-32">
      <section className="section-pad bg-porcelain pt-10">
        <div className="luxury-container grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-4 md:grid-cols-[0.18fr_0.82fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
              {[product.image, "/assets/product-noir.svg", "/assets/product-amber.svg"].map((image, index) => (
                <button key={image + index} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <img src={image} alt={`${product.name} gallery ${index + 1}`} className="aspect-square w-24 object-cover" />
                </button>
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-premium md:order-2">
              <img src={product.image} alt={`${product.name} large perfume bottle`} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">Product detail</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-tight">{product.name}</h1>
            <p className="mt-3 text-lg text-smoke">Inspired by: {product.inspired}</p>
            <p className="mt-5 rounded-[1.25rem] border border-line bg-white p-4 text-sm leading-6 text-smoke">{disclaimer}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <NoteBlock title="Top" copy={product.notes.top} />
              <NoteBlock title="Middle" copy={product.notes.middle} />
              <NoteBlock title="Base" copy={product.notes.base} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoPill label="Longevity" value={product.longevity} />
              <InfoPill label="Gender" value={product.gender} />
            </div>
            <div className="mt-6">
              <p className="font-semibold">Occasion</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Day", "Night", "Date", "Office"].map((occasion) => (
                  <span key={occasion} className={`rounded-full border px-4 py-2 text-sm font-medium ${product.occasion.includes(occasion) ? "border-champagne bg-champagne/12 text-ink" : "border-line text-smoke"}`}>
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Size</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {product.sizes.map((item) => (
                    <button key={item} type="button" onClick={() => setSize(item)} className={`rounded-full border px-4 py-3 text-sm font-semibold ${size === item ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold">Quantity</p>
                <div className="mt-3 flex h-12 w-40 items-center justify-between rounded-full border border-line bg-white px-2">
                  <button type="button" className="icon-button h-9 w-9 border border-line text-ink" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button type="button" className="icon-button h-9 w-9 border border-line text-ink" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => onAddCart(product, size, quantity)} className="premium-button flex-1 bg-ink text-white hover:bg-black">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button type="button" onClick={() => onBuyNow(product, size, quantity)} className="premium-button flex-1 bg-champagne text-black hover:bg-white">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="luxury-container mt-14 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <ReviewsPanel />
          <RecentlyViewed />
        </div>

        <div className="luxury-container mt-14">
          <SectionHeader eyebrow="Related products" title="Complete the fragrance wardrobe." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
                onAddCart={onAddCart}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function NoteBlock({ title, copy }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{title}</p>
      <p className="mt-2 text-sm leading-6 text-smoke">{copy}</p>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-smoke">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function ReviewsPanel() {
  return (
    <section className="rounded-[2rem] border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-champagne/12 px-3 py-1.5 text-sm font-semibold">
          <Star size={14} className="fill-champagne text-champagne" />
          4.9
        </span>
      </div>
      <p className="mt-5 leading-7 text-smoke">&quot;Smooth opening, strong performance, and the bottle looks beautiful on my dresser.&quot;</p>
      <p className="mt-4 text-sm font-medium text-smoke">Verified customer - Dhaka</p>
    </section>
  );
}

function RecentlyViewed() {
  return (
    <section className="rounded-[2rem] border border-line bg-white p-6 shadow-soft">
      <h3 className="text-xl font-semibold">Recently viewed</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {products.slice(1, 4).map((product) => (
          <div key={product.id} className="flex items-center gap-3 rounded-2xl border border-line p-3">
            <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-smoke">BDT {product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WishlistPage({ wishlistItems, onOpenProduct, onRemoveWishlist, onAddCart, onNavigate }) {
  const wishlistProducts = wishlistItems
    .map((item) => products.find((product) => product.id === item.id))
    .filter(Boolean);

  return (
    <main className="pt-32">
      <section className="section-pad bg-porcelain pt-10">
        <div className="luxury-container">
          <SectionHeader
            eyebrow="Wishlist"
            title="Your saved fragrances."
            copy="Keep your favorite scents here and move them to cart anytime."
          />

          {wishlistProducts.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-line bg-white p-8 text-center shadow-soft">
              <Heart size={36} className="mx-auto text-champagne" />
              <h3 className="mt-4 text-2xl font-semibold">Your wishlist is empty</h3>
              <p className="mt-2 text-smoke">Tap the heart button on any product to save it here.</p>
              <button type="button" onClick={() => onNavigate("shop")} className="premium-button mx-auto mt-6 bg-ink text-white hover:bg-black">
                Shop products
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {wishlistProducts.map((product) => (
                <article key={product.id} className="rounded-[1.75rem] border border-line bg-white p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                  <button type="button" onClick={() => onOpenProduct(product)} className="block w-full overflow-hidden rounded-[1.35rem] bg-chalk">
                    <img src={product.image} alt={product.name} className="aspect-[4/4.6] w-full object-cover" />
                  </button>
                  <div className="p-2 pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <button type="button" onClick={() => onOpenProduct(product)} className="text-left text-xl font-semibold">
                          {product.name}
                        </button>
                        <p className="mt-1 text-sm text-smoke">Inspired by: {product.inspired}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveWishlist(product)}
                        className="icon-button border border-line text-ink hover:bg-champagne hover:text-black"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="mt-4 text-xl font-semibold">BDT {product.price.toLocaleString()}</p>
                    <button type="button" onClick={() => onAddCart(product)} className="premium-button mt-4 w-full bg-ink text-white hover:bg-black">
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CartCheckout({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }) {
  const deliveryFee = cartItems.length > 0 ? 80 : 0;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add at least one product before checkout.");
      return;
    }

    alert("Order placement UI is working. Next step: connect this form to Supabase/backend.");
  };

  return (
    <main className="pt-32">
      <section className="section-pad bg-porcelain pt-10">
        <div className="luxury-container">
          <SectionHeader eyebrow="Secure checkout" title="Guest checkout first. Account creation after order." copy="COD is ready for launch, with bKash, Nagad, Rocket, and SSLCOMMERZ planned next." />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_390px]">
            <form onSubmit={handlePlaceOrder} className="rounded-[2rem] border border-line bg-white p-5 shadow-soft md:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Full name", "text"],
                  ["Phone number", "tel"],
                  ["Email address", "email"],
                  ["City", "text"],
                ].map(([label, type]) => (
                  <label key={label} className="grid gap-2 text-sm font-medium">
                    {label}
                    <input type={type} required={label !== "Email address"} className="min-h-13 rounded-2xl border border-line bg-chalk px-4 outline-none focus:border-champagne" />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-medium sm:col-span-2">
                  Delivery address
                  <textarea required className="min-h-28 rounded-2xl border border-line bg-chalk px-4 py-3 outline-none focus:border-champagne" />
                </label>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <CheckoutOption icon={User} title="Guest checkout" copy="No forced login" active />
                <CheckoutOption icon={Lock} title="Save details" copy="Create account after order" />
                <CheckoutOption icon={WalletCards} title="Cash on Delivery" copy="Available now" active />
                <CheckoutOption icon={CreditCard} title="Digital payments" copy="bKash, Nagad, Rocket, SSLCOMMERZ later" />
              </div>
              <button type="submit" className="premium-button mt-7 w-full bg-ink text-white hover:bg-black">
                <Lock size={18} />
                Place COD Order
              </button>
            </form>

            <aside className="rounded-[2rem] border border-line bg-white p-6 shadow-premium lg:sticky lg:top-32 lg:self-start">
              <h3 className="text-xl font-semibold">Order summary</h3>

              {cartItems.length === 0 ? (
                <div className="mt-5 rounded-2xl bg-chalk p-5 text-sm leading-6 text-smoke">
                  Your cart is empty.
                  <button type="button" onClick={() => onNavigate("shop")} className="mt-4 premium-button w-full bg-ink text-white hover:bg-black">
                    Shop now
                  </button>
                </div>
              ) : (
                <div className="mt-5 grid gap-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-start gap-3">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl border border-line object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-smoke">{item.size} x {item.quantity}</p>
                          </div>
                          <button type="button" onClick={() => onRemoveItem(item.id, item.size)} className="rounded-full border border-line p-1.5 text-smoke hover:text-ink" aria-label={`Remove ${item.name}`}>
                            <X size={14} />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-line bg-chalk px-2 py-1">
                            <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white">
                              <Minus size={13} />
                            </button>
                            <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
                            <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white">
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="font-semibold">BDT {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 grid gap-3 border-t border-line pt-6 text-sm">
                <SummaryRow label="Subtotal" value={`BDT ${subtotal.toLocaleString()}`} />
                <SummaryRow label="Delivery inside Bangladesh" value={`BDT ${deliveryFee.toLocaleString()}`} />
                <SummaryRow label="Payment" value="COD" />
                <SummaryRow label="Total" value={`BDT ${total.toLocaleString()}`} strong />
              </div>
              <p className="mt-5 rounded-2xl bg-chalk p-4 text-sm leading-6 text-smoke">Protected checkout, delivery inside Bangladesh only, and clear order tracking after confirmation.</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckoutOption({ icon: Icon, title, copy, active = false }) {
  return (
    <div className={`rounded-[1.5rem] border p-4 ${active ? "border-champagne bg-champagne/10" : "border-line bg-chalk"}`}>
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-champagne">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-smoke">{copy}</p>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "text-lg font-semibold" : "text-smoke"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function AdminDashboard() {
  const metrics = [
    ["Total sales", "BDT 8.42L", BarChart3],
    ["Daily revenue", "BDT 24,500", WalletCards],
    ["Monthly revenue", "BDT 2.18L", LayoutDashboard],
    ["Orders", "428", ClipboardList],
    ["Pending orders", "36", Package],
    ["Completed orders", "371", Check],
    ["Cancelled orders", "21", X],
    ["Customers", "1,284", User],
  ];

  return (
    <main className="pt-32">
      <section className="section-pad bg-obsidian pt-10 text-white">
        <div className="luxury-container">
          <SectionHeader dark eyebrow="Admin" title="Premium operations dashboard." copy="Sales, SKU inventory, margin, order status, reviews, product management, and category analytics in one focused panel." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, Icon]) => (
              <div key={label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/58">{label}</p>
                  <Icon size={18} className="text-champagne" />
                </div>
                <p className="mt-4 text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h3 className="text-xl font-semibold">Inventory and SKU management</h3>
                <button className="premium-button min-h-12 bg-champagne px-5 py-2 text-sm text-black hover:bg-white">
                  <Upload size={16} />
                  Bulk CSV upload
                </button>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="text-white/52">
                    <tr className="border-b border-white/10">
                      <th className="py-3 font-medium">Product</th>
                      <th className="py-3 font-medium">30ml</th>
                      <th className="py-3 font-medium">50ml</th>
                      <th className="py-3 font-medium">100ml</th>
                      <th className="py-3 font-medium">Margin</th>
                      <th className="py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id} className="border-b border-white/10">
                        <td className="py-4 font-medium">{product.name}</td>
                        <td className="py-4 text-white/64">{18 + index * 4}</td>
                        <td className="py-4 text-white/64">{product.stock}</td>
                        <td className="py-4 text-white/64">{9 + index * 2}</td>
                        <td className="py-4 text-white/64">{48 + index * 3}%</td>
                        <td className="py-4">
                          <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${product.stock < 25 ? "bg-champagne/20 text-champagne" : "bg-white/10 text-white/72"}`}>
                            {product.stock < 25 ? "Low-stock alert" : "Healthy"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-xl font-semibold">Analytics</h3>
              <div className="mt-5 grid gap-4">
                {["Best-selling products", "Best-selling category analytics", "Payment status", "Delivery status", "Customer reviews"].map((item, index) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{item}</p>
                      <span className="text-sm text-champagne">{index === 0 ? "Noir Oud" : `${76 - index * 9}%`}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-champagne" style={{ width: `${86 - index * 9}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button className="premium-button min-h-12 border border-white/10 bg-white/8 px-4 py-2 text-sm text-white hover:bg-white/14">Add product</button>
                <button className="premium-button min-h-12 border border-white/10 bg-white/8 px-4 py-2 text-sm text-white hover:bg-white/14">Manage images</button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuickViewModal({ product, onClose, onOpenProduct, onAddCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/58 p-4 backdrop-blur-md">
      <div className="grid max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-glass md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-chalk">
          <img src={product.image} alt={`${product.name} quick view`} className="h-full min-h-[320px] w-full object-cover" />
        </div>
        <div className="overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-champagne">Quick view</p>
              <h3 className="mt-2 text-3xl font-semibold">{product.name}</h3>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`icon-button border border-line ${isWishlisted(product.id) ? "bg-champagne text-black" : "text-ink"}`}
                aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                title={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} className={isWishlisted(product.id) ? "fill-current" : ""} />
              </button>
              <button className="icon-button border border-line text-ink" onClick={onClose} aria-label="Close quick view">
                <X size={18} />
              </button>
            </div>
          </div>
          <p className="mt-3 text-smoke">Inspired by: {product.inspired}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoPill label="Longevity" value={product.longevity} />
            <InfoPill label="Gender" value={product.gender} />
          </div>
          <SizePills sizes={product.sizes} />
          <p className="mt-6 text-2xl font-semibold">BDT {product.price.toLocaleString()}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => onAddCart(product, product.sizes[0], 1)} className="premium-button bg-ink text-white hover:bg-black">
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button onClick={() => onBuyNow(product, product.sizes[0], 1)} className="premium-button bg-champagne text-black hover:bg-white">
              Buy Now
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenProduct(product);
              }}
              className="premium-button border border-line bg-chalk text-ink hover:border-champagne sm:col-span-2"
            >
              Product detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchModal({ query, setQuery, products, onClose, onOpenProduct }) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/58 p-4 backdrop-blur-md">
      <div className="mx-auto mt-24 w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-glass">
        <div className="flex items-center gap-3 border-b border-line p-4">
          <Search size={20} className="text-smoke" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
            placeholder="Search perfume, inspired profile, notes..."
            className="min-h-12 flex-1 bg-transparent text-lg outline-none"
          />
          <button type="button" onClick={onClose} className="icon-button border border-line text-ink" aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() && (
            <p className="rounded-2xl bg-chalk p-5 text-sm leading-6 text-smoke">
              Start typing to search by perfume name, inspired profile, gender, longevity, or notes.
            </p>
          )}

          {query.trim() && products.length === 0 && (
            <p className="rounded-2xl bg-chalk p-5 text-sm leading-6 text-smoke">
              No products found. Try searching “oud”, “good girl”, “amber”, “sauvage”, or “men”.
            </p>
          )}

          <div className="grid gap-3">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onOpenProduct(product)}
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3 text-left transition hover:border-champagne hover:bg-chalk"
              >
                <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-sm text-smoke">Inspired by: {product.inspired}</p>
                    </div>
                    <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-smoke">{product.gender}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">BDT {product.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, copy, action, onAction, dark = false }) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">{eyebrow}</p>
        <h2 className={`mt-4 text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
        {copy && <p className={`mt-4 max-w-2xl text-lg leading-8 ${dark ? "text-white/62" : "text-smoke"}`}>{copy}</p>}
      </div>
      {action && (
        <button onClick={onAction} className={`premium-button shrink-0 ${dark ? "border border-white/15 bg-white/8 text-white" : "border border-line bg-white text-ink"} hover:border-champagne`}>
          {action}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="bg-obsidian py-14 text-white">
      <div className="luxury-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <button onClick={() => onNavigate("home")} className="text-2xl font-semibold tracking-[0.08em]">
              LA ESPERANZA
            </button>
            <p className="mt-3 text-white/58">Luxury in Every Drop.</p>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/48">{disclaimer}</p>
          </div>
          <FooterColumn title="Shop" links={["Men", "Women", "Unisex", "Best Sellers"]} onNavigate={() => onNavigate("shop")} />
          <FooterColumn title="Account" links={["Login", "Wishlist", "Order Tracking", "Recently Viewed"]} onNavigate={() => onNavigate("checkout")} />
          <div>
            <h3 className="font-semibold">Operations</h3>
            <div className="mt-4 grid gap-3">
              <button className="text-left text-sm text-white/58 hover:text-champagne" onClick={() => onNavigate("admin")}>
                Admin dashboard
              </button>
              <p className="text-sm leading-6 text-white/48">COD first. Future support for bKash, Nagad, Rocket, and SSLCOMMERZ.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/42 md:flex-row">
          <span>© 2026 LA ESPERANZA. Bangladesh only delivery.</span>
          <span>React + Tailwind CSS + Rubik prototype.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, onNavigate }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <button key={link} onClick={onNavigate} className="text-left text-sm text-white/58 hover:text-champagne">
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
