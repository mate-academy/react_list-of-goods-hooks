import './GoodCard.scss';

interface Props {
  good: string;
}

export const GoodCard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good" className="GoodCard">
    {good}
  </li>
);
