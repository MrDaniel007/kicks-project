import { useEffect, useState } from "react";
import  "./ScrollToButton.scss"

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
      className="scrollToTopBtn"
        onClick={scrollToTop}
        title="Наверх"
       
      >
        ↑
      </button>
    )
  );
}