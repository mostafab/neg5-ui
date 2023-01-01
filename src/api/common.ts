const fallBackError = "An error occurred processing your request.";

export const doValidatedApiRequest = async (callback) => {
  try {
    return await callback();
  } catch (e) {
    console.error(e);
    if (e.response?.status === 400) {
      return { errors: e.response.data.errors.map((e) => e.message) };
    }
    if (e.response?.status === 500) {
      return { errors: [e.message || fallBackError] };
    }
    return { errors: [fallBackError] };
  }
};
