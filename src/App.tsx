import React, { useState } from 'react';
import cn from 'classnames';
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

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlph = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => {
        const result = good1.localeCompare(good2);

        return isReversed ? -result : result;
      }),
    );
    setActiveSort('alph');
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => {
        const result = good1.length - good2.length;

        return isReversed ? -result : result;
      }),
    );
    setActiveSort('length');
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setActiveSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeSort !== 'alph',
          })}
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeSort !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
