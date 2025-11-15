import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './GoodsList';

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

export enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}
interface AppState {
  activeSort: SortType;
  isReversed: boolean;
}

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<AppState['isReversed']>(false);

  const transformedGoods = useMemo(() => {
    const sorted = [...goodsFromServer];

    switch (activeSort) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  }, [activeSort, isReversed]);

  const sortAlphabetically = () => {
    setActiveSort(prev =>
      prev === SortType.Alphabet ? SortType.Default : SortType.Alphabet,
    );
  };

  const sortByLength = () => {
    setActiveSort(prev =>
      prev === SortType.Length ? SortType.Default : SortType.Length,
    );
  };

  const reverseGood = () => setIsReversed(prev => !prev);

  const resetGoods = () => {
    setActiveSort(SortType.Default);
    setIsReversed(false);
  };

  const isModified = activeSort !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === SortType.Length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGood}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={transformedGoods} />
    </div>
  );
};
