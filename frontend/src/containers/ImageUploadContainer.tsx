import React, { PureComponent } from 'react';

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

interface Props {
  onUploadedCallback?: () => void;
}

interface State {
  loading: boolean;
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
          this.setState({ loading: false });
          message.info(`${info.file.name} uploaded.`);
          this.props.onUploadedCallback?.();
        });
        reader.readAsDataURL(image);
        break;
      case 'error':
        message.error(`${info.file.name} file upload failed.`);
        this.setState({ loading: false });
        break;
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        Image upload:
        <Upload
          accept="image/*"
          action="http://127.0.0.1:5000/api/images"
          showUploadList={false}
          onChange={this.handleChange}
        >
          <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />} disabled={loading}>
            Click to Upload
          </Button>
        </Upload>
      </Space>
    );
  }
}

export default ImageUploadComponent;
