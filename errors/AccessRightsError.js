class AccessRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccessRights';
    this.statusCode = 403;
  }
}

module.exports = AccessRightsError;
