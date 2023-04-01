"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./components/ui-lib";
import { useCheckLogin } from "./hooks";

export default function App() {
  useCheckLogin();

  return <Loading />;
}
