import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;
  margin-bottom: 1.5rem;
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};