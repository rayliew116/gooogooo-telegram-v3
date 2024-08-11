import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useBodyClass(className: string) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {  // replace with your specific route
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
    
    return () => {
      document.body.classList.remove(className);  // Cleanup on unmount
    };
  }, [location.pathname, className]);
}

export default useBodyClass;