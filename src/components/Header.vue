<script setup>
    import "../assets/Header.scss";
</script>
<script>
export default {
  props: {
    revenue_percentage: {
      type: Number,
      default: 5
    },
    user_email: {
        type: String,
        default: "User@gmail.ru"
    }}}
</script>
<template>
    <header class="header">
        <img src="../assets/img/Logo.svg" class="header__logo">
        <div class="header__buttons">
            <div class="header__user-info">
                <div class="header__info-group">
                    <img src="../assets/img/Group.svg" class="header__icon">
                    <span class="header__text">{{ revenue_percentage }}% <span class="header__text--mobile">выручки</span></span>
                </div>
                <div class="header__info-group">
                    <img src="../assets/img/User.svg" class="header__icon">
                    <span class="header__text">{{ user_email }}</span>
                </div>
            </div>
            <div class="header__actions">
                <button class="header__button header__button--settings"><img src="../assets/img/Setting.svg" class="header__button-icon"></button>
                <button class="header__button header__button--logout"><img src="../assets/img/Login.svg" class="header__button-icon"></button>
            </div>
        </div>
    </header>
</template>