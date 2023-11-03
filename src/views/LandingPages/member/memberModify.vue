<script setup>
import { onMounted, onUnmounted, ref } from "vue";

//example components
import NavbarDefault from "../../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";

//Vue Material Kit 2 components
import MaterialSocialButton from "@/components/MaterialSocialButton.vue";

// sections
// import PresentationCounter from "./Sections/PresentationCounter.vue";
import PresentationCounter from "@/views/Presentation/Sections/PresentationCounter.vue";
import PresentationPages from "@/views/Presentation/Sections/PresentationPages.vue";
import PresentationExample from "@/views/Presentation/Sections/PresentationExample.vue";
import data from "@/views/Presentation/Sections/Data/designBlocksData";
import BuiltByDevelopers from "@/views/Presentation/Components/BuiltByDevelopers.vue";
import PresentationTestimonials from "@/views/Presentation/Sections/PresentationTestimonials.vue";
import PresentationInformation from "@/views/Presentation/Sections/PresentationInformation.vue";

//images
// import vueMkHeader from "@/assets/img/logos/Oringvape.png";
import wavesWhite from "@/assets/img/waves-white.svg";
import logoBootstrap from "@/assets/img/logos/bootstrap5.jpg";
import logoTailwind from "@/assets/img/logos/icon-tailwind.jpg";
import logoVue from "@/assets/img/logos/vue.jpg";
import logoAngular from "@/assets/img/logos/angular.jpg";
import logoReact from "@/assets/img/logos/react.jpg";
import logoSketch from "@/assets/img/logos/sketch.jpg";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { isDisabled } from "bootstrap/js/src/util";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

//hooks
let nickName = ref('');
let regDate = ref('');
let updateDate = ref('');
let username = ref('');
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
  const accessToken = VueCookies.get('Authorization');
  const AxiosInst = axios.create({
      baseURL: 'http://localhost:8080'
  })

    AxiosInst.interceptors.request.use(
      (config) => {
        let accessToken = VueCookies.get('Authorization');
        let refreshToken = VueCookies.get('refresh');
        console.log('accessToken = ', VueCookies.get('Authorization'));
        if (accessToken && refreshToken) {
          config.headers.Authorization = accessToken;
          config.headers.refresh = refreshToken;
        }
        return config;
      }
    )
    console.log('refresh 호출');

    AxiosInst.get('/api/auth/profile')
      .then((response) => {
        const memberProfile = response.data.member;

        if (memberProfile) {
          console.log(memberProfile);
          nickName.value = memberProfile.nickName;
          regDate.value = memberProfile.regDate;
          updateDate.value = memberProfile.updateDate;
          username.value = memberProfile.username;
        } else {
          console.log('memberProfile 없음');
        }
      })
      .catch((error) => {
        if (error.response.data.message === 'jwt expired') {
          console.log('로그인이 필요합니다.')
        }
        console.log(error.response.data.message);
      })
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
});

const submitForm = () => {
  const accessToken = VueCookies.get('Authorization');
  const refreshToken = VueCookies.get('refresh')
  const member = {
    username: username.value,
    nickName: nickName.value,
  }

  const AxiosInst = axios.create({
    baseURL:'http://localhost:8080'
  })

  AxiosInst.interceptors.request.use(
    (config) => {
      let accessToken = VueCookies.get('Authorization');
      let refreshToken = VueCookies.get('refresh');
      console.log(VueCookies.get('Authorization'));
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
    }
  )
  console.log('로그아웃 호출');

  AxiosInst.patch('/api/auth/modify', member)
    .then(() => {
      // VueCookies.remove('refresh')
      // VueCookies.remove('Authorization')
      alert('정보 수정이 완료되었습니다. 다시 로그인 해주세요.')
      // user.value = null;
    })
    .catch((error) => {
      alert(error.data.message)
    })
}



// const isDisable = true;
</script>


<template>
  <Header>
    <div class="page-header min-vh-25" href="/">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 position-relative">
            <a href="/">
              <img alt="logo" src="../../../assets/img/logos/Oringvape.png">
            </a>
          </div>
          <div class="col-lg-6 position-relative my-auto row">
            <MaterialInput
              class="input-group-dynamic"
              placeholder="검색어를 입력해주세요"
              type="text"
              icon="search"
            />
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 d-flex">
    <div class="row mt-3">
      <div class="col-lg-4 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom">
          <div
            class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
          >
            <div
              class="bg-gradient-warning shadow-warning border-radius-lg py-3 pe-1"
            >
              <h4
                class="text-white font-weight-bolder text-center mt-2 mb-0"
              >
                회원정보
              </h4>
            </div>
          </div>
          <div class="card-body">
            <form
              id="contact-form"
              method="post"
              autocomplete="off"
              v-on:submit.prevent="{submitForm}"
            >
              <div class="form-control d-flex">
                <div class="col-md-7">
                  <MaterialInput
                    v-model="nickName"
                    class="input-group-outline my-3"
                    :placeholder="'닉네임을 입력해주세요'"
                    type="text"
                    :value="nickName"
                    @update:value="nickName = $event"

                  />
                </div>
                <div class="col-md-5 ml-2 float-end">
                  <MaterialButton
                    class="my-3 mb-2 float-end"
                    variant="outline"
                    color="info"
                    v-on:click="checkNickName"
                  >중복확인</MaterialButton>
                </div>
              </div>
              <MaterialInput
                v-model="password"
                id="password"
                class="input-group-outline mb-3"
                type="text"
                :value="regDate"
                :isDisabled=true
                @update:value="password = $event"
              />
              <MaterialInput
                class="input-group-outline mb-3"
                type="text"
                :value="updateDate"
                :isDisabled=true
                @update:value="password = $event"
              />
              <div class="container row justify-content-center">
                <div class="text-center col-6" id="prevBtn">
                  <router-link to="/auth/login">
                    <MaterialButton
                      class="my-4 mb-2 prevBtn"
                      variant="outline"
                      color="warning"
                      fullWidth
                    >이전으로</MaterialButton
                    >
                  </router-link>
                </div>

                <div class="text-center col-6">
                  <MaterialButton
                    class="my-4 mb-2"
                    variant="gradient"
                    color="warning"
                    fullWidth
                    @click="submitForm"
                  >정보수정</MaterialButton
                  >
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />
</template>
