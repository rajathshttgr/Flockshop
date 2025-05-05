"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousels } from "@/components/home/Carousels";
import { MilestoneBoard } from "@/components/home/MilestoneBoard";
import { ProductsSection } from "@/components/home/ProductsSection";
import { WishlistSection } from "@/components/home/WishlistSection";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";

export default function Home() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <div>
      <Header />
      <WishlistSection />
      <Carousels />
      <ProductsSection />
      <MilestoneBoard />
      <Footer />
    </div>
  );
}
