import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 700px;
  min-width: 300px;
  height: 100vh;
  min-height: 400px;
  align-items: center;
  justify-content: space-between;
  img{
    width: 70%;
  }
  a{
    width: 80%;
  }
`

export default Container;