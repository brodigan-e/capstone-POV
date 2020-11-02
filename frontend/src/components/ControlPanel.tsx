import React, { FunctionComponent } from 'react';

import { Button } from 'antd';

interface Props {
  handleButtonClick: () => void;
}

const ControlPanel: FunctionComponent<Props> = ({ handleButtonClick }) => (
  <div>
    <Button onClick={handleButtonClick}>Click me</Button>
  </div>
);

export default ControlPanel;
