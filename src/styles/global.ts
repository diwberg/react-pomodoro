import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0%;
    padding: 0;
    box-sizing: border-box;
}

:focus{
    outline: 0;
    box-shadow: 0 0 02px ${(props) => props.theme['purple-500']};

}

body {
    background: ${(props) => props.theme['grey-800']};
    color: ${(props) => props.theme['grey-300']};
}

body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}




`
