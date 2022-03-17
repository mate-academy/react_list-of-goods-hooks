import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { List } from './components/List';

type OrderBy = 'alphabet' | 'length';

const compareGoods = (good1: string, good2: string, orderBy: OrderBy) => {
  switch (orderBy) {
    case 'alphabet':
      return good1.localeCompare(good2);
    case 'length':
      return good1.length - good2.length;

    default:
      return 0;
  }
};

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
  const [list, setList] = useState(
    goodsFromServer,
  );

  const [clicked, setClicked] = useState(false);

  const handlerToggleReverse = () => {
    const nextList = [...list];

    nextList.reverse();
    setList(nextList);
  };

  const handlerSortByAlphabet = () => {
    const nextList = [...list];

    nextList.sort((a, b) => compareGoods(a, b, 'alphabet'));
    setList(nextList);
  };

  const handlerSortByLength = () => {
    const nextList = [...list];

    nextList.sort((a, b) => compareGoods(a, b, 'length'));
    setList(nextList);
  };

  const handlerReset = () => {
    setList(goodsFromServer);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!clicked
        ? <Button txt="Start" handleClick={() => setClicked(true)} />
        : (
          <>
            <List list={list} />
            <Button txt="Reverse" handleClick={handlerToggleReverse} />
            <Button txt="Sort alphabetically" handleClick={handlerSortByAlphabet} />
            <Button txt="Sort by length" handleClick={handlerSortByLength} />
            <Button txt="Reset" handleClick={handlerReset} />
          </>
        )}
    </div>
  );
};

export default App;
