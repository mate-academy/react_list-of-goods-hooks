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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = 'default',
}

export const App: React.FC = () => {
  const [originalGoods] = useState(goodsFromServer);
  const [goods, setGoods] = useState([...originalGoods]);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  function getSortedGoods(type: SortType, reversed: boolean) {
    const base = [...originalGoods];
    let result;

    switch (type) {
      case SortType.Alphabet:
        result = base.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        result = base.sort((a, b) => a.length - b.length);
        break;

      default:
        result = base;
    }

    if (reversed) {
      result = result.reverse();
    }

    setGoods(result);
    setSortBy(type);
    setIsReversed(reversed);
  }

  function reset() {
    setGoods(originalGoods);
    setSortBy(SortType.Default);
    setIsReversed(false);
  }

  function toggleReverse() {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => getSortedGoods(SortType.Alphabet, isReversed)}
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === SortType.Alphabet,
            'is-light': sortBy !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === SortType.Length,
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => getSortedGoods(SortType.Length, isReversed)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': isReversed,
            'is-light': !isReversed,
          })}
          onClick={() => toggleReverse()}
        >
          Reverse
        </button>

        {(isReversed === true || sortBy !== SortType.Default) && (
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
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
