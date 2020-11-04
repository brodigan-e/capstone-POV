import React, { PureComponent } from 'react';

import ImageContainer from './containers/ImageContainer';
import ImageUploadContainer from './containers/ImageUploadContainer';

import 'antd/dist/antd.css';

interface Props {}

class App extends PureComponent<Props> {
  private imageContainer: ImageContainer | null = null;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <ImageContainer
          ref={(instance) => {
            this.imageContainer = instance;
          }}
        />
        <ImageUploadContainer
          onUploadedCallback={() => {
            this.imageContainer?.fetchImages();
          }}
        />
      </>
    );
  }
}

export default App;
