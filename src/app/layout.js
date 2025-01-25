import "./globals.css";
import Navbar from "@/layout/Navbar";
import Container from "@/layout/container";
import Footer from "@/layout/Footer";
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

          <Navbar />
          <Container>

            {children}
          </Container>
          <Footer />
        </ThemeProviderComp>
      </body>
    </html>
  );
}
