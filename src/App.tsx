import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

const goodsFromServer = [
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
  NONE = 'None',
  ALPHABET = 'Alphabet',
  LENGTH = 'length',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
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
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => setStart(true)}
            className="btn btn-success"
          >
            Start
          </button>
        ) : (
          <>
            <div className="buttons">
              <button
                type="button"
                onClick={() => setSortType(SortType.ALPHABET)}
                className={classNames(
                  'btn', {
                    'btn-outline-success': sortType !== SortType.ALPHABET,
                  }, {
                    'btn-success': sortType === SortType.ALPHABET,
                  },
                )}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortType(SortType.LENGTH)}
                className={classNames(
                  'btn', {
                    'btn-outline-success': sortType !== SortType.LENGTH,
                  }, {
                    'btn-success': sortType === SortType.LENGTH,
                  },
                )}
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={() => setReversed(prevState => !prevState)}
                className="btn btn-outline-success"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortType(SortType.NONE);
                  setReversed(false);
                }}
                className="btn btn-outline-success"
              >
                Reset
              </button>
            </div>

            <ul className="list-group">
              {visibleGoods.map(good => (
                <li
                  className="list-item list-group-item"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
