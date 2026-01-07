import { useQuery } from "@tanstack/react-query";
import { getAttendanceToday } from "@/services/apiAttendance";

export function useAttendanceToday() {
  return useQuery({
    queryKey: ["attendance", "today"],
    queryFn: getAttendanceToday,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });
}
