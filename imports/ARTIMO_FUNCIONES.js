import moment from 'moment-timezone'

const languageHelper = {
  formatNumber: (a,b) => a.toFixed(2)
}
const TAPi18n = {
  __ : (e) => e
}

const variables = {
  getItemDescription : (d) => d[0].Description
}
const timezonesHelper = {
  getShortTimeString: d=> moment.tz(d, 'America/Bogota').format('DD/MM/YYYY')
}

export { languageHelper,  TAPi18n, variables, timezonesHelper}