import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({ 
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
    weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({ 
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://rushikesh.dev'),
    title: 'Rushikesh | Creative Developer & AI Engineer',
    description: 'Portfolio of Rushikesh, featuring deep space scrollytelling, creative development, and bleeding-edge AI integrations.',
    keywords: ['Creative Developer', 'AI Engineer', 'Next.js', 'React', 'Framer Motion', '3D Web', 'Rushikesh Goud', 'Portfolio'],
    authors: [{ name: 'Kayala Rushikesh Goud' }],
    creator: 'Kayala Rushikesh Goud',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://rushikesh.dev',
        title: 'Rushikesh | Creative Developer',
        description: 'Blurring the lines between art, logic, and profound digital experiences.',
        siteName: 'Rushikesh Portfolio',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Rushikesh Portfolio Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rushikesh | Creative Developer',
        description: 'Blurring the lines between art, logic, and profound digital experiences.',
        images: ['/og-image.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#000000' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' }
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} snap-y snap-mandatory scroll-smooth`}>
            <body className="font-body antialiased min-h-screen bg-black text-white">
                {children}
            </body>
        </html>
    );
}
