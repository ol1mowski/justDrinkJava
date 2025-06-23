import { httpClient } from './http-client.api';

export interface UpdateScoreRequest {
  userId: number;
  totalScore: number;
}

export interface UserRankingDto {
  userId: number;
  username: string;
  email: string;
  totalScore: number;
  ranking: number;
  updatedAt: string;
}

export interface BaseResponse {
  status: string;
  message: string;
  timestamp: string;
}

export const rankingApi = {
  updateUserScore: async (
    request: UpdateScoreRequest
  ): Promise<UserRankingDto> => {
    return await httpClient.put<UserRankingDto>('/rankings/score', request);
  },

  getUserRanking: async (userId: number): Promise<UserRankingDto | null> => {
    try {
      return await httpClient.get<UserRankingDto>(`/rankings/user/${userId}`);
    } catch (error: any) {
      if (error.name === 'ApiNotFoundError') {
        return null;
      }
      throw error;
    }
  },

  getAllRankings: async (): Promise<UserRankingDto[]> => {
    return await httpClient.get<UserRankingDto[]>('/rankings/all');
  },

  getTopRankings: async (limit: number = 10): Promise<UserRankingDto[]> => {
    return await httpClient.get<UserRankingDto[]>(
      `/rankings/top?limit=${limit}`
    );
  },

  recalculateRankings: async (): Promise<BaseResponse> => {
    return await httpClient.post<BaseResponse>('/rankings/recalculate');
  },
};
