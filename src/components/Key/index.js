import styled from 'styled-components';

const Key = styled.td`
    border: 0.25rem solid ${({theme})=>theme.colors.primary};
    border-collapse: collapse;
    color: ${({theme})=>theme.colors.textSecondary};
    cursor: pointer;
    font-size: 4rem;
    font-weight: 400;
    &:hover{
        background-color: ${({theme})=>theme.colors.primary};
        color: ${({theme})=>theme.colors.textPrimary}
    }
    input{
        width:4rem;
        height:4rem;
    }
`

export default Key;