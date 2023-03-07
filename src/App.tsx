import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

export function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case 'alphabet':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'lenght':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const none = 'none';
  const alphabet = 'alphabet';
  const lenght = 'lenght';
  const [sortType, setType] = useState(none);
  const [isReversed, setReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setType(alphabet)}
          className={
            classNames('button is-info', {
              'is-light': sortType !== alphabet,
            })
          }
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setType(lenght)}
          className={
            classNames('button is-info', {
              'is-light': sortType !== lenght,
            })
          }
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!isReversed)}
          className={
            classNames('button is-warning', {
              'is-light': !isReversed,
            })
          }
          type="button"
        >
          Reverse
        </button>

        {sortType !== none || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              return [setType(none), setReverse(false)];
            }}
          >
            Reset
          </button>
        ) : ''}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, sortType, isReversed).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
