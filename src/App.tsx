import React from 'react';
import './App.css';
import { MakeGoodsList } from './makeGoodsList';

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

type State = {
  goods: string[],
  isVisible: boolean,
  isReversed: boolean,
  sortBy: string,
};

class App extends React.Component<{}, State> {
  state = {
    goods: goodsFromServer,
    isVisible: false,
    isReversed: false,
    sortBy: '',
  };

  start = () => {
    this.setState({ isVisible: true });
  };

  stop = () => {
    this.setState({ isVisible: false });
  };

  sortAphabetically = () => {
    this.setState({
      sortBy: 'alphabet',
    });
  };

  reverse = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByLength = () => {
    this.setState({
      sortBy: 'length',
    });
  };

  reset = () => {
    this.setState({
      isReversed: false,
      sortBy: '',
    });
  };

  render() {
    const {
      goods, isVisible, isReversed, sortBy,
    } = this.state;
    const visibleGoods = [...goods];

    switch (sortBy) {
      case 'length':
        visibleGoods.sort((item1, item2) => item1.length - item2.length);
        break;

      case 'alphabet':
        visibleGoods.sort((item1, item2) => item1.localeCompare(item2));
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return (
      <div>
        <h1>Goods</h1>
        {!isVisible ? (
          <button
            type="button"
            onClick={this.start}
          >
            Start
          </button>
        ) : (
          <div>
            <MakeGoodsList
              goodsList={visibleGoods}
            />
            <div>
              <button
                type="button"
                onClick={this.reverse}
              >
                Reverse
              </button>
              <button
                type="button"
                onClick={this.sortAphabetically}
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={this.sortByLength}
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={this.reset}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={this.stop}
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
