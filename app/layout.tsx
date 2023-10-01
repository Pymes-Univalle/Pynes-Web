"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { Providers } from "./providers";
import { Providers } from "./redux/provider"
import { useRouter } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

import { useState } from "react";
import { AcmeLogo } from "./AcmeLogo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const router = useRouter();
  const handleMyPerfil = () => {
    router.push('/Usuario/MiPerfil');
  };
  const handleCambiarContrasena = () => {
    router.push('/Usuario/UpdatePassword');
  };
  const handleProductores = () => {
    router.push('/Productores/Mostrar');
  };


  return (
    <html lang="en" className="dark">
      <body className="bg-white h-screen w-screen">
        <div className="h-full flex flex-col">
          <Providers>
            <Navbar
              isBordered
              isMenuOpen={isMenuOpen}
              onMenuOpenChange={setIsMenuOpen}
            >
              <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
              </NavbarContent>

              <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                  <AcmeLogo />
                  <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
              </NavbarContent>

              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                  <AcmeLogo />
                  <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Features
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="#">Customers</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Integrations
                  </Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link
                    color="foreground"
                    onClick={handleProductores}
                    aria-current="page"
                  >
                    Productores
                  </Link>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
                </NavbarItem>
                {/* <NavbarItem>
                  <Button as={Link} color="warning" href="#" variant="flat">
                    Sign Up
                  </Button>
                </NavbarItem> */}
                <NavbarItem>
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar
                        as={Link}
                        icon={<AvatarIcon />}
                        classNames={{
                          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                          icon: "text-black/80",
                        }}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="miPerfil">
                        <Link
                          className="text-white w-full"
                          onClick={handleMyPerfil}
                        >
                          Mi Perfil
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="cambiarContraseña">
                        <Link
                          className="text-white w-full"
                          onClick={handleCambiarContrasena}
                        >
                          Cambiar Contraseña
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                      >
                        Cerrar Sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </NavbarContent>

              <NavbarMenu>
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      className="w-full"
                      color={
                        index === 2
                          ? "warning"
                          : index === menuItems.length - 1
                          ? "danger"
                          : "foreground"
                      }
                      href="#"
                      size="lg"
                    >
                      {item}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>
          </Providers>
          <div className="bg-black flex flex-grow justify-center items-center">{children}</div>
        </div>
      </body>
    </html>
  );
}
