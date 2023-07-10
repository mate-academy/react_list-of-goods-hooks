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

enum SortType {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  NONE = '',
}

const getPreparedGoods = (
  goods: string[],
  sortField: string,
  isReversed: boolean,
) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.NONE);
  const [reversed, setReversed] = useState(false);

  const visuableGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortField !== SortType.ALPHABETICALLY },
          )}
          onClick={() => {
            setSortField(SortType.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortField !== SortType.LENGTH },
          )}
          onClick={() => {
            setSortField(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': reversed !== true },
          )}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed)
          && (
            <button
              type="button"
              className={classNames('button is-danger is-light')}
              onClick={() => {
                setReversed(false);
                setSortField(SortType.NONE);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visuableGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
