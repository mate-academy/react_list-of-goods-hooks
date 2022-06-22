import React, { useState } from 'react';
import {
  goodsFromServer,
  renderList,
  filterGoodsByLength,
} from './Helpers';

const List: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [goodsList, setGoodsList] = useState([...goodsFromServer]);

  const sortAlphabetically = (goods: string[]) => {
    setGoodsList([...goods].sort((goodItem1: string, goodItem2: string) => (
      goodItem1.localeCompare(goodItem2)
    )));

    return renderList(goodsList);
  };

  const reset = () => {
    setGoodsList([...goodsFromServer]);

    return renderList(goodsList);
  };

  const reverse = (goods: string[]) => {
    setGoodsList(
      [...goods].reverse(),
    );

    return renderList(goodsList);
  };

  const sortByLength = (goods: string[]) => {
    const sortedGoods = [...goods].sort((goodItem1, goodItem2) => (
      goodItem1.length - goodItem2.length
    ));

    setGoodsList(
      sortedGoods,
    );

    return renderList(sortedGoods);
  };

  const startButton = isClicked
    ? null
    : (
      <button
        className="button is-primary"
        type="button"
        onClick={
          () => {
            setIsClicked(true);
          }
        }
      >
        Start
      </button>
    );

  return (
    <>
      <h1 className="title is-1">Goods</h1>
      {startButton}
      <article className="content is-medium">
        <ul>
          {
            (isClicked)
            && renderList(goodsList)
          }
        </ul>
      </article>

      <hr />
      <article className="buttons">
        <button
          disabled={!isClicked}
          className="button is-dark"
          type="button"
          onClick={() => {
            reverse(goodsList);
          }}
        >
          Reverse
        </button>

        <button
          disabled={!isClicked}
          className="button is-dark"
          type="button"
          onClick={() => {
            sortAlphabetically(goodsList);
          }}
        >
          Sort alphabetically
        </button>

        <button
          disabled={!isClicked}
          className="button is-dark"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>

        <button
          disabled={!isClicked}
          className="button is-dark"
          type="button"
          onClick={() => {
            sortByLength(goodsList);
          }}
        >
          Sort by length
        </button>

        <div className="select is-rounded is-primary">
          <select
            disabled={!isClicked}
            name="filterOptions"
            id="filterOptions"
            onChange={(event) => {
              setGoodsList(filterGoodsByLength(+event.target.value));
            }}
          >
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                .map(lengthOption => (
                  <option
                    key={lengthOption}
                    value={lengthOption}
                  >
                    {lengthOption}
                  </option>
                ))
            }
          </select>
        </div>
      </article>
    </>
  );
};

export default React.memo(List);
