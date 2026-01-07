import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "@/services/apiActivity";

export function useTodayActivities() {
  return useQuery({
    queryKey: ["activity", "today"],
    queryFn: getTodayActivity,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 20000,
    select: (data) => {
      // Filter out CLOCKED_IN and CLOCKED_OUT marker activities
      const filteredActivities =
        data.activities?.filter(
          (activity) =>
            activity.status !== "CLOCKED_IN" &&
            activity.status !== "CLOCKED_OUT"
        ) || [];

      return {
        ...data,
        activities: filteredActivities,
      };
    },
  });
}
