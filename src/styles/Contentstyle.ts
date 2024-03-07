import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black};
`;

export const Wrap = styled.div`
  width: 90%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.white};
`;
