import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="GoodsList">
      {
        goods.map((goodName) => (
          <li key={goodName}>
            {goodName}
          </li>
        ))
      }
    </ul>
  );
};
