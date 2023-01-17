import { useContext } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const WIDTH = 120;

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
              height={170}
              style={{ borderRadius: 6 }}
            />
          </SkeletonTheme>
        </div>
      );
    } else {
      const boxFoundInCart = cart.boxes.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <div
          style={{
            background: "white",
            width: style.width - GUTTER_SIZE,
            height: 170,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 80,
              overflow: "hidden",
            }}
          >
            <Link to={`${items[index].category}/${items[index]._id}`}>
              <img
                style={{ width: style.width - GUTTER_SIZE }}
                src={items[index].imageUrl}
                alt={items[index].name}
              />
            </Link>
          </div>

          <div style={{ background: "white", paddingLeft: 10 }}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
              }}
            >
              {items[index].name}
            </p>
            <p style={{ margin: 0, fontSize: 10, paddingTop: 2 }}>
              {items[index].description}
            </p>
            <p
              style={{
                margin: 0,
                color: "#33A02B",
                fontWeight: 700,
                fontSize: 15,
                paddingTop: 4,
                paddingBottom: 2,
              }}
            >
              {items[index].price} MT
            </p>
            {!boxFoundInCart?.quantity ? (
              <button
                style={{
                  fontSize: 11,
                  background: "#EF7200",
                  color: "white",
                  border: "none",
                  outline: "none",
                  padding: "4px 8px",
                  borderRadius: 10,
                }}
                onClick={function () {
                  add(items[index], "boxes");
                }}
              >
                Compre agora!
              </button>
            ) : (
              <Link
                to={`${items[index].category}/${items[index]._id}`}
                style={{
                  fontSize: 11,
                  background: "#33A02B",
                  border: "1px solid #33A02B",
                  padding: "3px 8px",
                  borderRadius: 10,
                  color: "white",
                }}
              >
                Ver no carinho
              </Link>
            )}
          </div>
          {/* <p style={{ marginBottom: 0 }}>
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
          </div> */}
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
            height={180}
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
    </div>
  );
}
