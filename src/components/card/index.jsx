import { Card, Content, Inner } from 'src/components/card/styled';
import { FaInfinity } from 'react-icons/fa';

const CCard = ({
  // column
  openCard = () => null,
  children,
  index,
  item: { color, icon, open, paired },
}) => {
  const handleClick = () => {
    if (open || paired) return;
    openCard({
      color,
      icon,
      index,
      open: true,
      paired: false,
    });
  };
  return (
    <Card
      bg="transparent"
      mx="10px"
      my="10px"
      onClick={handleClick}
      open={open}
      paired={paired}
      width="100px"
    >
      <Inner>
        <Content front bg="#4b21ff" color="#fff">
          <FaInfinity size="60%" />
        </Content>
        <Content back bg="#efefef" color="#000">
          {children}
        </Content>
      </Inner>
    </Card>
  );
};

export default CCard;
