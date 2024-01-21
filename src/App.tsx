import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Buttons } from './components/Buttons';
import { List } from './components/List';
import { SortType, State } from './types';

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

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isReverse: false,
    sortField: SortType.Default,
    visibleGoods: [...goodsFromServer],
  });

  return (
    <div className="section content">
      <Buttons
        state={state}
        setState={setState}
        goodsFromServer={goodsFromServer}
      />

      <List visibleGoods={state.visibleGoods} />
    </div>
  );
};
