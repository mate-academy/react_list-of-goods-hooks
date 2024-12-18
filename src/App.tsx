import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';

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

export enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [vissibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortGoods, setSortGoods] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = (field: SortType) => {
    const updatedGoods = [...goodsFromServer];

    if (field !== SortType.NONE) {
      switch (field) {
        case SortType.ALPHABET:
          updatedGoods.sort((item1, item2) => item1.localeCompare(item2));
          break;
        case SortType.LENGTH:
          updatedGoods.sort((item1, item2) => item1.length - item2.length);
          break;
        default:
          break;
      }
    }

    if (isReversed) {
      updatedGoods.reverse();
    }

    setVisibleGoods(updatedGoods);
    setSortGoods(field);
  };

  const reverseItems = () => {
    const reversedGoods = [...vissibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(prevReverse => !prevReverse);
  };

  const reset = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortGoods(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <Buttons
        sortBy={sortedGoods}
        reset={reset}
        sortField={sortGoods}
        reverse={isReversed}
        setReverse={reverseItems}
      />
      <ul>
        <GoodList goods={vissibleGoods} />
      </ul>
    </div>
  );
};
