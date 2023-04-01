"use client";

import { Home } from "../components/home";
import { Loading } from "../components/ui-lib";
import { useCheckLogin } from "../hooks";

export default function App() {
  const loading = !useCheckLogin();

  if (loading) {
    return <Loading />;
  }

  return <Home />;
}
