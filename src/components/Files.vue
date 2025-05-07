<script setup>
    import "../assets/Files.scss";
    import { format } from 'date-fns'
    import { useFilesStore } from '../stores/files.store.js'
    import { onMounted, ref } from "vue";

    const store = useFilesStore()
    const showMobile = ref(false)
    const showMediaplans = ref(false)
    const showReports = ref(false)

    function toggleMobileMediaplans() {
        showMobile.value = true;
        showReports.value = false;
        showMediaplans.value = !showMediaplans.value;
    }

    function toggleMobileReports() {
        showMobile.value = true;
        showMediaplans.value = false;
        showReports.value = !showReports.value;
    }
    onMounted(()=> {
        store.fetchMediaplans()
        store.fetchReports()
        store.isLoading = false
    })
</script>
<template>
    <div class="files">
        <div class="files__button-wrapper">
            <button :disabled="store.allMediaplans.length == 0" class="files__button-wrapper__button files__button-wrapper__button--mediaplans" @click="toggleMobileMediaplans()">Медиапланы</button>
        <button :disabled="store.allReports.length == 0" class="files__button-wrapper__button files__button-wrapper__button--reports" @click="toggleMobileReports()">Отчеты</button>
        </div>
        
        <h2 class="files__title">Файлы</h2>
        
        <div v-if="store.isLoading" class="files__loading">
            <h3>Загрузка...</h3>
        </div>
        
        <div class="files__empty" v-if="store.paginatedMediaplans.length == 0 && store.paginatedReports.length == 0 && !store.isLoading">
            <img src="../assets/img/Files.svg" class="files__empty-image">
            <span class="files__empty-text">Закажи у личного помощника медиаплан. Он появится в этом разделе</span>
        </div>
        
        <div class="files__list" :class="{'files__list--shown': showMobile }" v-if="!store.isLoading && (store.paginatedMediaplans.length > 0 || store.paginatedReports.length > 0)">
            <div v-if="store.paginatedMediaplans.length != 0" class="files__section" :class="{'files__section--show': showMediaplans }">
                <div class="files__section-header">
                    <h3 class="files__section-title">Медиапланы</h3>
                    <img src="../assets/img/arrow-up.svg" class="files__section-toggle"
                    @click="store.mediaplans_listClosed = !store.mediaplans_listClosed"
                    :class="{'files__section-toggle--closed': store.mediaplans_listClosed}">
                </div>
                <div v-if="!store.mediaplans_listClosed">
                    <div v-for="(mediaplan,index) in store.paginatedMediaplans" :key="index" >
                        <p class="files__item" >
                            <img src="../assets/img/file.svg" class="files__item-icon" @click="store.deleteMediaplan(mediaplan.id)">
                            <span class="files__item-name">{{ mediaplan.filename }}</span>
                            <button :class="['files__item-button', mediaplan.status]" @click="mediaplan.status == 'pending' ? mediaplan.status = 'done' : mediaplan.status = 'pending'">
                                <img src="../assets/img/arrow-down.svg" v-if="mediaplan.status == 'done'" class="files__item-status-icon">
                                <img src="../assets/img/refresh.svg" v-else class="files__item-status-icon">
                            </button>
                        </p>
                        <div v-if="index == 0" class="files__status-info">
                            <span v-if="mediaplan.status == 'pending'" class="files__status-text">
                                <img src="../assets/img/subtract.svg" class="files__status-icon"> 
                                Медиаплан в процессе составления
                            </span>
                            <span v-else class="files__status-text">
                                <img src="../assets/img/done.svg" class="files__status-icon"> 
                                Медиаплан от {{ format(mediaplan.orderDate, 'dd.MM.yy') }} готов
                            </span>
                        </div>
                    </div>
                    <div class="files__more" v-if="store.plans_next_page != store.pageCountMediaplans">
                        <span class="files__more-link" @click="store.plans_next_page+=1">Показать еще</span>
                    </div>
                </div>
            </div>
            
            <div v-if="store.allReports.length != 0" class="files__section" :class="{'files__section--show': showReports }">
                <div class="files__section-header">
                    <h3 class="files__section-title">Отчеты</h3>
                    <img src="../assets/img/arrow-up.svg" class="files__section-toggle"
                    @click="store.reports_listClosed = !store.reports_listClosed"
                    :class="{'files__section-toggle--closed': store.reports_listClosed}">
                </div>
                <div v-if="!store.reports_listClosed">
                    <div v-for="(report, index) in store.paginatedReports" :key="index">
                        <p class="files__item">
                            <img src="../assets/img/file.svg" class="files__item-icon" @click="store.deleteReport(report.id)">
                            <span class="files__item-name">{{ report.filename }}</span>
                            <button :class="['files__item-button', report.status]" @click="report.status == 'pending' ? report.status = 'done' : report.status = 'pending'">
                                <img src="../assets/img/arrow-down.svg" v-if="report.status == 'done'" class="files__item-status-icon">
                                <img src="../assets/img/refresh.svg" v-else class="files__item-status-icon">
                            </button>
                        </p>
                        <div v-if="index == 0" class="files__status-info">
                            <span v-if="report.status == 'pending'" class="files__status-text">
                                <img src="../assets/img/subtract.svg" class="files__status-icon"> 
                                Отчет формируется
                            </span>
                            <span v-else class="files__status-text">
                                <img src="../assets/img/done.svg" class="files__status-icon"> 
                                Отчет от {{ format(report.orderDate, 'dd.MM.yy') }} готов
                            </span>
                        </div>
                    </div>
                    <div class="files__more" v-if="store.reports_next_page != store.pageCountReports">
                        <span class="files__more-link" @click="store.reports_next_page+=1">Показать еще</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>