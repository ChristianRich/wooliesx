export default class HttpError {
  constructor(status, message, code) {
    return {
      message,
      status,
      code,
    }
  }
}
