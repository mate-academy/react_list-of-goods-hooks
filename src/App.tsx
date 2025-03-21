import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function getSortedGoods(
  listOfGoods: string[],
  sortField: SortField,
  reverse: boolean,
): string[] {
  const sortedGoods: string[] = [...listOfGoods];

  if (sortField) {
    sortedGoods.sort((goods1, goods2) => {
      let comparison = 0;

      switch (sortField) {
        case SortField.alphabet:
          comparison = goods1.localeCompare(goods2);
          break;
        case SortField.length:
          comparison = goods1.length - goods2.length;
          break;
        default:
          comparison = 0;
      }

      return reverse ? -comparison : comparison;
    });
  }

  return sortedGoods;
}

function getReverseGoods(listOfGoods: string[]): string[] {
  return [...listOfGoods].reverse();
}

export const App: React.FC = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReverse, setReverse] = useState(false);
  //handlers
  const getSortAlphabetically = () => {
    const sortedGoods = getSortedGoods(goods, SortField.alphabet, isReverse);

    setGoods(sortedGoods);
    setSortField(SortField.alphabet);
  };

  const getSortByLength = () => {
    const sortedGoods = getSortedGoods(goods, SortField.length, isReverse);

    setGoods(sortedGoods);
    setSortField(SortField.length);
  };

  const setReverseGoods = () => {
    const reversedGoods = getReverseGoods(goods);

    setGoods(() => reversedGoods);
    setReverse(!isReverse);
  };

  const getReset = () => {
    setGoods(initialGoods);
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortField.alphabet ? '' : 'is-light'}`}
          onClick={getSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SortField.length ? '' : 'is-light'}`}
          onClick={getSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReverse === true ? '' : 'is-light'}`}
          onClick={setReverseGoods}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button type="button" className="button is-danger" onClick={getReset}>
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
