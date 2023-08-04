<template>
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
    ref="confirmModal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="confirmModalLabel">
            <span>提醒確認</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{tempConfirm.message}}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <!-- 透過emit觸發外部更新方法 -->
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit(tempConfirm.emitStr, tempConfirm.param)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  // 傳入產品資訊
  props: {
    confirm: {
      type: Object,
      // 若外層沒有正確傳值則為default
      default() {
        return {};
      },
    },
  },
  // 監聽狀況，將產品資訊替換為外部傳入
  watch: {
    confirm() {
      this.tempConfirm = this.confirm;
    },
  },
  data() {
    return {
      modal: {}, // bui實體
      tempConfirm: {}, // 確認內容
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // 將html樣板實體化為modal視窗
    this.modal = new Modal(this.$refs.confirmModal);
  },
};
</script>
