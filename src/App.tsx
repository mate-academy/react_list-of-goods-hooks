import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { GoodList } from './components/GoodList';

const goodsFromServer: string[] = [
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
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const prepared = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetical:
        prepared.sort((a, b) => a.localeCompare(b));
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

    return prepared;
  }, [sortType, isReversed]);

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const hasChanges = sortType !== SortType.None || isReversed;

  const buttonClass = (base: string, active: boolean) =>
    `button ${base}${active ? ' is-selected' : ' is-light'}`;

  return (
    <section className="section content">
      <h1 className="title is-3 has-text-centered">List of Goods</h1>

      <div className="buttons is-centered">
        <button
          type="button"
          className={buttonClass('is-info', sortType === SortType.Alphabetical)}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClass('is-success', sortType === SortType.Length)}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={buttonClass('is-warning', isReversed)}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {hasChanges && (
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
    </section>
  );
};
