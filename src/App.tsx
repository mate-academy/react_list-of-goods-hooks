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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setValue] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const reverse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle('is-light');
    setReversed(!isReversed);
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 1;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isStartArray
    = goodsFromServer.toString() === visibleGoods.toString();

  const buttonReset = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        return (setValue(0), setReversed(false));
      }}
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 1 ? '' : 'is-light'}`}
          onClick={() => (setValue(1))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 2 ? '' : 'is-light'}`}
          onClick={() => (setValue(2))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        { isStartArray ? '' : buttonReset}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
