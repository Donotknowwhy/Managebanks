import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export const openNotification = (placement) => {
    notification.success({
      message: `Bạn đã xóa bài viết thành công`,
      placement,
    });
  };
  