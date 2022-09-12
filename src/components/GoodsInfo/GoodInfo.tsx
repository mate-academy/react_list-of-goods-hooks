type Props = {
  good: string;
};

export const GoodInfo: React.FC<Props> = ({ good }) => {
  return (
    <li className="Goods__item">
      {good}
    </li>
  );
};
