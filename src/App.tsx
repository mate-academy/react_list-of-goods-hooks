import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import className from 'classnames';

export const goodsFromServer = [
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
enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((prev, next) => prev.localeCompare(next));
      break;

    case SortType.LENGTH:
      visibleGoods.sort(
        (previousGood, nextGood) => previousGood.length - nextGood.length,
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [value, setValue] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });
  const sortByAlphabet = () => {
    setValue({ ...value, sortType: SortType.ALPHABET });
  };

  const sortByLength = () => {
    setValue({ ...value, sortType: SortType.LENGTH });
  };

  const reverse = () => {
    setValue((state) => ({
      ...value,
      isReversed: !state.isReversed,
    }));
  };

  const handleReset = () => {
    setValue({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const preparedGoods = getReorderedGoods(goodsFromServer, value);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={className('button is-info', {
            'is-light': value.sortType !== SortType.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={className('button is-success', {
            'is-light': value.sortType !== SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={className('button is-warning', {
            'is-light': !value.isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(value.sortType !== SortType.NONE || value.isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map((good) => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
