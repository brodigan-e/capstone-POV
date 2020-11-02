import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

import { API_SERVER } from '../data/ApiConstants';
import Image from '../models/Image';

const BorderedImage = styled.img`
  height: 100%;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.15em;
  padding: 0.15em;
`;

const CenteredCaption = styled.figcaption`
  text-align: center;
`;

interface Props {
  image: Image;
}

const ImageComponent: FunctionComponent<Props> = ({ image }) => {
  return (
    <figure>
      <BorderedImage src={API_SERVER + image.href} alt={image.title} />
      <CenteredCaption>{image.title}</CenteredCaption>
    </figure>
  );
};

export default ImageComponent;
