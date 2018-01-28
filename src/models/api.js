import REST from '@/utils/rest'
import utils from '@/utils/utils'

class GetCity extends REST {
  constructor () {
    super ()
    this.baseURL = 'http://apis.map.qq.com'
    this.path = 'ws/geocoder'
    this.version = 'v1'
  }
}

class GetConfig extends REST {
  constructor () {
    super ()
    this.baseURL = 'https://eva.mintbao.com'
    this.path = 'wechat/jsapi/getSignature'
    this.headers = {
      "token": utils.getToken("token")
    }
  }
}

class Submit extends REST {
  constructor () {
    super ()
    this.baseURL = 'https://eva.mintbao.com'
    this.path = 'scheme/messages'
    this.headers = {
      "token": utils.getToken("token")
    }
  }
}

export { GetCity, GetConfig, Submit }
