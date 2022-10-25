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
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((previous, current) => {
    switch (sortType) {
      case SortType.ALPABET:
        return previous.localeCompare(current);

      case SortType.LENGTH:
        return previous.length - current.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const sortByAlphabet = () => setSortType(SortType.ALPABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const toggleReverse = () => setIsReversed(!isReversed);

  const resetReverse = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.NONE || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={resetReverse}
              >
                Reset
              </button>
            )
        }
      </div>
      <ul>
        <ul>
          {goods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              { good }
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
