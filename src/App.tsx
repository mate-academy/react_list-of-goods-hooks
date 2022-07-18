import React, { useState } from 'react';
import { GoodsList } from './GoodsList';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);

  return (
    <div className="has-text-centered">
      <h1 className="title mt-3 is-size-3">
        List of goods
      </h1>

      {
        !isGoodsVisible ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setIsGoodsVisible(true)}
            >
              Start
            </button>
          </>
        ) : (
          <GoodsList goods={goodsFromServer} />
        )
      }
    </div>
  );
};
