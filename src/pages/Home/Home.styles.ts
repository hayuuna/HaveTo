import styled from 'styled-components';

export const DateBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  padding: 20px 0 40px;
`;

export const CurrentDate = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const TodoForm = styled.form`
  width: 100%;
  height: 30px;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    padding-right: 18px;
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  button {
    width: ${({ theme }) => theme.fontSizes.xl};
    height: ${({ theme }) => theme.fontSizes.xl};
    position: absolute;
    right: 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    align-items: center;
    margin-top: 5px;
  }
`;
