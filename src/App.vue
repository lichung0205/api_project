<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">登入</router-link>
  </nav>
  <div>  </div>
  <router-view />
</template>

<style lang="scss">
@import "./assets/all.scss";
</style>
