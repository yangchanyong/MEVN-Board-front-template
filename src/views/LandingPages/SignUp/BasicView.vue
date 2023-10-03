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

const pwChk = ref(true)

const submitForm = () => {
  const user = {
    username: username.value,
    pw: password.value,
    nickName: nickName.value,
  };
  console.log(user);
  axios.post('/api/auth/signup', user)
      .then((response => {
        router.replace('/auth/signin');
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
                    v-on:submit.prevent="submitForm"
                >
                  <MaterialInput
                    id="username"
                    class="input-group-outline my-3"
                    :label="{ text: 'ID를 입력해주세요', class: 'form-label' }"
                    type="text"
                    :value="username"
                    @update:value="username = $event"
                  />
<!--                  <input id="username" v-model="username" />-->
                  <MaterialInput
                    v-model="password"
                    class="input-group-outline mb-3"
                    :label="{ text: '비밀번호를 입력해주세요', class: 'form-label' }"
                    type="password"
                    :value="password"
                    @update:value="password = $event"
                  />
                  <MaterialInput
                    v-model="pwChk"
                    class="input-group-outline mb-3"
                    :label="{ text: '비밀번호를 한번 더 입력해주세요', class: 'form-label' }"
                    type="password"
                    :value="pwChk"
                    @update:value="pwChk = $event"
                  />
                  <MaterialInput
                    v-model="nickName"
                    class="input-group-outline mb-3"
                    :label="{ text: '닉네임을 입력해주세요', class: 'form-label' }"
                    type="text"
                    :value="nickName"
                    @update:value="nickName = $event"
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

