import { defineStore } from 'pinia'
import { format } from 'date-fns'
export const useChatStore = defineStore('chat', {
    state: () => ({
        messanges: []
     }),
     getters: {

     },
     actions: {
        async fetchMessanges() {
            try {
                const response = await fetch('http://localhost:3000/messanges');
                this.messanges = await response.json()
              } catch (error) {
                console.error("Error fetching messanges:", error);
              }
        },
        async sendMessage(message) {
          if (message != '') {
            const timestamp = new Date()
          try {
            const response = await fetch('http://localhost:3000/messanges', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'id': Math.random().toString().slice(2),
                'user_name': 'User',
                'timestamp': timestamp.toISOString(),
                'text': message,
              })
            })
          } catch (error) {
            console.log('Network response was not ok: ', error)
          }
          this.fetchMessanges()
          }
        },
        async sendAnswerMessage(x) {
         
          const timestamp = new Date()
          switch(x) {
            case 1:
              try {
                const response = await fetch('http://localhost:3000/messanges', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    'id': Math.random().toString().slice(2),
                    'user_name': 'Jim',
                    'timestamp': timestamp.toISOString(),
                    'text': "Спасибо за ваш заказ медиаплана! Мы уже начали работу над ним. В ближайшее время с вами свяжется наш специалист для уточнения деталей.",
                  })
                })
              } catch (error) {
                console.log('Network response was not ok: ', error)
              }
              break;
              case 2:
                try {
                  const response = await fetch('http://localhost:3000/messanges', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      'id': Math.random().toString().slice(2),
                      'user_name': 'Jim',
                      'timestamp': timestamp.toISOString(),
                      'text': "Спасибо за ваш запрос! Отчет уже в работе — мы тщательно проверим все данные и предоставим вам четкую аналитику.",
                    })
                  })
                } catch (error) {
                  console.log('Network response was not ok: ', error)
                }
                break;
                case 3:
                  try {
                    const response = await fetch('http://localhost:3000/messanges', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        'id': Math.random().toString().slice(2),
                        'user_name': 'Jim',
                        'timestamp': timestamp.toISOString(),
                        'text': "Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt. ",
                      })
                    })
                  } catch (error) {
                    console.log('Network response was not ok: ', error)
                  }
                  break;
          }
          this.fetchMessanges()
        },
        async deleteMessage (id) {
          try {
            const response = await fetch('http://localhost:3000/messanges/'+id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }})
          } catch (error) {
            console.log('Network response was not ok: ', error)
          }
          this.fetchMessanges()
        }
     }
    })