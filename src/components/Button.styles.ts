import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'grey',
  secondary: 'purple',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: 0;
  background-color: ${(props) => props.theme['purple-500']};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  margin: 18px;
  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `
  }} */
`
