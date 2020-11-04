import React, { FunctionComponent } from 'react';

import { Card } from 'antd';

import { API_SERVER } from '../data/ApiConstants';
import ImageModel from '../models/Image';

const { Meta } = Card;

interface Props {
  image: ImageModel;
}

const ImageComponent: FunctionComponent<Props> = ({ image }) => {
  return (
    <Card
      cover={
        <div
          style={{
            height: '30vh',
            overflow: 'hidden',
            backgroundImage: `url(${API_SERVER}${image.href})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      }
      bordered={false}
      hoverable={true}
    >
      <Meta title={image.title} />
    </Card>
  );
};

export default ImageComponent;
