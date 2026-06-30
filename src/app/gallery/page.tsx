import { sanityClient } from '@/lib/sanity';
import GalleryClient from './GalleryClient';

export interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: 'Fresh Juice' | 'Snacks' | 'Milkshakes' | 'Combos' | string;
  gridSize: 'small' | 'medium' | 'large' | string;
  imageUrl: string;
  altText: string;
}

const fallbackGalleryItems: GalleryItem[] = [
  {
    _id: 'fallback-gallery-1',
    title: 'Fresh Mango Burst',
    description: 'Cold seasonal juice served with a highway-ready refreshment vibe.',
    category: 'Fresh Juice',
    gridSize: 'large',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    altText: 'Fresh tropical juice at Gems Juice and Coffee',
  },
  {
    _id: 'fallback-gallery-2',
    title: 'Hot Samosa Corner',
    description: 'Golden fried snacks prepared fresh for travelers on the move.',
    category: 'Snacks',
    gridSize: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    altText: 'Fresh hot samosas served at a cafe counter',
  },
  {
    _id: 'fallback-gallery-3',
    title: 'Iced Coffee Mood',
    description: 'Creamy and chilled blends for a quick reset on the highway.',
    category: 'Milkshakes',
    gridSize: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    altText: 'Iced coffee and milkshake presentation',
  },
  {
    _id: 'fallback-gallery-4',
    title: 'Roadside Combo Stop',
    description: 'A perfect pairing of snacks and chilled drinks for long drives.',
    category: 'Combos',
    gridSize: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    altText: 'Combo meal with juices, snacks and coffee',
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

async function getGalleryData(): Promise<GalleryItem[]> {
  const query = `*[_type == "alleryItem"] | order(_createdAt desc){
    _id,
    title,
    description,
    category,
    gridSize,
    "imageUrl": image.asset->url,
    "altText": image.alt,
  }`;

  try {
    const result = (await sanityClient.fetch(query)) as GalleryItem[];
    if (Array.isArray(result) && result.length > 0) {
      return shuffleArray(result);
    }
  } catch (error) {
    console.warn('Falling back to built-in gallery data.', error);
  }

  return shuffleArray(fallbackGalleryItems);
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryData();
  return <GalleryClient galleryItems={galleryItems} />;
}

export const metadata = {
  title: 'Gallery — Gems Juice & Coffee, Pannamgadu',
  description:
    'Vibe Gallery: photos of fresh juices and snacks from Gems Juice & Coffee on the Kolkata-Chennai National Highway (Pannamgadu).',
  openGraph: {
    title: 'Gallery — Gems Juice & Coffee, Pannamgadu',
    description: 'Photos of fresh fruit juices and snack moments at Gems Juice & Coffee.',
    images: ['/og-image.png'],
  },
};