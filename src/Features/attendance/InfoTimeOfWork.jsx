import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  UserRoundCheck,
  PhoneCall,
  AlertTriangle,
  UsersRound,
  GraduationCap,
  Utensils,
  Coffee,
  CircleCheck,
  Clock,
} from "lucide-react";
import { useActivitySummary } from "@/hooks/attendance/useActivitySummary";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import formatDuration from "@/utils/formatTimes";

function InfoTimeOfWork() {
  const { data, isLoading, isError } = useActivitySummary();

  // Define card configurations
  const cardConfigs = useMemo(
    () => [
      {
        title: "Total Work",
        key: "totalWork",
        statusKey: null, // Not a status, just a summary
        icon: Clock,
        hoverColor: "hover:border-chart-1",
        activeColor: "border-chart-1",
        iconColor: "text-chart-1",
      },
      {
        title: "Available",
        key: "available",
        statusKey: "AVAILABLE",
        icon: CircleCheck,
        hoverColor: "hover:border-chart-3",
        activeColor: "border-chart-3",
        iconColor: "text-chart-3",
      },
      {
        title: "On Call",
        key: "onCall",
        statusKey: "ON_CALL",
        icon: PhoneCall,
        hoverColor: "hover:border-primary",
        activeColor: "border-primary",
        iconColor: "text-primary",
      },
      {
        title: "Short Break",
        key: "shortBreak",
        statusKey: "SHORT_BREAK",
        icon: Coffee,
        hoverColor: "hover:border-chart-4",
        activeColor: "border-chart-4",
        iconColor: "text-chart-4",
      },
      {
        title: "Lunch Break",
        key: "lunchBreak",
        statusKey: "LUNCH_BREAK",
        icon: Utensils,
        hoverColor: "hover:border-chart-2",
        activeColor: "border-chart-2",
        iconColor: "text-chart-2",
      },
      {
        title: "Coaching",
        key: "coaching",
        statusKey: "COACHING",
        icon: UserRoundCheck,
        hoverColor: "hover:border-chart-5",
        activeColor: "border-chart-5",
        iconColor: "text-chart-5",
      },
      {
        title: "Meeting",
        key: "meeting",
        statusKey: "MEETING",
        icon: UsersRound,
        hoverColor: "hover:border-accent",
        activeColor: "border-accent",
        iconColor: "text-accent",
      },
      {
        title: "Training",
        key: "training",
        statusKey: "TRAINING",
        icon: GraduationCap,
        hoverColor: "hover:border-chart-3",
        activeColor: "border-chart-3",
        iconColor: "text-chart-3",
      },
      {
        title: "Technical Issue",
        key: "technicalIssue",
        statusKey: "TECHNICAL_ISSUE",
        icon: AlertTriangle,
        hoverColor: "hover:border-destructive",
        activeColor: "border-destructive",
        iconColor: "text-destructive",
      },
    ],
    []
  );

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {cardConfigs.map((_, index) => (
          <Card key={index} className="@container/card">
            <CardContent className="grid grid-cols-2 items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 justify-self-end" />
              <Skeleton className="h-4 w-16 pt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">
              Failed to load activity data. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const times = data?.activityTimes || {};
  const currentStatus = data?.data?.currentStatus;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardConfigs.map(
        ({
          title,
          key,
          statusKey,
          icon: Icon,
          hoverColor,
          activeColor,
          iconColor,
        }) => {
          const isActive = statusKey && currentStatus === statusKey;

          return (
            <Card
              key={key}
              className={`@container/card ${hoverColor} ${
                isActive ? activeColor : ""
              }`}
            >
              <CardContent className="grid grid-cols-2 items-center">
                <CardTitle>{title}</CardTitle>
                <Icon
                  className={`row-span-2 justify-self-end size-8 ${iconColor}`}
                />
                <CardDescription className="pt-2">
                  {formatDuration(times[key])}
                </CardDescription>
              </CardContent>
            </Card>
          );
        }
      )}
    </div>
  );
}

export default InfoTimeOfWork;
