<script setup>
import "./assets/App.scss";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Files from "./components/Files.vue";
import Chat from "./components/Chat.vue";
const user_email = "Username@adaurum.ru"
</script>

<template>
  <div class="app">
    <Header :revenue_percentage="5" :user_email="user_email"/>
    <div class="app__content">
      <Files/>
      <Chat/>
    </div>
    <Footer/>
  </div>
</template>