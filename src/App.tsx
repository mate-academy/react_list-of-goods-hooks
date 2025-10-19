import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';

// Enum для возможных вариантов сортировки
export enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
  Reverse = 'reverse',
  Reset = 'reset',
}

// Тип для одного товара
type Good = string;

// Исходный массив
export const goodsFromServer: Good[] = [
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
  const [goods, setGoods] = useState<Good[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleAction = (type: SortType) => {
    switch (type) {
      case SortType.Alphabet:
      case SortType.Length: {
        // const sorted = [...goods].sort(
        //   type === 'alphabet'
        //     ? (a, b) => a.localeCompare(b)
        //     : (a, b) => a.length - b.length,
        // );

        const sorted = [...goodsFromServer].sort(
          type === SortType.Alphabet
            ? (a, b) => a.localeCompare(b)
            : (a, b) => a.length - b.length,
        );

        setGoods(isReversed ? sorted.reverse() : sorted);
        setActiveSort(type);
        break;
      }

      case SortType.Reverse:
        setGoods(prevGoods => [...prevGoods].reverse());
        setIsReversed(prev => !prev);
        break;

      case SortType.Reset:
        setGoods(goodsFromServer);
        setActiveSort(SortType.Default);
        setIsReversed(false);
        break;

      default:
        break;
    }
  };

  const isChanged = goods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            activeSort === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={() => handleAction(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            activeSort === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => handleAction(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleAction(SortType.Reverse)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleAction(SortType.Reset)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
