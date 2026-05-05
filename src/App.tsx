
import React, { useState } from 'react';
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

enum SortType {
  Default = 'DEFAULT',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetSorting = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const getSortedGoods = () => {
    // Fazemos a cópia do array original
    let goods = [...goodsFromServer];

    // 1º passo: Aplica a ordenação se houver alguma selecionada
    if (sortType === SortType.Alphabetical) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      goods.sort((a, b) => a.length - b.length);
    }

    // 2º passo: Se o botão 'Reverse' estiver ativo, inverte o resultado atual
    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const visibleGoods = getSortedGoods();

  // O botão reset só aparece se a ordem não for a padrão OU se estiver invertido
  const hasChanges = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => handleSortChange(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => handleSortChange(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetSorting}
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
