<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
    <!-- <p>{{ message }}</p> -->
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
  components: { ContactForm },
  props: { id: { type: String, required: true } },
  data() {
    return {
      contact: null,
      // message: "",
    };
  },
  methods: {
    async getContact(id) {
      try { this.contact = await ContactService.get(id); }
      catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
          query: this.$route.query, hash: this.$route.hash,
        });
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);
        await Swal.fire(
          'Đã cập nhật',
          'Liên hệ đã được cập nhật',
          'success'
        )
        this.$router.push({ name: "contactbook" });
      }
      catch (error) { console.log(error); }
    },
    async deleteContact() {
      await Swal.fire({
        title: 'Bạn có chắc muốn xóa liên hệ này',
        text: "Bạn không thể phục hồi khi xóa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ContactService.delete(this.contact._id);
              this.$router.push({ name: "contactbook" });
            } catch (error) {
              console.log(error);
            }
            await Swal.fire(
              'Đã xóa',
              'Liên hệ đã bị xóa',
              'success'
            )
          }
        })
    }
  },
  created() {
    this.getContact(this.id);
    // this.message = "";
  },
};
</script>
