import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  // Get the token from localStorage
  static get token() {
    return localStorage.getItem("authToken");
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //Companies API methods

  //  Get all companies with optional search filters.
  static async getCompanies(filters = {}) {
    let res = await this.request(`companies`, filters);
    return res.companies;
  }

  // Get details about a single company by its handle.
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //Jobs API methods//

  // Get all jobs 
  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  // Get all jobs with optional search filters. 
  static async searchJobs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `jobs?${queryParams}` : "jobs";
    const res = await this.request(endpoint);
    return res.jobs;
  }

  //Users API methods//

  // Registration API method
  static async registerUser(userData) {
    return await this.request("auth/register", userData, "post");
  }
//Log in API method
  static async login({ username, password }) {
    let res = await this.request("auth/token", { username, password }, "post");
    return res.token; // Return the JWT token
  }
// Get user details by username
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Update user details by username
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // Method to apply to a job
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`,{},"post");
    return res;
  }
}

export default JoblyApi;
