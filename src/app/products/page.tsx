import { sanityClient } from '@/lib/sanity';
import ProductsClient from './ProductsClient';

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  tag?: string;
  imageUrl?: string;
}

const fallbackProducts: Product[] = [
  {
    _id: 'fallback-product-1',
    name: 'Fresh Mango Cooler',
    price: 120,
    category: 'Fresh Juice',
    tag: 'Road Trip Favorite',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'fallback-product-2',
    name: 'Crispy Samosa Box',
    price: 85,
    category: 'Snacks',
    tag: 'Hot & Crunchy',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'fallback-product-3',
    name: 'Velvety Cold Coffee',
    price: 140,
    category: 'Milkshakes',
    tag: 'Fresh Brew',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'fallback-product-4',
    name: 'Combo Stop Pack',
    price: 220,
    category: 'Combos',
    tag: 'Best Value',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  
];

function shuffleArray<T>(items: T[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getProductsData(): Promise<Product[]> {
  const query = `*[_type == "roduct"] | order(_createdAt desc){
    _id,
    "name": title,
    price,
    category,
    tag,
    "imageUrl": gallery[0].asset->url,
  }`;

  try {
    const result = (await sanityClient.fetch(query)) as Product[];
    if (Array.isArray(result) && result.length > 0) {
      return shuffleArray(result);
    }
  } catch (error) {
    console.warn('Falling back to built-in product data.', error);
  }

  return shuffleArray(fallbackProducts);
}

export default async function ProductsPage() {
  const products = await getProductsData();

  // convert to CartProduct shape expected by client and cart context
  const cartProducts = products.map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price,
    category: p.category,
    tag: p.tag ?? '',
    src: p.imageUrl ?? '/placeholder.png',
  }));

  return <ProductsClient products={cartProducts} />;
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://gemsjuice.vercel.app'),
  title: 'Menu — Gems Juice & Coffee, Pannamgadu',
  description:
    'Fresh fruit juices, milkshakes and highway snacks at Gems Juice & Coffee on the Kolkata-Chennai National Highway (Pannamgadu). Open 06:00 AM - 09:00 PM.',
  openGraph: {
    title: 'Menu — Gems Juice & Coffee, Pannamgadu',
    description:
      'Discover our menu of fresh fruit juices and local highway snacks near Nellore/Tirupati corridor. Order now!',
    images: ['/og-image.png'],
  },
};
