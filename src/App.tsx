import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Goods, ReverseField, SortFields } from './types';
import { getSortedGoods } from './helpers';
import { Buttons } from './Components/Buttons/Buttons';
import { ListOfGods } from './Components/ListOfGoods/ListOfGoods';

export const goodsFromServer:Goods = [
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
  const [sortValue, setsortValue] = useState<SortFields>(SortFields.RemoveSort);
  const [
    reverseValue,
    setReverseValue,
  ] = useState<ReverseField>(ReverseField.Noreverse);

  const goodsForRender = getSortedGoods(goodsFromServer,
    sortValue, reverseValue);

  const resetButon = () => {
    setsortValue(SortFields.RemoveSort);
    setReverseValue(ReverseField.Noreverse);
  };

  const isActiveButton = sortValue !== 'remove'
  || reverseValue !== 'no-reverse';

  return (
    <div className="section content">
      <Buttons
        sortField={sortValue}
        setSortField={setsortValue}
        reverse={reverseValue}
        setReverse={setReverseValue}
        resetButton={resetButon}
        isActiveButton={isActiveButton}
      />
      <ListOfGods goods={goodsForRender} />
    </div>
  );
};
