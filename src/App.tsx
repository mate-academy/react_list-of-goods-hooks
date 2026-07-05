import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [selectedSort, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => { 
    let result = [...goodsFromServer];
        
    switch (selectedSort) {
      case SortType.ALPHABET:
        result =  [...result].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        result =  [...result].sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      result = [...result].reverse();
    }

    return result;

  }

  
  const visibleGoods = getSortedGoods();

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const listItems = visibleGoods.map(item => (
    <li key={item} data-cy="Good">
      {item}
    </li>
  ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
          type="button"
          className={`button is-info ${selectedSort !== SortType.ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
          type="button"
          className={`button is-success ${selectedSort !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {setIsReversed(prev => !prev)}}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {selectedSort !== SortType.NONE || isReversed ? (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger is-light`}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>{listItems}</ul>
    </div>
  );
};
