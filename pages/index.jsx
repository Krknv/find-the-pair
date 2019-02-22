import { Flex } from 'rebass';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { closeAllCards, generateCards, updateCards } from 'src/helpers/index';
import { icons } from 'src/constants/icons';
import { PAIRS_COUNT, SCREEN_END, SCREEN_GAME, SCREEN_START, TIME_TO_CHOICE } from 'src/constants';
import { reducer } from 'src/helpers/reducer';
import { useInterval } from 'src/helpers/use-interval';
import Card from 'src/components/card';
import Header from 'src/components/header';
import Icon from 'src/components/icon';

const Cards = styled(Flex)`
  max-width: 800px;
`;

const initialState = {
  cards: [],
  delay: 1000,
  isRunning: false,
  openCards: [],
  screen: SCREEN_START,
  time: TIME_TO_CHOICE,
  totalClicks: 0,
  totalPairs: 0,
};

const Index = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cards, delay, isRunning, openCards, screen, time, totalClicks, totalPairs } = state;

  useEffect(() => {
    if (screen === SCREEN_GAME) {
      initGame();
    }
  }, [screen]);

  useInterval(
    () => {
      if (time !== 0) {
        dispatch({ type: 'setTime', payload: time - 1000 });
      } else {
        dispatch({ type: 'setCards', payload: closeAllCards({ cards }) });
        resetTimer();
      }
    },
    isRunning ? delay : null,
  );

  useEffect(() => {
    dispatch({
      type: 'setOpenCards',
      payload: cards.filter(item => item.open && !item.paired),
    });
  }, [cards]);

  useEffect(() => {
    if (openCards.length === 1) {
      dispatch({ type: 'setIsRunning', payload: true });
    }

    if (openCards.length === 2) {
      let payload = [];

      dispatch({ type: 'setIsRunning', payload: false });
      resetTimer();

      if (openCards[0].icon === openCards[1].icon) {
        dispatch({ type: 'setTotalPairs', payload: totalPairs + 1 });
        payload = updateCards({ cards, icon: openCards[0].icon });
      } else {
        payload = closeAllCards({ cards });
      }

      setTimeout(() => {
        dispatch({ type: 'setCards', payload });
      }, 1000);
    }

    if (totalPairs === PAIRS_COUNT) {
      setTimeout(() => {
        dispatch({ type: 'setScreen', payload: SCREEN_END });
      }, 900);
    }
  }, [openCards]);

  const initGame = () => {
    resetTimer();
    dispatch({
      type: 'setState',
      payload: {
        cards: generateCards({ icons, PAIRS_COUNT }),
        totalClicks: 0,
        totalPairs: 0,
      },
    });
  };

  const startGame = () => {
    dispatch({ type: 'setScreen', payload: SCREEN_GAME });
  };

  const resetTimer = () => {
    dispatch({
      type: 'setState',
      payload: {
        time: TIME_TO_CHOICE,
        isRunning: false,
      },
    });
  };

  const openCard = item => {
    if (openCards.length < 2) {
      const { index } = item;
      dispatch({
        type: 'setState',
        payload: {
          cards: [...cards.slice(0, index), { ...item, open: true }, ...cards.slice(index + 1)],
          totalClicks: totalClicks + 1,
        },
      });
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
