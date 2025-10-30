import api from "./api";

// Define the structure for preferences if applicable
export interface Preferences {
  tone?: string;
  style?: string;
  length?: number;
  [key: string]: any; // for flexibility
}

// Define the response type (adjust according to your backend)
export interface AIResponse {
  success: boolean;
  data?: string | string[] | Record<string, unknown>;
  error?: string;
}

export const aiService = {
  // Generate AI content
  generateContent: async (prompt: string, preferences?: Preferences): Promise<AIResponse> => {
    const response = await api.post<AIResponse>("/ai/generate", { prompt, preferences });
    return response.data;
  },

  // Improve existing content
  improveContent: async (content: string): Promise<AIResponse> => {
    const response = await api.post<AIResponse>("/ai/improve", { content });
    return response.data;
  },

  // Generate hashtags for given content
  generateHashtags: async (content: string): Promise<AIResponse> => {
    const response = await api.post<AIResponse>("/ai/hashtags", { content });
    return response.data;
  },
};
