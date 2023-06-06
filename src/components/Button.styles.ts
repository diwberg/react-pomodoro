import styled from 'styled-components'

export const ButtonContainer = styled.button`
  width: 100px;
  height: 40px;
  border: 0;
  background-color: ${(props) => props.theme['purple-500']};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  margin: 18px;
`
