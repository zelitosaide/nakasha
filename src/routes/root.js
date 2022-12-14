import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { CartContext } from "../provider";

export function Root() {
  const navItems = [
    { name: "Home", path: "home" },
    { name: "Rancho", path: "boxes" },
    { name: "Carinho", path: "cart" },
    { name: "Receitas", path: "recipes" },
    { name: "Ajuda", path: "help" },
  ];

  const {
    cart: { items },
  } = useContext(CartContext);

  return (
    <>
      <div
        style={{
          background: "#33A02B",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 100,
          padding: 20,
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="Pesquisar por produto"
          style={{
            width: "100%",
            display: "block",
            height: "40px",
            boxSizing: "border-box",
            padding: "0 10px",
          }}
        />
      </div>

      {/* Bottom Navigation */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          height: 84,
          right: 0,
          left: 0,
          background: "#33A02B",
          zIndex: 100,
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map(function (item, index) {
            return (
              <li
                key={index}
                style={{
                  fontSize: 14,
                  float: "left",
                  width: "20%",
                  position: item.name === "Carinho" ? "relative" : "",
                  background: item.name === "Carinho" ? "white" : "",
                }}
              >
                {item.name === "Carinho" && (
                  <div
                    style={{
                      background: "red",
                      position: "absolute",
                      transform: "translateX(-50%)",
                      left: "50%",
                    }}
                  >
                    ola
                  </div>
                )}
                <NavLink
                  to={item.path}
                  style={{
                    padding: "5px 10px",
                    display: "block",
                  }}
                  className={function ({ isActive, isPending }) {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  {item.name}
                  {/* {!!items.length && item.name === "Carinho" ? (
                    <span
                      style={{
                        background: "#243879",
                        display: "inline-block",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        color: "white",
                        marginLeft: 5,
                      }}
                    >
                      {items.length}
                    </span>
                  ) : (
                    ""
                  )} */}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
