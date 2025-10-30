import api from "./api";

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JournalInput {
  title: string;
  content: string;
}

export const journalService = {
  getEntries: async (): Promise<JournalEntry[]> => {
    const response = await api.get("/journal");
    return response.data;
  },

  createEntry: async (entryData: JournalInput): Promise<JournalEntry> => {
    const response = await api.post("/journal", entryData);
    return response.data;
  },

  updateEntry: async (
    id: string,
    entryData: Partial<JournalInput>
  ): Promise<JournalEntry> => {
    const response = await api.put(`/journal/${id}`, entryData);
    return response.data;
  },

  deleteEntry: async (id: string): Promise<void> => {
    await api.delete(`/journal/${id}`);
  },
};
