// 用户注册请求
export interface RegisterRequest {
  bot_user_id: number;
  username: string;
  password: string;
}

// 用户注册响应
export interface RegisterResponse {
  code: number;
  message: string;
  status: string;
  data: {
    user_id: number;
    username: string;
    bot_user_id: number;
    ai_analysis_count: number;
    ai_detailed_analysis_count: number;
  };
}

// 用户登录请求
export interface LoginRequest {
  username: string;
  password: string;
}

// 用户登录响应
export interface LoginResponse {
  code: number;
  message: string;
  status: string;
  data: {
    user_id: number;
    username: string;
    token: string;
  };
}

// 获取Token请求
export interface TokenRequest {
  username: string;
  password: string;
}

// 获取Token响应
export interface TokenResponse {
  code: number;
  message: string;
  status: string;
  data: {
    token: string;
  };
}

// 获取用户次数响应
export interface UserCountsResponse {
  code: number;
  message: string;
  status: string;
  data: {
    ai_analysis_count: number;
    ai_detailed_analysis_count: number;
  };
}

// AI分析响应
export interface AiAnalysisResponse {
  code: number;
  message: string;
  status: string;
  data: {
    analysis: {
      crypto_type: string;
      analysis: string;
    };
  };
}

// AI详细分析响应
export interface AiDetailedAnalysisResponse {
  code: number;
  message: string;
  status: string;
  data: {
    analysis: {
      crypto_type: string;
      detailed_analysis: string;
    };
  };
}
