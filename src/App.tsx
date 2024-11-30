import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './components/GoodList';

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

const SetByReverse = true;

enum SortedFields {
  SetById,
  SetByAlphabet,
  SetByLength,
  SetByDanger,
}

function getSortedGoods(
  goods: string[],
  { sortField, reversed }: { sortField: SortedFields; reversed: boolean },
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortedFields.SetById:
      case SortedFields.SetByAlphabet:
        return good1.localeCompare(good2);
      case SortedFields.SetByLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setsortField] = useState(SortedFields.SetByDanger);
  const [reversed, setReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, { sortField, reversed });

  const onReset = () => {
    setReversed(false);
    setsortField(SortedFields.SetByDanger);
  };

  const onReverse = () => {
    setReversed(!reversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SortedFields.SetByAlphabet)}
          type="button"
          className={cn(
            'button is-info',

            { 'is-light': sortField !== SortedFields.SetByAlphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SortedFields.SetByLength)}
          type="button"
          className={cn(
            'button is-success',

            { 'is-light': sortField !== SortedFields.SetByLength },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={onReverse}
          type="button"
          className={cn(
            'button is-warning',

            { 'is-light': reversed !== SetByReverse },
          )}
        >
          Reverse
        </button>

        {(reversed || sortField !== SortedFields.SetByDanger) && (
          <button
            onClick={onReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={sortedGoods} />
    </div>
  );
};
