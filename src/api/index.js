import axios from "axios";

const env = process.env.NODE_ENV || "dev";

let host = "";

if (env === "production") {
  //  host = 'https://byihuse.rw'
  host = "https://byihuse-backend-qafg7vre3-ujpaul.vercel.app/";
} else {
  //host = 'http://localhost:4000'
  host = "Http://localhost:4000";
}

export default () => {
  return axios.create({
    baseURL: host,
  });
};
