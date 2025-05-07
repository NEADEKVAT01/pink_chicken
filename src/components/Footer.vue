<script setup>
import "../assets/Footer.scss";
</script>
<script>
export default {
  data() {
    return {
      selectedLanguage: 'RU',
      languages: ['RU', 'ENG', 'TUR']
    }
  },
  methods: {
    selectLanguage(lang) {
      this.selectedLanguage = lang;
    }
  }
}
</script>
<template>
    <footer class="footer">
        <div class="footer__content">
            <img src="../assets/img/Logo_white.svg" class="footer__logo">
            <a class="footer__link">Политика конфиденциальности</a>
            <div class="footer__contacts">
                <div class="footer__email">
                    <img src="../assets/img/Email.svg" class="footer__icon">
                    <a href="" class="footer__link">pinkchicken@adaurum.ru</a>
                </div>
                <div class="footer__language">
                    <img src="../assets/img/global.svg" class="footer__icon">
                    <span 
                    v-for="lang in languages" 
                    :key="lang" 
                    @click="selectLanguage(lang)"
                    :class="{'footer__language-option--selected': selectedLanguage === lang}"
                    class="footer__language-option"
                  >
                    {{ lang }}
                  </span>
                </div>
                <div class="footer__social">
                    <a href="https://telegram.org" class="footer__social-link">
                        <img src="../assets/img/Telegram.svg" class="footer__social-icon">
                    </a>
                    <a href="https://www.whatsapp.com" class="footer__social-link">
                        <img src="../assets/img/Whatsapp.svg" class="footer__social-icon">
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>