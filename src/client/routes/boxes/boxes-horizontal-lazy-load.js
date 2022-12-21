import { useContext } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { CartContext } from "../../../provider";

export function BoxesHorizontalLazyLoad({
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
  const WIDTH = 118;

  function Item({ index, style }) {
    let content;

    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      const boxFoundInCart = cart.items.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <div
          style={{
            background: "#ccc",
            width: style.width - GUTTER_SIZE,
            height: 200 - GUTTER_SIZE,
          }}
        >
          <p style={{ marginBottom: 0 }}>
            {items[index].name}
            <br />
            {boxFoundInCart && (
              <button
                onClick={function () {
                  remove(items[index]);
                }}
              >
                -
              </button>
            )}
            <span>{boxFoundInCart && boxFoundInCart.quantity}</span>
            <button
              onClick={function () {
                add(items[index]);
              }}
            >
              +
            </button>
          </p>
          <div>
            <Link to={`${items[index].category}/${items[index]._id}`}>
              See Details
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div style={{ ...style, background: index % 2 ? "pink" : "green" }}>
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
          height={200 + GUTTER_SIZE}
          itemSize={WIDTH}
          itemCount={itemCount}
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
