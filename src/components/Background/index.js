import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-width: 300px;
  min-height: 400px;
  background-color: ${({ theme })=> theme.colors.background};
`

export default Background;