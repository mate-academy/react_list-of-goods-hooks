import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

enum SortType {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function sortBy(goods: string[], sortElement: string, isReverse: boolean) {
  const prepearGoods = [...goods];

  if (sortElement) {
    prepearGoods.sort((good1, good2) => {
      switch (sortElement) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return isReverse ? prepearGoods.toReversed() : prepearGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);
  const visibleFeilds: SortType = sortBy(goodsFromServer, sortField, reverse);
  const haveReset = reverse || sortField;

  function hendleReset() {
    setSortField('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {haveReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hendleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleFeilds.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
