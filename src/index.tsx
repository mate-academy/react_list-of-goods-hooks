import ReactDOM from 'react-dom';
import { App } from './App';

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

ReactDOM.render(
  <App
    isStarted={false}
    isReversed={false}
    sortType={SortType.NONE}
    valueMinLensthGood={0}
    isSortAlphabet={false}
    isSortLength={false}
  />,
  document.getElementById('root'),
);
