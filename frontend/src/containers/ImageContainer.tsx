import React, { PureComponent } from 'react';

import { Col, Empty, Result, Row, Spin } from 'antd';

import ImageComponent from '../components/ImageComponent';
import { getImages } from '../data/ImagesClient';
import Image from '../models/Image';

interface Props {}

interface State {
  isFetching: boolean;
  fetchStatus: 'success' | 'error' | null;

  images: Array<Image>;
}

class ImageContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isFetching: false, fetchStatus: null, images: [] };

    this.fetchImages = this.fetchImages.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    this.setState({ isFetching: true });
    getImages()
      .then((result) => {
        this.setState({
          isFetching: false,
          fetchStatus: 'success',
          images: result,
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          fetchStatus: 'error',
        });
      });
  }

  renderImages() {
    const { fetchStatus, images } = this.state;

    if (fetchStatus === null) {
      return <div style={{ height: 150 }} />;
    } else if (fetchStatus === 'error') {
      return <Result status="error" title="Failed to fetch images" />;
    } else if (images.length === 0) {
      return <Empty description="No images uploaded" />;
    }

    return (
      <Row gutter={[24, 24]}>
        {images.map((image) => (
          <Col key={image.href} span={8}>
            <ImageComponent image={image} />
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isFetching} tip="Fetching images...">
        {this.renderImages()}
      </Spin>
    );
  }
}

export default ImageContainer;
