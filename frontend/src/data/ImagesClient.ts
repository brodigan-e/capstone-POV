import Image from '../models/Image';

import { IMAGE_API } from './ApiConstants';

function getImages(): Promise<Array<Image>> {
  return fetch(IMAGE_API).then((res) => res.json());
}

export { getImages };
