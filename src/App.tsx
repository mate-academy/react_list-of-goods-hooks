import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';
const isLight = 'is-light';

function sortGoods(goods: string[], sortField: string, makeReverse = false) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return makeReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const isResetConditionMet = isReset
    && JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer);

  const resetClick = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReset(false);
    setIsReversed(false);
  };

  const sortAlphabeticallyClick = () => {
    setVisibleGoods(sortGoods(visibleGoods,
      SORT_FIELD_ALPHABETICALLY, isReversed));

    setSortField(SORT_FIELD_ALPHABETICALLY);
    setIsReset(true);
  };

  const sortByLengthClick = () => {
    setVisibleGoods(sortGoods(goodsFromServer,
      SORT_FIELD_BY_LENGTH, isReversed));

    setSortField(SORT_FIELD_BY_LENGTH);
    setIsReset(true);
  };

  const reverseClick = () => {
    setVisibleGoods(sortGoods(visibleGoods, '', true));
    setIsReversed(!isReversed);
    setIsReset(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              [isLight]: sortField !== SORT_FIELD_ALPHABETICALLY,
            },
          )}
          onClick={sortAlphabeticallyClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              [isLight]: sortField !== SORT_FIELD_BY_LENGTH,
            },
          )}
          onClick={sortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              [isLight]: !isReversed || !isReset,
            },
          )}
          onClick={reverseClick}
        >
          Reverse
        </button>

        {isResetConditionMet && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetClick}
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

/*
import React from 'react';
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
  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        <ul>
          <li data-cy="Good">Dumplings</li>
          <li data-cy="Good">Carrot</li>
          <li data-cy="Good">Eggs</li>
          <li data-cy="Good">Ice cream</li>
          <li data-cy="Good">Apple</li>
          <li data-cy="Good">...</li>
        </ul>
      </ul>
    </div>
  );
};
 */
