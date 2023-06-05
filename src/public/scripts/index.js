var app = new Vue({
    el:"#app",
    data:{
      regions: ['na1', 'br1', 'la1', 'la2', 'kr', 'jp1', 'eun1', 'euw1', 'tr1', 'ru', 'oc1', 'ph2', 'sg2', 'th2', 'tw2', 'vn2'],
      description: "",
      image:"",
      versus: "",
      loading: false,
      freeApiKey: "",
      freeName: "",
      freeCreateName: "",
      freeRegion: "",
      freeCreateRegion: "",
      freeCreateApiKey: "",
      freeVersusApiKey: "",
      freeVersusName1: "",
      freeVersusRegion1: "",
      freeVersusName2: "",
      freeVersusRegion2: "",
      premiumName: "",
      premiumRegion: "",
      premiumCreateName: "",
      premiumCreateRegion: "",
      premiumVersusName1: "",
      premiumVersusRegion1: "",
      premiumVersusName2: "",
      premiumVersusRegion2: "",
      descriptionChoosed: 'Premium',
      versusChoosed: 'Premium',
      versusChoosed: 'Premium',
      createChoosed: 'Premium',
      oppenedModal: 'description'
    },
    methods: {
      async getFreeDescription(){
        app.description = ""
        app.loading = true
        app.image = ''
        fetch(`/description/free?region=${app.freeRegion}&name=${app.freeName}&api_key=${app.freeApiKey}`, {
        })
      .then((res) => res.json())
      .then((json) => {
        app.description = json
        app.loading = false
        app.image = ''

      })
      .catch((err) => {

      })

      },

      async getFreeVersus(){
        app.description = ""
        app.loading = true
        app.image = ''
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
      async getFreeCreate(){
        app.description = ""
        app.loading = true
        app.image = ''
        fetch(`/create/free?region=${app.freeCreateRegion}&name=${app.freeCreateName}&api_key=${app.freeCreateApiKey}`, {
        })
      .then((res) => res.json())
      .then((json) => {
        app.description = json.champDescription
        app.image = json.image
        console.log(json.image)
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
      setCreateFree() {
        app.createChoosed = 'Free'
      },
      setVersusPremium() {
        app.versusChoosed = 'Premium'
      },
      setCreatePremium() {
        app.createChoosed = 'Premium'
      },
      setVersus() {
        app.oppenedModal = 'versus'
      },
      setCreate() {
        app.oppenedModal = 'create'
      },
      setDescription() {
        app.oppenedModal = 'description'
      }
    },
    computed:{

    }
  })