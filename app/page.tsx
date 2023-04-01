"use client";

import { Home } from "./components/home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const str: any = localStorage.getItem("user");
  try {
    const user = JSON.parse(str);
    console.log(user);
  } catch (e) {
    router.push("login");
  }

  return <Home />;
}
