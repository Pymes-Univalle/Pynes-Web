"use client";
import Image from 'next/image'
import { Providers } from "./redux/provider"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/Login");
  }, []);
  return (
    <Providers>
       <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        
      </LoadScript>
    </Providers>
  )
}
