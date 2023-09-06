import { useState } from 'react';
import classnames from 'classnames';

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
  Default = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function getPreparedGood(
  goods: string[],
  sortType : SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case SortType.Alphabetically:
        preparedGoods.sort((item1, item2) => item1.localeCompare(item2));
        break;
      case SortType.Length:
        preparedGoods.sort((item1, item2) => item1.length - item2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goodsFromServer,
    sortType, isReversed);

  const isVisibleReset = isReversed || sortType;

  const handleResetButtonClick = () => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Alphabetically,
            },
          )}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.Length,
            },
          )}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButtonClick}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
