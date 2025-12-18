import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// ✅ IMPORT CORRECTO (ajusta si tu ruta es distinta)
import Navbar from "../componentes/Navbar";

jest.mock("../hooks/useAuth", () => jest.fn());
import useAuth from "../hooks/useAuth";

jest.mock("../services/logoutService", () => ({
  logout: jest.fn(),
}));

jest.mock("../assets/imagenes/Mil Sabores.png", () => "mock-logo.png");

describe("Navbar (simple)", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renderiza links principales", () => {
    useAuth.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
    expect(screen.getByText("Catálogo")).toBeTruthy();
    expect(screen.getByText("Carrito")).toBeTruthy();
  });

  test("si no está logeado muestra botones de login/registro", () => {
    useAuth.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Crear Perfil")).toBeTruthy();
  });
});
