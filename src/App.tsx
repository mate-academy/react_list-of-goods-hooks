import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReverse] = useState(false);
  const [isReset, setReset] = useState(goodsFromServer);

  enum SortType {
    ALPHABETICALLY = 'Sort alphabetically',
    LENGTH = 'Sort by length',
  }

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleReset = () => {
    setReset(isReset);
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SortType.ALPHABETICALLY, SortType.LENGTH].map(field => (
          <button
            key={field}
            type="button"
            className={classNames('button is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setSortField(field)}
          >
            {field}
          </button>
        ))}
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reversed
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={handleReset}
          >
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
