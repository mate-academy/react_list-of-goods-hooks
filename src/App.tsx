import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

// SORT_ALPHABETICALLY = 'alphabetically',
// SORT_BY_LENGTH = 'length',

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
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType | '',
  isReverse: boolean,
) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState<SortType | ''>('');
  const [isReversedGoods, setIsReversedGoods] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversedGoods,
  );
  const isResetNeeded = sortType || isReversedGoods;

  const handleResetButton = () => {
    setSortType('');
    setIsReversedGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortType(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversedGoods,
          })}
          onClick={() => setIsReversedGoods(!isReversedGoods)}
        >
          Reverse
        </button>

        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
