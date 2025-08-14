import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  None,
  Alphabetically,
  Length,
}

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

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverseField: boolean,
) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((item1, item2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return item1.localeCompare(item2);
        case SortType.Length:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [reverseField, setReverse] = useState(false);

  const goods: string[] = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames({
            'button is-info': sortField === SortType.Alphabetically,
            'button is-info is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames({
            'button is-success': sortField === SortType.Length,
            'button is-success is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames({
            'button is-warning': reverseField,
            'button is-warning is-light': !reverseField,
          })}
          onClick={
            reverseField === true
              ? () => setReverse(false)
              : () => setReverse(true)
          }
        >
          Reverse
        </button>

        {sortField || reverseField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map<JSX.Element>(function (good: string, i: number) {
          return (
            <li data-cy="Good" key={i}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
