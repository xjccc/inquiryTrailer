import axios from 'axios'

export default function (method, url, options, callback) {
  options['ts'] = +new Date()
  axios[method](url, {
    params: options
  })
  .then((res) => {
    callback && callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
