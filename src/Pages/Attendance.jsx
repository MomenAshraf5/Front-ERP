import History from "../Features/attendance/History";
import InfoTimeOfWork from "../Features/attendance/InfoTimeOfWork";
import StartShift from "../Features/attendance/StartShift";
import TodayHistory from "../Features/attendance/TodayHistory";

function Attendance() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 pb-4 md:gap-6 md:pb-6">
            <InfoTimeOfWork />
          </div>
          <div className="px-4 lg:px-6 pb-4 md:pb-6">
            <StartShift />
          </div>
          <div className="px-4 lg:px-6 pb-4 md:pb-6">
            <TodayHistory />
          </div>
          <div className="px-4 lg:px-6 pb-4 md:pb-6">
            <History />
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
