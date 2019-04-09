import {
  requestInterceptorA
  // requestInterceptorB,
  // responseInterceptorA,
  // responseInterceptorB
} from "./apiInterceptors";
import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:5000" });

apiClient.interceptors.request.use(requestInterceptorA);
// apiClient.interceptors.request.use(requestInterceptorB);
// apiClient.interceptors.reponse.use(responseInterceptorA);
// apiClient.interceptors.reponse.use(responseInterceptorB);

export default apiClient;
