import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAttendanceHistory } from "@/hooks/attendance/useAttendanceHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import formatDuration from "@/utils/formatTimes";

import { useEffect } from "react";

function History() {
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, isLoading, isError } = useAttendanceHistory(page, limit);

  // Get badge variant based on status
  const getStatusVariant = (status) => {
    const variants = {
      PRESENT: "default",
      LATE: "destructive",
      ABSENT: "outline",
    };
    return variants[status] || "secondary";
  };

  const pagination = data?.pagination || {};
  const records = data?.data || [];

  useEffect(() => {}, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>History of Month</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent attendance history.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IN</TableHead>
              <TableHead>Out</TableHead>
              <TableHead>Late</TableHead>
              <TableHead className="text-right">Total Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-destructive">
                  Failed to load attendance history
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && records.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No attendance records found
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {record.date
                      ? format(new Date(record.date), "EEE, MMM dd")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>
                      {record.status || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {record.loginTime
                      ? format(new Date(record.loginTime), "hh:mm a")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.logoutTime
                      ? format(new Date(record.logoutTime), "hh:mm a")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.lateMinutes ? `${record.lateMinutes} min` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDuration(record.totalWorkMinutes)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      {pagination.totalPages > 1 && (
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} (
            {pagination.total} records)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page >= pagination.totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default History;
