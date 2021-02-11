  
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 4px solid ${({theme})=> theme.colors.textSecondary};
  width: 100%;
  padding: 2rem;
  font-family: inherit;
  font-size: 2.25rem;
  margin: 2rem 0;
  line-height: 1;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;


export default Button;