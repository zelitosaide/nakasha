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
                style={{ fontSize: 14, float: "left", padding: "5px 1px" }}
              >
                <NavLink
                  to={item.path}
                  style={{ padding: "5px 10px" }}
                  className={function ({ isActive, isPending }) {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  {item.name}
                  {!!items.length && item.name === "Carinho" ? (
                    <span
                      style={{
                        background: "pink",
                        display: "inline-block",
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}
                    >
                      {" "}
                      {items.length}
                    </span>
                  ) : (
                    ""
                  )}
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
