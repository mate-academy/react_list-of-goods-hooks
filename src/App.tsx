import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

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
  RESET = '',
  NAME = 'name',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [stateReverse, setStateReverse] = useState(false);
  const showResetButton = sortField || stateReverse;

  const sortedgoods = [...goods];

  // eslint-disable-next-line default-case
  switch (sortField) {
    case SortType.NAME:
      sortedgoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      sortedgoods.sort((good1, good2) => good1.length - good2.length);
      break;
  }

  if (stateReverse) {
    sortedgoods.reverse();
  }

  function setReset() {
    setSortField(SortType.RESET);
    setGoods([...goodsFromServer]);
    setStateReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.NAME)}
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.LENGTH)}
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setStateReverse(prev => !prev)}
          className={classNames('button is-info', {
            'is-light': !stateReverse,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            onClick={setReset}
            className={classNames('button is-info', {
              'is-light': sortField !== SortType.RESET,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedgoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
