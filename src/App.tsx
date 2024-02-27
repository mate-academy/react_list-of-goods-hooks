import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { Goods } from './types/Goods';
import { SortType } from './types/SortTypes';

export const goodsFromServer: Goods[] = [
  { name: 'Dumplings' },
  { name: 'Carrot' },
  { name: 'Eggs' },
  { name: 'Ice cream' },
  { name: 'Apple' },
  { name: 'Bread' },
  { name: 'Fish' },
  { name: 'Honey' },
  { name: 'Jam' },
  { name: 'Garlic' },
];

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState<Goods[]>([...goodsFromServer]);
  const [isSorted, setIsSorted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortButton, setSortButton] = useState<SortType>(SortType.null);

  const sortGoods = (sortField: SortType) => {
    const sorted = [...sortedGoods].sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return isReversed
            ? good2.name.localeCompare(good1.name)
            : good1.name.localeCompare(good2.name);
        case SortType.byLength:
          return isReversed
            ? good2.name.length - good1.name.length
            : good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });

    setSortedGoods(sorted);
    setIsSorted(true);
    setSortButton(sortField);
  };

  const reverseList = () => {
    const reversed = [...sortedGoods].reverse();

    setSortedGoods(reversed);
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setSortedGoods([...goodsFromServer]);
    setIsSorted(false);
    setIsReversed(false);
    setSortButton(SortType.null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortButton !== SortType.alphabetically,
          })}
          onClick={() => sortGoods(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortButton !== SortType.byLength,
          })}
          onClick={() => sortGoods(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseList}
        >
          Reverse
        </button>

        {(isSorted || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good.name} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
