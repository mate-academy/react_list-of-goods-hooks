import './styles/App.scss';
import { Button } from 'react-bootstrap';
import { Component } from 'react';
import { GoodsList } from './components/GoodsList';

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

interface State {
  isButtonVisible: boolean;
}

export class App extends Component<{}, State> {
  state = {
    isButtonVisible: true,
  };

  handleStartClick = () => {
    this.setState({ isButtonVisible: false });
  };

  render() {
    const { isButtonVisible } = this.state;

    return (
      <div className="App">
        {isButtonVisible
          ? (
            <Button
              className="App__startButton"
              onClick={this.handleStartClick}
            >
              Start
            </Button>
          ) : (
            <div className="App__goodsList">
              <GoodsList goods={goodsFromServer} />
            </div>
          )}
      </div>
    );
  }
}
