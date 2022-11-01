import { Link } from "react-router-dom";
import { Cart } from "../assets/icons/cart";

export function Root() {
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div id="head"></div>

        <div id="categorias"></div>

        <div id="banner"></div>

        <div id="lazy-load"></div>

        <nav
          style={{
            position: "absolute",
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
              height: "inherit"
            }}
          >
            <li style={{ float: "left" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ float: "left" }}>
              <Link to="/rancho">Rancho</Link>
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
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div>
                  <Cart
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)"
                    }}
                  />
                </div>
                {/* <Link
                  to="/carinho"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  Carinho
                </Link> */}
              </div>
            </li>
            <li style={{ float: "right" }}>
              <Link to="/ajuda">Ajuda</Link>
            </li>
            <li style={{ float: "right" }}>
              <Link to="/receitas">Receitas</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}