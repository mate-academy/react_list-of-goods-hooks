import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { Good } from './react-app-env';

export const goodsFromServer = [
  { name: 'Dumplings', id: 1 },
  { name: 'Carrot', id: 2 },
  { name: 'Eggs', id: 3 },
  { name: 'Ice cream', id: 4 },
  { name: 'Apple', id: 5 },
  { name: 'Bread', id: 6 },
  { name: 'Fish', id: 7 },
  { name: 'Honey', id: 8 },
  { name: 'Jam', id: 9 },
  { name: 'Garlic', id: 10 },
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
  goods: Good[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prevGoods, currGoods) => {
    const prevName = prevGoods.name;
    const currName = currGoods.name;

    switch (sortType) {
      case SortType.ALPABET:
        return prevName.localeCompare(currName);

      case SortType.LENGTH:
        return prevName.length - currName.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const originalOrder = sortType !== SortType.NONE || isReversed !== false;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const sortByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setReverse(prev => !prev);
  };

  const handleReset = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': isReversed === false,
            },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {originalOrder
        && (
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
        {reorderedGoods.map(({ name, id }) => (
          <li data-cy="Good" key={id}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
