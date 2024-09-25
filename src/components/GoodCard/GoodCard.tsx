interface Card {
  good: string;
}

export const GoodCard: React.FC<Card> = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};
