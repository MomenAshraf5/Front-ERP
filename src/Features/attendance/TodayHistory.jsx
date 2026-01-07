import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTodayActivities } from "@/hooks/attendance/useTodayActivities";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import formatDuration from "@/utils/formatTimes";

function TodayHistory() {
  const { data, isLoading, isError } = useTodayActivities();

  // Format status for display
  const formatStatus = (status) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Status colors matching StartShift.jsx
  const BADGE_COLORS = {
    AVAILABLE: "border-chart-3/70 ",
    ON_CALL: "border-primary/70",
    SHORT_BREAK: "border-chart-4/70",
    LUNCH_BREAK: "border-chart-2/70",
    COACHING: "border-chart-5/70",
    MEETING: "border-accent/70",
    TRAINING: "border-chart-3/70",
    TECHNICAL_ISSUE: "border-destructive/70",
    CLOCKED_OUT: "border-border/70",
    CLOCKED_IN: "border-chart-3/70",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Timeline</CardTitle>
        <Table>
          <TableCaption>A list of your recent work hours.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>IN</TableHead>
              <TableHead>Out</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                {[...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-destructive">
                  Failed to load activity timeline
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && data?.data?.activities?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No activities recorded today
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              data?.data?.activities?.map((activity) => (
                <TableRow key={activity.id || activity.startTime}>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        BADGE_COLORS[activity.status] ||
                        "bg-muted text-muted-foreground"
                      }
                    >
                      {formatStatus(activity.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {activity.startTime
                      ? format(new Date(activity.startTime), "hh:mm a")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {activity.endTime
                      ? format(new Date(activity.endTime), "hh:mm a")
                      : "Ongoing"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDuration(activity.duration)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardHeader>
    </Card>
  );
}

export default TodayHistory;
