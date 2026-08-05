import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getTabValue = (pathname: string) => {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard")) {
    return "dashboard";
  }

  if (
    pathname === "/builds/explore" ||
    pathname.startsWith("/builds/explore")
  ) {
    return "explore";
  }

  if (pathname === "/builds" || pathname.startsWith("/builds")) {
    return "builds";
  }

  return "";
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB' 
  }).format(price)
