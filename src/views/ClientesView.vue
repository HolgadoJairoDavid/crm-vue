<script setup>
import { onMounted, ref } from "vue";
import Heading from "../components/UI/Heading.vue";
import RouterLink from "../components/UI/RouterLink.vue";
import axios from "axios";

const clientes = ref([]);
onMounted(() => {
  axios("http://localhost:4000/clientes")
    .then(({ data }) => (clientes.value = data))
    .catch((error) => console.log("Hubo un error"));
});
defineProps({
  titulo: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="flex justify-end">
    <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
  </div>
  <Heading>{{ titulo }}</Heading>
</template>
