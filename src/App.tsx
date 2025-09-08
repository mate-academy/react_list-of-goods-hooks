import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  name = 'name',
  length = 'length',
}

interface FilterParams {
  sortField: SortType | '';
  reverseField: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.name:
          return a.localeCompare(b);

        case SortType.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseField, setReverseField] = useState(false);
  const goodsFromServerCopy = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={() => {
            setSortField(SortType.name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': reverseField === false,
          })}
          onClick={() => {
            setReverseField(!reverseField);
          }}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsFromServerCopy.map((good, key) => (
          <li data-cy="Good" key={key}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};