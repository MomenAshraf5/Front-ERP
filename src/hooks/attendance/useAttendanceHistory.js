import { useQuery } from "@tanstack/react-query";
import { getAttendanceHistory } from "@/services/apiAttendance";
import { startOfMonth, endOfMonth } from "date-fns";

export function useAttendanceHistory(page = 1, limit = 30, dateRange = null) {
  // Default to current month if no date range provided
  const defaultStartDate = dateRange?.startDate || startOfMonth(new Date());
  const defaultEndDate = dateRange?.endDate || endOfMonth(new Date());

  return useQuery({
    queryKey: [
      "attendance",
      "history",
      { page, limit, startDate: defaultStartDate, endDate: defaultEndDate },
    ],
    queryFn: () => {
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add date range if provided
      if (defaultStartDate) {
        params.append("startDate", defaultStartDate.toISOString());
      }
      if (defaultEndDate) {
        params.append("endDate", defaultEndDate.toISOString());
      }

      // Call the API function with query params
      return getAttendanceHistory(params);
    },
    keepPreviousData: true, // Keep previous data while fetching new page
  });
}
