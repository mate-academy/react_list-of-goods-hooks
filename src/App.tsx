import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function sortingGoods(goods: string[], field: string, isReversed: boolean) {
  const sorted = [...goods];

  if (field === 'Sort alphabetically') {
    sorted.sort((a, b) => a.localeCompare(b));
  } else if (field === 'Sort by length') {
    sorted.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sorted.reverse();
  }

  return sorted;
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = field => {
    const sortedGoods = sortingGoods(goodsFromServer, field, isReversed);

    setSortField(field);
    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
    setGoods(prevGoods => [...prevGoods].reverse());
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  const isOriginalOrder = goods.every(
    (good, index) => good === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => handleSort('Sort alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => handleSort('Sort by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
