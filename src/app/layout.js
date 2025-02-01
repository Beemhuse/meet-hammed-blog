import "./globals.css";
import ThemeProviderComp from "@/layout/ThemeProvider";


export const metadata = {
  title: "Meet Hammed | A blog about me",
  description: "Herein you can learn more about Hammed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` dark:bg-[#181A2A]  antialiased`}
      >
        <ThemeProviderComp>
          {children}
        </ThemeProviderComp>
      </body>
    </html>
  );
}
