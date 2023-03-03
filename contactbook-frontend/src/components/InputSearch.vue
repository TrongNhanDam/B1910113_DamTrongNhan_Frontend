<template>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit" />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      // console.log("updateModelValue", this);
      // console.log("updateModelValue", e)
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      // console.log("submit", this);
      this.$emit("submit");
    },
  },
};
</script>
