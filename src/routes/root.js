import { NavLink } from "react-router-dom";

import { Cart } from "../assets/icons/carinho";
import { Home } from "../assets/icons/home";
import { Rancho } from "../assets/icons/rancho";
import { Ajuda } from "../assets/icons/ajuda";
import { Receitas } from "../assets/icons/receitas";

export function Root() {
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div id="head">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </div>

        <div id="categorias">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div id="banner">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div id="lazy-load">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            height: 84,
            right: 0,
            left: 0,
          }}
        >
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              position: "relative",
              background: "#33A02B",
              height: "inherit",
            }}
          >
            <li style={{ float: "left" }}>
              <NavLink
                to="/home"
                style={{
                  height: 84,
                  display: "block",
                  position: "relative",
                  textDecoration: "none",
                  width: 70,
                }}
                className={function ({ isActive }) {
                  return isActive ? "active" : "";
                }}
              >
                <Home
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 45,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                    fontSize: 14,
                  }}
                >
                  Home
                </div>
              </NavLink>
            </li>
            <li style={{ float: "left" }}>
              <NavLink
                style={{
                  height: 84,
                  display: "block",
                  position: "relative",
                  textDecoration: "none",
                  width: 70,
                }}
                to="/rancho"
              >
                <Rancho
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 45,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                    fontSize: 14,
                  }}
                >
                  Rancho
                </div>
              </NavLink>
            </li>
            <li
              style={{
                position: "absolute",
                top: -52,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#fff",
                width: 104,
                height: 104,
                borderRadius: 52,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  background: "#33A02B",
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NavLink to="/carinho">
                  <Cart
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#F2F2F2",
                    }}
                  />
                </NavLink>
              </div>
            </li>
            <li style={{ float: "right" }}>
              <NavLink
                to="/ajuda"
                style={{
                  height: 84,
                  display: "block",
                  position: "relative",
                  textDecoration: "none",
                  width: 70,
                }}
              >
                <Ajuda
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 45,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                    fontSize: 14,
                  }}
                >
                  Ajuda
                </div>
              </NavLink>
            </li>
            <li style={{ float: "right" }}>
              <NavLink
                to="/receitas"
                style={{
                  height: 84,
                  display: "block",
                  position: "relative",
                  textDecoration: "none",
                  width: 70,
                }}
              >
                <Receitas
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 45,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#F2F2F2",
                    fontSize: 14,
                  }}
                >
                  Receitas
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
