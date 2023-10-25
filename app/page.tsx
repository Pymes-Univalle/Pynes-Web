"use client";
import Image from 'next/image'
import { Providers } from "./redux/provider"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/Login");
  }, []);
  return (
    <Providers>
    </Providers>
  )
}
