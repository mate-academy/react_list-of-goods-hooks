import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  Length = 'length',
  Alphabet = 'alphabet',
  DefaultValue = '',
}

function sortGoods(sortField: SortType, isReversed: boolean) {
  const goods = [...goodsFromServer];

  if (sortField) {
    goods.sort((a, b) => {
      switch (sortField) {
        case SortType.Length:
          return a.length - b.length;
        case SortType.Alphabet:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  return isReversed ? goods.reverse() : goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DefaultValue);
  const [isReversed, setIsReversed] = useState(false);

  const goods = sortGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortField !== SortType.Alphabet })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortField !== SortType.Length })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField(SortType.DefaultValue);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
