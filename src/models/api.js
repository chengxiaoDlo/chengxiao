import REST from '@/utils/rest'

class GetCity extends REST {
  constructor () {
    super ()
    this.baseURL = 'http://apis.map.qq.com'
    this.path = 'ws/geocoder'
    this.version = 'v1'
  }
}

export { GetCity }
