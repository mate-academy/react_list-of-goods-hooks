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
  alphabetically = 'alphabetically',
  length = 'length',
}

export const App: React.FC = () => {
  const [selectedField, setSelectedField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const getSortedGoods = (): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (selectedField === SortType.alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (selectedField === SortType.length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    return isReverse ? sortedGoods.reverse() : sortedGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedField === SortType.alphabetically ? '' : 'is-light'}`}
          onClick={() => setSelectedField(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${selectedField === SortType.length ? '' : 'is-light'}`}
          onClick={() => setSelectedField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReverse ? '' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {selectedField || isReverse ? (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSelectedField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
