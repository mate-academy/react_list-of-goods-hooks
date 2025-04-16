import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Buttons } from './components/buttons/Buttons';
import { ListGoods } from './components/listGoods/ListGoods';
import { goodsFromServer } from './data/goods';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const isLight = 'is-light';
  const [activeButton, setActiveButton] = useState<SortType | undefined>(
    undefined,
  );
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [resetVisible, setResetVisible] = useState<boolean>(false);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const sortGoods = (field: SortType) => {
    let sortedGoods = [...goods];
    let nextIsReverse = isReverse;

    if (field === SortType.Reverse) {
      nextIsReverse = !isReverse;
      setIsReverse(nextIsReverse);
    }

    switch (field) {
      case SortType.Length:
        sortedGoods.sort((a, b) =>
          nextIsReverse ? b.length - a.length : a.length - b.length,
        );
        break;

      case SortType.Alphabetically:
        sortedGoods.sort((a, b) =>
          nextIsReverse ? b.localeCompare(a) : a.localeCompare(b),
        );
        break;

      case SortType.Reverse:
        sortedGoods.reverse();
        break;

      case SortType.Reset:
        sortedGoods = [...goodsFromServer];
        setIsReverse(false);
        setActiveButton(undefined);
        setResetVisible(false);
        break;

      default:
        break;
    }

    setGoods(sortedGoods);

    if (field !== SortType.Reset) {
      setResetVisible(true);
    }
  };

  return (
    <div className="section content">
      <Buttons
        isLight={isLight}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        resetVisible={resetVisible}
        setResetVisible={setResetVisible}
        isReverse={isReverse}
        setIsReverse={setIsReverse}
        sortGoods={sortGoods}
      />
      <ListGoods goods={goods} />
    </div>
  );
};
