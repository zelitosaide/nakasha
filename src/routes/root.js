import { Link } from "react-router-dom";

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
            height: 96,
            background: "pink"
          }}
        >
          <ul style={{ margin: 0, padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rancho">Rancho</Link>
            </li>
            <li>
              <Link to="/carinho">Carinho</Link>
            </li>
            <li>
              <Link to="/receitas">Receitas</Link>
            </li>
            <li>
              <Link to="/ajuda">Ajuda</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}