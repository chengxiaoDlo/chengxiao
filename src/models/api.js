import REST from '@/utils/rest'

class GetCity extends REST {
  constructor () {
    super ()
    this.baseURL = 'tx'
    this.path = 'ws/geocoder'
    this.version = 'v1'
  }
}

export { GetCity }
