import axios from "axios";

const baseURL = `http://10.54.4.121:8080`;

class AxiosSingleton {
  constructor() {
    if (!AxiosSingleton.instance) {
      this.axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if necessary (e.g., Authorization)
        },
      });

      // Set up response interceptors for global error handling
      this.axiosInstance.interceptors.response.use(
        response => response,
        error => {
          // Handle errors globally
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Response error:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Request error:", error.request);
          } else {
            // Something happened in setting up the request
            console.error("Error:", error.message);
          }
          return Promise.reject(error);
        }
      );

      AxiosSingleton.instance = this;
    }

    return AxiosSingleton.instance;
  }

  getInstance() {
    return this.axiosInstance;
  }
}

// Create and freeze the instance
const instance = new AxiosSingleton();
Object.freeze(instance);

export default instance.getInstance();
