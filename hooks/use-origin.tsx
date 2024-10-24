// import { useEffect, useState } from "react";

// export const useOrigin = () => {
//   const [mounted, setMounted] = useState<boolean>(false);

//   const origin =
//     typeof window !== "undefined" && window.location.origin
//       ? window.location.origin
//       : "";
//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (mounted) {
//     return "";
//   }
//   return origin;
// };
import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
    setMounted(true);
  }, []);

  return origin;
};
