import { useContext } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CartContext } from "../../../provider";
import { Cart } from "../../../assets/icons/cart";

export function ProdutoHorizontalLazyLoad({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  const itemCount = hasNextPage ? items.length + 3 : items.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const { cart, add } = useContext(CartContext);

  const GUTTER_SIZE = 12;
  const WIDTH = 108;

  function Item({ index, style }) {
    let content;

    if (!isItemLoaded(index)) {
      content = (
        <div>
          <SkeletonTheme
            baseColor="#ccc"
            highlightColor="#bbb"
          >
            <Skeleton
              width={style.width - GUTTER_SIZE}
              height={120}
              style={{ borderRadius: 6 }}
            />
          </SkeletonTheme>
        </div>
      );
    } else {
      const productFoundInCart = cart.items.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <div
          style={{
            background: "white",
            width: style.width - GUTTER_SIZE,
            height: 120,
            borderRadius: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ height: 70, overflow: "hidden" }}>
            <Link to={`${items[index].category}/${items[index]._id}`}>
              <img
                style={{ width: style.width - GUTTER_SIZE }}
                src={items[index].imageUrl}
                alt={items[index].name}
              />
            </Link>
          </div>
          <div style={{ padding: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                display: "block",
                color: "#444",
              }}
            >
              {items[index].name.split("-")[0].split(" ")[0]} 2kg
            </span>

            <span
              style={{
                fontSize: 8,
                fontWeight: 400,
                display: "block",
                color: "#777",
              }}
            >
              {items[index].name.length < 14 ? (
                items[index].name
              ) : (
                <>{items[index].name.slice(0, 14)}...</>
              )}
            </span>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  display: "block",
                  color: "#33A02B",
                  paddingTop: 2,
                }}
              >
                {items[index].price} MT
              </span>
              {!productFoundInCart ? (
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    background: "#33A02B",
                    color: "white",
                    width: 20,
                    height: 18,
                    marginTop: -3,
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 4,
                  }}
                  onClick={function () {
                    add(items[index]);
                  }}
                >
                  +
                </button>
              ) : (
                <Link
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: -3,
                    height: 18,
                    width: 20,
                  }}
                  to={`${items[index].category}/${items[index]._id}`}
                >
                  <Cart style={{ width: 17, color: "#33A02B" }} />
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          ...style,
          width: style.width - GUTTER_SIZE,
          height: style.width - GUTTER_SIZE,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div style={{ marginTop: -5, marginBottom: 6 }}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            // height={WIDTH}
            height={130}
            itemCount={itemCount}
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
    </div>
  );
}
