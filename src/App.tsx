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

const SORT_ALPHABETIACALLY = 'sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function visibleListGoods(
  goods: string[],
  sortFild: string,
  reverseGood: boolean,
) {
  let sortGoods: string[] = [...goods];

  if (sortFild) {
    sortGoods = sortGoods.sort((good1, good2) => {
      switch (sortFild) {
        case SORT_ALPHABETIACALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseGood) {
    sortGoods.reverse();
  }

  return sortGoods;
}

export const App: React.FC = () => {
  const [sortFild, setSortFild] = useState('');
  const [reverseGood, setReverseGood] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFild !== SORT_ALPHABETIACALLY,
          })}
          onClick={() => {
            setSortFild(SORT_ALPHABETIACALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFild !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortFild(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': reverseGood !== true,
          })}
          onClick={() => {
            setReverseGood(!reverseGood);
          }}
        >
          Reverse
        </button>

        {sortFild !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFild('');
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleListGoods(goodsFromServer, sortFild, reverseGood).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
