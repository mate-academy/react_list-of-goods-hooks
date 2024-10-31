import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/goodsList/goodsList';

export const goodsFromServer = [
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

enum Way {
  'Unknown' = 0,
  'Info' = 'is-info',
  'Success' = 'is-success',
}

function isValidWay(value: Way): value is Way {
  return Object.values(Way).includes(value);
}

function getSorted(obj: string[], way: Way) {
  const currentGoods = [...obj];

  currentGoods.sort((el1, el2) => {
    switch (way) {
      case Way.Info:
        return el1.localeCompare(el2);
      case Way.Success:
        return el1.length - el2.length;
      default:
        return 0;
    }
  });

  return currentGoods;
}

export const App: React.FC = () => {
  const [selectItem, setSelectItem] = useState('');
  const [selReverse, setselReverse] = useState(false);

  const goods = isValidWay(selectItem as Way)
    ? getSorted(goodsFromServer, selectItem as Way)
    : goodsFromServer;

  function reset() {
    setselReverse(false);
    setSelectItem('');
  }

  if (selReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectItem === 'is-info' ? null : 'is-light'}`}
          onClick={() => setSelectItem('is-info')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectItem === 'is-success' ? null : 'is-light'}`}
          onClick={() => setSelectItem('is-success')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${selReverse ? null : 'is-light'}`}
          onClick={() =>
            selReverse ? setselReverse(false) : setselReverse(true)
          }
        >
          Reverse
        </button>

        {(selectItem || selReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
