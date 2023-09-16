import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

type Goods = string;

export const goodsFromServer: Goods[] = [
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
  SORT_NONE = '',
  SORT_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

type SortReverseFunctions = {
  sortButtons: string,
  reverse: boolean,
};

function prepareGoods(
  goods: Goods[],
  { sortButtons, reverse }: SortReverseFunctions,
): Goods[] {
  let copyGoods = [...goods];

  if (sortButtons) {
    copyGoods = copyGoods.sort((good1, good2) => {
      switch (sortButtons) {
        case SortType.SORT_ALPHABET:
          return good1[0].localeCompare(good2[0]); break;

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length; break;

        default: return 0;
      }
    });
  }

  if (reverse) {
    copyGoods = copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortButtons, setSortButtons] = useState(SortType.SORT_NONE);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, { sortButtons, reverse });

  const reset = () => {
    setSortButtons(SortType.SORT_NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortButtons === SortType.SORT_ALPHABET ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortButtons(SortType.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortButtons === SortType.SORT_BY_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => setSortButtons(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverse ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setReverse(!(reverse))}
        >
          Reverse
        </button>

        {
          sortButtons ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => reset()}
            >
              Reset
            </button>
          ) : (
            reverse && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => reset()}
              >
                Reset
              </button>
            )
          )
        }
      </div>

      <ul>
        <ul>
          {
            visibleGoods.map((good) => (
              <li data-cy="Good">
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
