export const ENDPOINTS = {
  auth: {
    login: `/auth/login`,
    refreshToken: `/auth/refresh`,
    me: `/auth/me`,
    logout: `/auth/logout`,
    changeEmail: `/auth/change-email`,
    verifyEmail: `/auth/verify-email`,
    requestPasswordReset: `/auth/reset-password-request`,
    resetPassword: `/auth/reset-password`,
  },
  students: {
    register: `/students/register`,
    profile: `/students/profile`,
    assignInstitute: `/students/assign-institute`,
  },
  upload: {
    image: `/upload/image`,
  },
  institutes: {
    getAll: `/institutes`,
  },
  meta: {
    get: `/meta`,
  },
  classes: {
    getAll: `/classes`,
    getById: `/classes`,
  },
  modules: {
    getByClass: `/modules`,
    getById: (moduleId: string) => `/modules/${moduleId}`,
    resources: (moduleId: string) => `/resources/module/${moduleId}`,
  },
  resources: {
    getByClassAndMonth: (classId: string, month: string) =>
      `/resources/class/${classId}/months/${month}`,
  },
  payments: {
    create: `/payments`,
    getAll: `/payments`,
    history: (studentId: string, classId: string) =>
      `/payments/history/${studentId}/${classId}`,
  },
  enrollments: {
    enroll: `/enrollments`,
  },
  announcements: {
    getAll: `/announcements`,
    markViewed: (id: string) => `/announcements/${id}/view`,
  },
  liveSessions: {
    getAll: `/live-sessions`,
    getById: (id: string) => `/live-sessions/${id}`,
    getMySessions: (classId: string) => `/class/${classId}/my-sessions`,
  },
};
