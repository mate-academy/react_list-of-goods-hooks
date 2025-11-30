import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
import { GoodList } from './components/GoodList/GoodList';
import { SortType } from './types/SortType';

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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>([
    ...goodsFromServer,
  ]);

  useEffect(() => {
    const prepared = [...goodsFromServer];

    switch (sortField) {
      case SortType.Alphabetically:
        prepared.sort((a, b) => a.localeCompare(b, 'en'));
        break;
      case SortType.Length:
        prepared.sort((a, b) => a.length - b.length);
        break;
      case SortType.None:
      default:
        break;
    }

    if (isReversed) {
      prepared.reverse();
    }

    setVisibleGoods(prepared);
  }, [sortField, isReversed]);

  const isChanged = sortField !== SortType.None || isReversed;

  const handleSort = (field: SortType) => {
    setIsReversed(false);
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
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
