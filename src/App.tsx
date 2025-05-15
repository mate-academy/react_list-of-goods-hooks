import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  ALPHABET,
  LENGTH,
}

function sortGoods(
  goods: string[],
  sortField: SortType | null,
  isReversed: boolean,
): string[] {
  let preparedGoods = [...goods];

  if (sortField !== null) {
    switch (sortField) {
      case SortType.ALPHABET:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortType.LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        const exhaustiveCheck: never = sortField;

        throw new Error(`Unhandled sortField: ${exhaustiveCheck}`);
    }
  }

  if (isReversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {isReversed || sortField !== null ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
