import api from "./api";

// Define the shape of a draft
export interface Draft {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // allow flexibility for extra fields
}

// Define API response type
export interface DraftResponse {
  success: boolean;
  data?: Draft | Draft[];
  message?: string;
}

export const draftService = {
  // Fetch all drafts
  getDrafts: async (): Promise<Draft[]> => {
    const response = await api.get<DraftResponse>("/drafts");
    return (response.data.data as Draft[]) || [];
  },

  // Save a new draft
  saveDraft: async (draftData: Omit<Draft, "id" | "createdAt" | "updatedAt">): Promise<Draft> => {
    const response = await api.post<DraftResponse>("/drafts", draftData);
    return response.data.data as Draft;
  },

  // Update an existing draft
  updateDraft: async (id: string, draftData: Partial<Draft>): Promise<Draft> => {
    const response = await api.put<DraftResponse>(`/drafts/${id}`, draftData);
    return response.data.data as Draft;
  },

  // Delete a draft
  deleteDraft: async (id: string): Promise<void> => {
    await api.delete(`/drafts/${id}`);
  },
};
