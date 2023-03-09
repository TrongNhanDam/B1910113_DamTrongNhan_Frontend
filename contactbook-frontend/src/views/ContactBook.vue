<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <div class="d-flex justify-content-start align-items-center pt-1 pb-3">
        <button class="btn" @click="checkFavorite"
          :class="isFavorite ? 'btn-warning' : 'btn-outline-warning'">Favorite</button>
      </div>
      <ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts" v-model:activeIndex="activeIndex" />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <router-link :to="{ name: 'contact.edit', params: { id: activeContact._id } }">
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
      isFavorite: false
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone, favorite } = contact;
        return [name, email, address, phone, favorite].join("");
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) => {
        return this.contactStrings[index].includes(this.searchText)
      }
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    checkFavorite() {
      this.isFavorite = !this.isFavorite
      this.refreshList();
    },
    async retrieveContacts() {
      if (this.isFavorite) {
        try {
          this.contacts = await ContactService.favorite();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          this.contacts = await ContactService.getAll();
        } catch (error) {
          console.log(error);
        }
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      await Swal.fire({
        title: 'Bạn có chắc muốn xóa tất cả liên hệ',
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
              await ContactService.deleteAll();
              this.refreshList();
            } catch (error) {
              console.log(error);
            }
            await Swal.fire(
              'Đã xóa',
              'Danh sách liên hệ của bạn đã bị xóa',
              'success'
            )
          }
        })
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  /* max-width: 750px; */
}
</style>
