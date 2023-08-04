<template>
  <div class="text-end">
    <button type="button" class="btn btn-primary" @click="openItemModal(true)">增加產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openItemModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openConfirmModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 將產品資訊傳入給編輯畫面 -->
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateItem"
  ></ProductModal>
  <ConfirmModal ref="confirmModal" :confirm="confirmInfo" @delete-product="delItem"></ConfirmModal>
</template>
<script>
import ProductModal from '../components/ItemModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

export default {
  data() {
    return {
      products: [], // 產品列表
      pagination: {}, // 分頁資訊
      tempProduct: {}, // 產品資訊
      isNew: false, // 是否為新增品項
      confirmInfo: {}, // 確認資訊
    };
  },
  components: {
    ProductModal, // 產品編輯畫面
    ConfirmModal, // 詢問畫面
  },
  methods: {
    // 取得產品列表
    getProducts() {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      console.log(apiUrl);
      this.$http.get(apiUrl).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    // 開啟確認視窗
    openConfirmModal(item) {
      this.confirmInfo = {
        title: '提醒確認',
        message: `是否刪除${item.title}？`,
        emitStr: 'delete-product',
        param: item.id,
      };

      const askModal = this.$refs.confirmModal;
      askModal.openModal();
    },
    // 開啟編輯視窗
    openItemModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const itemModal = this.$refs.productModal;
      itemModal.openModal();
    },
    // 關閉編輯視窗
    closeItemModal() {
      const itemModal = this.$refs.productModal;
      itemModal.closeModal();
    },
    // 更新產品資訊
    updateItem(item) {
      this.tempProduct = item;
      // 新增
      let apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](apiUrl, { data: this.tempProduct }).then((response) => {
        console.log('response', response);
        this.closeItemModal(); // 關閉編輯畫面
        this.getProducts(); // 取得產品列表
      });
    },
    // 刪除產品
    delItem(id) {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      const httpMethod = 'delete';
      this.$http[httpMethod](apiUrl, { data: this.tempProduct }).then((response) => {
        console.log('response', response);
        const askModal = this.$refs.confirmModal;
        askModal.closeModal();
        this.getProducts(); // 取得產品列表
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
