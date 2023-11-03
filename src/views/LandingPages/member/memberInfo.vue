<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axiosInstance from "@/axios/axiosInst";
import * as bootstrap from 'bootstrap'

//example components
import NavbarDefault from "../../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";

//Vue Material Kit 2 components

import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

//hooks
let nickName = ref('');
let regDate = ref('');
let updateDate = ref('');
let username = ref('');
let password = ref('');
let modifyPw = ref('');
let pwChk = ref('');
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

const memberModify = () => {
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

const memberModifyPw = () => {
  const member = {
    username: username.value,
    pw:modifyPw.value
  }
  axiosInstance.patch('/api/auth/modifyPw', member)
    .then(() => {
      alert('비밀번호 변경이 완료되었습니다.')
      document.getElementById('closeBtn').click();
      axiosInstance.post('/api/auth/logout')
        .then(() => {
          VueCookies.remove('refresh')
          VueCookies.remove('Authorization')
          alert('로그아웃 되었습니다.')

          // this.$nextTick(function() {
          //   router.replace('/auth/login')
          // });
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
}
const memberSecession = function() {
  document.getElementById('closeBtn').click();


}
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
              <div class="form-control d-flex justify-content-center">
                <div class="col-md-3 my-auto">
                  <b>
                    닉네임
                  </b>
                </div>
                <div class="col-md-8 float-end">
                  <MaterialInput
                    class="input-group-outline my-3"
                    type="text"
                    :value="nickName"
                    :isDisabled=true
                  />
                </div>
              </div>
              <div class="form-control d-flex justify-content-center">
                <div class="col-md-3 my-auto">
                  <b>
                    가입일
                  </b>
                </div>
                <div class="col-md-8">
                  <MaterialInput
                    class="input-group-outline mb-3 my-auto"
                    type="text"
                    :value="regDate"
                    :isDisabled=true
                  />
                </div>
              </div>
              <div class="form-control d-flex justify-content-center">
                <div class="col-md-3 my-auto">
                  <b>
                    수정일
                  </b>
                </div>
                <div class="col-md-8 float-end">
                  <MaterialInput
                  class="input-group-outline mb-3"
                  type="text"
                  :value="updateDate"
                  :isDisabled=true
                />
                </div>
              </div>
              <div class="container row justify-content-center">
                <div class="text-center" id="prevBtn">
                  <router-link to="/">
                    <MaterialButton
                      class="my-4 mb-2 prevBtn"
                      variant="outline"
                      color="warning"
                      fullWidth
                    >이전으로</MaterialButton
                    >
                  </router-link>
                </div>

                <div class="text-center">
                  <MaterialButton
                    class="mb-1"
                    variant="gradient"
                    color="warning"
                    fullWidth
                    data-bs-toggle="modal"
                    data-bs-target="#modifyModal"
                  >정보수정</MaterialButton
                  >
                </div>
                <div class="text-center">
                  <MaterialButton
                    class="mb-1"
                    variant="gradient"
                    color="success"
                    fullWidth
                    data-bs-toggle="modal"
                    data-bs-target="#modifyPwModal"
                  >비밀번호 변경</MaterialButton
                  >
                </div>
                <div class="text-center">
                  <MaterialButton
                    class="mb-1"
                    variant="gradient"
                    color="danger"
                    fullWidth
                    data-bs-toggle="modal"
                    data-bs-target="#deleteMember"
                  >회원탈퇴</MaterialButton
                  >
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modify modal start -->
  <div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">닉네임 변경</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form
          id="contact-form"
          method="post"
          autocomplete="off"
          v-on:submit.prevent="{memberModify}"
        >
        <div class="modal-body container">
          <div class="card-body container col-md-7">
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
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn bg-gradient-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
          <button
            type="button"
            class="btn bg-gradient-warning"
            @click="memberModify"
          >
            정보수정
          </button>
        </div>
        </form>
      </div>
    </div>
  </div>
  <!--  modify modal end  -->

  <!-- modifyPw modal start -->
  <div class="modal fade" id="modifyPwModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-show="is_show">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">비밀번호 변경</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form
          id="contact-form"
          method="post"
          autocomplete="off"
          v-on:submit.prevent="{memberModifyPw}"
        >
          <div class="modal-body container">
            <div class="card-body container col-md-7">
              <div class="form-control">
                <MaterialInput
                  v-model="password"
                  id="password"
                  class="input-group-outline mb-3"
                  placeholder="현재 비밀번호를 입력해주세요"
                  type="password"
                  :value="password"
                  @update:value="password = $event"
                />
              </div>
              <div class="form-control">
                <MaterialInput
                  v-model="modifyPw"
                  id="modifyPw"
                  class="input-group-outline mb-3"
                  placeholder="변경하실 비밀번호를 입력해주세요"
                  type="password"
                  :value="modifyPw"
                  @update:value="modifyPw = $event"
                />
              </div>
              <div class="form-control">
                <MaterialInput
                  v-model="pwChk"
                  id="pwChk"
                  class="input-group-outline mb-3"
                  placeholder="변경하실 비밀번호를 한번 더 입력해주세요"
                  type="password"
                  :value="pwChk"
                  @update:value="pwChk = $event"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn bg-gradient-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button
              type="button"
              class="btn bg-gradient-success"
              @click="memberModifyPw"
            >
              비밀번호변경
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--  modifyPw modal end  -->

  <!-- deleteMember modal start -->
  <div class="modal fade" id="deleteMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">닉네임 변경</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form
          id="contact-form"
          method="post"
          autocomplete="off"
        >
          <div class="modal-body container">
            <div class="card-body container col-md-7">
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
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn bg-gradient-secondary"
              id="closeBtn"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button
              type="button"
              class="btn bg-gradient-warning"
              @click="memberSecession"
            >
              정보수정
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--  deleteMember modal end  -->

  <DefaultFooter />
</template>
