export type ShopProduct = {
  id: string;
  title: string;
  slug: string;
  category: "Apparel" | "Accessories" | "Equipment";
  price: number;
  compareAt: number | null;
  image: string;
  productUrl: string;
};

export const shopConfig = {
  storeUrl: "https://www.gripactive.com/collections/aces-nationals-tournament",
  bundleUrl: "https://www.gripactive.com/bundle-offer",
  partner: "Grip Active",
  partnerNote:
    "Official ACES Nationals kit and merchandise, supplied by Grip Active — the tournament's official kit partner.",
  intro:
    "Browse official ACES Nationals branded kit and merchandise. Jerseys, polos, hoodies, training wear, and tournament accessories — order online through our partner store.",
} as const;

/** Scraped from Grip Active ACES collection (acesfootball.co.uk ACES Shop link). */
export const shopProducts: ShopProduct[] = [
  {
    "id": "backpack",
    "title": "Aces Nationals Tournament Backpack",
    "slug": "aces-nationals-tournament-backpack",
    "category": "Accessories",
    "price": 17.5,
    "compareAt": 25,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-backpack",
    "image": "/shop/backpack.jpg"
  },
  {
    "id": "black-baselayer",
    "title": "Aces Nationals Tournament Black Baselayer",
    "slug": "aces-nationals-tournament-black-baselayer",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-black-baselayer",
    "image": "/shop/black-baselayer.jpg"
  },
  {
    "id": "black-padded-jacket",
    "title": "Aces Nationals Tournament Black Padded Jacket",
    "slug": "aces-nationals-tournament-black-padded-jacket",
    "category": "Apparel",
    "price": 48,
    "compareAt": 60,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-black-padded-jacket",
    "image": "/shop/black-padded-jacket.jpg"
  },
  {
    "id": "black-polo-shirt",
    "title": "Aces Nationals Tournament Black Polo Shirt",
    "slug": "aces-nationals-tournament-black-polo-shirt",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-black-polo-shirt",
    "image": "/shop/black-polo-shirt.jpg"
  },
  {
    "id": "black-rainshell-jacket",
    "title": "Aces Nationals Tournament Black Rainshell Jacket",
    "slug": "aces-nationals-tournament-black-rainshell-jacket",
    "category": "Apparel",
    "price": 28,
    "compareAt": 35,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-black-rainshell-jacket",
    "image": "/shop/black-rainshell-jacket.jpg"
  },
  {
    "id": "blue-baselayer",
    "title": "Aces Nationals Tournament Blue Baselayer",
    "slug": "aces-nationals-tournament-blue-baselayer",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-blue-baselayer",
    "image": "/shop/blue-baselayer.jpg"
  },
  {
    "id": "blue-jersey",
    "title": "Aces Nationals Tournament Blue Jersey",
    "slug": "aces-nationals-tournament-blue-jersey",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-blue-jersey",
    "image": "/shop/blue-jersey.jpg"
  },
  {
    "id": "blue-padded-jacket",
    "title": "Aces Nationals Tournament Blue Padded Jacket",
    "slug": "aces-nationals-tournament-blue-padded-jacket",
    "category": "Apparel",
    "price": 48,
    "compareAt": 60,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-blue-padded-jacket",
    "image": "/shop/blue-padded-jacket.jpg"
  },
  {
    "id": "blue-polo-shirt",
    "title": "Aces Nationals Tournament Blue Polo Shirt",
    "slug": "aces-nationals-tournament-blue-polo-shirt",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-blue-polo-shirt",
    "image": "/shop/blue-polo-shirt.jpg"
  },
  {
    "id": "blue-rainshell-jacket",
    "title": "Aces Nationals Tournament Blue Rainshell Jacket",
    "slug": "aces-nationals-tournament-blue-rainshell-jacket",
    "category": "Apparel",
    "price": 28,
    "compareAt": 35,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-blue-rainshell-jacket",
    "image": "/shop/blue-rainshell-jacket.jpg"
  },
  {
    "id": "bobble-hat",
    "title": "Aces Nationals Tournament Bobble Hat",
    "slug": "aces-nationals-tournament-bobble-hat",
    "category": "Apparel",
    "price": 12,
    "compareAt": null,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-bobble-hat",
    "image": "/shop/bobble-hat.jpg"
  },
  {
    "id": "bottle",
    "title": "Aces Nationals Tournament Bottle",
    "slug": "aces-nationals-tournamentbottle",
    "category": "Accessories",
    "price": 12,
    "compareAt": null,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournamentbottle",
    "image": "/shop/bottle.jpg"
  },
  {
    "id": "cap",
    "title": "Aces Nationals Tournament Cap",
    "slug": "aces-nationals-tournament-cap",
    "category": "Apparel",
    "price": 9,
    "compareAt": 15,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-cap",
    "image": "/shop/cap.jpg"
  },
  {
    "id": "corner-flag---pack-of-4",
    "title": "Aces Nationals Tournament Corner Flag - Pack of 4",
    "slug": "aces-nationals-tournament-corner-flag-pack-of-4",
    "category": "Equipment",
    "price": 14.4,
    "compareAt": 24,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-corner-flag-pack-of-4",
    "image": "/shop/corner-flag---pack-of-4.jpg"
  },
  {
    "id": "grip-socks",
    "title": "Aces Nationals Tournament Grip Socks",
    "slug": "aces-nationals-tournament-grip-socks-1",
    "category": "Equipment",
    "price": 5.99,
    "compareAt": null,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-grip-socks-1",
    "image": "/shop/grip-socks.jpg"
  },
  {
    "id": "hoodie",
    "title": "Aces Nationals Tournament Hoodie",
    "slug": "aces-nationals-tournament-hoodie-3",
    "category": "Apparel",
    "price": 24,
    "compareAt": 30,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-hoodie-3",
    "image": "/shop/hoodie.jpg"
  },
  {
    "id": "jersey",
    "title": "Aces Nationals Tournament Jersey",
    "slug": "aces-nationals-tournament-jersey",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-jersey",
    "image": "/shop/jersey.jpg"
  },
  {
    "id": "kit-bag",
    "title": "Aces Nationals Tournament Kit Bag",
    "slug": "aces-nationals-tournament-kit-bag",
    "category": "Accessories",
    "price": 40,
    "compareAt": null,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-kit-bag",
    "image": "/shop/kit-bag.jpg"
  },
  {
    "id": "match-ball",
    "title": "Aces Nationals Tournament Match Ball",
    "slug": "aces-nationals-tournament-match-ball",
    "category": "Equipment",
    "price": 14,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-match-ball",
    "image": "/shop/match-ball.jpg"
  },
  {
    "id": "polo-shirt",
    "title": "Aces Nationals Tournament Polo Shirt",
    "slug": "aces-nationals-tournament-polo-shirt-2",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-polo-shirt-2",
    "image": "/shop/polo-shirt.jpg"
  },
  {
    "id": "red-baselayer",
    "title": "Aces Nationals Tournament Red Baselayer",
    "slug": "aces-nationals-tournament-red-baselayer",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-baselayer",
    "image": "/shop/red-baselayer.jpg"
  },
  {
    "id": "red-jersey",
    "title": "Aces Nationals Tournament Red Jersey",
    "slug": "aces-nationals-tournament-red-jersey",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-jersey",
    "image": "/shop/red-jersey.jpg"
  },
  {
    "id": "red-padded-jacket",
    "title": "Aces Nationals Tournament Red Padded Jacket",
    "slug": "aces-nationals-tournament-red-padded-jacket",
    "category": "Apparel",
    "price": 48,
    "compareAt": 60,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-padded-jacket",
    "image": "/shop/red-padded-jacket.jpg"
  },
  {
    "id": "red-polo-shirt",
    "title": "Aces Nationals Tournament Red Polo Shirt",
    "slug": "aces-nationals-tournament-red-polo-shirt",
    "category": "Apparel",
    "price": 16,
    "compareAt": 20,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-polo-shirt",
    "image": "/shop/red-polo-shirt.jpg"
  },
  {
    "id": "red-rainshell-jacket",
    "title": "Aces Nationals Tournament Red Rainshell Jacket",
    "slug": "aces-nationals-tournament-red-rainshell-jacket",
    "category": "Apparel",
    "price": 28,
    "compareAt": 35,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-rainshell-jacket",
    "image": "/shop/red-rainshell-jacket.jpg"
  },
  {
    "id": "red-shinpads",
    "title": "Aces Nationals Tournament Red Shinpads",
    "slug": "aces-nationals-tournament-red-shinpads",
    "category": "Equipment",
    "price": 8.4,
    "compareAt": 12,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-red-shinpads",
    "image": "/shop/red-shinpads.jpg"
  },
  {
    "id": "shinpads",
    "title": "Aces Nationals Tournament Shinpads",
    "slug": "aces-nationals-tournament-shinpads",
    "category": "Equipment",
    "price": 8.4,
    "compareAt": 12,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-shinpads",
    "image": "/shop/shinpads.jpg"
  },
  {
    "id": "sweatshirt",
    "title": "Aces Nationals Tournament Sweatshirt",
    "slug": "aces-nationals-tournament-sweatshirt",
    "category": "Apparel",
    "price": 24,
    "compareAt": 30,
    "productUrl": "https://www.gripactive.com/products/aces-nationals-tournament-sweatshirt",
    "image": "/shop/sweatshirt.jpg"
  }
];
