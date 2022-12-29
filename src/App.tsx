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

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState('NONE');

  const alphabet = () => {
    setSortType('ALPHABET');
  };

  const length = () => {
    setSortType('LENGTH');
  };

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setIsReverse(false);
    setSortType('NONE');
  };

  const setSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    sortedGoods.sort((a, b) => {
      switch (sortType) {
        case 'ALPHABET':
          return a.localeCompare(b);
        case 'LENGTH':
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (isReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = setSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'ALPHABET' ? 'is-light' : ''}`}
          onClick={() => {
            return alphabet();
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'LENGTH' ? 'is-light' : ''}`}
          onClick={() => {
            return length();
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
          onClick={() => {
            return reverse();
          }}
        >
          Reverse
        </button>
        {
          JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer)
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  return reset();
                }}
              >
                Reset
              </button>
            ) : <div />
        }
      </div>

      <ul>
        <ul>
          {
            visibleGoods.map((good) => {
              return (
                <li key={good} data-cy="Good">{good}</li>
              );
            })
          }
        </ul>
      </ul>
    </div>
  );
};
