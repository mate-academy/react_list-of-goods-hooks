import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

const SORT_ALPHABET: string = 'Alphabet';
const SORT_LENGTH: string = 'Length';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<string>('');
  const [isReversed, setReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);

  const modifyGoods = (
    list: string[],
    type: string,
    reversed: boolean,
  ): string[] => {
    let sorted: string[];

    switch (type) {
      case SORT_ALPHABET:
        sorted = [...list].sort((a, b) => a.localeCompare(b));
        break;
      case SORT_LENGTH:
        sorted = [...list].sort((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b);
          }

          return a.length - b.length;
        });
        break;
      default:
        sorted = [...list];
    }

    if (reversed) {
      sorted = sorted.toReversed();
    }

    return sorted;
  };

  const sortAlphabet = (): void => {
    const sorted = modifyGoods(goodsFromServer, SORT_ALPHABET, isReversed);

    setVisibleGoods(sorted);
    setSortType(SORT_ALPHABET);
  };

  const sortLength = (): void => {
    const sorted = modifyGoods(goodsFromServer, SORT_LENGTH, isReversed);

    setVisibleGoods(sorted);
    setSortType(SORT_LENGTH);
  };

  const reverse = (): void => {
    setReversed(prevReversed => {
      const newReversed = !prevReversed;
      const sorted = modifyGoods(goodsFromServer, sortType, newReversed);

      setVisibleGoods(sorted);

      return newReversed;
    });
  };

  const reset = (): void => {
    setVisibleGoods(goodsFromServer);
    setSortType('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {visibleGoods.join('') !== goodsFromServer.join('') && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
