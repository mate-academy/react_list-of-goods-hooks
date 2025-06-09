import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
  'Cabbage',
  'Garlic',
  'Apple',
  'Carrot',
  'Potato',
  'Onion',
];

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>([...goodsFromServer]);

  const handleReset = () => {
    setVisibleGoods([...goodsFromServer]);
  };

  const handleSortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => b.length - a.length);
    setVisibleGoods(sorted);
  };

  const handleSortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    setVisibleGoods(sorted);
  };

  const handleReverse = () => {
    setVisibleGoods(prev => [...prev].reverse());
  };

  return (
    <div className="section">
      <div className="buttons">
        <button onClick={handleReset} className="button is-info">Reset</button>
        <button onClick={handleSortByLength} className="button is-primary">Sort by Length</button>
        <button onClick={handleSortAlphabetically} className="button is-warning">Sort Alphabetically</button>
        <button onClick={handleReverse} className="button is-dark">Reverse</button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
