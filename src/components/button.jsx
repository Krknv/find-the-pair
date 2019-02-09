import { Box } from 'rebass';
import styled from 'styled-components';

const Button = styled(Box)`
  background: #431be0;
  border-radius: 30px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;

const CButton = ({ onClick = () => null, children }) => (
  <Button as="button" mb="16px" mx="auto" onClick={onClick} px="56px" py="24px">
    {children}
  </Button>
);

export default CButton;
