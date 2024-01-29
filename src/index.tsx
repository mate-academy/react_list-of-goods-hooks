import ReactDOM from 'react-dom';
import { App } from './App';
import { SortType } from './Types/SortType';

ReactDOM.render(
  <App isReversed={false} sortType={SortType.NONE} />,
  document.getElementById('root'),
);
