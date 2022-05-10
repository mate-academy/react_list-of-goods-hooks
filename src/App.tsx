import { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList/GoodsList';

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

const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isStartVisible, setStartVisibility] = useState(true);
  const [minLength, setMinLength] = useState(1);

  const start = () => {
    setStartVisibility(!isStartVisible);
  };

  const reverseList = () => {
    setVisibleGoods([...visibleGoods].reverse());
  };

  const sortList = () => {
    setVisibleGoods([...visibleGoods].sort((a, b) => {
      return a.localeCompare(b);
    }));
  };

  const resetList = () => {
    setVisibleGoods(goodsFromServer);
    setMinLength(1);
  };

  const sortLength = () => {
    setVisibleGoods([...visibleGoods].sort((a, b) => {
      return (a.length - b.length);
    }));
  };

  const filterLength = (event: {
    target: { value: string };
  }) => {
    const { value } = event.target;

    setMinLength(+value);
  };

  const renderList = visibleGoods.filter((good: string) => {
    return good.length >= minLength;
  });

  return (
    <div className="App">
      {isStartVisible
        ? (
          <button
            type="button"
            onClick={start}
            className="start"
          >
            Start
          </button>
        )
        : (
          <>
            <h1 className="title">
              {`Goods count ${renderList.length}`}
            </h1>

            <GoodsList list={renderList} />

            <div className="buttons">
              <button
                type="button"
                onClick={reverseList}
                className="button"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={sortList}
                className="button"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={resetList}
                className="button"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={sortLength}
                className="button"
              >
                Sort by length
              </button>

              <select
                name="length"
                onChange={filterLength}
                value={minLength}
                className="select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </>

        )}
    </div>
  );
};

export default App;
