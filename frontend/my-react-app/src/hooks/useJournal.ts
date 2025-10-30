import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { journalService } from "../services/journalService";
import type { JournalEntry, JournalInput } from "../services/journalService";

export const useGetJournalEntries = () => {
  return useQuery<JournalEntry[]>({
    queryKey: ["journalEntries"],
    queryFn: journalService.getEntries,
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entry: JournalInput) => journalService.createEntry(entry),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journalEntries"] }),
  });
};

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      entry,
    }: {
      id: string;
      entry: Partial<JournalInput>;
    }) => journalService.updateEntry(id, entry),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journalEntries"] }),
  });
};

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => journalService.deleteEntry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journalEntries"] }),
  });
};
