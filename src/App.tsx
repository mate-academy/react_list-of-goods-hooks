import 'bulma/css/bulma.css';
import './App.scss';
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { ButtonList } from './components/ButtonList/ButtonList';
import { GoodList } from './components/GoodsList/GoodsList';
import { goodsFromServer } from './model/GoodsFromServer.model';
import { TGood } from './types/TGood';

interface IGoodsContext {
  goods: IGood[];
  setGood: Dispatch<React.SetStateAction<string[]>>;
  historyOrder: SortType[];
  setHistoryOrder: Dispatch<SetStateAction<SortType[]>>;
  counterReset: 0 | 1;
  setCounterReset: Dispatch<SetStateAction<0 | 1>>;
  isLightAlpha: boolean;
  setLightAlpha: () => {};
  isLightLength: boolean;
  setLightLength: () => {};
  isLightReverse: boolean;
  setLightReverse: () => {};
}

export const GoodsContext: React.Context<IGoodsContext | null> =
  createContext(null);

export enum SortType {
  Alphabetically = 'alpha',
  Length = 'length',
}

export const App = () => {
  const [goods, setGoods] = useState<TGood[]>([...goodsFromServer]);
  const [historyOrder, setHistoryOrder] = useState<SortType[]>([]);
  const [counterReset, setCounterReset] = useState<0 | 1>(0);
  const [isLightAlpha, setIsLightAlpha] = useState<boolean>(true);
  const [isLightLength, setIsLightLength] = useState<boolean>(true);
  const [isLightReverse, setIsLightReverse] = useState<boolean>(true);

  return (
    <GoodsContext.Provider
      value={{
        goods,
        setGoods,
        historyOrder,
        setHistoryOrder,
        counterReset,
        setCounterReset,
        isLightAlpha,
        isLightLength,
        isLightReverse,
        setIsLightAlpha,
        setIsLightLength,
        setIsLightReverse,
      }}
    >
      <>
        <div className="section content">
          <ButtonList />

          <GoodList goods={goods} />
        </div>
      </>
    </GoodsContext.Provider>
  );
};
