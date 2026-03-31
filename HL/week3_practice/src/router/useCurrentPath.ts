import { useEffect, useState } from "react";
import { getCurrentPath } from "./utils";

export function useCurrentPath() {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleChangePath = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handleChangePath);
    window.addEventListener("pushstate", handleChangePath);

    return () => {
      window.removeEventListener("popstate", handleChangePath);
      window.removeEventListener("pushstate", handleChangePath);
    };
  }, []);

  return path;
}