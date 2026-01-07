const API_URL = "https://ull--ystem-momenashraf57236-zny68dnq.leapcell.dev/api/v1/attendance";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtanpyemxqODAwMDdua2h6Njh5dHhoYWYiLCJlbWFpbCI6ImFnZW50QGFtZW5kYnMuY29tIiwicm9sZSI6IkFHRU5UIiwiaWF0IjoxNzY3NTMzOTY0LCJleHAiOjE3NjgxMzg3NjR9.SACsWQoh96nXeEjTGRY2PePFtQZIp7N6AGMHIDuoMvs";

export async function getAttendanceToday() {
  const res = await fetch(`${API_URL}/today`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw Error("Failed getting Attendance totay");

  const data = await res.json();
  return data;
}

export async function postAtendanceClockin() {
  const res = await fetch(`${API_URL}/clock-in`, {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed To Start shift");
  }

  const data = await res.json();
  return data;
}

export async function postAttendanceClockOut() {
  const res = await fetch(`${API_URL}/clock-out`, {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = res.json();
    throw new Error(err.message || "Failed To Finish Shift");
  }

  const data = await res.json();
  return data;
}

export async function postAttendanceBreakStart() {
  const res = await fetch(`${API_URL}/break/start`, {
    method: "Post",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = res.json();
    throw new Error(err.message || "Failed to start a break");
  }

  const data = res.json();
  return data;
}

export async function postAttendanceBreakEnd() {
  const res = await fetch(`${API_URL}/break/end`, {
    method: "Post",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = res.json();
    throw new Error(err.message || "Failed to end a break");
  }

  const data = res.json();
  return data;
}

export async function getAttendanceHistory(params) {
  const queryString = params ? `?${params.toString()}` : "";
  const res = await fetch(`${API_URL}/history${queryString}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw Error("Failed getting Attendance history");

  const data = await res.json();
  return data;
}

export async function getAllAttendance() {
  const res = await fetch(`${API_URL}/all`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw Error("Failed getting all attendance ");

  const data = await res.json();
  return data;
}

export async function putAttendanceByHr(attendanceId, upadateAgent) {
  const res = fetch(`${API_URL}/${attendanceId}`, {
    method: "PUT",
    body: JSON.stringify(upadateAgent),
    headers: {
      // Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update Attendence Agent");
  }

  const data = await res.json();
  return data;
}
