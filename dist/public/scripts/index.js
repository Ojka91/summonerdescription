var app = new Vue({
    el:"#app",
    data:{
      regions: ['na1', 'br1', 'la1', 'la2', 'kr', 'jp1', 'eun1', 'euw1', 'tr1', 'ru', 'oc1', 'ph2', 'sg2', 'th2', 'tw2', 'vn2'],
      description: "",
      versus: "",
      loading: false,
      freeApiKey: "",
      freeName: "",
      freeRegion: "",
      freeVersusApiKey: "",
      freeVersusName1: "",
      freeVersusRegion1: "",
      freeVersusName2: "",
      freeVersusRegion2: "",
      premiumName: "",
      premiumRegion: "",
      premiumVersusName1: "",
      premiumVersusRegion1: "",
      premiumVersusName2: "",
      premiumVersusRegion2: "",
      descriptionChoosed: 'Premium',
      versusChoosed: 'Premium',
      oppenedModal: 'description'
    },
    methods: {
      async getFreeDescription(){
        app.description = ""
        app.loading = true
        fetch(`/description/free?region=${app.freeRegion}&name=${app.freeName}&api_key=${app.freeApiKey}`, {
        })
      .then((res) => res.json())
      .then((json) => {
        app.description = json
        app.loading = false

      })
      .catch((err) => {

      })

      },

      async getFreeVersus(){
        app.description = ""
        app.loading = true
        fetch(`/versus/free?region1=${app.freeVersusRegion1}&name1=${app.freeVersusName1}&region2=${app.freeVersusRegion2}&name2=${app.freeVersusName2}&api_key=${app.freeVersusApiKey}`, {
        })
      .then((res) => res.json())
      .then((json) => {
        app.description = json
        app.loading = false

      })
      .catch((err) => {

      })

      },

      setDescriptionsFree() {
        app.descriptionChoosed = 'Free'
      },
      setDescriptionsPremium() {
        app.descriptionChoosed = 'Premium'
      },
      setVersusFree() {
        app.versusChoosed = 'Free'
      },
      setVersusPremium() {
        app.versusChoosed = 'Premium'
      },
      setVersus() {
        app.oppenedModal = 'versus'
      },
      setDescription() {
        app.oppenedModal = 'description'
      }
    },
    computed:{

    }
  })