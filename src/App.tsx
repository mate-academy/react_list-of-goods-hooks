import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';


enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
    REVERSE = 'reverse',
}



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
  const [sortType, setSortType] = useState(SortType.NONE);


const getSortedGoods = () => {
  switch (sortType) {
    case SortType.ALPHABET:
      return [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    case SortType.LENGTH:
      return [...goodsFromServer].sort((a, b) => a.length - b.length);
    case SortType.REVERSE:
      return [...goodsFromServer].reverse();
    default:
      return [...goodsFromServer];
  }
};










  return (
    <div className="section content">
      <div className="buttons">
<button
  type="button"
className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}

  onClick={() => setSortType(SortType.ALPHABET)}>
  Sort alphabetically
</button>
<button
  type="button"
  className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}

  onClick={() => setSortType(SortType.LENGTH)}>
  Sort by length
</button>
<button
  type="button"
  className={`button is-warning ${sortType === SortType.REVERSE ? '' : 'is-light'}`}

  onClick={() => setSortType(SortType.REVERSE)}>
  Reverse
</button>

{sortType !== SortType.NONE && (
  <button
    type="button"
    className="button is-danger is-light"
    onClick={() => setSortType(SortType.NONE)}
  >
    Reset
  </button>
)}


      </div>


       <ul>
  {getSortedGoods().map(good => (
    <li key={good} data-cy="Good">{good}</li>
  ))}


</ul>

    </div>
  );
};
