import "./globals.css";
import ThemeProviderComp from "@/layout/ThemeProvider";
import MainLayout from "./MainLauout";
import Script from "next/script";


export const metadata = {
  title: "Hamed Otun | Entrepreneur & Student – Business, Tech, and Personal Growth",
  description: "Join Hamed Otun, an entrepreneur and student, as he shares insights on business, startups, technology, finance, and personal growth. Explore strategies for success, productivity tips, and real-world experiences in entrepreneurship and education.",
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/hamed.webp",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-VTFY2W2D40`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VTFY2W2D40');
          `}
        </Script>
      </head>
      <body
        className={` dark:bg-[#181A2A]  antialiased`}
      >
        <ThemeProviderComp>
          <MainLayout>

            {children}
          </MainLayout>
        </ThemeProviderComp>

      </body>
    </html>
  );
}
