import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/static-component/header";
import Fotter from "./components/static-component/fotter";
import { Providers } from "./providers";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
        <Header />
        <Providers>{children}</Providers>
        <Fotter />
      </body>
    </html>
  );
}
