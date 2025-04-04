import { useEffect } from "react";

const useScrollToTop = (dependency: any) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dependency]);
};

export default useScrollToTop;
