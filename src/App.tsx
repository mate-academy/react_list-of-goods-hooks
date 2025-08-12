import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './SortType';
  // Importa o enum do arquivo externo

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

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
): string[] {
  const result = [...goods];

  if (sortType === SortType.ALPHABET) {
    result.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const isModified = sortType !== SortType.NONE || isReversed;

  // Função para adicionar/remover classe is-light para mostrar ativo/inativo
  const buttonClass = (active: boolean, colorClass: string) =>
    `button ${colorClass} ${active ? '' : 'is-light'}`;

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={buttonClass(sortType === SortType.ALPHABET, 'is-info')}
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={buttonClass(sortType === SortType.LENGTH, 'is-success')}
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={buttonClass(isReversed, 'is-warning')}
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
        >
          Reverse
        </button>

        {isModified && (
          <button
            className="button is-danger"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
