import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";


const AxiosInst = axios.create({
  baseURL : 'http://localhost:8080'
})

AxiosInst.interceptors.request.use((config) => {
  let accessToken = VueCookies.get('Authorization');
  let refreshToken = VueCookies.get('refresh');
  if(accessToken && refreshToken) {
    config.headers.Authorization = accessToken;
    config.headers.refresh = refreshToken;
  }else {
    VueCookies.remove('Authorization');
    VueCookies.remove('refresh');
    alert('로그인 필요')
    router.replace('/auth/login')
  }
  return config;
})

export default AxiosInst;