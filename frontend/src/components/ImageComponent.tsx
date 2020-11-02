import React, { FunctionComponent } from 'react';

import { Card } from 'antd';

import { API_SERVER } from '../data/ApiConstants';
import Image from '../models/Image';

const { Meta } = Card;

interface Props {
  image: Image;
}

const ImageComponent: FunctionComponent<Props> = ({ image }) => {
  return (
    <Card cover={<img src={API_SERVER + image.href} alt={image.title} />}>
      <Meta title={image.title} />
    </Card>
  );
};

export default ImageComponent;
