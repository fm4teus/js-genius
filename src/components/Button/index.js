  
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 4px solid ${({theme})=> theme.colors.textSecondary};
  width: 100%;
  height: 5rem;
  padding: 0;
  font-family: inherit;
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1.4rem;
  line-height: 1;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;


export default Button;