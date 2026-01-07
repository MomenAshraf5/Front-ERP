import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStatusActivity } from "@/services/apiActivity";
import { toast } from "sonner";

export function useChangeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status) => postStatusActivity(status),
    onSuccess: (data, variables) => {
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });

      // Show success toast
      const formattedStatus = variables.status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const message = `Status changed to ${formattedStatus}`;
      toast.info(message);
    },
    onError: (error) => {
      // Show error toast
      const message =
        error.message || "Unable to change status. Please try again.";
      toast.error(message);
    },
  });
}
