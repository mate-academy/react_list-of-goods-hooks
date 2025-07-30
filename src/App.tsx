import 'bulma/css/bulma.css';
import './App.scss';
import { useState, createContext } from 'react';
import { ButtonList } from './components/ButtonList/ButtonList';
import { GoodList } from './components/GoodsList/GoodsList';
import { goodsFromServer } from './model/GoodsFromServer.model';

export const GoodsContext = createContext();

export enum SortType {
  Alphabetically = 'alpha',
  Length = 'length'
}

export const App = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
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

          <GoodList goods={goods}/>
        </div>
      </>
    </GoodsContext.Provider>
  );
};
