import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

type Good = string;

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

type ClickButton = React.MouseEventHandler<HTMLButtonElement>;

export const goodsFromServer: Good[] = [
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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([...goodsFromServer]);
  const [sortState, setSortState] = useState<{
    reversed: boolean;
    criterion: SortType;
  }>({
    reversed: false,
    criterion: SortType.None,
  });
  const [isReset, setIsReset] = useState(false as boolean);

  const sortGoodsByAlphabet: ClickButton = () => {
    const sortedGoods: Good[] = [...goods].sort((a, b) => {
      if (sortState.reversed) {
        return b.localeCompare(a);
      }

      return a.localeCompare(b);
    });

    setGoods(sortedGoods);
    setSortState({ ...sortState, criterion: SortType.Alphabet });
    setIsReset(true);
  };

  const sortGoodsByLength: ClickButton = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      if (sortState.reversed) {
        return b.length - a.length;
      }

      return a.length - b.length;
    });

    setGoods(sortedGoods);
    setSortState({ ...sortState, criterion: SortType.Length });
    setIsReset(true);
  };

  const reverseGoods: ClickButton = () => {
    setSortState(prevState => {
      const reversed = !prevState.reversed;

      setGoods(prevGoods => {
        const newGoods = [...prevGoods].reverse();

        setIsReset(
          !newGoods.every(
            (element, index) => element === goodsFromServer[index],
          ),
        );

        return newGoods;
      });

      return { ...prevState, reversed };
    });
  };

  const resetGoods: ClickButton = () => {
    setGoods([...goodsFromServer]);
    setSortState({
      reversed: false,
      criterion: SortType.None,
    });
    setIsReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortGoodsByAlphabet}
          type="button"
          className={`button is-info ${
            sortState.criterion !== SortType.Alphabet && 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortGoodsByLength}
          type="button"
          className={`button is-success ${
            sortState.criterion !== SortType.Length && 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${!sortState.reversed && 'is-light'}`}
        >
          Reverse
        </button>

        {isReset && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good: Good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
