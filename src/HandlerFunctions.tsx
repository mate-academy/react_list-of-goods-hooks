import { Dispatch, SetStateAction } from "react";
import { SortType } from "./enums";

export function handleSortByAlphabet(
  setSortBy: Dispatch<SetStateAction<SortType>>,
) {
  setSortBy((prev: SortType) =>
    prev === SortType.Alphabet ? SortType.None : SortType.Alphabet,
  );
}

export function handleSortByLength(
  setSortBy: Dispatch<SetStateAction<SortType>>,
) {
  setSortBy((prev: SortType) =>
    prev === SortType.Length ? SortType.None : SortType.Length,
  );
}

export function handleReset(
  setSortBy: Dispatch<SetStateAction<SortType>>,
  setReversedList: Dispatch<SetStateAction<boolean>>,
) {
  setSortBy(SortType.None);
  setReversedList(false);
}

export function handleReverse(
  setReversedList: Dispatch<SetStateAction<boolean>>,
) {
  setReversedList((prev: boolean) => !prev);
}
