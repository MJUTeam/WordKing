import { GRAY, PRIMARY, SECONDARY } from '../colors';

export const Marking = {
  NONE: 'NONE',
  MEMORIZED: 'MEMORIZED',
  CONFUSION: 'CONFUSION',
};

export const HideWord = {
  NONE: 'NONE',
  ENGLISH: 'ENGLISH',
  KOREAN: 'KOREAN',
};

export const nextMarking = (marking) => {
  switch (marking) {
    case Marking.NONE:
      return Marking.MEMORIZED;
    case Marking.MEMORIZED:
      return Marking.CONFUSION;
    case Marking.CONFUSION:
      return Marking.NONE;
    default:
      break;
  }
};

export const getColor = (marking) => {
  switch (marking) {
    case Marking.NONE:
      return GRAY.DARK;
    case Marking.MEMORIZED:
      return SECONDARY.DARK;
    case Marking.CONFUSION:
      return PRIMARY.DARK;
    default:
      break;
  }
};
