import React, { PureComponent } from 'react';

import { Col, Row } from 'antd';

import ImageComponent from '../components/ImageComponent';
import { getImages } from '../data/ImagesClient';
import Image from '../models/Image';

interface Props {}

interface State {
  images: Array<Image>;
}

class ImageContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { images: [] };
  }

  componentDidMount() {
    getImages().then((result) => {
      this.setState({
        images: result,
      });
    });
  }

  render() {
    return (
      <>
        <Row gutter={[24, 24]}>
          {this.state.images.map((image) => (
            <Col key={image.href} span={8}>
              <ImageComponent image={image} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default ImageContainer;
