import BlogPage from "@/components/ui/blog";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <BlogPage />
    </Suspense>
  );
}
