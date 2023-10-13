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
import MemberLogin from "@/components/MemberLogin.vue";

// eslint-disable-next-line no-unused-vars
const username = ref("");

const password = ref('');

const submitForm = () => {
  const user = {
    username: username.value,
    pw: password.value,
  };
  console.log(user);
  axios.post('/api/auth/login', user)
      .then((response => {
        // console.log(response.data)
        // localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('accessToken', JSON.stringify(response.data))
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
        router.replace('/');
      }))
      .catch((err) => {
        alert(err+'\n'+user)
      })
};
</script>
<template>
  <Header>
    <MemberLogin />
  </Header>
  <FooterDefault />
</template>

