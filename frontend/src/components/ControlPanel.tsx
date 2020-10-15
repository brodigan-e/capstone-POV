import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid gray;
  border-radius: 0;
  padding: 5px 10px;
`;

interface Props {
  handleButtonClick: () => void;
}

const ControlPanel: FunctionComponent<Props> = ({ handleButtonClick }) => (
  <div>
    <StyledButton onClick={handleButtonClick}>Click me</StyledButton>
  </div>
);

export default ControlPanel;
