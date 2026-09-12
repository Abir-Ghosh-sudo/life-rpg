export const SHOP_CONFIG = {
  currency: {
    name: "Gold",
    symbol: "🪙",
  },

  purchase: {
    minimumQuantity: 1,
    maximumQuantity: 99,

    minimumPrice: 1,
    maximumPrice: 100000,
  },

  discounts: {
    enabled: true,

    maximumPercentage: 50,

    featuredDiscount: 10,
  },

  inventory: {
    stackableDefault: true,

    defaultMaxStack: 99,
  },

  refresh: {
    enabled: true,

    refreshHours: 24,

    featuredItems: 4,

    regularItems: 12,
  },

  categories: {
    avatar: {
      name: "Avatars",
      icon: "🧙",
    },

    equipment: {
      name: "Equipment",
      icon: "⚔️",
    },

    consumable: {
      name: "Consumables",
      icon: "🧪",
    },

    theme: {
      name: "Themes",
      icon: "🎨",
    },

    badge: {
      name: "Badges",
      icon: "🏅",
    },

    title: {
      name: "Titles",
      icon: "👑",
    },

    boost: {
      name: "Boosts",
      icon: "⚡",
    },

    special: {
      name: "Special",
      icon: "✨",
    },
  },

  featured: {
    maximumFeaturedItems: 4,

    rotateDaily: true,
  },

  security: {
    allowNegativeBalance: false,

    allowZeroPricePurchase: false,

    requireLevelCheck: true,

    requireInventoryCheck: true,

    createTransactionRecord: true,
  },
} as const;

export const SHOP_CATEGORY_LIST = Object.entries(
  SHOP_CONFIG.categories,
).map(([id, category]) => ({
  id,
  ...category,
}));

export function getShopCategoryConfig(
  category: keyof typeof SHOP_CONFIG.categories,
) {
  return SHOP_CONFIG.categories[category];
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number,
): number {
  const safeDiscount = Math.min(
    Math.max(discountPercentage, 0),
    SHOP_CONFIG.discounts.maximumPercentage,
  );

  return Math.max(
    SHOP_CONFIG.purchase.minimumPrice,
    Math.floor(price * (1 - safeDiscount / 100)),
  );
}

export function calculateTotalPrice(
  price: number,
  quantity: number,
  discountPercentage = 0,
): number {
  const safeQuantity = Math.min(
    Math.max(
      quantity,
      SHOP_CONFIG.purchase.minimumQuantity,
    ),
    SHOP_CONFIG.purchase.maximumQuantity,
  );

  const unitPrice = calculateDiscountedPrice(
    price,
    discountPercentage,
  );

  return unitPrice * safeQuantity;
}

export type ShopConfig = typeof SHOP_CONFIG;