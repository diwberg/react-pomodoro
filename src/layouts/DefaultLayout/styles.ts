import styled from 'styled-components'
export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  box-shadow: 2px 2px 20px 2px ${(props) => props.theme['purple-500']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme['grey-600']};
`
