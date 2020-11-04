import React, { PureComponent } from 'react';

import { Layout } from 'antd';
import styled from 'styled-components';

import ImageContainer from './containers/ImageContainer';
import ImageUploadContainer from './containers/ImageUploadContainer';

import 'antd/dist/antd.css';

const { Header, Content, Sider } = Layout;

const Logo = styled.div`
  float: left;
  margin: 0 16px;
`;

interface Props {}

class App extends PureComponent<Props> {
  private imageContainer: ImageContainer | null = null;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ color: 'white' }}>
          <Logo>POV Display Control Panel</Logo>
        </Header>
        <Layout>
          <Sider style={{ color: 'white' }}>
            <ImageUploadContainer onUploadedCallback={() => this.imageContainer?.fetchImages()} />
          </Sider>
          <Content style={{ padding: '32px 50px 0' }}>
            <ImageContainer ref={(instance) => (this.imageContainer = instance)} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
