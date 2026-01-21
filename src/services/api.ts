import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  TokenRequest,
  TokenResponse,
  UserCountsResponse,
  AiAnalysisResponse,
  AiDetailedAnalysisResponse
} from '../types/api';

const API_BASE_URL = 'https://telbot.yaoyao.party/api';

// 通用请求函数
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // 尝试解析错误响应
      try {
        const errorData = await response.json();
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        // @ts-ignore
        error.response = {
          status: response.status,
          data: errorData
        };
        throw error;
      } catch (parseError) {
        // 如果无法解析错误响应，抛出基本错误
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// 用户注册
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return request<RegisterResponse>(`${API_BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 用户登录
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 获取Token
export async function getToken(data: TokenRequest): Promise<TokenResponse> {
  return request<TokenResponse>(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 获取用户次数
export async function getUserCounts(token: string): Promise<UserCountsResponse> {
  return request<UserCountsResponse>(`${API_BASE_URL}/user/counts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// AI分析
export async function getAiAnalysis(token: string, crypto_type: string): Promise<AiAnalysisResponse> {
  return request<AiAnalysisResponse>(`${API_BASE_URL}/ai/analysis?crypto_type=${crypto_type}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// AI详细分析
export async function getAiDetailedAnalysis(token: string, crypto_type: string): Promise<AiDetailedAnalysisResponse> {
  return request<AiDetailedAnalysisResponse>(`${API_BASE_URL}/ai/detailed-analysis?crypto_type=${crypto_type}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
