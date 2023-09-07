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
  ByName = 'alphabet',
  ByLength = 'length',
  ByDefault = '',
}

function getVisibleGoods(
  goods: string[],
  sortType: SortType,
  reverseSelected: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ByName:
        return good1.localeCompare(good2);
      case SortType.ByLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseSelected) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.ByDefault);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );
  const isResetVisible = sortType || isReversed;
  const handleResetButtonClick = () => {
    setSortType(SortType.ByDefault);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ByName)}
          type="button"
          className={classNames(
            'button',
            'is-info', {
              'is-light': sortType !== SortType.ByName,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.ByLength)}
          type="button"
          className={classNames(
            'button',
            'is-success', {
              'is-light': sortType !== SortType.ByLength,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(prevIsReversed => !prevIsReversed);
          }}
          type="button"
          className={classNames(
            'button',
            'is-warning', {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {isResetVisible
          && (
            <button
              onClick={() => handleResetButtonClick()}
              type="button"
              className="button is-danger is-light"
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
