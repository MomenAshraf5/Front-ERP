const API_URL = "https://ull--ystem-momenashraf57236-zny68dnq.leapcell.dev/api/v1/activity";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtanpyemxqODAwMDdua2h6Njh5dHhoYWYiLCJlbWFpbCI6ImFnZW50QGFtZW5kYnMuY29tIiwicm9sZSI6IkFHRU5UIiwiaWF0IjoxNzY3NTMzOTY0LCJleHAiOjE3NjgxMzg3NjR9.SACsWQoh96nXeEjTGRY2PePFtQZIp7N6AGMHIDuoMvs";

// For Attendance page, StartShift file
export async function postStatusActivity(status) {
  const res = await fetch(`${API_URL}/status`, {
    method: "POST",
    body: JSON.stringify(status),
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed To get status");
  }

  const data = await res.json();

  return data;
}

// For Attendance page, InfoTimeOfWork file
export async function getTodayActivity() {
  const res = await fetch(`${API_URL}/today`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed To get activity");
  }
  const data = await res.json();

  return data;
}

// For DashBoard page
export async function getCurrentStatus() {
  const res = await fetch(`${API_URL}/current`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed To get current status");
  }
  const data = await res.json();
  return data;
}

// For Supervisor
export async function getTeamStatus() {
  const res = await fetch(`${API_URL}/team`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed To get team status");
  }
  const data = await res.json();
  return data;
}
