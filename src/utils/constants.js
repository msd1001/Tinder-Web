// FOR LOCAL USE
// export const BASE_URL = "http://localhost:7777";

// FOR PRODUCTION USE UNCOMMENT BELOW
// export const BASE_URL = "/api";

//  ===> /api represent the public IP ADDRESS  which comes from  AWS  13.62.20.37, on which BE AND FE is running

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
