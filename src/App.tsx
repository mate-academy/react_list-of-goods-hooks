import * as React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

type Props = {
  goods: string[];
};

export const CardList = ({ goods }: Props) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};

export enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}
interface FilterParams {
  sortField: SortType;
  reversed: boolean;
}

function getSortGoods(goods: string[], { sortField, reversed }: FilterParams) {
  let pGoods = [...goods];

  if (sortField === SortType.Alphabet) {
    pGoods = pGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SortType.Length) {
    pGoods = pGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    return pGoods.reverse();
  }

  return pGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getSortGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const isChanged = sortField !== SortType.Default || reversed !== false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
          type="button"
          className={
            sortField === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.Length);
          }}
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(prev => !prev);
          }}
          type="button"
          className={
            reversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={() => {
              setSortField(SortType.Default);
              setReversed(false);
            }}
            type="button"
            className={
              isChanged ? 'button is-danger' : 'button is-danger is-light'
            }
          >
            Reset
          </button>
        )}
      </div>
      <CardList goods={visibleGoods} />
    </div>
  );
};
