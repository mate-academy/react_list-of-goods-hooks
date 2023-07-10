import React, { useState } from 'react';
import cn from 'classnames';
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

const SORT_BY_ALPHABET = 'aplhabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reverse: boolean,
):string[] {
  const copy = [...goods];

  if (sortField) {
    copy.sort((curGood, nextGood) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return curGood.localeCompare(nextGood);
        case SORT_BY_LENGTH:
          return curGood.length - nextGood.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    copy.reverse();
  }

  return copy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            "button is-info",
              {
                'is-light': sortType !== SORT_BY_ALPHABET
              }
            )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_LENGTH)}
          type="button"
          className={cn("button is-success", {'is-light': sortType !== SORT_BY_LENGTH} )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn("button is-danger", {'is-light': !isReversed} )}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
