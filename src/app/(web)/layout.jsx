// import "..";

import SplashCursor from "@/components/cursor/cursor";
import Container from "@/layout/container";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";

export const metadata = {
  title: "Meet Hammed | A blog about me",
  description: "Herein you can learn more about Hammed",
};

export default function Layout({ children }) {
  return (
      <>
        <Navbar />
        <Container>
          <SplashCursor />

          {children}
        </Container>
        <Footer />
    </>
  );
}
