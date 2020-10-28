import React, { PureComponent } from 'react';

import ImageComponent from '../components/ImageComponent';
import { IMAGE_API } from '../data/ApiConstants';
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
    fetch(IMAGE_API, { mode: 'cors' })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          images: result,
        });
      });
  }

  render() {
    return (
      <>
        {this.state.images.map((image) => (
          <ImageComponent key={image.href} image={image} />
        ))}
      </>
    );
  }
}

export default ImageContainer;
