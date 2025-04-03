import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/static-component/header";
import Footer from "./components/static-component/fotter";
import { Providers } from "./providers";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog Platform | Share Your Stories",
    template: "%s | Blog Platform",
  },
  description:
    "A modern blog platform where users can create, share, and discover interesting articles and stories.",
  keywords: ["blog", "articles", "web-blog", "content", "publishing"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Blog Platform",
    title: "Blog Platform | Share Your Stories",
    description:
      "A modern blog platform where users can create, share, and discover interesting articles and stories.",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Platform | Share Your Stories",
    description:
      "A modern blog platform where users can create, share, and discover interesting articles and stories.",
    images: ["https://your-domain.com/twitter-image.jpg"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} antialiased mx-4 xs:mx-6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 overflow-x-hidden min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
