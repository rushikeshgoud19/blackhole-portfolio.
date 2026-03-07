import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Rushikesh | Creative Developer & AI Engineer',
    description: 'Portfolio of Rushikesh, featuring deep space scrollytelling and creative development.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.className} antialiased min-h-screen bg-black text-white`}>
                {children}
            </body>
        </html>
    );
}
