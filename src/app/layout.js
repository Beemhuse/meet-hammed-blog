import "./globals.css";
import ThemeProviderComp from "@/layout/ThemeProvider";
import MainLayout from "./MainLauout";
import Script from "next/script";


export const metadata = {
  title: "Meet Hammed | A blog about me",
  description: "Herein you can learn more about Hammed",
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
