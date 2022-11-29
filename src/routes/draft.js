import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { Cart } from "../assets/icons/carinho";
import { Home } from "../assets/icons/home";
import { Rancho } from "../assets/icons/rancho";
import { Ajuda } from "../assets/icons/ajuda";
import { Receitas } from "../assets/icons/receitas";

import vegetais from "../assets/images/vegetais.png";
import frutas from "../assets/images/frutas.png";
import mercearia from "../assets/images/mercearia.png";
import { LazyLoad } from "./lazy-load";

let page = 1,
  page2 = 1,
  page3 = 1;
const LIMIT = 5;

export function Root() {
  const [state, setState] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    totalResults: 0,
  });

  const [state2, setState2] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    totalResults: 0,
  });

  const [state3, setState3] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    totalResults: 0,
  });

  async function loadNextPage() {
    return fetch(
      `http://localhost:5000/invoices?limit=${LIMIT}&page=${page++}&favorite=true`
    )
      .then(function (response) {
        setState(function (prevState) {
          return {
            ...prevState,
            isNextPageLoading: true,
          };
        });
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setState(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            isNextPageLoading: false,
            items: [...prevState.items].concat(items),
            totalResults: totalResults,
          };
        });
      });
  }

  async function loadNextPage3() {
    return fetch(
      `http://localhost:5000/invoices?limit=${LIMIT}&page=${page3++}&favorite=false`
    )
      .then(function (response) {
        setState3(function (prevState) {
          return {
            ...prevState,
            isNextPageLoading: true,
          };
        });
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setState3(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            isNextPageLoading: false,
            items: [...prevState.items].concat(items),
            totalResults: totalResults,
          };
        });
      });
  }

  async function loadNextPage2() {
    return fetch(
      `http://localhost:5000/invoices?limit=${LIMIT}&page=${page2++}`
    )
      .then(function (response) {
        setState2(function (prevState) {
          return {
            ...prevState,
            isNextPageLoading: true,
          };
        });
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setState2(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            isNextPageLoading: false,
            items: [...prevState.items].concat(items),
            totalResults: totalResults,
          };
        });
      });
  }

  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div
          id="head"
          style={{
            background: "#33A02B",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 100,
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
            <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
              <img
                src={vegetais}
                alt="vegetais"
                style={{ width: 90 }}
              />
              <div style={{ textAlign: "center" }}>Vegetais</div>
            </div>
            <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
              <img
                src={frutas}
                alt="frutas"
                style={{ width: 80 }}
              />
              <div style={{ textAlign: "center" }}>Frutas</div>
            </div>
            <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
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
            height: 180,
            marginTop: 10,
          }}
        >
          <div
            style={{
              height: 180,
              marginLeft: 20,
              marginRight: 20,
              background: "#f8f8f0",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d9dddd",
            }}
          >
            <h5>Banner</h5>
          </div>
        </div>
        <div id="lazy-load">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h5 style={{ marginLeft: 20 }}>Frutas da epoca</h5>
            <Link to="/frutasepoca">
              <i style={{ paddingRight: 20 }}>Ver todos</i>
            </Link>
          </div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <LazyLoad
              hasNextPage={state.hasNextPage}
              isNextPageLoading={state.isNextPageLoading}
              items={state.items}
              loadNextPage={loadNextPage}
              setState={setState}
            />
          </div>
        </div>

        <div id="lazy-load">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h5 style={{ marginLeft: 20 }}>Saborosas e Epicas</h5>
            <Link to="/saborosasepicas">
              <i style={{ paddingRight: 20 }}>Ver todos</i>
            </Link>
          </div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <LazyLoad
              hasNextPage={state3.hasNextPage}
              isNextPageLoading={state3.isNextPageLoading}
              items={state3.items}
              loadNextPage={loadNextPage3}
              setState={setState3}
            />
          </div>
        </div>

        <div
          id="lazy-load"
          style={{ paddingBottom: 140 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h5 style={{ marginLeft: 20 }}>Frescos e saudaveis</h5>
            <Link to="/frescossaudaveis">
              <i style={{ paddingRight: 20 }}>Ver todos</i>
            </Link>
          </div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <LazyLoad
              hasNextPage={state2.hasNextPage}
              isNextPageLoading={state2.isNextPageLoading}
              items={state2.items}
              loadNextPage={loadNextPage2}
              setState={setState2}
            />
          </div>
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

      <div id="details">
        <Outlet />
      </div>
    </>
  );
}

// categoria

// import { useState } from "react";
// import { FixedSizeGrid as Grid } from "react-window";
// import { FixedSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";

// let page = 1;
// const LIMIT = 20;

// export function Category({ name }) {
//   const [state, setState] = useState({
//     hasNextPage: true,
//     isNextPageLoading: false,
//     items: [],
//   });

//   async function loadNextPage() {
//     console.log("items");
//     return fetch(`http://localhost:5000/invoices?limit=${LIMIT}&page=${page++}`)
//       .then(function (response) {
//         setState(function (prevState) {
//           return {
//             ...prevState,
//             isNextPageLoading: true,
//           };
//         });
//         return response.json();
//       })
//       .then(function ({ items, pageInfo: { totalResults } }) {
//         console.log(items);
//         setState(function (prevState) {
//           return {
//             ...prevState,
//             hasNextPage: prevState.items.length < totalResults,
//             isNextPageLoading: false,
//             items: [...prevState.items].concat(items),
//             totalResults: totalResults,
//           };
//         });
//       });
//   }

//   const itemCount = state.hasNextPage
//     ? state.items.length + 1
//     : state.items.length;

//   const loadMoreItems = state.isNextPageLoading ? () => {} : loadNextPage;

//   // const isItemLoaded = (index) =>
//   //   !state.hasNextPage || index < state.items.length;
//   function isItemLoaded(index) {
//     return !state.hasNextPage || index < state.items.length;
//   }

//   // Render an item or a loading indicator.
//   const Item = ({ index, style }) => {
//     let content;
//     if (!isItemLoaded(index)) {
//       content = "Loading...";
//     } else {
//       content = (
//         <p>
//           favorite: {state.items[index].favorite.toString()}
//           <br />
//           {state.items[index].count ? (
//             <button
//               onClick={function () {
//                 setState(function (prevState) {
//                   return {
//                     ...prevState,
//                     items: prevState.items.map(function (invoice, i) {
//                       if (i === index) {
//                         return { ...invoice, count: invoice.count - 1 };
//                       } else {
//                         return invoice;
//                       }
//                     }),
//                   };
//                 });
//               }}
//             >
//               -
//             </button>
//           ) : null}
//           <span>{state.items[index].count}</span>
//           <button
//             onClick={function () {
//               setState(function (prevState) {
//                 return {
//                   ...prevState,
//                   items: prevState.items.map(function (invoice, i) {
//                     if (i === index) {
//                       return { ...invoice, count: invoice.count + 1 };
//                     } else {
//                       return invoice;
//                     }
//                   }),
//                 };
//               });
//             }}
//           >
//             +
//           </button>
//         </p>
//       );
//     }
//     return (
//       <div
//         className={index % 2 ? "ListItemOdd" : "ListItemEven"}
//         style={style}
//       >
//         {content}
//       </div>
//     );
//   };

//   function Cell({ columnIndex, rowIndex, style }) {
//     let index = rowIndex * 1 + columnIndex;
//     let content;

//     console.log(state);

//     if (!isItemLoaded(index)) {
//       content = "Loading...";
//     } else {
//       content = index;
//     }

//     return (
//       <div
//         className={
//           columnIndex % 2
//             ? rowIndex % 2 === 0
//               ? "GridItemOdd"
//               : "GridItemEven"
//             : rowIndex % 2
//             ? "GridItemOdd"
//             : "GridItemEven"
//         }
//         style={style}
//       >
//         r{rowIndex}, c{columnIndex} - {content}
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h3>{name}</h3>
//       <InfiniteLoader
//         isItemLoaded={isItemLoaded}
//         itemCount={itemCount}
//         loadMoreItems={loadMoreItems}
//       >
//         {({ onItemsRendered, ref }) => (
//           // <List
//           //   className="List"
//           //   height={600}
//           //   itemCount={itemCount}
//           //   itemSize={120}
//           //   onItemsRendered={onItemsRendered}
//           //   ref={ref}
//           //   width={300}
//           //   style={{ width: "100%" }}
//           // >
//           //   {Item}
//           // </List>
//           <Grid
//             className="Grid" //
//             columnCount={2} //
//             rowCount={Math.ceil(itemCount / 2)} //
//             columnWidth={100}
//             height={400} //
//             rowHeight={35} //
//             width={300} //
//             onItemsRendered={onItemsRendered} //
//             ref={ref} //
//             style={{ width: "100%" }}
//           >
//             {Cell}
//           </Grid>
//         )}
//       </InfiniteLoader>
//     </div>
//   );
// }

// // https://codesandbox.io/s/6te1w?file=/src/InfiniteLoader.tsx
