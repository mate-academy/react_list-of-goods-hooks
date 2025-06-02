import "bulma/css/bulma.css";
import "./App.scss";

import React, { useState } from "react";
import { SortType } from "./enums";
import { ListOfGoods } from "./ListOfGoods/ListOfGoods";
import { Buttons } from "./Buttons/Buttons";
import { getPreparedGoods } from "./GetPreparedGoods";
export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [reversedList, setReversedList] = useState(false);

  const goods = getPreparedGoods(sortBy, reversedList);

  const handleSortByAlphabet = () => setSortBy(SortType.Alphabet);
  const handleSortByLength = () => setSortBy(SortType.Length);
  const handleReset = () => {
    setSortBy(SortType.None);
    setReversedList(false);
  };

  return (
    <div className="section content">
      <Buttons
        sortBy={sortBy}
        reversedList={reversedList}
        onSortByAlphabet={handleSortByAlphabet}
        onSortByLength={handleSortByLength}
        onReverse={() => setReversedList((prev) => !prev)}
        onReset={handleReset}
      />

      <ListOfGoods goods={goods} />
    </div>
  );
};
