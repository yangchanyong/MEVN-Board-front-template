<script setup>
import oringLogo from "@/assets/img/logos/Oringvape.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "About Me",
      logo: oringLogo,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://www.chanyongyang.com"
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/yangchanyong"
      },
      {
        icon: '<i class="fab fa-blogger text-lg opacity-8"></i>',
        link: "https://blog.chanyongyang.com"
      }
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
  }
});
</script>
<template>
  <footer class="footer mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 m-auto">
          <div class="text-center">
            <a :href="brand.route">
              <h6 class="font-weight-bolder mb-4">{{ brand.name }}</h6>
            </a>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav justify-content-center">
              <li
                class="nav-item"
                v-for="{ icon, link } of socials"
                :key="link"
              >
                <a
                  class="nav-link pe-1"
                  :href="link"
                  target="_blank"
                  v-html="icon"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              OringVape2
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
