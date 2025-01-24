import 'bulma/css/bulma.css';
import { useState } from 'react';
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

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case 'alphabet':
      preparedGoods.sort();
      break;
    case 'length':
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('alphabet');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== 'alphabet' && 'is-light'}`}
          onClick={() => {
            setSortField('alphabet');
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField !== 'length' && 'is-light'}`}
          onClick={() => {
            setSortField('length');
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
