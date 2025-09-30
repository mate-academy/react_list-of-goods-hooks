import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  alphabet = 'Sort alphabetically',
  length = 'Sort by length',
  reverse = 'Reverse',
  reset = 'Reset',
}

export const goodsFromServer: string[] = [
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
  const [goods, setGoods] = useState<string[]>([]);
  const [count, setCount] = useState<string>('1');
  const [count1, setCount1] = useState<string>('1');
  const [count2, setCount2] = useState<boolean>(true);
  const [count3, setCount3] = useState<string>('1');
  const [showGoods, setShowGoods] = useState<boolean>(false);

  const sortGoods = (type: SortType, reverseToggle = count2) => {
    let sorted = [...goods];

    switch (type) {
      case SortType.alphabet:
        sorted.sort((a, b) =>
          reverseToggle ? a.localeCompare(b) : b.localeCompare(a),
        );
        break;

      case SortType.length:
        sorted.sort((a, b) =>
          reverseToggle ? a.length - b.length : b.length - a.length,
        );
        break;

      case SortType.reverse:
        sorted.reverse();
        break;

      default:
        sorted = [...goodsFromServer];
    }

    setGoods(sorted);
  };

  const getColor = (value: SortType) => {
  if (value === SortType.alphabet) {
    return `is-info ${count === '1' ? 'is-light' : ''}`;
  }

  if (value === SortType.length) {
    return `is-success ${count1 === '1' ? 'is-light' : ''}`;
  }

  if (value === SortType.reverse) {
    return `is-warning ${count2 ? 'is-light' : ''}`;
  }

  if (value === SortType.reset) {
    return `is-danger ${count3 === '0' ? 'is-light' : ''}`;
  }

  return '';
  };

  return (
    <div className="section content">
      {!showGoods ? (
        <button
          type="button"
          className="button is-primary"
          onClick={() => {
            setGoods([...goodsFromServer]);
            setShowGoods(true);
          }}
        >
          Start
        </button>
      ) : (
        <>
          <div className="buttons">
            {Object.values(SortType).map(value => {
              const isResetHidden =
                value === SortType.reset &&
                goods.every((item, i) => item === goodsFromServer[i]);

              if (isResetHidden) {
return null;
}

              return (
                <button
                  key={value}
                  type="button"
                  className={`button ${getColor(value)}`}
                  onClick={() => {
                    if (value === SortType.alphabet) {
                      setCount('0');
                      setCount1('1');
                      setCount3('0');
                      sortGoods(value as SortType, count2);
                    } else if (value === SortType.length) {
                      setCount('1');
                      setCount1('0');
                      setCount3('0');
                      sortGoods(value as SortType, count2);
                    } else if (value === SortType.reverse) {
                      const newReverse = !count2;

                      setCount2(newReverse);
                      setCount('1');
                      setCount1('1');
                      setCount3('0');
                      sortGoods(value as SortType, newReverse);
                    } else if (value === SortType.reset) {
                      setGoods([...goodsFromServer]);
                      setCount3('1');
                      setCount('1');
                      setCount1('1');
                      setCount2(true);
                    }
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <ul>
            {goods.map(good => (
              <li key={good} data-cy="Good">
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
