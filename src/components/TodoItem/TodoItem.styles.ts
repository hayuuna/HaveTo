import styled from 'styled-components';

export const Item = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;

  div:last-of-type {
    margin-left: auto;
    display: flex;
  }

  button {
    width: 22px;
    height: 22px;
  }
`;

export const EditInput = styled.input`
  width: 80%;
  color: ${(props) => props.theme.colors.white};
  border-bottom: ${(props) => `1px solid ${props.theme.colors.gray}`};
`;

export const Text = styled.p<{ done?: boolean }>`
  color: ${(props) => (props.done ? `${props.theme.colors.gray}` : `${props.theme.colors.white}`)};
  text-decoration: ${(props) => (props.done ? `line-through` : `none`)};
  font-size: 14px;
`;

export const Checkbox = styled.div<{ done?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => (props.done ? 'none' : `1px solid ${props.theme.colors.gray}`)};
  margin-right: 10px;
  display: flex;
  justify-content: center;

  background-color: ${(props) => (props.done ? `${props.theme.colors.yellow}` : 'none')};

  span {
    font-size: 18px;
    margin-top: 1px;
  }
`;
