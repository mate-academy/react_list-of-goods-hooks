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
  reversed: boolean,
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

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

const App: React.FC = () => {
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField | ''>('');

  const visibleGoods = goodsFromServer;

  const handleReverseClick = () => {
    setReversed(!reversed);
  };

  const handleResetClick = () => {
    setReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortField.Alphabetically,
          })}
          onClick={() => {
            setSortField(SortField.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortField.ByLength,
          })}
          onClick={() => {
            setSortField(SortField.ByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger')}
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <Goodlist
        goods={sortAndReverseGoods(visibleGoods, sortField, reversed)}
      />
    </div>
  );
};

export default App;
