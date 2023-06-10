<script setup>
import ClienteService from "../services/ClienteService";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import { FormKit } from "@formkit/vue";
import { reactive } from "vue";

const route = useRoute();
const router = useRouter();
const { id } = route.params;
const formData = reactive({});
defineProps({
  titulo: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  ClienteService.obtenerCliente(id)
    .then(({ data }) => {
      Object.assign(formData, data);
    })
    .catch((error) => console.log(error));
});
const handleSubmit = (data) => {
  ClienteService.actualizarCliente(id, data)
    .then(() => router.push({ name: "inicio" }))
    .catch((error) => console.log(error));
};
</script>
<template>
  <div class="flex justify-end">
    <RouterLink to="inicio">Volver</RouterLink>
  </div>
  <Heading>{{ titulo }}</Heading>
  <div class="mx-auto mt-10 bg-white shadow">
    <div class="mx-auto md:w-2/3 py-20 px-6">
      <FormKit
        type="form"
        submit-label="Guardar Cambios"
        incomplete-message="No se pudo enviar, Asegúrate de que no quede ningún mensaje en rojo"
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          name="nombre"
          label="Nombre"
          placeholder="Nombre del cliente"
          validation="required"
          :validation-messages="{
            required: 'El nombre del cliente es obligatorio',
          }"
          validation-visibility="live"
          v-model="formData.nombre"
        />

        <FormKit
          type="text"
          name="apellido"
          label="Apellido"
          placeholder="Apellido del cliente"
          validation="required"
          :validation-messages="{
            required: 'El apellido del cliente es obligatorio',
          }"
          validation-visibility="live"
          v-model="formData.apellido"
        />

        <FormKit
          type="email"
          name="email"
          label="Email"
          placeholder="Email del cliente"
          validation="required|email"
          :validation-messages="{
            required: 'El Email del cliente es obligatorio',
            email: 'Coloca un email válido',
          }"
          validation-visibility="live"
          v-model="formData.email"
        />

        <FormKit
          type="text"
          name="telefono"
          label="Teléfono"
          placeholder="Teléfono: XXX-XXX-XXXX"
          validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
          :validation-messages="{
            matches: 'EL formato no es válido',
          }"
          validation-visibility="live"
          v-model="formData.telefono"
        />

        <FormKit
          type="text"
          name="empresa"
          label="Empresa"
          placeholder="Empresa del cliente"
          v-model="formData.empresa"
        />

        <FormKit
          type="text"
          name="puesto"
          label="Puesto"
          placeholder="Puesto del cliente"
          v-model="formData.puesto"
        />
      </FormKit>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
