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

function shuffleArray<T>(items: T[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getGalleryData(): Promise<GalleryItem[]> {
  const query = `*[_type == "galleryItem"] | order(_createdAt desc){
    _id,
    title,
    description,
    category,
    gridSize,
    "imageUrl": image.asset->url,
    "altText": image.alt,
  }`;

  const result = (await sanityClient.fetch(query)) as GalleryItem[];
  return Array.isArray(result) ? shuffleArray(result) : [];
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