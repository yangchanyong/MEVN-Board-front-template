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
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";

// eslint-disable-next-line no-unused-vars
let agreeChk = ref(false);



const navigateToNextPage = () => {
  if(agreeChk.value) {
    router.replace('/auth/signup');
  }else {
    alert('약관에 동의해주세요')
  }
}


</script>
<template>
  <transition name="fade" mode="out-in">
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
                    이용약관
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <p class="overflow-auto" style="height: 300px; white-space: pre-line" >
                  제 1 조 (목적)
                  본 약관은 FireWork 대표누리집 (이하 "누리집")이 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 누리집의 권리, 의무, 책임사항과 기타 제반 사항을 규정함을 목적으로 합니다.
                  <br>
                  제 2 조 (약관의 명시와 개정)
                  1. 누리집은 이 약관의 내용과 주소지, 관리자의 성명, 개인정보보호 담당자의 성명, 연락처(전화, 팩스, 전자우편 주소 등) 등을 이용자가 알 수 있도록 누리집의 초기 서비스화면(전면)에 게시합니다.
                  2. 누리집은 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                  3. 누리집이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 누리집의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일 까지 공지합니다.
                  4. 이 약관에 동의하는 것은 정기적으로 웹을 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 누리집에서 책임지지 않습니다.
                  5. 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니 하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.
                  6. 본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 의합니다.
                  <br>
                  제 3 조 (용어의 정의)
                  1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                  ① 이용계약 : 서비스 이용과 관련하여 누리집과 이용자 간에 체결하는 계약
                  ② 가입 : 누리집이 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위
                  ③ 회원 : 누리집에 회원가입에 필요한 개인 정보를 제공하여 회원 등록을 한 자로서, 누리집의 정보 및 서비스를 이용할 수 있는 자
                  ④ 이용자번호(ID) : 이용고객의 식별과 이용자가 서비스 이용을 위하여 이용자가 정하고 누리집이 승인하는 문자와 숫자의 조합
                  ⑤ 비밀번호(PW) : 이용자가 등록회원과 동일인인지 신원을 확인하고 통신상의 자신의 개인정보보호를 위하여 이용자 자신이 정한 문자와 숫자의 조합
                  ⑥ 게시물 : 회원이 서비스를 이용하면서 게시한 글, 이미지, 동영상 등 각종 파일과 링크 등
                  ⑦ 탈퇴(해지) : 서비스 또는 회원이 이용계약을 종료하는 행위
                  ...
                </p>
                <div class=" form-check float-end">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="chk"
                    name="chk"
                    v-model="agreeChk"
                  >
                  <label class="form-check-label" for="chk">약관에 동의합니다</label>

                  <p v-if="agreeChk" style="color: blue">동의 하셨습니다.</p>
                  <p v-else style="color: red">약관에 동의해주세요</p>
                </div>
                <div class="container row justify-content-center">
                  <div class="text-center col-6" id="prevBtn">
                    <router-link to="/auth/login">
                    <MaterialButton
                      class="my-4 mb-2 prevBtn"
                      variant="outline"
                      color="warning"
                      fullWidth
                      :checked="agreeChk"
                      >이전으로</MaterialButton
                    >
                    </router-link>
                  </div>

                  <div class="text-center col-6">
<!--                    <router-link to="/auth/signup">-->
                      <MaterialButton
                        class="my-4 mb-2"
                        variant="gradient"
                        color="warning"
                        fullWidth
                        @click="navigateToNextPage"
                        >다음</MaterialButton
                      >
<!--                    </router-link>-->
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
  </transition>
  <FooterDefault />

</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

