import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/GoodsList';

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
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPrepareGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const prepareGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.Length:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

type Props = {
  goods: string[];
};

export const App: React.FC<Props> = ({ goods = goodsFromServer }) => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepareGoods(goods, sortType, isReversed);
  const isResetVisible = sortType !== SortType.Default || isReversed;

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
