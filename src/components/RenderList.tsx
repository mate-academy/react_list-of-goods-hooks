import {
  FC, useState, memo,
} from 'react';

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

const RenderList: FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [goodsList, setGoodsList] = useState<string[]>([...goodsFromServer]);
  const [length, setLength] = useState('1');

  const renderList = (goods: string[]) => {
    return goods.map(goodItem => (
      <li key={goodItem}>
        {
          goodItem
        }
      </li>
    ));
  };

  const filterGoodsByLength = (itemLength: number) => {
    const filteredGoods = goodsFromServer.filter(goodItem => (
      goodItem.length >= itemLength
    ));

    return filteredGoods;
  };

  const filteredGoods = filterGoodsByLength(parseInt(length, 10));

  const showList = (goods: string[]) => {
    if (isClicked) {
      return renderList(goods);
    }

    return null;
  };

  const reverse = (goods: string[]) => {
    setGoodsList(
      [...goods].reverse(),
    );

    return renderList(goodsList);
  };

  const sortAlphabetically = (goods: string[]) => {
    setGoodsList([...goods].sort((goodItem1: string, goodItem2: string) => (
      goodItem1.localeCompare(goodItem2)
    )));

    return renderList(goodsList);
  };

  const reset = () => {
    setLength('1');

    setGoodsList([...goodsFromServer]);

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

  const showOrHideButton = isClicked
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
      {showOrHideButton}
      <article className="content is-medium">
        <ul>
          {
            showList(filteredGoods)
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
            value={length}
            onChange={(event) => {
              setLength(event.target.value);
              setGoodsList(filteredGoods);
              filterGoodsByLength(parseInt(length, 10));
            }}
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
      </article>
    </>
  );
};

export default memo(RenderList);
