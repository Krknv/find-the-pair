import { Box, Flex, Text } from 'rebass';
import CircularProgressbar from 'react-circular-progressbar';
import styled from 'styled-components';

import { SCREEN_END, SCREEN_GAME, SCREEN_START, TIME_TO_CHOICE } from 'src/constants';
import Button from 'src/components/button';

const CircularProgressbarStyles = {
  path: {
    stroke: '#4b21ff',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease 0s',
  },
  trail: {
    stroke: '#efefef',
  },
  text: {
    dominantBaseline: 'central',
    fill: '#4b21ff',
    fontSize: '40px',
    fontWeight: 'bold',
    textAnchor: 'middle',
  },
  background: {
    fill: '#efefef',
  },
};

const Container = styled(Flex)`
  bottom: 0;
  color: #fff;
  height: ${({ screen }) => (screen == SCREEN_GAME ? '135px' : '100vh')};
  left: 0;
  position: ${({ screen }) => (screen == SCREEN_GAME ? 'relative' : 'fixed')};
  right: 0;
  top: 0;
  transition: height 0.3s ease-out;
  width: 100%;
  will-change: height;
  z-index: 10;
`;

const Header = ({
  startGame = () => null,
  screen = SCREEN_GAME,
  time = 0,
  totalClicks = 0,
  totalPairs = 0,
}) => {
  const percentage = (100 * time) / TIME_TO_CHOICE;
  return (
    <Container bg="#111" justifyContent="center" alignItems="center" screen={screen} mb="16px">
      {screen === SCREEN_START ? (
        <Button onClick={startGame}>CLICK TO START</Button>
      ) : screen === SCREEN_END ? (
        <Flex flexDirection="column" justifyContent="center">
          <Text fontSize="52px" textAlign="center" mb="16px">
            Well done!
          </Text>
          <Text fontSize="16px" mb="32px" textAlign="center">
            You've found {totalPairs} pairs in {totalClicks} moves
          </Text>
          <Button onClick={startGame}>PLAY AGAIN</Button>
        </Flex>
      ) : (
        <React.Fragment>
          <Box width="100px" mx="16px" my="16px">
            <CircularProgressbar
              background
              counterClockwise
              percentage={percentage}
              styles={CircularProgressbarStyles}
              text={`${time / 1000}`}
            />
          </Box>
          <Box>
            <Text mb="8px">TOTAL MOVES: {totalClicks}</Text>
            <Text mb="8px">FOUND PAIRS: {totalPairs}</Text>
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Header;
