import styled, { css } from 'styled-components';

// write CSS in some external variable
// const test = css`
//   text-align: center;
// `;

// we can use JS expression in a template literal as you know
const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    line-height: 1.4;
`;
export default Heading;
