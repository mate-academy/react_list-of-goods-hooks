import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
];

enum SortType {
  all = '',
  length = 'length',
  alphabet = 'alphabet',
}

function getSortedList(
  goodsList: string[],
  isReversed: boolean,
  sortField: SortType,
): string[] {
  const goodsListCopy: string[] = [...goodsList];

  if (sortField) {
    switch (sortField) {
      case SortType.length:
        goodsListCopy.sort((a, b) => a.length - b.length);
        break;
      case SortType.alphabet:
        goodsListCopy.sort();
        break;
      default:
        return goodsListCopy;
    }
  }

  if (isReversed) {
    goodsListCopy.reverse();
  }

  return goodsListCopy;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.all);
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods: string[] = getSortedList(
    goodsFromServer,
    isReversed,
    sortField,
  );
  const isSortFieldChosen = (condition: string) => condition !== sortField;

  const reset = () => {
    setSortField(SortType.all);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': isSortFieldChosen(SortType.alphabet),
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': isSortFieldChosen(SortType.length),
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
