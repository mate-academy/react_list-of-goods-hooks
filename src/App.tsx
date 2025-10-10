import React from 'react';
import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT_FIELD_ALPHABETYCALY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  {
    sortFiled,
    reversed,
  }: {
    sortFiled: string;
    reversed: boolean;
  },
): string[] {
  let preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SORT_FIELD_ALPHABETYCALY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortFiled] = useState('');
  const [reversed, setReversed] = useState(false);
  const [initialGoods] = useState(goodsFromServer);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortFiled: sortField,
    reversed,
  });

  const isDifferent = !initialGoods.every(
    (good, i) => good === visibleGoods[i],
  );

  const handleSortAlphabetically = () => setSortFiled(SORT_FIELD_ALPHABETYCALY);

  const handleSortByLength = () => setSortFiled(SORT_FIELD_LENGTH);
  const handleReverse = () => setReversed(!reversed);
  const handleReset = () => {
    setSortFiled('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETYCALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {isDifferent && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
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
