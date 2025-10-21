// lib/missions-api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  requirementType: string;
  currentProgress: number;
  targetProgress: number;
  progressPercentage: number;
  status: 'in_progress' | 'completed' | 'claimed';
  language: {
    id: number;
    name: string;
    code: string;
  } | null;
  rewards: {
    xp: number;
    coins: number;
    gems: number;
  };
  periodStart: string;
  periodEnd: string;
  completedAt: string | null;
  claimedAt: string | null;
}

export interface MissionStatistics {
  activeMissions: number;
  completedToday: number;
  rewardsClaimed: number;
  totalRewards: {
    xp: number;
    coins: number;
    gems: number;
  };
}

export interface ClaimMissionResponse {
  success: boolean;
  message: string;
  rewards: {
    xp: number;
    coins: number;
    gems: number;
  };
  userStats: {
    coins: number;
    gems: number;
    leveledUp: boolean;
    newLevel?: number;
  };
}

class MissionsAPI {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = this.getAuthToken();
    
    const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
    };

    if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    }


    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getMissions(type?: 'daily' | 'weekly'): Promise<Mission[]> {
    const queryParam = type ? `?type=${type}` : '';
    return this.fetchWithAuth(`/missions${queryParam}`);
  }

  async getDailyMissions(): Promise<Mission[]> {
    return this.fetchWithAuth('/missions/daily');
  }

  async getWeeklyMissions(): Promise<Mission[]> {
    return this.fetchWithAuth('/missions/weekly');
  }

  async getMissionStatistics(): Promise<MissionStatistics> {
    return this.fetchWithAuth('/missions/statistics');
  }

  async claimMission(missionId: number): Promise<ClaimMissionResponse> {
    return this.fetchWithAuth(`/missions/${missionId}/claim`, {
      method: 'POST',
    });
  }
}

export const missionsAPI = new MissionsAPI();