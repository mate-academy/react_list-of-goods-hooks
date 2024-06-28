import { createRoot } from 'react-dom/client';
import { App } from './App';

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

createRoot(document.getElementById('root') as HTMLElement).render(<App goods={goodsFromServer} />);
