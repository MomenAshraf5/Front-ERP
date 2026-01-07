import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAtendanceClockin } from "@/services/apiAttendance";
import { toast } from "sonner";

export function useClockIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAtendanceClockin,
    onSuccess: () => {
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });

      // Show success toast
      const message = "Welcome back! 🚀 Let's make today your best one yet!";
      toast.success(message);
    },
    onError: (error) => {
      // Show error toast
      const message =
        error.message ||
        "Unable to start shift. Please try again or contact support.";
      toast.error(message);
    },
  });
}
