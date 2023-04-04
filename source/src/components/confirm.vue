<template>
  <div v-if="show">
    <div class="overlay"></div>
    <div class="dialog">
      <div class="message">{{ message }}</div>
      <div class="buttons">
        <button @click="cancel">取消</button>
        <button @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showBox() {
      this.show = true;
    },
    hideBox() {
      this.show = false;
    },
    confirm() {
      this.onConfirm();
      this.hideBox();
    },
    cancel() {
      this.hideBox();
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 1001;
}

.message {
  font-size: 18px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  background-color: #0078d7;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #106ebf;
}
</style>