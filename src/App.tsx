import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer:string[] = [
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

export enum SortType {
  default,
  by_alphabet,
  by_length,
}

function getListOfGoods(
  goods:string[],
  sortOrder:SortType,
  reverseDirection:boolean,
)
  :string[] {
  const goodsForListing = [...goods];

  if (sortOrder) {
    goodsForListing.sort((a, b) => {
      switch (sortOrder) {
        case SortType.by_alphabet:
          return a.localeCompare(b);
        case SortType.by_length:
          return a.length - b.length;
        default: return 0;
      }
    });
  }

  if (reverseDirection) {
    goodsForListing.reverse();
  }

  return goodsForListing;
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState(SortType.default);
  const [reverseDirection, setReverseDirection] = useState(false);
  const goodsListed
    = getListOfGoods(goodsFromServer, sortOrder, reverseDirection);

  const reset = () => {
    setSortOrder(SortType.default);
    setReverseDirection(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortOrder(SortType.by_alphabet)}
          type="button"
          className={cn(
            'button', 'is-info',
            { 'is-light': sortOrder !== SortType.by_alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortOrder(SortType.by_length)}
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': sortOrder !== SortType.by_length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseDirection(!reverseDirection)}
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': reverseDirection === false },
          )}
        >
          Reverse
        </button>

        {(sortOrder || reverseDirection)
      && (
        <button
          onClick={reset}
          type="button"
          className={cn(
            'button', 'is-danger',
            { 'is-light': !sortOrder && !reverseDirection },
          )}
        >
          Reset
        </button>
      )}
      </div>

      <ul>
        {goodsListed.map(item => <li data-cy="Good" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
