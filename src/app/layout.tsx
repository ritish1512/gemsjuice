import { CartProvider, CartDrawer } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { Alfa_Slab_One } from 'next/font/google';
import { Roboto } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_APP_URL || 'https://gemsjuice.vercel.app').replace(/\/+$/, '')),
  title: {
    default: 'Gems Juice & Coffee — Pannamgadu',
    template: '%s | Gems Juice & Coffee',
  },
  description:
    "Gems Juice & Coffee — best juice shop in Pannamgadu on the Kolkata-Chennai highway. Fresh fruit juices, highway snacks near Nellore/Tirupati corridor. Open daily 06:00 AM - 09:00 PM.",
  keywords: ['Gems Juice', 'juice shop Pannamgadu', 'highway snacks', 'fresh fruit juices', 'Nellore', 'Tirupati'],
  openGraph: {
    title: 'Gems Juice & Coffee — Pannamgadu',
    description:
      "Fresh fruit juices and highway snacks on the Kolkata-Chennai National Highway. Open 06:00 AM - 09:00 PM.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://gemsjuice.vercel.app',
    siteName: 'Gems Juice & Coffee',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gems Juice & Coffee — Pannamgadu',
    description:
      "Fresh fruit juices and highway snacks on the Kolkata-Chennai National Highway. Open 06:00 AM - 09:00 PM.",
    images: ['/og-image.png'],
  },
};

export async function generateMetadata() {
  return metadata;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "Gems Juice & Coffee",
  url: 'https://gemsjuice.vercel.app',
  telephone: '+916383308836',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kolkatha ~ Chennai, National Highway Road',
    addressLocality: 'Pannamgadu',
    addressRegion: 'Andhra Pradesh',
    postalCode: '524401',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.5114205,
    longitude: 80.0936459,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '21:00',
    },
  ],
  sameAs: [
    /* Add Google Maps / Facebook / Instagram links if available */
    'https://www.google.com/maps/place/Gems+juice+%26+coffee/',
  ],
};

const alfaslabone = Alfa_Slab_One({
  weight:'400',
  subsets:['latin'],
  variable:'--font-alfa-slab',
  display:'swap'
});

const roboto = Roboto({
  weight:'500',
  subsets:['latin'],
  variable:'--font-roboto-google',
  display:'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${alfaslabone.variable} ${roboto.variable}`}>
      <body className="relative">
        <CartProvider>
          <Navbar />
          <main id="content">{children}</main>
          <CartDrawer />
        </CartProvider>
        <Footer />

        {/* JSON-LD LocalBusiness */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}