import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortingType } from './types/state';

import { SORTING } from './state/state';
import { SORT } from './state/sorting';

import { Button } from './components/Button';
import { GoodList } from './components/GoodList';

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

type AppState = {
  type: SortingType;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [sorting, setSorting] = useState<AppState>({
    type: SORTING.DEFAULT,
    isReversed: false,
  });

  const sortedGoods = (() => {
    const arr = SORT[sorting.type ?? SORTING.DEFAULT](goodsFromServer);

    if (sorting.isReversed) {
      arr.reverse();
    }

    return arr;
  })();

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          text="Sort alphabetically"
          highlightClass="is-info"
          highlightCondition={sorting.type === SORTING.ALPHABETICALLY}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING.ALPHABETICALLY,
            }))
          }
        />

        <Button
          text="Sort by length"
          highlightClass="is-success"
          highlightCondition={sorting.type === SORTING.BY_LENGTH}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING.BY_LENGTH,
            }))
          }
        />

        <Button
          text="Reverse"
          highlightClass="is-warning"
          highlightCondition={sorting.isReversed}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              isReversed: !currrentSorting.isReversed,
            }))
          }
        />

        {(sorting.type !== SORTING.DEFAULT || sorting.isReversed) && (
          <Button
            text="Reset"
            highlightClass="is-danger"
            highlightCondition={false}
            handleClick={() =>
              setSorting({
                type: SORTING.DEFAULT,
                isReversed: false,
              })
            }
          />
        )}
      </div>

      <GoodList list={sortedGoods} />
    </div>
  );
};
