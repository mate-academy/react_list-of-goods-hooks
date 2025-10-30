import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo, useCallback, useRef } from 'react';

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

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [order, setOrder] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const initialGoods = useRef<string[]>([...goodsFromServer]);

  const buildGoods = useCallback(
    (
      sourceGoods: string[],
      sortOrder: SortType,
      isReversed: boolean,
    ): string[] => {
      const result = [...sourceGoods];

      switch (sortOrder) {
        case SortType.Alphabet:
          result.sort((a, b) => a.localeCompare(b));
          break;
        case SortType.Length:
          result.sort((a, b) => a.length - b.length);
          break;
        default:
          break;
      }

      if (isReversed) {
        result.reverse();
      }

      return result;
    },
    [],
  );

  const goods = useMemo(
    () => buildGoods(initialGoods.current, order, reversed),
    [order, reversed, buildGoods],
  );

  const isInitialOrder = useMemo(() => {
    if (order !== SortType.None || reversed) {
      return false;
    }

    return goods.every((item, i) => item === initialGoods.current[i]);
  }, [goods, order, reversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${order !== SortType.Alphabet ? 'is-light' : ''}`}
          onClick={() => setOrder(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${order !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setOrder(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setOrder(SortType.None);
              setReversed(false);
            }}
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
