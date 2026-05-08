const BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const loginWithCode = (code, password) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, password }),
  }).then(handleResponse);

export const getLocations = () =>
  fetch(`${BASE}/locations`, { headers: authHeaders() }).then(handleResponse);

export const getMyShifts = (from, to) =>
  fetch(`${BASE}/shifts/my?from=${from}&to=${to}`, { headers: authHeaders() }).then(handleResponse);

export const getShiftsByLocation = (locationId, from, to) =>
  fetch(`${BASE}/shifts/location/${locationId}?from=${from}&to=${to}`, { headers: authHeaders() }).then(handleResponse);

export const getTeamShifts = (locationId, from, to) =>
  fetch(`${BASE}/shifts/team/${locationId}?from=${from}&to=${to}`, { headers: authHeaders() }).then(handleResponse);

export const createShift = (data) =>
  fetch(`${BASE}/shifts`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(handleResponse);

export const updateShift = (id, data) =>
  fetch(`${BASE}/shifts/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(handleResponse);

export const deleteShift = (id) =>
  fetch(`${BASE}/shifts/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handleResponse);

export const getAllUsers = () =>
  fetch(`${BASE}/users`, { headers: authHeaders() }).then(handleResponse);

export const getAllEmployees = () =>
  fetch(`${BASE}/users/employees`, { headers: authHeaders() }).then(handleResponse);


export const createUser = (data) =>
  fetch(`${BASE}/users`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(handleResponse);

export const updateUser = (id, data) =>
  fetch(`${BASE}/users/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(handleResponse);

export const deleteUser = (id) =>
  fetch(`${BASE}/users/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handleResponse);

export const getStats = (locationId, from, to) =>
  fetch(`${BASE}/users/stats?locationId=${locationId}&from=${from}&to=${to}`, { headers: authHeaders() }).then(handleResponse);

export const createLeaveRequest = (data) =>
  fetch(`${BASE}/leave-requests`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(handleResponse);

export const getMyLeaveRequests = () =>
  fetch(`${BASE}/leave-requests/my`, { headers: authHeaders() }).then(handleResponse);

export const getLeaveRequestsForEmployee = (employeeId) =>
  fetch(`${BASE}/leave-requests/employee/${employeeId}`, { headers: authHeaders() }).then(handleResponse);

export const getAllLeaveRequests = () =>
  fetch(`${BASE}/leave-requests`, { headers: authHeaders() }).then(handleResponse);

export const approveLeaveRequest = (id) =>
  fetch(`${BASE}/leave-requests/${id}/approve`, { method: 'PUT', headers: authHeaders() }).then(handleResponse);

export const rejectLeaveRequest = (id, rejectionReason) =>
  fetch(`${BASE}/leave-requests/${id}/reject`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ rejectionReason }) }).then(handleResponse);

export const deleteLeaveRequest = (id) =>
  fetch(`${BASE}/leave-requests/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handleResponse);

export const getNotifications = () =>
  fetch(`${BASE}/notifications`, { headers: authHeaders() }).then(handleResponse);

export const getUnreadCount = () =>
  fetch(`${BASE}/notifications/unread-count`, { headers: authHeaders() }).then(handleResponse);

export const markNotificationsRead = () =>
  fetch(`${BASE}/notifications/mark-read`, { method: 'POST', headers: authHeaders() }).then(handleResponse);

export const getMonthlySummary = (year, month) =>
  fetch(`${BASE}/shifts/monthly-summary?year=${year}&month=${month}`, { headers: authHeaders() }).then(handleResponse);

export const getShiftsForEmployee = (employeeId, from, to) =>
  fetch(`${BASE}/shifts/employee/${employeeId}?from=${from}&to=${to}`, { headers: authHeaders() }).then(handleResponse);
