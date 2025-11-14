import { useState, useEffect } from "react";

export default function useAuth() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  return isLogged;
}
