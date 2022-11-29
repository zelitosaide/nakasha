import { useContext } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { CartContext } from "../provider";

export function ProdutoHorizontalLazyLoad({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  const itemCount = hasNextPage ? items.length + 3 : items.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const { cart, add, remove } = useContext(CartContext);

  function Item({ index, style }) {
    let content;

    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      const productFoundInCart = cart.items.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <p>
          {items[index].name.indexOf("caixa") > -1
            ? items[index].name
            : items[index].name.split(" ")[0]}
          <br />
          {productFoundInCart ? (
            <button
              onClick={function () {
                remove(items[index]);
              }}
            >
              -
            </button>
          ) : null}
          <span>{productFoundInCart ? productFoundInCart.quantity : ""}</span>
          <button
            onClick={function () {
              add(items[index]);
            }}
          >
            +
          </button>
        </p>
      );
    }

    return (
      <div
        className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        style={style}
      >
        {content}
      </div>
    );
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={95}
          itemCount={itemCount}
          itemSize={120}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={300}
          layout="horizontal"
          style={{ width: "100%" }}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}
