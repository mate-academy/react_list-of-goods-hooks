import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

type Goods = string;
type Reverse = boolean;

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

type Props = {
  goods: Goods[];
};

const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

function getPrepareGoods(
  goods: Goods[],
  sortGood: SortType | undefined,
  reverse: Reverse,
): Goods[] {
  const preparedGoods: Goods[] = [...goods];

  if (preparedGoods.length !== 0) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGood) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortGood, setSortGood] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState<Reverse>(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortGood, reverse);

  const handleReset = (): void => {
    setSortGood(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortGood(SortType.Alphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortGood !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortGood(SortType.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortGood !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>
        {(sortGood || reverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
