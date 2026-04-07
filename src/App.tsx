import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { StateValue } from './types/state';

import { STATES } from './state/state';
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
  type: StateValue;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [sorting, setSorting] = useState<AppState>({
    type: STATES.DEFAULT,
    isReversed: false,
  });

  const sortedGoods = (() => {
    const arr = SORT[sorting.type ?? STATES.DEFAULT](goodsFromServer);
    // isn't protected from invalid strings though.

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
          highlightCondition={sorting.type === STATES.ALPHABETICALLY}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: STATES.ALPHABETICALLY,
            }))
          }
        />

        <Button
          text="Sort by length"
          highlightClass="is-success"
          highlightCondition={sorting.type === STATES.BY_LENGTH}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: STATES.BY_LENGTH,
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

        {(sorting.type !== STATES.DEFAULT || sorting.isReversed) && (
          <Button
            text="Reset"
            highlightClass="is-danger"
            highlightCondition={false}
            handleClick={() =>
              setSorting({
                type: STATES.DEFAULT,
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
