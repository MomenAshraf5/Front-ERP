import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAttendanceClockOut } from "@/services/apiAttendance";
import { toast } from "sonner";

export function useClockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAttendanceClockOut,
    onSuccess: (data) => {
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });

      // Show success toast
      let durationStr = "0h 0m";
      if (data.sessionDuration) {
        durationStr = `${data.sessionDuration.hours}h ${data.sessionDuration.minutes}m`;
      } else if (data.duration) {
        durationStr = `${Math.floor(data.duration / 60)}h ${
          data.duration % 60
        }m`;
      }

      const message = `Shift complete! 🌟 Outstanding work today. You completed ${durationStr}. Enjoy your well-deserved break! ✨`;
      toast.success(message, { duration: 6000 });
    },
    onError: (error) => {
      // Show error toast
      const message =
        error.message ||
        "Unable to end shift. Please try again or contact support.";
      toast.error(message);
    },
  });
}
