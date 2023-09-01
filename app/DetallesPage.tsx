// DetallesPage.tsx
import React from "react";
import Detalles from './Organizacion/Detalles/page'; // Asegúrate de ajustar la ruta correcta
import { useRouter } from 'next/router';

const DetallesPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID desde la URL

  return <Detalles id={id as string} />;
};

export default DetallesPage;
