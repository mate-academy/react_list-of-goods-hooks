import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

const App: React.FC = () => {
  const [showedGoods, setVisibility] = useState(false);

  const showGoods = () => {
    setVisibility(!showedGoods);
  };

  return (
    <div className="App">
      <h1 className="App__title">Goods</h1>
      {
        showedGoods
          ? (
            <GoodsList />
          )
          : (
            <button
              type="button"
              onClick={showGoods}
              className="App__button"
            >
              Start
            </button>
          )
      }
    </div>
  );
};

export default App;
