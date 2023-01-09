import { useState } from 'react';
import './App.scss';
import classNames from 'classnames';
import 'bulma/css/bulma.css';

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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1: string, good2: string) => {
    switch (sortType) {
      case SortType.ALPHABET:

        return good1.localeCompare(good2);
      case SortType.LENGTH:

        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReverse);
  const resetSortFilters = () => {
    setIsReverse(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse((prev) => !prev)}
        >
          Reverse
        </button>

        {(isReverse || sortType !== SortType.NONE)
          && (<button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortFilters}
          >
            Reset
          </button>)}

      </div>

      <div>
        <ul>
          {goods.map((good) => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
