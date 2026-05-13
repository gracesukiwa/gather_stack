import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GatherStack — Put the Phones Down, Pick the Fun Up',
  description: 'A compact portable mini board game that helps people stop using phones during hangouts and reconnect through fun real-world interaction.',
  keywords: 'board game, social game, phone free, hangout game, party game',
  openGraph: {
    title: 'GatherStack',
    description: 'Put the phones down, pick the fun up.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
