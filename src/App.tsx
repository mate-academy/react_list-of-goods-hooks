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

enum SortFieldType {
  EMPTY = 'empty',
  LENGTH = 'length',
  ALPHABET = 'alphabet'
}
const SORT_FIELD_LENGHT = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';

function getSortedGoods(goods:string[], sortedField: SortFieldType, isReversed: boolean = false) {
  const newGoods = [...goods];

  if (sortedField === SortFieldType.LENGTH) {
    newGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  } else if (sortedField === SortFieldType.ALPHABET) {
    newGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState<SortFieldType>(SortFieldType.EMPTY);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isDefauldOrder = (sortedField === SortFieldType.EMPTY) && !isReversed;

  const visiableGoods = getSortedGoods(goodsFromServer, sortedField, isReversed);

  const reset = () => {
    setSortedField(SortFieldType.EMPTY);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortedField(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortedField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortedField(SORT_FIELD_LENGHT);
          }}
          type="button"
          className={`button is-success ${sortedField === SORT_FIELD_LENGHT ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isDefauldOrder && (
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
        {visiableGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
