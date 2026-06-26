import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? '';

// If env vars are missing (e.g., during local build without env), provide a safe stub
export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: '2026-06-25',
        useCdn: false,
        ignoreBrowserTokenWarning: true,
      })
    : // minimal stub interface with fetch returning empty arrays to avoid build-time crashes
      ({
        fetch: async () => [],
      } as any);

export const productFetchQuery = `*[_type == "product"]{
  "id": _id,
  "name": title,
  price,
  category,
  tag,
  "src": gallery[0].asset->url,
}`;

export const galleryFetchQuery = `*[_type == "galleryItem"]{
  "id": _id,
  title,
  description,
  category,
  alt,
  gridSize,
  "src": image.asset->url,
}`;
