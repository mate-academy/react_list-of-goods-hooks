import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Buttons } from './components/buttons/Buttons';
import { ListGoods } from './components/listGoods/ListGoods';
import { goodsFromServer } from './data/goods';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const isLight = 'is-light';
  const [activeButton, setActiveButton] = useState<SortType | ''>('');
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [resetVisible, setResetVisible] = useState<boolean>(false);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const sortGoods = (field: SortType) => {
    let sortedGoods = [...goods];

    if (field === SortType.Reverse) {
      setIsReverse(!isReverse);
    }

    switch (field) {
      case SortType.Length:
        if (!isReverse) {
          sortedGoods.sort((a, b) => a.length - b.length);
        } else {
          sortedGoods.sort((a, b) => b.length - a.length);
        }

        break;
      case SortType.Alphabetically:
        if (!isReverse) {
          sortedGoods.sort((a, b) => a.localeCompare(b));
        } else {
          sortedGoods.sort((a, b) => b.localeCompare(a));
        }

        break;
      case SortType.Reverse:
        sortedGoods.reverse();
        setResetVisible(!isReverse);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    setGoods(sortedGoods);
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
