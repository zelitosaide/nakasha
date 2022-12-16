import { useContext } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CartContext } from "../../provider";

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

  const GUTTER_SIZE = 12;
  const WIDTH = 120;

  function Item({ index, style }) {
    let content;

    if (!isItemLoaded(index)) {
      content = (
        <div>
          <Skeleton height={80} />
        </div>
      );
    } else {
      const productFoundInCart = cart.items.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <div>
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
        </div>
      );
    }

    return (
      <div
        // className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        style={{
          ...style,
          width: style.width - GUTTER_SIZE,
          height: 80,
        }}
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
          // itemSize={WIDTH + GUTTER_SIZE}
          itemSize={WIDTH}
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
