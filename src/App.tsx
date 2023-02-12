import classNames from 'classnames';
import React, { useState } from 'react';

import { GoodsList } from './components/GoodsList';
import { ListControl } from './components/ListControl';

const goodsFromServer: string[] = [
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

const App: React.FC = () => {
  const [isListVisible, setisListVisible] = useState(false);
  const [isReversed, setisReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const reset = () => {
    setisReversed(false);
    setSortBy('');
  };

  const visibleGoods = [...goodsFromServer];

  if (sortBy) {
    visibleGoods.sort((a, b) => {
      switch (sortBy) {
        case 'alpha':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className={classNames('App', {
      'App--after': isListVisible,
      'App--before': !isListVisible,
    })}
    >
      {!isListVisible
        ? (
          <button
            type="button"
            onClick={() => setisListVisible(true)}
            className="button button--start"
          >
            Start
          </button>
        )
        : (
          <>
            <GoodsList goods={visibleGoods} />
            <ListControl
              isReversed={isReversed}
              setIsReversed={setisReversed}
              setSortBy={setSortBy}
              reset={reset}
            />
          </>
        )}
    </div>
  );
};

export default App;
