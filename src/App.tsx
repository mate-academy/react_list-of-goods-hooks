import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const adoptedGoods = goodsFromServer.map((good, index) => (
  { name: good, index }));

enum SortType {
  ALPHABETIC = 'ALPHABETIC',
  LENGTH = 'LENGTH',
}

export const App = () => {
  const [goods, setState] = useState(adoptedGoods);
  const [sortedByState, setsortedByState]
    = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = (value: SortType) => {
    const modifiedGoods = [...goods];

    switch (value) {
      case SortType.ALPHABETIC:
        modifiedGoods.sort((good1, good2) => (
          good1.name.localeCompare(good2.name)));
        setsortedByState(SortType.ALPHABETIC);
        setState(modifiedGoods);
        break;
      case SortType.LENGTH:
        modifiedGoods.sort((good1, good2) => (
          good1.name.length - good2.name.length));
        setsortedByState(SortType.LENGTH);
        setState(modifiedGoods);
        break;
      default:
        break;
    }
  };

  const reverseGoods = () => {
    if (isReversed) {
      setIsReversed(false);
    } else {
      setIsReversed(true);
    }

    setState([...goods].reverse());
  };

  const resetGoods = () => {
    setsortedByState(null);
    setIsReversed(false);
    setState(adoptedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': sortedByState !== SortType.ALPHABETIC,
          })}
          onClick={() => sortBy(SortType.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': sortedByState !== SortType.LENGTH,
          })}
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': isReversed === false,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={{
            display: isReversed || sortedByState
              ? 'inline-block' : 'none',
          }}
          onClick={resetGoods}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good.index} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
