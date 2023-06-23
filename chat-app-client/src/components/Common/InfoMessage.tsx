import React from "react";
import styled from 'styled-components'

const Error = styled.div`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  text-align: center;
  text-decoration: none;
  margin-bottom:20px;
`

interface Props {
  message: string | null;
}

const InfoMessage: React.FC<Props> = ({ message }) => {
  return (
    <>
      {message && <Error>{message}</Error>}
    </>
  );
};

export default InfoMessage;
