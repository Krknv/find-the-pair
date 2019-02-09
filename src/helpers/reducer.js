export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'setCards':
      return { ...state, cards: payload };

    case 'setOpenCards':
      return { ...state, openCards: payload };

    case 'setTotalClicks':
      return { ...state, totalClicks: payload };

    case 'setTotalPairs':
      return { ...state, totalPairs: payload };

    case 'setIsRunning':
      return { ...state, isRunning: payload };

    case 'setScreen':
      return { ...state, screen: payload };

    case 'setTime':
      return { ...state, time: payload };

    case 'setState':
      return { ...state, ...payload };

    default:
      throw new Error();
  }
};
