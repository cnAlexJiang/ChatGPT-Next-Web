'use client'


import { Home } from "./components/home";
import { useRouter } from 'next/navigation'

export default function App() {
  const router = useRouter()
  router.push('login')
  return (
      <Home />
  );
}
