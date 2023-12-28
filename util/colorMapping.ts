export const colorMapTW = (value: number) => {
  switch (value) {
    case 10:
      return 'text-blue-900';
    case 9:
    case 8:
      return 'text-emerald-900';
    case 7:
    case 6:
      return 'text-green-800';
    case 5:
    case 4:
      return 'text-yellow-700';
    case 3:
    case 2:
      return 'text-amber-700';
    default:
      return 'text-red-900';
  }
};

export const colorMapHEX = (value: number) => {
  switch (value) {
    case 10:
      return '#1e3a8a';
    case 9:
    case 8:
      return '#064e3b';
    case 7:
    case 6:
      return '#166534';
    case 5:
    case 4:
      return "#a16207";
    case 3:
    case 2:
      return "#78350f";
    default:
      return '#7f1d1d';
  }
};