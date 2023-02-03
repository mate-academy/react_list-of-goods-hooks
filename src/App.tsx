import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { SortType } from './types/SortType';
import { Buttons } from './components/Buttons';

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  return (
    <div className="section content">

      <Buttons
        sortType={sortType}
        isReversed={isReversed}
        setSortType={setSortType}
        setIsReversed={setIsReversed}
      />

      <GoodsList isReversed={isReversed} sortType={sortType} />
    </div>
  );
};
