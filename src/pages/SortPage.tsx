import { Button } from '../components/Button';
import { SortType } from '../types/SortType';

type SortPageProps = {
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
  reverse: boolean;
  setReverse: (reverse: boolean) => void;
  visibleGoods: string[];
};

export const SortPage: React.FC<SortPageProps> = ({
  sortType,
  setSortType,
  reverse,
  setReverse,
  visibleGoods,
}: SortPageProps) => (
  <div className="section content">
    <div className="buttons">
      <Button
        sortType={sortType}
        reverse={reverse}
        setSortType={setSortType}
        setReverse={setReverse}
      />
    </div>

    <ul>
      <ul>
        {visibleGoods.map((visibleGood: string) => (
          <li key={visibleGood} data-cy="Good">
            {visibleGood}
          </li>
        ))}
      </ul>
    </ul>
  </div>
);
