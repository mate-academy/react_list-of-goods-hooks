import { useState } from "react";
import "bulma/css/bulma.css";
import "./App.scss";
import { Buttons } from "./components/Buttons";
import { GoodList } from "./components/GoodList";
import { SortType, SortDirection } from "./constants";

export const goodsFromServer = [
  "Dumplings",
  "Carrot",
  "Eggs",
  "Ice cream",
  "Apple",
  "Bread",
  "Fish",
  "Honey",
  "Jam",
  "Garlic",
];

const prepareGoods = (
  goods: string[],
  sortOrder: string,
  sortDirection: string,
) => {
  const goodsCopy = [...goods];

  switch (sortOrder) {
    case SortType.ALPHABETICALLY:
      goodsCopy.sort((next, prev) => next.localeCompare(prev));
      break;
    case SortType.BY_LENGTH:
      goodsCopy.sort((next, prev) => next.length - prev.length);
      break;
    default:
      break;
  }

  if (sortDirection === SortDirection.OPPOSITE) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [order, setOrder] = useState(SortType.BY_DEFAULT);
  const [direction, setDirection] = useState(SortDirection.DIRECTLY);

  const switchDirection = () => {
    setDirection(
      direction === SortDirection.DIRECTLY
        ? SortDirection.OPPOSITE
        : SortDirection.DIRECTLY,
    );
  };

  const resetSortSettings = () => {
    setOrder(SortType.BY_DEFAULT);
    setDirection(SortDirection.DIRECTLY);
  };

  const preparedGoods = prepareGoods(goodsFromServer, order, direction);

  return (
    <div className="section content">
      <Buttons
        sortAlphabetically={() => setOrder(SortType.ALPHABETICALLY)}
        sortByLength={() => setOrder(SortType.BY_LENGTH)}
        reverse={() => switchDirection()}
        reset={() => resetSortSettings()}
        order={order}
        direction={direction}
      />
      <GoodList goods={preparedGoods} />
    </div>
  );
};
