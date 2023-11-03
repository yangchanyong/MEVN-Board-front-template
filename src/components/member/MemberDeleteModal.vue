<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import * as bootstrap from "bootstrap";
import router from "@/router";
import { ref } from "vue";

let is_show = ref(true)
const memberSecession = () => {
  is_show.value = false
  document.getElementById('closeBtn').click();
}

</script>

<template>
  <div class="modal fade" id="deleteMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="myModal">
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
</template>

