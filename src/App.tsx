import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  NONE = '',
  ALPHABET = 'alphabetical',
  LENGTH = 'length',
}

interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

interface ButtonProps {
  onClick: () => void;
  colorClass: 'is-info' | 'is-success' | 'is-warning' | 'is-danger';
  isLight: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  colorClass,
  isLight,
  children,
}) => {
  return (
    <button
      type="button"
      className={cn('button', colorClass, {
        'is-light': isLight,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isInitialOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          colorClass="is-info"
          isLight={sortField !== SortType.ALPHABET}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </Button>

        <Button
          colorClass="is-success"
          isLight={sortField !== SortType.LENGTH}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </Button>

        <Button
          colorClass="is-warning"
          isLight={!isReversed}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </Button>

        {!isInitialOrder && (
          <Button
            colorClass="is-danger"
            isLight={true}
            onClick={() => {
              setSortField(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </Button>
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
