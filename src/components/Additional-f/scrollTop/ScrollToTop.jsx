import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // ← работает при переходе и при обновлении
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0); // ← работает при первой загрузке
  }, []);

  return null;
}