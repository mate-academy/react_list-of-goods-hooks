import React, { useState } from 'react';
import cn from 'classnames';
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

enum Sortype {
  Alphabetic = 'alphabetic',
  Length = 'length',
  Empty = '',
}

function getPreaparedGoods(goods: string[],
  sortType: Sortype,
  reversed: boolean) {
  const preparedGoods: string[] = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case Sortype.Alphabetic:
        return good1.localeCompare(good2);

      case Sortype.Length:
        return good1.length - good2.length;

      default: return 0;
    }
  });

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(Sortype.Empty);
  const [reversed, setReverse] = useState(false);
  const displayGoods
    = getPreaparedGoods(goodsFromServer, sortType, reversed);

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== Sortype.Alphabetic },
          )}
          onClick={() => setSortType(Sortype.Alphabetic)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== Sortype.Length },
          )}
          onClick={() => setSortType(Sortype.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !reversed },
          )}
          onClick={() => setReverse(!reversed)}
        >
          Reverse
        </button>
        {(reversed || sortType)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setReverse(false);
                setSortType(Sortype.Empty);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {displayGoods.map((good:string) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}

      </ul>
    </div>
  );
};
