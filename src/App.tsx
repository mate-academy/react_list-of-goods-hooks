import React, { useState } from 'react';
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

type SortCallback = (a: string, b: string) => number;

enum SortType {
  LENGTH = 'length',
  ALPHABETICAL = 'alphabetical',
  NONE = '',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sort = (array: string[], callback: SortCallback) => {
    const sorted = array.sort(callback);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isReversed
      ? setGoods(sorted.reverse())
      : setGoods(sorted);
  };

  const sortAlphabetically = () => {
    sort([...goods], (a: string, b: string) => {
      if (a < b) {
        return -1;
      }

      if (a > b) {
        return 1;
      }

      return 0;
    });

    setSortType(SortType.ALPHABETICAL);
  };

  const sortByLength = () => {
    let copyGoods = [...goods];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isReversed ? copyGoods = copyGoods.reverse() : null;

    sort(copyGoods, (a: string, b: string) => {
      if (a.length < b.length) {
        return -1;
      }

      if (a.length > b.length) {
        return 1;
      }

      return 0;
    });

    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    const copyGoods = [...goods];
    const reversed = copyGoods.reverse();

    setIsReversed(!isReversed);
    setGoods(reversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === 'alphabetical'
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === 'length'
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortType !== '' || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
          : null}

      </div>
      <ul>
        <ul>
          {goods.map(item => (
            <li data-cy="Good">{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
