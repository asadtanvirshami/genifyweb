import axios, { AxiosError } from 'axios';

const userSigninRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_AUTH_USER_SIGNIN as string,
      { email, password }
    );
    return response ;
  } catch (error) {
    // Check if the error is an AxiosError and type it accordingly
    if (axios.isAxiosError(error)) {
      // Now TypeScript recognizes that error.response is valid
      console.error('Error Response:', error.response?.data);
      return error.response?.data; // Access the response property safely
    } else {
      // Handle unexpected errors
      console.error('Unexpected Error:', error);
      return { message: 'An unexpected error occurred' };
    }
  }
};

export { userSigninRequest };
