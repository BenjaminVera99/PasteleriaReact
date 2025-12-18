import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../paginas/Home";

// ✅ Mock Navbar y Footer (evita dependencias)
jest.mock("../componentes/Navbar", () => () => <nav>Navbar</nav>);
jest.mock("../componentes/Footer", () => () => <footer>Footer</footer>);

// ✅ Mock imagen (evita error por assets)
jest.mock("../assets/imagenes/Mil Sabores.png", () => "mock-portada.png");

describe("Home (simple)", () => {
  test("renderiza textos principales", () => {
    render(<Home />);

    expect(
      screen.getByText('"50 años endulzando Chile con sabor y cariño"')
    ).toBeTruthy();

    expect(
      screen.getByText("¡Bienvenidos a Pastelería Mil Sabores!")
    ).toBeTruthy();
  });
});
