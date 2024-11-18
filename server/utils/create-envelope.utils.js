const createEnvelope = (success, message, data = null) => {
    return {
      success,
      message,
      data,
    };
  };
  
  module.exports = createEnvelope;