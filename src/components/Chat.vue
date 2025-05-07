<script setup>
import "../assets/Chat.scss";
import { onMounted, ref, watch, nextTick } from "vue";
import { useFilesStore } from '../stores/files.store.js'
import { useChatStore } from '../stores/chat.store.js'
import { format, formatRelative, isDate } from 'date-fns'
import { ru } from "date-fns/locale";
import 'floating-vue/dist/style.css'

const files = useFilesStore()
const chat = useChatStore()
const message = ref("")
const messagesContainer = ref(null)

const scrollToBottom = (behavior = 'smooth') => {
  const container = messagesContainer.value;
  if (!container) return;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;
  
  if (scrollHeight > clientHeight) {
    container.scrollTo({
      top: scrollHeight,
      behavior: behavior
    });
  }
};

watch(
  () => [...chat.messanges],
  async (newMessages, oldMessages) => {
    if (newMessages.length > oldMessages.length) {
      await nextTick();
      scrollToBottom();
    }
  },
  { deep: true }
);

onMounted(async () => {
    await chat.fetchMessanges();
    await nextTick();
    scrollToBottom('auto');
});

const handleClickWithTimeout = (actionType) => {
  setTimeout(() => {
    if (actionType === 'mediaplan') {
      chat.sendAnswerMessage(1)
    } else if (actionType === 'report') {
      chat.sendAnswerMessage(2)
    } else {
      chat.sendAnswerMessage(3)
    }
  }, 1000)
}
</script>
<template>
    <div class="chat">
        <div class="chat__header">
            <h2 class="chat__title">Личный помощник</h2>
            <VMenu placement="bottom-end" autoSize="true" >
                <button class="chat__menu-button">
                    <img src="../assets/img/More.svg" class="chat__menu-icon">
                </button>
                <template #popper>
                    <div class="chat__popup">
                        <div class="chat__popup-option">Обратная связь о работе сервиса</div>
                        <div class="chat__popup-option">Сменить помощника</div>
                    </div>
                </template>
            </VMenu>
            <div class="chat__manager">
                <span class="chat__manager-name">Jim Davidson</span>
                <span class="chat__manager-email">Jim Davidson@adaurum.ru</span>
            </div>
        </div>
        
        <div class="chat__container">
            <div class="chat__window" ref="messagesContainer">
                <div v-if="chat.messanges.length == 0" class="chat__empty">
                    <img src="../assets/img/Frame.svg" class="chat__empty-image">
                    <span class="chat__empty-text">
                        Это чат с администратором. 
                        Ты можешь с ним пообщаться по любому вопросу о нашем сервисе и узнать о ходе работы
                    </span>
                </div>
                
                <div v-if="chat.messanges.length != 0" class="chat__messages">
                    <div v-for="(message, index) in chat.messanges" :key="index" class="chat__message">
                        <div class="chat__date-separator">
                            <p v-if="index === 0 || (index > 0 && format(message.timestamp, 'dd') !== format(chat.messanges[index-1].timestamp, 'dd'))">
                                {{ formatRelative(message.timestamp, new Date(),{locale: ru}) }}
                            </p>
                        </div>
                        <div class="chat__message-content" >
                            <div class="chat__avatar" v-if="message.user_name != 'User'">
                                <img src="../assets/img/manager-avatar.jpg" class="chat__avatar-image" v-if="index == 0 || (message.id > 0 && chat.messanges[index-1].user_name != message.user_name && message.user_name != 'User')">
                            </div>
                            <div class="chat__message-main" :class="{'chat__message-content--incoming': message.user_name != 'User'}">
                                <p class="chat__message-text" @click="chat.deleteMessage(message.id)">{{message.text}}</p>
                                <div class="chat__message-info">
                                    <span  class="chat__message-name" v-if="message.user_name != 'User' &&  (index == 0 || (message.id > 0 && chat.messanges[index-1].user_name != message.user_name ))">{{message.user_name}}</span>
                                    <span class="chat__message-time" v-if="index === 0 || (message.id > 0 && format(message.timestamp, 'hh:mm') !== format(chat.messanges[index-1].timestamp, 'hh:mm'))">
                                        {{ format(message.timestamp, 'hh:mm') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat__actions">
                        <button class="chat__action-button chat__action-button--mediaplan" @click="files.submitMediaplan(),handleClickWithTimeout('mediaplan')">Заказать медиаплан</button>
                        <button class="chat__action-button chat__action-button--report" @click="files.submitReport(),handleClickWithTimeout('report')">Заказать отчет</button>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="chat__actions chat__actions--empty" v-if="chat.messanges.length == 0">
                    <button class="chat__action-button chat__action-button--mediaplan" @click="files.submitMediaplan(),handleClickWithTimeout('mediaplan')">Заказать медиаплан</button>
                    <button class="chat__action-button chat__action-button--report" @click="files.submitReport(),handleClickWithTimeout('report')">Заказать отчет</button>
                </div>
                
                <div class="chat__controls">
                    <textarea 
                    placeholder="Введите сообщение для администратора" 
                    class="chat__input" v-model="message"
                    @keydown.enter.exact.prevent
                    @keyup.enter.exact="chat.sendMessage(message),handleClickWithTimeout(), message = ''"
                    @keydown.enter.shift.exact="newline">
                    </textarea>
                    <div class="chat__buttons">
                        <div class="chat__attach-buttons">
                            <button class="chat__attach-button"><img src="../assets/img/folder-add.svg" class="chat__attach-icon"></button>
                            <button class="chat__attach-button"><img src="../assets/img/gallery.svg" class="chat__attach-icon"></button>
                        </div>
                        <div class="chat__send">
                            <button class="chat__send-button" @click="chat.sendMessage(message), handleClickWithTimeout(3), message = ''">
                                <img src="../assets/img/send.svg" class="chat__send-icon">
                            </button>
                            <span class="chat__send-hint">Enter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>