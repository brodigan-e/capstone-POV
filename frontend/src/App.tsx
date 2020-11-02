import React, { FunctionComponent } from 'react';

import ImageContainer from './containers/ImageContainer';
import ImageUploadContainer from './containers/ImageUploadContainer';

import 'antd/dist/antd.css';

const App: FunctionComponent = () => (
  <>
    <ImageContainer />
    <ImageUploadContainer />
  </>
);

export default App;
