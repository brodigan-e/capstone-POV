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

const TilingFigure = styled.figure`
  height: 15%;
  width: 20%;
  display: inline-block;
  position: relative;
`;

const CenteredCaption = styled.figcaption`
  text-align: center;
`;

interface Props {
  image: Image;
}

const ImageComponent: FunctionComponent<Props> = ({ image }) => {
  return (
    <TilingFigure>
      <BorderedImage src={API_SERVER + image.href} alt={image.title} />
      <CenteredCaption>{image.title}</CenteredCaption>
    </TilingFigure>
  );
};

export default ImageComponent;
