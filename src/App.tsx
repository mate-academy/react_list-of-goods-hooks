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

const GoodItem = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};

const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: string) => {
        return <GoodItem good={good} key={good} />;
      })}
    </ul>
  );
};

const SORT_FIELD_ALPHABETICALLY = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
