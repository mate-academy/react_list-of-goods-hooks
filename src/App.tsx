import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  None = 'none',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

const getPreparedGoods = (goods: string[], sortType: SortType) => {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabetical:
      return preparedGoods.sort((firstGood, secondGood) =>
        firstGood.localeCompare(secondGood),
      );

    case SortType.Length:
      return preparedGoods.sort(
        (firstGood, secondGood) => firstGood.length - secondGood.length,
      );

    default:
      return preparedGoods;
  }
};

export const App = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType);

  if (isReversed) {
    visibleGoods.reverse();
  }

  const hasActiveControls = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentIsReversed => !currentIsReversed)}
        >
          Reverse
        </button>

        {hasActiveControls && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
