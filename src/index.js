import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Nanum+Pen+Script&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
font-family: 'Nanum Pen Script', cursive;
width:100%;
height:100%;
min-width:280px;
background: rgb(48, 207, 208);
background: linear-gradient(
0deg,
rgba(48, 207, 208, 0.913624824929972) 0%,
rgba(51, 8, 103, 1) 100%
);
-webkit-font-family: 'Nanum Pen Script', cursive;
}
input,textarea{
font-size:20px;
font-family: 'Nanum Pen Script', cursive;
}
input::placeholder{
font-family: 'Nanum Pen Script', cursive;
font-size:20px;
}
textarea::placeholder{
font-family: 'Nanum Pen Script', cursive;
}
button{
font-family: 'Nanum Pen Script', cursive;
font-size:20px;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
