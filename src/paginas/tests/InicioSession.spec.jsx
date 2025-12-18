import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// ✅ IMPORT CORRECTO (ajusta si tu ruta es distinta)
import InicioSesion from "../paginas/InicioSesion";

jest.mock("../componentes/Navbar", () => () => <nav>Navbar</nav>);

jest.mock("../services/authService", () => ({
  loginRequest: jest.fn(),
}));
import { loginRequest } from "../services/authService";

describe("InicioSesion (simple)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("muestra error si envío vacío", async () => {
    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(
      await screen.findByText("Por favor ingrese correo y contraseña")
    ).toBeInTheDocument();
  });

  test("si loginRequest responde, guarda token", async () => {
    loginRequest.mockResolvedValue({
      token: "t",
      username: "u",
      role: "ROLE_USER",
    });

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su correo"), {
      target: { value: "a@a.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(loginRequest).toHaveBeenCalledWith("a@a.com", "123");
    });

    expect(localStorage.getItem("token")).toBe("t");
  });
});
