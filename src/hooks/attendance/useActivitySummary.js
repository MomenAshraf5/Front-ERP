import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "@/services/apiActivity";

export function useActivitySummary() {
  return useQuery({
    queryKey: ["activity", "today"],
    queryFn: getTodayActivity,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 20000, // Consider data stale after 20 seconds
    select: (data) => {
      // Calculate individual activity times from activities array
      const activityTimes = {
        totalWork: data.data.summary?.totalWorkTime || 0,
        available: data.data.summary?.totalAvailableTime || 0,
        onCall: data.data.summary?.totalOnCallTime || 0,
        shortBreak: data.data.summary?.totalShortBreakTime || 0,
        lunchBreak: data.data.summary?.totalLunchBreakTime || 0,
        coaching: data.data.summary?.totalCoachingTime || 0,
        meeting: data.data.summary?.totalMeetingTime || 0,
        training: data.data.summary?.totalTrainingTime || 0,
        technicalIssue: data.data.summary?.totalTechnicalIssueTime || 0,
      };

      // Loop through activities and sum durations by status
      // if (data.activities && Array.isArray(data.activities)) {
      //   data.activities.forEach((activity) => {
      //     const durationInMinutes = Math.floor((activity.duration || 0) / 60);

      //     switch (activity.status) {
      //       case "SHORT_BREAK":
      //         activityTimes.shortBreak += durationInMinutes;
      //         break;
      //       case "LUNCH_BREAK":
      //         activityTimes.lunchBreak += durationInMinutes;
      //         break;
      //       case "COACHING":
      //         activityTimes.coaching += durationInMinutes;
      //         break;
      //       case "MEETING":
      //         activityTimes.meeting += durationInMinutes;
      //         break;
      //       case "TRAINING":
      //         activityTimes.training += durationInMinutes;
      //         break;
      //       case "TECHNICAL_ISSUE":
      //         activityTimes.technicalIssue += durationInMinutes;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      // }

      return {
        ...data,
        activityTimes,
      };
    },
  });
}
