import React, { useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const preparedGoods = goodsFromServer.map(title => ({ title, id: uuidv4() }));

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type Good = {
  title: string;
  id: string;
};

function getReorderedGoods(
  goods: Good[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });

      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => {
        return a.title.length - b.title.length;
      });

      break;

    default:
      break;
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(preparedGoods, sortType, isReversed);

  const handleStartBtnClick = () => {
    setIsStarted(true);
  };

  const handleSortBtnClick = (type: SortType) => {
    setSortType(type);
  };

  const handleReverseBtnClick = () => {
    setIsReversed(reversed => !reversed);
  };

  const handleResetBtnClick = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="App box has-background-light">
      {!isStarted
        ? (
          <button
            type="button"
            className="button is-danger is-large is-size-1"
            onClick={handleStartBtnClick}
          >
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              className={classNames(
                'button is-primary',
                { active: sortType === SortType.ALPABET },
              )}
              onClick={() => handleSortBtnClick(SortType.ALPABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={classNames(
                'button is-primary',
                { active: sortType === SortType.LENGTH },
              )}
              onClick={() => handleSortBtnClick(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={classNames(
                'button is-warning',
                { active: isReversed },
              )}
              onClick={handleReverseBtnClick}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-danger"
              onClick={handleResetBtnClick}
            >
              Reset
            </button>

            <ul className="Goods">
              {goods.map(good => (
                <li key={good.id} className="Goods__item">{good.title}</li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
