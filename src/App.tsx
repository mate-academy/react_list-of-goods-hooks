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
  goods: TGood[];
  setGoods: Dispatch<React.SetStateAction<TGood[]>>;
  historyOrder: SortType[];
  setHistoryOrder: Dispatch<SetStateAction<SortType[]>>;
  counterReset: 0 | 1;
  setCounterReset: Dispatch<SetStateAction<0 | 1>>;
  isLightAlpha: boolean;
  setIsLightAlpha: Dispatch<SetStateAction<boolean>>;
  isLightLength: boolean;
  setIsLightLength: Dispatch<SetStateAction<boolean>>;
  isLightReverse: boolean;
  setIsLightReverse: Dispatch<SetStateAction<boolean>>;
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
