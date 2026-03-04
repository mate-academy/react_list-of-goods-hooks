import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

export enum SortType {
  Default = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
}
