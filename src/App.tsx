import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABET: string = 'alphabet';
const SORT_FIELD_LENGTH: string = 'length';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setIsReversed(false);

    return setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="GoodList">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good" className="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
