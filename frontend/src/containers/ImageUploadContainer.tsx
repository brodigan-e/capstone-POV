import React, { PureComponent } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import styled from 'styled-components';

const UploadContainer = styled.div`
  .ant-upload {
    width: 200px;
    height: 200px;
  }
`;

interface Props {}

interface State {
  loading: boolean;
  imageUrl?: string;
}

class ImageUploadComponent extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(info: UploadChangeParam) {
    switch (info.file.status) {
      case 'uploading':
        if (!this.state.loading) {
          this.setState({ loading: true });
        }
        break;
      case 'done':
        const image = info.file.originFileObj;
        if (!image) {
          return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.setState({ loading: false, imageUrl: reader.result as string });
        });
        reader.readAsDataURL(image);
        break;
    }
  }

  renderUploadButton() {
    const { loading, imageUrl } = this.state;

    if (imageUrl) {
      return (
        <img src={imageUrl} alt="Uploaded image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      );
    }

    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  }

  render() {
    return (
      <UploadContainer>
        <Upload
          accept="image/*"
          action="http://127.0.0.1:5000/api/images"
          listType="picture-card"
          showUploadList={false}
          onChange={this.handleChange}
        >
          {this.renderUploadButton()}
        </Upload>
      </UploadContainer>
    );
  }
}

export default ImageUploadComponent;
