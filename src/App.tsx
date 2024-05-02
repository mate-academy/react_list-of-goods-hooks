import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Alphabet = 'alphabet',
  Length = 'length',
}

type Filter = {
  sortField: SortType | '';
  reversed: boolean;
};

const sortGoodsBy = (goods: string[], { sortField, reversed }: Filter) => {
  const copyGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const sortedGoods = sortGoodsBy(goodsFromServer, {
    sortField,
    reversed,
  });

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
