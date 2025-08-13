import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './api/goodsFromServer';
import { SortType } from './types/enums';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleGoods = () => {
    const sortedGoods: string[] = [...goodsFromServer];

    if (sortField === SortType.Alphabet) {
      sortedGoods.sort((a, b) =>
        // eslint-disable-next-line prettier/prettier
        a.toLowerCase().localeCompare(b.toLowerCase()),
      );
    }

    if (sortField === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={
              sortField || isReversed
                ? 'button is-danger'
                : 'button is-danger is-light'
            }
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {handleGoods().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
