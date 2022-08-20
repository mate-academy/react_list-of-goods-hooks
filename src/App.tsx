import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';
import 'bulma/css/bulma.min.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
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

export const App: React.FC = () => {
  const [isStarted, setisStarted] = useState(false);
  const [isReversed, setisReversed] = useState(false);
  const [sortType, setsortType] = useState(SortType.NONE);

  const start = () => {
    setisStarted(true);
  };

  const sortByAlphabet = () => {
    setsortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setsortType(SortType.LENGTH);
  };

  const reverse = () => {
    setisReversed((currentCondition) => !currentCondition);
  };

  const reset = () => {
    setisReversed(false);
    setsortType(0);
  };

  const goods = [...goodsFromServer];

  goods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return item1.localeCompare(item2);
      case SortType.LENGTH:
        return (item1.length - item2.length);
      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App box ">
      <div className="columns is-centered">
        {!isStarted && (
          <button
            type="button"
            onClick={start}
            className={cn(
              'button',
              'is-success',
              'is-rounded',
            )}
          >
            Start
          </button>
        )}
      </div>

      {isStarted && (
        <div>
          <div className="
            columns
            is-centered
            is-multiline"
          >
            <button
              type="button"
              className={cn(
                'button',
                'is-warning',
                'is-rounded',
                'column',
                'is-2',
                { 'btn-active': SortType.ALPHABET === sortType },
              )}
              onClick={sortByAlphabet}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={cn(
                'button',
                'is-warning',
                'is-rounded',
                'column',
                'is-2',
                { 'btn-active': SortType.LENGTH === sortType },
              )}
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={cn(
                'button',
                'is-warning',
                'is-rounded',
                'column',
                'is-2',
                { 'btn-active': isReversed === true },
              )}
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className={cn(
                'button',
                'is-danger',
                'is-rounded',
                'column',
                'is-2',

              )}
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {goods.map(good => (
              <li className="Goods__item" key={good}>{good}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
