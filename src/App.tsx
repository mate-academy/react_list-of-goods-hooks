import { FC, useState } from 'react';
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
  ALPHABET,
  LENGTH,
}

export const App: FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const getReorderedGoods = (
    goods: string[],
    sortBy: SortType,
    reversed: boolean,
  ) => {
    // To avoid the original array mutation
    const visibleGoods = [...goods];

    visibleGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
    if (reversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET
            ? 'is-light'
            : ''}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH
            ? 'is-light'
            : ''}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed
            ? 'is-light'
            : ''}`}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(
            goodsFromServer,
            sortType,
            isReversed,
          ).map(good => (
            <li key={good} data-cy="good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
