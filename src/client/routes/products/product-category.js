import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

const style = {
  height: 30,
  border: "1px solid green",
  marginRight: 12,
  marginBottom: 12,
  padding: 8,
  width: "40%",
  display: "inline-block",
};

export function ProductCategory() {
  const [loadedItemsState, setLoadedItemsState] = useState({
    hasNextPage: true,
    items: Array.from({ length: 20 }).fill(0),
  });
  const [page, setPage] = useState(1);
  const { cart, add, remove } = useContext(CartContext);

  const LIMIT = 20;

  useEffect(function () {
    fetch(`${baseUrl}/products?limit=${LIMIT}&page=${page}&category=hortalica`)
      .then(function (response) {
        return response.json();
      })
      .then(function ({ items }) {
        setPage(function (prevPage) {
          return prevPage + 1;
        });
        setLoadedItemsState(function (prevState) {
          return {
            ...prevState,
            items: items,
          };
        });
      });
  }, []);

  async function fetchMoreData() {
    return fetch(
      `${baseUrl}/products?limit=${LIMIT}&page=${page}&category=hortalica`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setPage(function (prevPage) {
          return prevPage + 1;
        });
        setLoadedItemsState(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            items: [...prevState.items].concat(items),
          };
        });
      });
  }

  function Cells() {
    return loadedItemsState.items.map((_, index) => {
      const productFoundInCart = cart.items.find(function (item) {
        return item._id === loadedItemsState.items[index]._id;
      });

      return (
        <div
          style={style}
          key={index}
        >
          {loadedItemsState.items[index].name
            ? loadedItemsState.items[index].name.split(" ")[0]
            : ""}
          {productFoundInCart ? (
            <button
              onClick={function () {
                remove(loadedItemsState.items[index]);
              }}
            >
              -
            </button>
          ) : null}
          <span>{productFoundInCart ? productFoundInCart.quantity : ""}</span>
          <button
            onClick={function () {
              add(loadedItemsState.items[index]);
            }}
          >
            +
          </button>
        </div>
      );
    });
  }

  console.log(loadedItemsState.hasNextPage);

  return (
    <div
      style={{
        marginTop: 70,
        padding: "10px 20px",
        marginBottom: 100,
      }}
    >
      <h4>Categoria das Produtos: hortalicas</h4>
      <InfiniteScroll
        dataLength={loadedItemsState.items.length}
        next={fetchMoreData}
        hasMore={loadedItemsState.hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        <Cells />
      </InfiniteScroll>
    </div>
  );
}
