import Head from 'next/head';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Finance Hub</title>
        <meta name="description" content="Created with Finance Hub" />
      </Head>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
