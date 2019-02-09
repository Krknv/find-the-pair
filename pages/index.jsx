import { Flex } from 'rebass';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { closeAllCards, generateCards, updateCards } from 'src/helpers/index';
import { icons } from 'src/constants/icons';
import { PAIRS_COUNT, SCREEN_END, SCREEN_GAME, SCREEN_START, TIME_TO_CHOICE } from 'src/constants';
import { useInterval } from 'src/helpers/use-interval';
import Card from 'src/components/card';
import Header from 'src/components/header';
import Icon from 'src/components/icon';

const Cards = styled(Flex)`
  max-width: 800px;
`;

const Index = () => {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [delay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [screen, setScreen] = useState(SCREEN_START);
  const [time, setTime] = useState(TIME_TO_CHOICE);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);

  useEffect(() => {
    if (screen === SCREEN_GAME) {
      initGame();
    }
  }, [screen]);

  useInterval(
    () => {
      if (time !== 0) {
        setTime(time - 1000);
      } else {
        resetTimer();
        setCards(closeAllCards({ cards }));
      }
    },
    isRunning ? delay : null,
  );

  useEffect(() => {
    setOpenCards(cards.filter(item => item.open && !item.paired));
  }, [cards]);

  useEffect(() => {
    if (openCards.length === 1) {
      setIsRunning(true);
    }

    if (openCards.length === 2) {
      let newCards = [];

      setIsRunning(false);
      resetTimer();

      if (openCards[0].icon === openCards[1].icon) {
        setTotalPairs(totalPairs + 1);
        newCards = updateCards({ cards, icon: openCards[0].icon });
      } else {
        newCards = closeAllCards({ cards });
      }

      setTimeout(() => {
        setCards(newCards);
      }, 1000);
    }

    if (totalPairs === PAIRS_COUNT) {
      setTimeout(() => {
        setScreen(SCREEN_END);
      }, 900);
    }
  }, [openCards]);

  const initGame = () => {
    resetTimer();
    setTotalClicks(0);
    setTotalPairs(0);
    setCards(generateCards({ icons, PAIRS_COUNT }));
  };

  const startGame = () => {
    setScreen(SCREEN_GAME);
  };

  const resetTimer = () => {
    setTime(TIME_TO_CHOICE);
    setIsRunning(false);
  };

  const openCard = item => {
    if (openCards.length < 2) {
      const { index } = item;
      setCards([...cards.slice(0, index), { ...item, open: true }, ...cards.slice(index + 1)]);
      setTotalClicks(totalClicks + 1);
    }
  };

  return (
    <React.Fragment>
      <Header
        screen={screen}
        startGame={startGame}
        time={time}
        totalClicks={totalClicks}
        totalPairs={totalPairs}
      />
      <Cards alignItems="center" flexWrap="wrap" justifyContent="center" mx="auto">
        {cards.map((item, index) => (
          <Card index={index} item={item} key={index} openCard={openCard}>
            <Icon icon={item.icon} color={item.color} />
          </Card>
        ))}
      </Cards>
    </React.Fragment>
  );
};

export default Index;
