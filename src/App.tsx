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

interface T {
  goods: string[];
}

const GoodList: React.FC<T> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

enum SortField {
  alfabet = 'alfabet',
  length = 'length',

}

function getPreparedGoods(
  goods: string[],
  { sortField }: { sortField: SortField | '' },
  reversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField === SortField.length) {
    preparedGoods.sort((elem1, elem2) => elem1.length - elem2.length);
  }

  if (sortField === SortField.alfabet) {
    preparedGoods.sort((elem1, elem2) => elem1.localeCompare(elem2));
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [rev, setRev] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField | ''>('');

  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField} , rev);

  const resetGoods = () => {
    setSortField('');
    setRev(false);
  };

  const areArraysEqual = (arr1: string[], arr2: string[]) =>
    arr1.length === arr2.length &&
    arr1.every((el, index) => el === arr2[index]);

  const isChanged = !areArraysEqual(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-warning ${sortField !== 'alfabet' ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SortField.alfabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!rev ? 'is-light' : ''}`}
          onClick={() => {
            setRev(prev => !prev);
          }}
        >
          Reverse
        </button>

        {!isChanged ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
