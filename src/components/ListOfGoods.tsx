import React, { useState } from 'react';

type Props = {
  goodsFromServer: string[];
};

export const ListOfGoods: React.FC<Props> = ({ goodsFromServer }) => {
  const [clickStart, setStart] = useState(false);
  const [goods, setState] = useState(goodsFromServer);

  const startFinishButton = () => {
    setStart(curent => !curent);
  };

  const getReverse = () => {
    setState(current => [...current].reverse());
  };

  const getSortAlphabetically = () => {
    setState(current => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const getSortByLength = () => {
    setState(current => [...current].sort((a, b) => a.length - b.length));
  };

  const getReset = () => {
    setState(goodsFromServer);
  };

  return (
    <div className="m-5 level-item has-text-centered">
      <button
        type="button"
        className="button is-warning is-outlined"
        onClick={() => startFinishButton()}
      >
        {!clickStart
          ? 'Start'
          : 'Finish'}
      </button>
      {clickStart
        && (
          <div>
            <ul>
              {goods.map(good => (
                <div key={good} className="has-text-white">
                  <li>
                    {good}
                  </li>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="button is-warning is-small mr-1"
              onClick={() => getReverse()}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-warning is-small mr-1"
              onClick={() => getSortAlphabetically()}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-warning is-small mr-1"
              onClick={() => getSortByLength()}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-warning is-small mr-1"
              onClick={() => getReset()}
            >
              Reset
            </button>
          </div>
        )}
    </div>
  );
};
