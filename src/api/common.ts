const fallBackError = "Oops! An error occurred processing your request.";

export const doValidatedApiRequest = async (callback) => {
  try {
    return await callback();
  } catch (e) {
    if (e.response?.status === 400) {
      return { errors: e.response.data.errors.map((e) => e.message) };
    }
    if (e.response?.status === 500) {
      const responseMessage =
        e.response?.data?.message || e.message || fallBackError;
      return { errors: [responseMessage] };
    }
    return { errors: [fallBackError] };
  }
};
