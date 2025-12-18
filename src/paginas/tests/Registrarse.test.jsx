import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registrarse from "../paginas/Registrarse";

// ✅ Mock Navbar para que no interfiera
jest.mock("../componentes/Navbar", () => () => <nav>Navbar</nav>);

// ✅ Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Mock services
jest.mock("../services/authService", () => ({
  registerUser: jest.fn(),
  loginRequest: jest.fn(),
}));
import { registerUser, loginRequest } from "../services/authService";

describe("Registrarse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("si envío vacío, muestra error 'Por favor completa todos los campos'", async () => {
    render(
      <MemoryRouter>
        <Registrarse />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /enviar registro/i }));

    expect(await screen.findByText("Por favor completa todos los campos")).toBeInTheDocument();
    expect(registerUser).not.toHaveBeenCalled();
    expect(loginRequest).not.toHaveBeenCalled();
  });

  test("toggle contraseña cambia entre password y text (Ver/Ocultar)", () => {
    render(
      <MemoryRouter>
        <Registrarse />
      </MemoryRouter>
    );

    const passInput = screen.getByPlaceholderText("Ingrese su contraseña");
    const toggleBtn = screen.getByRole("button", { name: "Ver" });

    expect(passInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(passInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar" }));
    expect(passInput).toHaveAttribute("type", "password");
  });

  test("con datos válidos: llama registerUser con payload correcto, luego loginRequest y guarda sesión", async () => {
    registerUser.mockResolvedValue({ ok: true }); // tu código revisa result.error
    loginRequest.mockResolvedValue({ token: "fake-token", role: "ROLE_USER" });

    render(
      <MemoryRouter>
        <Registrarse />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre"), {
      target: { value: "Benja" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su apellido"), {
      target: { value: "Nuñez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su correo"), {
      target: { value: "benja@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su dirección"), {
      target: { value: "Av. Siempre Viva 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar registro/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledTimes(1);
    });

    // ✅ Validar payload exacto
    expect(registerUser).toHaveBeenCalledWith({
      username: "benja@test.com",
      password: "123456",
      nombres: "Benja",
      apellidos: "Nuñez",
      fechaNac: "2000-01-01",
      direccion: "Av. Siempre Viva 123",
    });

    await waitFor(() => {
      expect(loginRequest).toHaveBeenCalledWith("benja@test.com", "123456");
    });

    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(localStorage.getItem("role")).toBe("ROLE_USER");
    expect(localStorage.getItem("username")).toBe("benja@test.com");

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("si backend devuelve result.error, muestra ese error y NO hace login", async () => {
    registerUser.mockResolvedValue({ error: "Usuario ya existe" });

    render(
      <MemoryRouter>
        <Registrarse />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre"), {
      target: { value: "Benja" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su apellido"), {
      target: { value: "Nuñez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su correo"), {
      target: { value: "benja@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su dirección"), {
      target: { value: "Av. Siempre Viva 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar registro/i }));

    expect(await screen.findByText("Usuario ya existe")).toBeInTheDocument();
    expect(loginRequest).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
