<template>
  <Navbar></Navbar>
  <!-- 讓邊邊有一小段距離 -->
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/NavBar.vue';

export default {
  components: {
    Navbar,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log('token', token);

    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push('login');
      }
    });
  },
};
</script>
