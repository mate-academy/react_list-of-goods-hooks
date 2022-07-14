import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { goodsFromServer } from './api/goods';

const App: React.FC<{}> = () => {
  const [state, setState] = useState({
    lengthLimit: 0,
    goods: goodsFromServer,
    isReverse: false,
    sortBy: '',
  });

  const showAll = () => {
    setState((currentState) => ({
      ...currentState,
      lengthLimit: -1,
    }));
  };

  const reverse = () => {
    setState((currentState) => ({
      ...currentState,
      isReverse: !state.isReverse,
    }));
  };

  const sortByLength = () => {
    setState((currentState) => ({
      ...currentState,
      sortBy: 'length',
    }));
  };

  const sortByName = () => {
    setState((currentState) => ({
      ...currentState,
      sortBy: 'name',
    }));
  };

  const reset = () => {
    setState((currentState) => ({
      ...currentState,
      sortBy: '',
      isReverse: false,
      lengthLimit: -1,
    }));
  };

  const {
    goods,
    isReverse,
    sortBy,
    lengthLimit,
  } = state;

  const visibleGoods = goods.filter(good => {
    if (lengthLimit === -1) {
      return true;
    }

    return good.length <= lengthLimit;
  });

  visibleGoods.sort((f1, f2) => {
    switch (sortBy) {
      case 'length':
        return f1.length - f2.length;
      case 'name':
        return f1.localeCompare(f2);
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <GoodsList
        goods={visibleGoods}
      />

      {(visibleGoods.length > 0 && (
        <div className="level">
          <button
            className="button is-danger"
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            className="button is-warning"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="button is-info"
            type="button"
            onClick={sortByLength}
          >
            Length
          </button>

          <button
            className="button is-success"
            type="button"
            onClick={sortByName}
          >
            Name
          </button>
        </div>
      )) || (
        <div className="main-buttons">
          <button
            className="button is-primary is-rounded main-buttons__item"
            type="button"
            onClick={showAll}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
