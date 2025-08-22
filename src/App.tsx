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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

type SortField = typeof SORT_ALPHABETICALLY | typeof SORT_BY_LENGTH | '';

function getPreparedGoods(
  goods: string[],
  { sortField }: { sortField: SortField },
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState<string[]>(initialGoods);

  const isChanged =
    goods.length !== goodsFromServer.length ||
    goods.some((good, index) => good !== goodsFromServer[index]);

  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => {
            setGoods(
              getPreparedGoods([...goods], {
                sortField: SORT_ALPHABETICALLY,
              }),
            );
            setActiveButton(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setGoods(
              getPreparedGoods([...goods], {
                sortField: SORT_BY_LENGTH,
              }),
            );
            setActiveButton(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === 'reverse' ? '' : 'is-light'}`}
          onClick={() => {
            setGoods([...goods].reverse());
            setActiveButton('reverse');
          }}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods([...goodsFromServer]);
              setActiveButton(null);
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
