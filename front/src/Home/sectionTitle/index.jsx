const { default: styled } = require("styled-components");

export const SectionTitle = styled.h1`
margin-top: 40px;
font-family: 'Open Sans', sans-serif;
color: #404152;  
font-size: 2em;
  font-weight: bold;
  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;