import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
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
const SORT_FIELD_RESET: string = '';

type Props = {
  sortField: string;
  setSortField: () => string;
  isReverse: string;
  setReverse: () => string;
  visibleGoods: string[];
};

function sortGoods(
  goods: string[],
  sortField: string = '',
  isReverse: boolean = false,
): string[] {
  const visibleGoods: string[] = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_FIELD_LENGTH:
        visibleGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        throw new Error('Sort method is unknown!');
    }
  }

  if (isReverse) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC<Props> = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD_RESET || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SORT_FIELD_RESET);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
