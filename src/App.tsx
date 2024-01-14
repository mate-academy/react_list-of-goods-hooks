import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  Alphabetic = 'abc',
  Length = 'length',
}

interface SortRules {
  field: SortType | null;
  isReverse: boolean;
}

type Good = string;

function prepareGoods(goodsArr: Good[], sortRules: SortRules): Good[] {
  const goodsCopy: Good[] = [...goodsArr];

  if (sortRules.field) {
    goodsCopy.sort(
      (g1, g2) => {
        if (sortRules.field === SortType.Alphabetic) {
          return g1.localeCompare(g2);
        }

        if (sortRules.field === SortType.Length) {
          return g1.length - g2.length;
        }

        return 0;
      },
    );
  }

  if (sortRules.isReverse) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const goodsFromServer: Good[] = [
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

const defaultSortState: SortRules = {
  field: null,
  isReverse: false,
};

export const App: React.FC = () => {
  const [sortRules, setSortRules] = useState<SortRules>(defaultSortState);

  const goods: Good[] = prepareGoods(goodsFromServer, sortRules);
  const showRevers = sortRules.field || sortRules.isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortRules.field !== SortType.Alphabetic,
          })}
          onClick={() => setSortRules({
            field: SortType.Alphabetic,
            isReverse: sortRules.isReverse,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortRules.field !== SortType.Length,
          })}
          onClick={() => setSortRules({
            field: SortType.Length,
            isReverse: sortRules.isReverse,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !sortRules.isReverse,
          })}
          onClick={() => setSortRules({
            field: sortRules.field,
            isReverse: !sortRules.isReverse,
          })}
        >
          Reverse
        </button>

        {showRevers && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortRules(defaultSortState)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
