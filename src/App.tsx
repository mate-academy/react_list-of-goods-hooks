import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  all = '',
  alphabet = 'alphabet',
  length = 'length',
}

interface FilterParams {
  sortedField: SortType;
  reversed: boolean;
}

function getPreaparedGoods(
  goods: string[],
  { sortedField, reversed }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case 'alphabet':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }
  if (reversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState(SortType.all);
  const [reversed, setReversed] = useState(false);

  const visiblePosts = getPreaparedGoods(goodsFromServer, {
    sortedField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`button is-info`, {
            'is-light': sortedField !== SortType.alphabet,
          })}
          onClick={() => setSortedField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button is-success`, {
            'is-light': sortedField !== SortType.length,
          })}
          onClick={() => setSortedField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button is-warning`, {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortedField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedField(SortType.all);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visiblePosts} />
    </div>
  );
};
