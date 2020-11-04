import React, { FunctionComponent, useState } from 'react';

import { Card, Image } from 'antd';
import styled from 'styled-components';

import { API_SERVER } from '../data/ApiConstants';
import ImageModel from '../models/Image';

const { Meta } = Card;

const ImageCoverContainer = styled.div`
  overflow: hidden;

  img {
    height: 30vh;
    object-fit: cover;
  }
`;

interface Props {
  image: ImageModel;
}

const ImageComponent: FunctionComponent<Props> = ({ image }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <Card
      cover={
        <ImageCoverContainer>
          <Image
            src={`${API_SERVER}${image.href}`}
            preview={{
              visible: previewVisible,
              onVisibleChange: (visible) => setPreviewVisible(visible),
            }}
          ></Image>
        </ImageCoverContainer>
      }
      bordered={false}
      hoverable={true}
      onClick={() => setPreviewVisible(true)}
    >
      <Meta title={image.title} />
    </Card>
  );
};

export default ImageComponent;
