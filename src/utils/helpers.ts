// 本地存储工具函数
export const storage = {
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// 错误处理函数
export const handleError = (error: any): string => {
  if (error.response) {
    // 服务器返回错误状态码
    return error.response.data?.message || `服务器错误: ${error.response.status}`;
  } else if (error.request) {
    // 请求已发送但没有收到响应
    return '网络错误，请检查您的网络连接';
  } else if (error.message) {
    // 请求配置出错
    return error.message;
  } else {
    // 其他错误
    return '未知错误';
  }
};

// 验证函数
export const validate = {
  username: (username: string): boolean => {
    return username.length >= 3 && username.length <= 20;
  },
  password: (password: string): boolean => {
    return password.length >= 6;
  },
  botUserId: (botUserId: number): boolean => {
    return botUserId > 0;
  },
};
