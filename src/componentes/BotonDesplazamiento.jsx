import { useState, useEffect } from "react";
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';

export const BotonDesplazamiento = () => {
  const [visible, setVisible] = useState(false);

  const manejarScroll = () => {
    const desplazamientoActual = window.scrollY;
    if (desplazamientoActual > 70) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  const volverArriba = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={volverArriba}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 1s ease-in-out",
            opacity: visible ? "1" : "0",
          }}
        >
          <KeyboardDoubleArrowUpRoundedIcon
            style={{
              fontSize: 60,
              opacity: "0.5",
              animation: "mover 1s infinite",
              animationDirection: "alternate",
              animationTimingFunction: "ease-in-out",
            }}
          />
        </button>
      )}
    </>
  );
};
