import React, { PureComponent } from 'react';

import ControlPanel from '../components/ControlPanel';

interface Props {}

interface State {
  clickCount: number;
}

class ControlPanelContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { clickCount: 0 };

    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  buttonClickHandler() {
    this.setState({ clickCount: this.state.clickCount + 1 });
  }

  render() {
    return (
      <>
        <div>Click count {this.state.clickCount}</div>
        <ControlPanel handleButtonClick={this.buttonClickHandler} />
      </>
    );
  }
}

export default ControlPanelContainer;
