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
  'Garlic',
];

interface GoodCardProps {
  good: string;
}

const GoodCard: React.FC<GoodCardProps> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

interface GoodlistProps {
  goods: string[];
}

const Goodlist: React.FC<GoodlistProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);

type SortField = 'alphabetically' | 'byLength' | '';

const sortAndReverseGoods = (
  goods: string[],
  sortField: SortField,
  reversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  switch (sortField) {
    case 'alphabetically':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'byLength':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>('');

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
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => {
            setSortField('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'byLength',
          })}
          onClick={() => {
            setSortField('byLength');
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
