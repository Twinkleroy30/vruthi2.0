export const environment = {
  production: true,
  apiUrl: 'https://api.vruthi.com/api',
  auth: {
    tokenKey: 'auth_token',
    userKey: 'current_user'
  },
  job: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  },
  profile: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  }
};
