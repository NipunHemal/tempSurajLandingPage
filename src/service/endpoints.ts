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
  payments: {
    create: `/payments`,
  },
  enrollments: {
    enroll: `/enrollments`,
  },
};
