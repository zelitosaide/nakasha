import { NavLink } from "react-router-dom";

import { Cart } from "../assets/icons/carinho";
import { Home } from "../assets/icons/home";
import { Rancho } from "../assets/icons/rancho";
import { Ajuda } from "../assets/icons/ajuda";
import { Receitas } from "../assets/icons/receitas";

import vegetais from "../assets/images/vegetais.png";
import frutas from "../assets/images/frutas.png";
import mercearia from "../assets/images/mercearia.png";

export function Root() {
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div
          id="head"
          style={{
            background: "#ccc",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
          }}
        >
          <input
            type="text"
            name="q"
            placeholder="Pesquisar por produto"
            style={{
              width: "80%",
              margin: "20px auto",
              display: "block",
              height: "40px",
              paddingLeft: 10,
            }}
          />
        </div>

        <div
          id="categorias"
          style={{
            marginTop: 70,
            padding: "10px 20px",
          }}
        >
          <h5 style={{ color: "#333" }}>Categorias</h5>

          <div
            className="cat"
            style={{ display: "flex", gap: 10 }}
          >
            <div style={{ background: "#999", padding: 5 }}>
              <img
                src={vegetais}
                alt="vegetais"
                style={{ width: 90 }}
              />
              <div style={{ textAlign: "center" }}>Vegetais</div>
            </div>
            <div style={{ background: "#999", padding: 5 }}>
              <img
                src={frutas}
                alt="frutas"
                style={{ width: 80 }}
              />
              <div style={{ textAlign: "center" }}>Frutas</div>
            </div>
            <div style={{ background: "#999", padding: 5 }}>
              <img
                src={mercearia}
                alt="mercearia"
                style={{ width: 80 }}
              />
              <div style={{ textAlign: "center", paddingBottom: 10 }}>
                Mercearia
              </div>
            </div>
          </div>
        </div>
        <div
          id="banner"
          style={{
            height: 200,
            background: "#ccc",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h5 style={{ paddingLeft: 20 }}>Banner</h5>
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
