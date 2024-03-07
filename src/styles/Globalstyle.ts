import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, button, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    body {
        width: 100%;
        height: 100%;
    }

    menu, ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    * {
        box-sizing: border-box; 
    }

    a {
        text-decoration: none
    }

    input {
        background: none;
        border: none;
    }

    input:focus {
        outline: none;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;
