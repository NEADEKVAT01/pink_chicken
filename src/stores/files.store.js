import { defineStore } from 'pinia'
import { format } from 'date-fns'
export const useFilesStore = defineStore('files', {
    state: () => ({
      isLoading: true,
      plans_next_page: 1,
      reports_next_page: 1,
      perPage: 4,
      mediaplans_listClosed: false,
      reports_listClosed: false,
      allMediaplans: [],
      allReports: []
     }),
     getters: {
      pageCountMediaplans() {
        return Math.ceil(this.allMediaplans.length/this.perPage)
      },
      pageCountReports () {
        return Math.ceil(this.allReports.length/this.perPage)
      },
      paginatedMediaplans() {
        const end = (this.perPage*this.plans_next_page)
        return this.allMediaplans.slice(0, end)
      },
      paginatedReports() {
        const end = (this.perPage*this.reports_next_page)
        return this.allReports.slice(0, end)
      }
     },
    actions: {
      async fetchMediaplans() {
        try {
          const response = await fetch(`http://localhost:3000/mediaplans`);
          const result = await response.json()
          this.allMediaplans = result.reverse()
        } catch (error) {
          console.error("Error fetching mediaplans:", error);
        }
      },
      async fetchReports() {
        try {
          const response = await fetch(`http://localhost:3000/reports`)
          const result = await response.json()
          this.allReports = result.reverse();
        } catch(error) {
          console.error("Error fetching reports:", error);
        }
      },
      async submitMediaplan() {
        const submitDate = new Date()
        try {
          const response = await fetch('http://localhost:3000/mediaplans', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'id': Math.random().toString().slice(2),
              'filename': 'Companyname '+ format(submitDate, 'M/yy'),
              'orderDate': submitDate.toISOString(),
              'status': 'pending'
            })
          })
        } catch (error) {
          console.log('Network response was not ok: ', error)
        }
        this.fetchMediaplans()
      },
      async submitReport() {
        const submitDate = new Date()
        try {
          const response = await fetch('http://localhost:3000/reports', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'id': Math.random().toString().slice(2),
              'filename': 'Companyname '+ format(submitDate, 'M/yy'),
              'orderDate': submitDate.toISOString(),
              'status': 'pending'
            })
          })
        } catch (error) {
          console.log('Network response was not ok: ', error)
        }
        this.fetchReports()
      },
      async deleteMediaplan(id) {
        try {
          const response = await fetch('http://localhost:3000/mediaplans/'+id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }})
        } catch (error) {
          console.log('Network response was not ok: ', error)
        }
        this.fetchMediaplans()
      },
      async deleteReport(id) {
        try {
          const response = await fetch('http://localhost:3000/reports/'+id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }})
        } catch (error) {
          console.log('Network response was not ok: ', error)
        }
        this.fetchReports()
      }
    },
  })