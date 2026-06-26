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

function shuffleArray<T>(items: T[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getProductsData(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc){
    _id,
    "name": title,
    price,
    category,
    tag,
    "imageUrl": gallery[0].asset->url,
  }`;

  const result = (await sanityClient.fetch(query)) as Product[];
  return Array.isArray(result) ? shuffleArray(result) : [];
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
