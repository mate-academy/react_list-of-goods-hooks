import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '../App.scss';
import Goodlist from './GoodList';
import { SortField } from './SortField';

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

const sortAndReverseGoods = (
  goods: string[],
  sortField: SortField | '',
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  switch (sortField) {
    case SortField.Alphabetically:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortField.ByLength:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField | ''>('');

  const visibleGoods = goodsFromServer;

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortField('');
  };

  const handleSortField = (field: SortField) => {
    setSortField(field);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortField.Alphabetically,
          })}
          onClick={() => handleSortField(SortField.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortField.ByLength,
          })}
          onClick={() => handleSortField(SortField.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <Goodlist
        goods={sortAndReverseGoods(visibleGoods, sortField, isReversed)}
      />
    </div>
  );
};

export default App;
