import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './types/Good';
import { Callback } from './types/Callback';
import classNames from 'classnames';
import { TypeSorts } from './types/TypeSorts';

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

const preparedGoods: Good[] = goodsFromServer.map((good, index) => ({
  id: index,
  name: good,
}));

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<TypeSorts>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const handleSortClick: Callback = toSortBy => {
    if (sortType !== toSortBy) {
      setSortType(toSortBy);
    } else {
      setSortType('');
    }
  };

  const handleReverseClick: () => void = () => {
    setReversed(prev => !prev);
  };

  const handleResetClick = () => {
    setSortType('');
    setReversed(false);
  };

  const sortedGoods = [...preparedGoods];

  switch (sortType) {
    case 'alphabetically':
      sortedGoods.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'length':
      sortedGoods.sort((a, b) => a.name.length - b.name.length);
      break;

    default:
      break;
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortClick('alphabetically')}
          type="button"
          className={classNames('button is-info ', {
            'is-light': sortType !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortClick('length')}
          type="button"
          className={classNames('button is-success ', {
            'is-light': sortType !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverseClick()}
          type="button"
          className={classNames('button is-warning ', {
            'is-light': reversed === false,
          })}
        >
          Reverse
        </button>

        {(sortType !== '' || reversed) && (
          <button
            onClick={() => handleResetClick()}
            type="button"
            className={classNames('button is-danger ', {
              'is-light': sortType !== '',
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => {
          return (
            <li key={good.id} data-cy="Good">
              {good.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
