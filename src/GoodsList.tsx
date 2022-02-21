import './App';

type Props = {
  goods: string[];
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <>
      <ul className="app__list">
        {goods.map(good => (
          <li key={good} className="app__item">
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GoodsList;
