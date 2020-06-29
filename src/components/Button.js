import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => (props.selected ? '#0094ff' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#0094ff')};
  cursor: pointer;
  border: 1px solid #0094ff;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: #00afff;
    color: #fff;
  }
`;

export default Button;
