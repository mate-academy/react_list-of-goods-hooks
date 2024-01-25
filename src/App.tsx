import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

interface GoodWithID {
  name: string;
  id: string;
}

type PropsForGoodsList = {
  visibleGoods: GoodWithID[];
};

type PropsForGood = {
  good: GoodWithID;
};

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

const goodsWithId: GoodWithID[] = goodsFromServer.map(good => (
  {
    name: good,
    // eslint-disable-next-line
    id: self.crypto.randomUUID(),
  }
));

const SORT_VALUE_NAME = 'name';
const SORT_VALUE_LENGTH = 'length';

function getPreperedGoods(
  goods: GoodWithID[],
  sortField: string,
  reverse: boolean,
) {
  const preperedGoods = [...goods];

  preperedGoods.sort((good, good2) => {
    switch (sortField) {
      case SORT_VALUE_NAME:
        return good[SORT_VALUE_NAME].localeCompare(good2[SORT_VALUE_NAME]);

      case SORT_VALUE_LENGTH:
        return good.name[SORT_VALUE_LENGTH] - good2.name[SORT_VALUE_LENGTH];

      default:
        return 0;
    }
  });

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

const Good: React.FC<PropsForGood> = ({ good }) => (
  <li data-cy="Good">
    {good.name}
  </li>
);

const GoodsList: React.FC<PropsForGoodsList> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <Good good={good} key={good.id} />
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreperedGoods(goodsWithId, sortValue, reverse);

  function reset() {
    setReverse(false);
    setSortValue('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortValue !== SORT_VALUE_NAME,
          })}
          onClick={() => setSortValue(SORT_VALUE_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortValue !== SORT_VALUE_LENGTH,
          })}
          onClick={() => setSortValue(SORT_VALUE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortValue || reverse)
          && (
            <button
              type="button"
              className={cn({
                button: true,
                'is-danger': true,
                'is-light': true,
              })}
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <GoodsList visibleGoods={visibleGoods} />
    </div>
  );
};
