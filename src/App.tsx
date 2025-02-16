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
  none,
  alphabetically,
  byLength,
  reversed,
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  reversed: boolean,
): string[] => {
  const sortedGoods = [...goods].sort((a: string, b: string) => {
    switch (sortType) {
      case SortType.alphabetically:
        return a.localeCompare(b);
      case SortType.byLength:
        const direction = a.length - b.length;

        return direction === 0 ? a.localeCompare(b) : direction;
      default:
        return 0;
    }
  });

  return reversed ? [...sortedGoods].reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.none);
  const [reversed, setReversed] = useState<boolean>(false);
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);

  const handleSort = (sort: SortType): void => {
    switch (sort) {
      case SortType.alphabetically:
      case SortType.byLength:
        setSortType(sort);
        setGoods(sortGoods(goods, sort, reversed));
        break;
      case SortType.reversed:
        setReversed(!reversed);
        setGoods([...goods].reverse());
        break;
      default:
        setSortType(SortType.none);
        setGoods([...goodsFromServer]);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.alphabetically,
          })}
          onClick={() => handleSort(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.byLength,
          })}
          onClick={() => handleSort(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => handleSort(SortType.reversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.none || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              handleSort(SortType.none);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
