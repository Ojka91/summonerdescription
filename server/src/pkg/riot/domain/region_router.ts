//The AMERICAS routing value serves NA, BR, LAN and LAS. 
//The ASIA routing value serves KR and JP. 
//The EUROPE routing value serves EUNE, EUW, TR and RU. 
//The SEA routing value serves OCE, PH2, SG2, TH2, TW2 and VN2.

export const regionRouter: { [key: string]: string } = {
    na1: 'AMERICAS',
    br1: 'AMERICAS',
    la1: 'AMERICAS',
    la2: 'AMERICAS',
    kr: 'ASIA',
    jp1: 'ASIA',
    eun1: 'EUROPE',
    euw1: 'EUROPE',
    tr1: 'EUROPE',
    ru: 'EUROPE',
    oc1: 'SEA',
    ph2: 'SEA',
    sg2: 'SEA',
    th2: 'SEA',
    tw2: 'SEA',
    vn2: 'SEA'
  }