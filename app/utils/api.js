import axios from 'axios'

module.exports = {

  getInfo (person, state) {
    console.log('api',person, state, `/${person}/${state}`)
    return axios.get(`/${person}/${state}`)
    .then((info)=>{
      info.data.results[0].type = person;
      return info.data.results
    })
  }


}
