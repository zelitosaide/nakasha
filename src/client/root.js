import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { Boxes } from "../assets/icons/boxes";
import { Cart } from "../assets/icons/cart";
import { Help } from "../assets/icons/help";
import { Home } from "../assets/icons/home";
import { Recipes } from "../assets/icons/recipes";

import { CartContext } from "../provider";

export function Root() {
  const navItems = [
    { name: "Home", path: "products" },
    { name: "Rancho", path: "boxes" },
    { name: "Carinho", path: "cart" },
    { name: "Receitas", path: "recipes" },
    { name: "Ajuda", path: "help" },
  ];

  const {
    cart: { items, products, boxes, recipes },
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
            padding: "0 15px",
            border: "none",
            outline: "none",
            borderRadius: 20,
          }}
        />
      </div>

      {/* Bottom Navigation */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          height: 66,
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
                }}
              >
                {item.name === "Carinho" ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "4.6rem",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        transform: "translateX(-50%)",
                        left: "50%",
                        width: "4.6rem",
                        top: "-30px",
                        height: "4.6rem",
                        borderRadius: "2.3rem",
                        background: "white",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          transform: "translate(-50%, -50%)",
                          left: "50%",
                          top: "50%",
                          width: "3.8rem",
                          height: "3.8rem",
                          borderRadius: "2.9rem",
                          background: "#33A02B",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "3.8rem",
                            height: "3.8rem",
                          }}
                        >
                          <NavLink
                            to={item.path}
                            style={{
                              background: "#33A02B",
                              position: "absolute",
                              transform: "translate(-50%, -50%)",
                              left: "50%",
                              top: "50%",
                            }}
                          >
                            <Cart style={{ width: 30, color: "white" }} />
                          </NavLink>
                          {(!!products.length ||
                            !!boxes.length ||
                            !!recipes.length) && (
                            <div
                              style={{
                                position: "absolute",
                                fontSize: 11,
                                padding: "2px 3px",
                                borderRadius: 9,
                                background: "#EF7200",
                                minWidth: 18,
                                minHeightt: 18,
                                textAlign: "center",
                                right: 4,
                                top: 0,
                                color: "white",
                              }}
                            >
                              {products.length + boxes.length + recipes.length}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{}}>
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 40,
                        }}
                      >
                        {item.name === "Home" && (
                          <Home
                            style={{
                              width: 20,
                              color: "hsla(0, 0%, 100%, 0.6)",
                              marginTop: 5,
                              marginBottom: 2,
                            }}
                          />
                        )}
                        {item.name === "Rancho" && (
                          <Boxes
                            style={{
                              width: 18,
                              color: "hsla(0, 0%, 100%, 0.6)",
                              marginTop: 5,
                              marginBottom: 2,
                            }}
                          />
                        )}
                        {item.name === "Receitas" && (
                          <Recipes
                            style={{
                              width: 20,
                              color: "hsla(0, 0%, 100%, 0.6)",
                              marginTop: 5,
                              marginBottom: 2,
                            }}
                          />
                        )}
                        {item.name === "Ajuda" && (
                          <Help
                            style={{
                              width: 18,
                              color: "hsla(0, 0%, 100%, 0.6)",
                              marginTop: 5,
                              marginBottom: 2,
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontSize: 11,
                            color: "hsla(0, 0%, 100%, 0.6)",
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                    </NavLink>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        style={{
          background: "#EBEBEB",
          paddingBottom: 86,
          paddingTop: 100,
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
