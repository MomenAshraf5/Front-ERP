import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut } from "lucide-react";
import { useAttendanceToday } from "@/hooks/attendance/useAttendanceToday";
import { useClockIn } from "@/hooks/attendance/useClockIn";
import { useClockOut } from "@/hooks/attendance/useClockOut";
import { useChangeStatus } from "@/hooks/attendance/useChangeStatus";
import { useActivitySummary } from "@/hooks/attendance/useActivitySummary";

function StartShift() {
  const status = useMemo(
    () => [
      "Available",
      "On Call",
      "Short Break",
      "Lunch Break",
      "Coaching",
      "Meeting",
      "Training",
      "Technical Issue",
    ],
    []
  );

  const STATUS_MAP = useMemo(
    () => ({
      Available: "AVAILABLE",
      "On Call": "ON_CALL",
      "Short Break": "SHORT_BREAK",
      "Lunch Break": "LUNCH_BREAK",
      Coaching: "COACHING",
      Meeting: "MEETING",
      Training: "TRAINING",
      "Technical Issue": "TECHNICAL_ISSUE",
    }),
    []
  );

  // Status colors - only applied when active (data-[state=on])
  const STATUS_COLORS = useMemo(
    () => ({
      AVAILABLE:
        "data-[state=on]:bg-chart-3 data-[state=on]:text-white data-[state=on]:border-chart-3",
      ON_CALL:
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
      SHORT_BREAK:
        "data-[state=on]:bg-chart-4 data-[state=on]:text-white data-[state=on]:border-chart-4",
      LUNCH_BREAK:
        "data-[state=on]:bg-chart-2 data-[state=on]:text-white data-[state=on]:border-chart-2",
      COACHING:
        "data-[state=on]:bg-chart-5 data-[state=on]:text-white data-[state=on]:border-chart-5",
      MEETING:
        "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-accent",
      TRAINING:
        "data-[state=on]:bg-chart-3 data-[state=on]:text-white data-[state=on]:border-chart-3",
      TECHNICAL_ISSUE:
        "data-[state=on]:bg-destructive data-[state=on]:text-white data-[state=on]:border-destructive",
    }),
    []
  );

  const BADGE_COLORS = useMemo(
    () => ({
      AVAILABLE: "border-chart-3 text-chart-3 bg-chart-3/10",
      ON_CALL: "border-primary text-primary bg-primary/10",
      SHORT_BREAK: "border-chart-4 text-chart-4 bg-chart-4/10",
      LUNCH_BREAK: "border-chart-2 text-chart-2 bg-chart-2/10",
      COACHING: "border-chart-5 text-chart-5 bg-chart-5/10",
      MEETING: "border-accent text-accent-foreground bg-accent/10",
      TRAINING: "border-chart-3 text-chart-3 bg-chart-3/10",
      TECHNICAL_ISSUE: "border-destructive text-destructive bg-destructive/10",
      CLOCKED_OUT: "bg-muted text-muted-foreground border-border",
      CLOCKED_IN: "border-chart-3 text-chart-3 bg-chart-3/10",
    }),
    []
  );

  // Reverse map for display
  const STATUS_DISPLAY_MAP = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(STATUS_MAP).map(([key, value]) => [value, key])
      ),
      CLOCKED_IN: "Active",
    }),
    [STATUS_MAP]
  );

  const [time, setTime] = useState(format(new Date(), "hh:mm:ss"));
  const today = new Date();

  // Fetch attendance and activity data
  const { data: attendanceData, isLoading: attendanceLoading } =
    useAttendanceToday();

  const { data: activityData } = useActivitySummary();

  // Mutations
  const clockInMutation = useClockIn();
  const clockOutMutation = useClockOut();
  const changeStatusMutation = useChangeStatus();

  // Determine if user is clocked in
  const isClockedIn =
    attendanceData?.data?.loginTime && !attendanceData?.data?.logoutTime;

  // Get current status from activity data
  const currentStatus = activityData?.data?.currentStatus || "CLOCKED_OUT";
  const currentStatusDisplay = STATUS_DISPLAY_MAP[currentStatus] || "Inactive";

  // console.log(currentStatus);

  // FIX: Derive active index directly from currentStatus instead of using useEffect
  // This removes the "Calling setState synchronously within an effect" warning
  const activeIndex = useMemo(() => {
    if (
      currentStatus &&
      currentStatus !== "CLOCKED_OUT" &&
      currentStatus !== "CLOCKED_IN"
    ) {
      return status.findIndex((s) => STATUS_MAP[s] === currentStatus);
    }
    return -1;
  }, [currentStatus, status, STATUS_MAP]);

  // Handle status toggle click
  const handleStatusChange = (index) => {
    if (!isClockedIn) return;

    const selectedStatus = status[index];
    const backendStatus = STATUS_MAP[selectedStatus];

    // If clicking the same status, do nothing
    if (backendStatus === currentStatus) return;

    changeStatusMutation.mutate({ status: backendStatus });
  };

  // Update time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(format(new Date(), "hh:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const currentBadgeColor =
    BADGE_COLORS[currentStatus] || BADGE_COLORS.CLOCKED_OUT;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{getGreeting("Moamen")}</CardTitle>
        <CardDescription>{format(today, "PPPP")}</CardDescription>
        <CardAction>
          <Badge variant="outline" className="w-20 md:w-30 md:text-xl">
            {time}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 justify-between items-center gap-4">
        {!isClockedIn ? (
          <Button
            variant="secondary"
            className="md:text-xl shadow-md"
            onClick={() => clockInMutation.mutate()}
            disabled={clockInMutation.isPending || attendanceLoading}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Start Shift
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="md:text-xl"
            onClick={() => clockOutMutation.mutate()}
            disabled={clockOutMutation.isPending}
          >
            End Shift
            <LogOut className="ml-2 h-5 w-5" />
          </Button>
        )}
        <CardAction className="self-auto">
          <Badge
            variant="outline"
            className={`w-auto px-3 md:w-auto md:text-xl ${currentBadgeColor}`}
          >
            {isClockedIn ? currentStatusDisplay : "Inactive"}
          </Badge>
        </CardAction>
      </CardContent>
      {isClockedIn && (
        <CardFooter>
          <div className="flex flex-wrap gap-2 w-full">
            {status.map((name, index) => {
              const statusKey = STATUS_MAP[name];
              const colorClass = STATUS_COLORS[statusKey];

              return (
                <Toggle
                  size="lg"
                  key={index}
                  pressed={activeIndex === index}
                  onPressedChange={() => handleStatusChange(index)}
                  disabled={changeStatusMutation.isPending}
                  className={`border border-border bg-transparent shadow-md hover:bg-muted-foreground/20 hover:text-accent-foreground transition-colors ${colorClass}`}
                >
                  {name}
                </Toggle>
              );
            })}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

//Function for apply greeting using system time
function getGreeting(name) {
  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour >= 5 && hour < 12) greeting = "Good morning";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17 && hour < 22) greeting = "Good evening";
  else greeting = "Good night";
  return name ? `${greeting}, ${name}` : `${greeting}`;
}

export default StartShift;
