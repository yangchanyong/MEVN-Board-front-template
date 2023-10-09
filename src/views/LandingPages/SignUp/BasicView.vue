<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';

// example components
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

// footer
import FooterDefault from "@/examples/footers/FooterDefault.vue";
onMounted(() => {
  setMaterialInput();
});

import router from "@/router/index";

// eslint-disable-next-line no-unused-vars
const username = ref("");

const password = ref('');

const nickName = ref('');

const pwChk = ref('')

const checkId = () => {
  const userChk = {username: username.value};
  axios.post('/api/auth/checkId', userChk)
    .then((res) => {
      if(res.data.checkUsername) {
        alert('사용 가능한 id 입니다.')
      }else {
        alert('사용이 불가능한 id 입니다.')
      }
    })
    .catch(err => {
      alert(err)
    })
}
const checkNickName = () => {
  const nickNameChk = {nickName: nickName.value};
  axios.post('/api/auth/checkNickName', nickNameChk)
    .then((res) => {
      if(res.data.checkNickName) {
        alert('사용 가능한 닉네임 입니다.')
      }else {
        alert('사용이 불가능한 닉네임 입니다.')
      }
    })
    .catch(err => {
      alert(err)
    })
}

const submitForm = () => {
  const user = {
    username: username.value,
    pw: password.value,
    nickName: nickName.value,
  };
  console.log(user);
  axios.post('/api/auth/signup', user)
      .then((response => {
        alert('회원기입이 완료되었습니다\n로그인 해주세요')
        router.replace('/auth/login');
      }))
      .catch((err) => {
        alert(err+'\n'+user)
      })
};
</script>
<template>
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      style="background-color: #fdfbf8"
    >
      <span class="mask "></span>
      <div class="container my-auto">
        <div class="row">
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
                    회원가입
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
                        id="username"
                        class="input-group-outline my-3"
                        :label="{ text: 'ID를 입력해주세요', class: 'form-label' }"
                        type="text"
                        :value="username"
                        @update:value="username = $event"
                      />
                    </div>
                    <div class="col-md-5 ml-2 float-end">
                      <MaterialButton
                          class="my-3 mb-2 float-end"
                          variant="outline"
                          color="success"
                          v-on:click="checkId"
                      >중복확인</MaterialButton>
                    </div>
                  </div>
                  <MaterialInput
                    v-model="password"
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: '비밀번호를 입력해주세요', class: 'form-label' }"
                    type="password"
                    :value="password"
                    @update:value="password = $event"
                  />
                  <MaterialInput
                    v-model="pwChk"
                    id="pwChk"
                    class="input-group-outline mb-3"
                    :label="{ text: '비밀번호를 한번 더 입력해주세요', class: 'form-label' }"
                    type="password"
                    :value="pwChk"
                    @update:value="pwChk = $event"
                  />
                  <div class="form-control d-flex">
                    <div class="col-md-7">
                      <MaterialInput
                        v-model="nickName"
                        class="input-group-outline my-3"
                        :label="{ text: '닉네임을 입력해주세요', class: 'form-label' }"
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
                        >회원가입</MaterialButton
                      >
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <FooterDefault />
</template>

