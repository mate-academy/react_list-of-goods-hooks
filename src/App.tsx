import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const FIELD_ALPHABETIC = 'alphabetically';
const FIELD_LENGTH = 'length';

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const preparedGoods = [...goodsFromServer];

    switch (sortBy) {
      case FIELD_ALPHABETIC:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = getSortedGoods();

  const isInitial = sortBy === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortBy !== FIELD_ALPHABETIC },
            'button',
            'is-info',
          )}
          onClick={() => setSortBy(FIELD_ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortBy !== FIELD_LENGTH },
            'button',
            'is-success',
          )}
          onClick={() => setSortBy(FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !isReversed }, 'button', 'is-warning')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {!isInitial && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
          >
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
