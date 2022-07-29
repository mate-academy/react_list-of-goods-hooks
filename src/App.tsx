import { useState } from 'react';
import { List } from './component/List/List';
import { Buttons } from './component/Buttons/Buttons';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [start, setStart] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const arrayCopy = [...goodsFromServer];

  const sortHandler = () => {
    arrayCopy.sort((a, b) => {
      switch (sortBy) {
        case 'alphabet':
          if (!reverse) {
            return a.localeCompare(b);
          }

          return b.localeCompare(a);
          break;
        case 'length':
          if (!reverse) {
            return a.length - b.length;
          }

          return b.length - a.length;
          break;
        default:
          return 0;
          break;
      }
    });

    if (sortBy === '' && reverse) {
      arrayCopy.reverse();
    }
  };

  sortHandler();

  return (
    <div className="App">
      { start ? (
        <button
          type="button"
          onClick={() => {
            setStart(false);
          }}
        >
          Start
        </button>
      ) : (
        <>
          <Buttons
            setSortBy={setSortBy}
            setReverse={setReverse}
          />
          <List arrayCopy={arrayCopy} />
        </>
      )}
    </div>
  );
};
