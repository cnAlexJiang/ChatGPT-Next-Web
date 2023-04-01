import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useCheckLogin() {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const str: any = localStorage.getItem("user");
    try {
      const user = JSON.parse(str);
      console.log(user);
      if (!user) {
        router.push("login");
      } else {
        setHasHydrated(true);
      }
    } catch (e) {
      router.push("login");
    }
  }, []);
  return hasHydrated;
}
