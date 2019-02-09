export const generateCards = ({ PAIRS_COUNT, icons }) => {
  // clone array
  let items = JSON.parse(JSON.stringify(icons));

  // randomize array [1]
  items.sort(() => Math.random() - 0.5);
  // cutting array
  items.length = PAIRS_COUNT;
  // duplicate array
  items = [...items, ...items];
  // randomize array [2]
  items.sort(() => Math.random() - 0.5);

  return items;
};

// TODO: rename function
export const updateCards = ({ cards, icon }) => {
  return cards.reduce((acc, item) => {
    if (item.icon === icon) {
      return [...acc, { ...item, paired: true, open: true }];
    }
    return [...acc, item];
  }, []);
};

export const closeAllCards = ({ cards }) => {
  return cards.reduce((acc, item) => {
    return [...acc, { ...item, open: false }];
  }, []);
};
