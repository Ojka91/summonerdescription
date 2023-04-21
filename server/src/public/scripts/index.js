var app = new Vue({
    el:"#app",
    data:{
      regions: ['na1', 'br1', 'la1', 'la2', 'kr', 'jp1', 'eun1', 'euw1', 'tr1', 'ru', 'oc1', 'ph2', 'sg2', 'th2', 'tw2', 'vn2'],
      description: "",
      loading: false,
      freeName: "",
      freeApiKey: "",
      freeRegion: "",
      premiumRegion: ""
    },
    methods: {
      async getFreeDescription(){
        app.description = ""
        app.loading = true
        fetch(`/description/free?region=${app.freeRegion}&name=${app.freeName}&api_key${app.freeApiKey}`, {
        })
      .then((res) => res.json())
      .then((json) => {
        app.description = json
        app.loading = false

      })
      .catch((err) => {

      })

      }
    },
    computed:{

    }
  })