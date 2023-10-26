<script setup>
import { onMounted, onUnmounted } from "vue";

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

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  // body.classList.remove("bg-oring");
});
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

  <div class="card card-body blur shadow-blur mx-3 mx-md-4">


  </div>
  <DefaultFooter />
</template>
