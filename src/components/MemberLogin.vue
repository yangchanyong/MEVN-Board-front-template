<template>
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
                  Login
                </h4>
                <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fa fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fa fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fa fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
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
                <div class="text-center">
                  <MaterialButton
                    class="my-4 mb-2"
                    variant="gradient"
                    color="warning"
                    fullWidth
                    @click="submitForm"
                  >login</MaterialButton
                  >
                </div>
                {msg}
                <p class="mt-4 text-sm text-center">
                  계정이 없으신가요?
                  <router-link to="/auth/agree">
                    <p class="text-warning text-gradient font-weight-bold d-inline">
                      회원 가입
                    </p>
                  </router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import {mapState} from "vuex";
</script>
<script>
import { computed, ref } from "vue";
import axios from "axios";
import router from "@/router";
import {mapState, useStore} from "vuex";
// import store from "@/loginStore";
const username = ref("");


const password = ref('');
export default {
  computed: {
    // accessToken: this.$store.state.accessToken,
    // refreshToken: this.$store.state.refreshToken
    ...mapState(["accessToken"])
  },
  methods: {
    submitForm() {
      const user = {
        username: username.value,
        pw: password.value,
      };
      console.log(user);
      axios.post('/api/auth/login', user)
        .then((response => {
          let store = useStore();
          const accessToken = response.data.data.accessToken;
          const refreshToken = response.data.data.refreshToken;
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          // store.commit('accessToken', accessToken)
          this.$store.state.commit('accessToken', accessToken)
          router.replace('/');
        }))
        .catch((err) => {
          alert(err+'\n'+user)
        })
    }
  }
}

</script>


<style scoped>

</style>