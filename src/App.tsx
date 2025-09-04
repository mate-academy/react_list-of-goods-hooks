/* eslint-disable-next-line */
import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState, useMemo } from 'react';

// 1. Definimos o tipo 'SortMode' com os valores permitidos
type SortMode = 'original' | 'alphabetical' | 'length';

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

// O componente App agora é tipado como React.FC
export const App: React.FC = () => {
  // 2. Usamos o tipo 'SortMode' para o estado 'sortMode'
  const [sortMode, setSortMode] = useState<SortMode>('original');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const baseGoods = useMemo(() => {
    switch (sortMode) {
      case 'alphabetical':
        return [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      case 'length':
        return [...goodsFromServer].sort(
          (a, b) => a.length - b.length || a.localeCompare(b),
        );
      case 'original':
      default:
        return [...goodsFromServer];
    }
  }, [sortMode]);

  const goods = useMemo(
    () => (isReversed ? [...baseGoods].reverse() : baseGoods),
    [baseGoods, isReversed],
  );

  // Handlers
  const handleSortAlphabetically = () => {
    setSortMode('alphabetical');
    // não reseta isReversed → persiste reverso
  };

  const handleSortByLength = () => {
    setSortMode('length');
    // não reseta isReversed → persiste reverso
  };

  const handleReverse = () => setIsReversed(prev => !prev);

  const handleReset = () => {
    setSortMode('original');
    setIsReversed(false); // reset total
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMode === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMode === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {(sortMode !== 'original' || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
