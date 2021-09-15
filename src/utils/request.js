import axios from "axios";
import { ElMessage } from "element-plus";
const instance = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/961e230dbec226a25450a9cd6818d326/api",
  timeout: 6000,
});
// instance.interceptors.request.use((config)=>{
//     console.log(config)
//     return config
// },err=>{
//     console.log(err)
// })

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === "1") {
      ElMessage({
        message:"数据异常",
        type: "error",
        duration: 5 * 1000,
      });
    } else {
      return response.data;
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default function(method, url, data = null) {
  method = method.toLowerCase();
  return method == "post"
    ? instance.post(url, data)
    : instance.get(url, { params: data });
}
