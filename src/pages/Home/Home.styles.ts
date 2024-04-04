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

export const TodoCompleteBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const CompleteCheckBox = styled.div<{ completed?: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  position: relative;
`;

export const CheckContainer = styled.div`
  width: 22px;
  height: 22px;
  position: absolute;
  margin-right: -4px;
  margin-top: -6px;
  /* border: 1px solid; */
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
