<template lang="html">
  <div class="">
    <!-- <div class="l-title">
       <img @click='back(nu)' src="static/f1.png" alt="">
       <p @click='change(1)'>保单编辑</p>
    </div> -->
    <div @click='ren()' class="add-ro l-ass">
       <p>被保险人</p>
       <span v-model='gai4' v-if="show7=='show7'">{{selectStr7}}</span>
       <span v-else>{{benren}}</span>
      <img src="static/enter.png" alt="">
    </div>
    <div class="add-ro2">
      <p class="baoxian">保险产品名称</p>
       <input v-model='dom' class='name' type="text" name="" value="" placeholder='请填写'>
    </div>
    <div class="add-ro2">
      <p class="baoxian bao">险种</p>
       <input v-model='dom1' class='name' type="text" name="" value="" placeholder='请填写'>
    </div>
    <div class="add-ro2">
      <p class="baoxian xian">保额(万)</p>
       <input v-model='dom2' class='name' type="text" name="" value="" placeholder='请填写'>

    </div>
    <div @click='start()' class="add-ro">
      <p>开始日期</p>
      <span v-model='gai1' v-if="show3=='show3'">{{selectStr1}}</span>
      <span v-else>{{nu.effectiveDate}}</span>
      <img src="static/enter.png" alt="">
    </div>
    <div @click='to()' class="add-ro">
      <p class="youxiao">有效期</p>
      <span v-model='gai2' v-if="show6=='show6'">{{selectStr2}}</span>
      <span v-else-if="nu.expirationDate" class="span1">{{nu.expirationDate}}</span>
      <span v-else class="span1">至终身</span>
      <img src="static/enter.png" alt="">
    </div>
    <vue-pickers :style="onj4" :show="show8"
								:selectData="pickData3"
								v-on:cancel="close3"
								v-on:confirm="confirmFn3">
		</vue-pickers>
    <vue-pickers :style="onj2" :show="show2"
								:selectData="pickData2"
								v-on:cancel="close1"
								v-on:confirm="confirmFn1">
		</vue-pickers>
    <vue-pickers :style="onj3" :show="show5"
								:selectData="pickData4"
								v-on:cancel="close2"
								v-on:confirm="confirmFn2">
		</vue-pickers>
    <div @click='save(nu)' class="l-bottom">
        <p>保存</p>
    </div>
  </div>
</template>
<script>
import VuePickers from 'vue-pickers'
 var shu;
export default {
  components: {
    VuePickers
  },

  data() {
    return {
      hi:{},
      policyId:'',
      dom:'',
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
      baoxian: {
        '重疾险': '1',
        '意外险': '2',
        '医疗险': '3',
        '定期寿险': '4'
      },
      renyuan: {
        '爸爸': 'father',
        '妈妈': 'monther',
        '配偶爸爸': 'father1',
        '配偶妈妈': 'monther1',
        '本人': 'self',
        '配偶': 'spouse',
        '儿子': 'boy',
        '女儿': 'girl',
        '大儿子': 'boy1',
        '二儿子': 'girl1',
        '小儿子': 'boy2',
        '大女儿': 'girl2',
        '二女儿': 'girl3',
        '小女儿': 'girl3'

      },
      benren:'',
      gai1:'',
      gai2:'',
      gai3:'',
      gai4:'',
      mingc:'',
      edu:'',
      duixianga:{},
      qule: true,
      nianfen: '',
      er: '',
      duixiang: {},
      addbao: '',
      value1: '',
      value2: '',
      value3: '',
      show8: false,
      show7:false,
      show9: '',
      show6: '',
      de: [],
      dom1:'',
      dom2:'',
      nu:'',
      show5: false,
      show: '',
      show1: '',
      show3: '',
      onj: {
        display: 'none'
      },
      onj2: {
        display: 'none'
      },
      onj3: {
        display: 'none'
      },
      onj4: {
        display: 'none'
      },
      mu:'',
      member:'',
      selectStr1: '',
      selectStr2: '',
      selectStr4: '',
      selectStr7: '',
      show1: false,
      show2: false,
      pickData3: {
        columns: 1,
        pData1: [{
            text: '本人',
            value: '本人'
          },
          {
            text: '配偶',
            value: '配偶'
          },
          {
            text: '儿子',
            value: '儿子'
          },
          {
            text: '爸爸',
            value: '爸爸'
          },
          {
            text: '妈妈',
            value: '妈妈'
          },
          {
            text: '配偶爸爸',
            value: '配偶爸爸'
          },
          {
            text: '配偶妈妈',
            value: '配偶妈妈'
          },
          {
            text: '女儿',
            value: '女儿'
          },
          {
            text: '大女儿',
            value: '大女儿'
          },
          {
            text: '二女儿',
            value: '二女儿'
          },
          {
            text: '小女儿',
            value: '小女儿'
          },
          {
            text: '大儿子',
            value: '大儿子'
          },
          {
            text: '二儿子',
            value: '二儿子'
          },
          {
            text: '三儿子',
            value: '三儿子'
          }

        ]
      },
      pickData2: {
        columns: 3,
        pData1: [
          {
              text: '1999',
              value: 1999
            },
            {
              text: '2000',
              value: 2000
            },
            {
              text: '2001',
              value: 2001
            },
            {
              text: '2002',
              value: 2002
            },
            {
              text: '2003',
              value: 2003
            },
            {
              text: '2004',
              value: 2004
            },
            {
              text: '2005',
              value: 2005
            },
            {
              text: '2006',
              value: 2006
            },
            {
              text: '2007',
              value: 2007
            },
            {
              text: '2008',
              value: 2008
            },
            {
              text: '2009',
              value: 2009
            },
            {
              text: '2010',
              value: 2010
            },
            {
              text: '2011',
              value: 2011
            },
            {
              text: '2012',
              value: 2012
            },
            {
              text: '2013',
              value: 2013
            },
            {
              text: '2014',
              value: 2014
            },
            {
              text: '2015',
              value: 2015
            },
            {
              text: '2016',
              value: 2016
            },
            {
              text: '2017',
              value: 2017
            },
            {
              text: '2018',
              value: 2018
            },
            {
              text: '2019',
              value: 2019
            },
            {
              text: '2020',
              value: 2020
            },
            {
              text: '2021',
              value: 2021
            },
            {
              text: '2022',
              value: 2022
            },
            {
              text: '2023',
              value: 2023
            },
            {
              text: '2024',
              value: 2024
            },
            {
              text: '2025',
              value: 2025
            },
            {
              text: '2026',
              value: 2026
            },
            {
              text: '2027',
              value: 2027
            },
            {
              text: '2028',
              value: 2028
            },
            {
              text: '2029',
              value: 2029
            },
            {
              text: '2030',
              value: 2030
            },
            {
              text: '2031',
              value: 2031
            },
            {
              text: '2032',
              value: 2032
            },
            {
              text: '2033',
              value: 2033
            },
            {
              text: '2034',
              value: 2034
            },
            {
              text: '2035',
              value: 2035
            },
            {
              text: '2036',
              value: 2036
            },
            {
              text: '2037',
              value: 2037
            },
            {
              text: '2038',
              value: 2038
            },
            {
              text: '2039',
              value: 2039
            },
            {
              text: '2040',
              value: 2040
            },
            {
              text: '2041',
              value: 2041
            },
            {
              text: '2042',
              value: 2042
            },
            {
              text: '2043',
              value: 2043
            },
            {
              text: '2044',
              value: 2044
            },
            {
              text: '2045',
              value: 2045
            },
            {
              text: '2046',
              value: 2046
            },
            {
              text: '2047',
              value: 2047
            },
            {
              text: '2048',
              value: 2048
            },
            {
              text: '2049',
              value: 2049
            },
            {
              text: '2050',
              value: 2050
            },
            {
              text: '2051',
              value: 2051
            },
            {
              text: '2052',
              value: 2052
            },
            {
              text: '2053',
              value: 2053
            },
            {
              text: '2054',
              value: 2054
            },
            {
              text: '2055',
              value: 2055
            },
            {
              text: '2056',
              value: 2056
            },
            {
              text: '2057',
              value: 2057
            },
            {
              text: '2058',
              value: 2058
            },
            {
              text: '2059',
              value: 2059
            },
            {
              text: '2060',
              value: 2060
            },
            {
              text: '2061',
              value: 2061
            },
            {
              text: '2062',
              value: 2062
            },
            {
              text: '2063',
              value: 2063
            },
            {
              text: '2064',
              value: 2064
            },
            {
              text: '2065',
              value: 2065
            },
            {
              text: '2066',
              value: 2066
            },
            {
              text: '2067',
              value: 2067
            },
            {
              text: '2068',
              value: 2068
            },
            {
              text: '2069',
              value: 2069
            },
            {
              text: '2070',
              value: 2070
            },
            {
              text: '2070',
              value: 2070
            },
            {
              text: '2071',
              value: 2071
            },
            {
              text: '2072',
              value: 2072
            },
            {
              text: '2073',
              value: 2073
            },
            {
              text: '2074',
              value: 2074
            },
            {
              text: '2075',
              value: 2075
            },
            {
              text: '2076',
              value: 2076
            },
            {
              text: '2077',
              value: 2077
            },
            {
              text: '2078',
              value: 2078
            },
            {
              text: '2079',
              value: 2079
            },
            {
              text: '2080',
              value: 2080
            },
            {
              text: '2081',
              value: 2081
            },
            {
              text: '2082',
              value: 2082
            },
            {
              text: '2083',
              value: 2083
            },
            {
              text: '2084',
              value: 2084
            },
            {
              text: '2085',
              value: 2085
            },
            {
              text: '2086',
              value: 2086
            },
            {
              text: '2087',
              value: 2087
            },
            {
              text: '2088',
              value: 2088
            },
            {
              text: '2089',
              value: 2089
            },
            {
              text: '2090',
              value: 2090
            },
            {
              text: '2091',
              value: 2091
            },
            {
              text: '2092',
              value: 2092
            },
            {
              text: '2093',
              value: 2093
            },
            {
              text: '2094',
              value: 2094
            },
            {
              text: '2095',
              value: 2095
            },
            {
              text: '2096',
              value: 2096
            },
            {
              text: '2097',
              value: 2097
            },
            {
              text: '2098',
              value: 2098
            },
            {
              text: '2099',
              value: 2099
            },
            {
              text: '2100',
              value: 2100
            },
            {
              text: '2101',
              value: 2101
            },
            {
              text: '2102',
              value: 2102
            },
            {
              text: '2103',
              value: 2103
            },
            {
              text: '2104',
              value: 2104
            },
            {
              text: '2105',
              value: 2105
            },
            {
              text: '2106',
              value: 2106
            }

        ],
        pData2: [{
            text: '01',
            value: 1
          },
          {
            text: '02',
            value: 2
          },
          {
            text: '03',
            value: 3
          },
          {
            text: '04',
            value: 4
          },
          {
            text: '05',
            value: 5
          },
          {
            text: '06',
            value: 6
          },
          {
            text: '07',
            value: 7
          },
          {
            text: '08',
            value: 8
          },
          {
            text: '09',
            value: 9
          },
          {
            text: '10',
            value: 10
          },
          {
            text: '11',
            value: 11
          },
          {
            text: '12',
            value: 12

          },
        ],
        pData3: [{
            text: '01',
            value: 1
          },
          {
            text: '02',
            value: 2
          },
          {
            text: '03',
            value: 3
          },
          {
            text: '04',
            value: 4
          },
          {
            text: '05',
            value: 5
          },
          {
            text: '06',
            value: 6
          },
          {
            text: '07',
            value: 7
          },
          {
            text: '08',
            value: 8
          },
          {
            text: '09',
            value: 9
          },
          {
            text: '10',
            value: 10
          },
          {
            text: '11',
            value: 11
          },
          {
            text: '12',
            value: 12
          },
          {
            text: '13',
            value: 13
          },
          {
            text: '14',
            value: 14
          },
          {
            text: '15',
            value: 15
          },
          {
            text: '16',
            value: 16
          },
          {
            text: '17',
            value: 17
          },
          {
            text: '18',
            value: 18
          },
          {
            text: '19',
            value: 19
          },
          {
            text: '20',
            value: 20
          },

          {
            text: '21',
            value: 21
          },
          {
            text: '22',
            value: 22
          },
          {
            text: '23',
            value: 23
          },
          {
            text: '24',
            value: 24
          },
          {
            text: '25',
            value: 25
          },
          {
            text: '26',
            value: 26
          },
          {
            text: '27',
            value: 27
          },
          {
            text: '28',
            value: 28
          },
          {
            text: '29',
            value: 29
          },
          {
            text: '30',
            value: 30
          },
        ]
      },
      pickData4: {
        columns: 3,
        pData1: [
          {
              text: '1999',
              value: 1999
            },
            {
              text: '2000',
              value: 2000
            },
            {
              text: '2001',
              value: 2001
            },
            {
              text: '2002',
              value: 2002
            },
            {
              text: '2003',
              value: 2003
            },
            {
              text: '2004',
              value: 2004
            },
            {
              text: '2005',
              value: 2005
            },
            {
              text: '2006',
              value: 2006
            },
            {
              text: '2007',
              value: 2007
            },
            {
              text: '2008',
              value: 2008
            },
            {
              text: '2009',
              value: 2009
            },
            {
              text: '2010',
              value: 2010
            },
            {
              text: '2011',
              value: 2011
            },
            {
              text: '2012',
              value: 2012
            },
            {
              text: '2013',
              value: 2013
            },
            {
              text: '2014',
              value: 2014
            },
            {
              text: '2015',
              value: 2015
            },
            {
              text: '2016',
              value: 2016
            },
            {
              text: '2017',
              value: 2017
            },
            {
              text: '2018',
              value: 2018
            },
            {
              text: '2019',
              value: 2019
            },
            {
              text: '2020',
              value: 2020
            },
            {
              text: '2021',
              value: 2021
            },
            {
              text: '2022',
              value: 2022
            },
            {
              text: '2023',
              value: 2023
            },
            {
              text: '2024',
              value: 2024
            },
            {
              text: '2025',
              value: 2025
            },
            {
              text: '2026',
              value: 2026
            },
            {
              text: '2027',
              value: 2027
            },
            {
              text: '2028',
              value: 2028
            },
            {
              text: '2029',
              value: 2029
            },
            {
              text: '2030',
              value: 2030
            },
            {
              text: '2031',
              value: 2031
            },
            {
              text: '2032',
              value: 2032
            },
            {
              text: '2033',
              value: 2033
            },
            {
              text: '2034',
              value: 2034
            },
            {
              text: '2035',
              value: 2035
            },
            {
              text: '2036',
              value: 2036
            },
            {
              text: '2037',
              value: 2037
            },
            {
              text: '2038',
              value: 2038
            },
            {
              text: '2039',
              value: 2039
            },
            {
              text: '2040',
              value: 2040
            },
            {
              text: '2041',
              value: 2041
            },
            {
              text: '2042',
              value: 2042
            },
            {
              text: '2043',
              value: 2043
            },
            {
              text: '2044',
              value: 2044
            },
            {
              text: '2045',
              value: 2045
            },
            {
              text: '2046',
              value: 2046
            },
            {
              text: '2047',
              value: 2047
            },
            {
              text: '2048',
              value: 2048
            },
            {
              text: '2049',
              value: 2049
            },
            {
              text: '2050',
              value: 2050
            },
            {
              text: '2051',
              value: 2051
            },
            {
              text: '2052',
              value: 2052
            },
            {
              text: '2053',
              value: 2053
            },
            {
              text: '2054',
              value: 2054
            },
            {
              text: '2055',
              value: 2055
            },
            {
              text: '2056',
              value: 2056
            },
            {
              text: '2057',
              value: 2057
            },
            {
              text: '2058',
              value: 2058
            },
            {
              text: '2059',
              value: 2059
            },
            {
              text: '2060',
              value: 2060
            },
            {
              text: '2061',
              value: 2061
            },
            {
              text: '2062',
              value: 2062
            },
            {
              text: '2063',
              value: 2063
            },
            {
              text: '2064',
              value: 2064
            },
            {
              text: '2065',
              value: 2065
            },
            {
              text: '2066',
              value: 2066
            },
            {
              text: '2067',
              value: 2067
            },
            {
              text: '2068',
              value: 2068
            },
            {
              text: '2069',
              value: 2069
            },
            {
              text: '2070',
              value: 2070
            },
            {
              text: '2070',
              value: 2070
            },
            {
              text: '2071',
              value: 2071
            },
            {
              text: '2072',
              value: 2072
            },
            {
              text: '2073',
              value: 2073
            },
            {
              text: '2074',
              value: 2074
            },
            {
              text: '2075',
              value: 2075
            },
            {
              text: '2076',
              value: 2076
            },
            {
              text: '2077',
              value: 2077
            },
            {
              text: '2078',
              value: 2078
            },
            {
              text: '2079',
              value: 2079
            },
            {
              text: '2080',
              value: 2080
            },
            {
              text: '2081',
              value: 2081
            },
            {
              text: '2082',
              value: 2082
            },
            {
              text: '2083',
              value: 2083
            },
            {
              text: '2084',
              value: 2084
            },
            {
              text: '2085',
              value: 2085
            },
            {
              text: '2086',
              value: 2086
            },
            {
              text: '2087',
              value: 2087
            },
            {
              text: '2088',
              value: 2088
            },
            {
              text: '2089',
              value: 2089
            },
            {
              text: '2090',
              value: 2090
            },
            {
              text: '2091',
              value: 2091
            },
            {
              text: '2092',
              value: 2092
            },
            {
              text: '2093',
              value: 2093
            },
            {
              text: '2094',
              value: 2094
            },
            {
              text: '2095',
              value: 2095
            },
            {
              text: '2096',
              value: 2096
            },
            {
              text: '2097',
              value: 2097
            },
            {
              text: '2098',
              value: 2098
            },
            {
              text: '2099',
              value: 2099
            },
            {
              text: '2100',
              value: 2100
            },
            {
              text: '2101',
              value: 2101
            },
            {
              text: '2102',
              value: 2102
            },
            {
              text: '2103',
              value: 2103
            },
            {
              text: '2104',
              value: 2104
            },
            {
              text: '2105',
              value: 2105
            },
            {
              text: '2106',
              value: 2106
            }

        ],
        pData2: [{
            text: '01',
            value: 1
          },
          {
            text: '02',
            value: 2
          },
          {
            text: '03',
            value: 3
          },
          {
            text: '04',
            value: 4
          },
          {
            text: '05',
            value: 5
          },
          {
            text: '06',
            value: 6
          },
          {
            text: '07',
            value: 7
          },
          {
            text: '08',
            value: 8
          },
          {
            text: '09',
            value: 9
          },
          {
            text: '10',
            value: 10
          },
          {
            text: '11',
            value: 11
          },
          {
            text: '12',
            value: 12

          },
        ],
        pData3: [{
            text: '01',
            value: 1
          },
          {
            text: '02',
            value: 2
          },
          {
            text: '03',
            value: 3
          },
          {
            text: '04',
            value: 4
          },
          {
            text: '05',
            value: 5
          },
          {
            text: '06',
            value: 6
          },
          {
            text: '07',
            value: 7
          },
          {
            text: '08',
            value: 8
          },
          {
            text: '09',
            value: 9
          },
          {
            text: '10',
            value: 10
          },
          {
            text: '11',
            value: 11
          },
          {
            text: '12',
            value: 12
          },
          {
            text: '13',
            value: 13
          },
          {
            text: '14',
            value: 14
          },
          {
            text: '15',
            value: 15
          },
          {
            text: '16',
            value: 16
          },
          {
            text: '17',
            value: 17
          },
          {
            text: '18',
            value: 18
          },
          {
            text: '19',
            value: 19
          },
          {
            text: '20',
            value: 20
          },

          {
            text: '21',
            value: 21
          },
          {
            text: '22',
            value: 22
          },
          {
            text: '23',
            value: 23
          },
          {
            text: '24',
            value: 24
          },
          {
            text: '25',
            value: 25
          },
          {
            text: '26',
            value: 26
          },
          {
            text: '27',
            value: 27
          },
          {
            text: '28',
            value: 28
          },
          {
            text: '29',
            value: 29
          },
          {
            text: '30',
            value: 30
          },
        ]
      },
    }
  },
  methods: {
     back(t){

       this.$router.push({
         // console.log(this.policyId);
         path: '/xiang',
         query: {
            xinxi:t,
            renyuan:this.$route.query.renyuan,
            memberId:this.$route.query.memver
          //  poli:this.policyId,
          //  guo: er,
          //  addbaos: this.addbao
         }
       })
     },
     start(){
       this.show2 = true
      this.onj2 = {
        display: '',
      }
     },
     ren(){
       this.show8 = true
      this.onj4 = {
        display: '',
      }
     },
     to(){
       this.show5 = true
      this.onj3 = {
        display: '',
      }
    },
     close1() {
      this.show2 = false;
      console.log('取消');
      this.onj2 = {
        display: 'none'
      }
      this.show3 = 'show3'
    },
    close3() {
     this.show2 = false;
     console.log('取消');
    this.onj4 = {
       display: 'none'
     }
     this.show3 = false
     this.show8=true;
   },
    close2() {
    this.show5 = false;
    console.log('取消');
    this.onj3 = {
      display: 'none'
    }
    this.show6 = 'show6'
  },
  confirmFn1(data) {
    this.onj2 = {
      display: 'none'
    }
    this.selectStr1 = data.select1.text
    console.log(data)
    if (data.select2) {
      this.selectStr1 += '-' + data.select2.text
    }
    if (data.select3) {
      this.selectStr1 += '-' + data.select3.text
    }
    this.close1()
    this.show3 = 'show3'
    this.duixianga.effectiveDate=this.selectStr1
  },
  confirmFn2(data) {
      this.onj3 = {
        display: 'none'
      }
      this.selectStr2 = data.select1.text
      console.log(data)
      if (data.select2) {
        this.selectStr2 += '-' + data.select2.text
      }
      if (data.select3) {
        this.selectStr2 += '-' + data.select3.text
      }
      this.close2()
      this.show6 = 'show6'
      this.duixianga.expirationDate=this.selectStr2
    },
    confirmFn3(data) {
      this.onj4 = {
        display: 'none'
      }
      this.selectStr7 = data.select1.text
      console.log(data)
      if (data.select2) {
        this.selectStr7 += '-' + data.select2.text
      }
      if (data.select3) {
        this.selectStr7 += '-' + data.select3.text
      }
      this.close3()
      this.show7 = 'show7'
    },
    save(t){
      if (this.selectStr1) {
        this.hi.effectiveDate = this.selectStr1;
      }else {
        this.hi.effectiveDate = this.nu.effectiveDate;
      }
      if (this.selectStr2) {
        this.hi.expirationDate = this.selectStr2;
      }else {
        this.hi.expirationDate = this.nu.expirationDate;
      }
        //  this.hi.effectiveDate = this.gai1;
        //  this.hi.expirationDate = this.gai2;
         this.hi.productName = this.dom;
         this.hi.label = this.renyuan[this.selectStr7+''];
         this.hi.productType = this.baoxian[this.dom1+''];
         this.hi.sumInsured = parseInt(this.dom2)*10000;
         this.hi.policyId = this.nu.policyId;
          var that = this;
             $.ajax({
                        url: this.domain+'/policy/updatePolicy',
                        type:"POST",//请求方法
                        headers : { 'content-type' : 'application/json', "token":this.getCookie("token")},
                        data:JSON.stringify(that.hi),
                        success: data => {
                          console.log(that.hi);
                            console.info("成功发送数据到服务器")
                            console.info(data);
                            that.$router.push({
                              path: '/goods',
                              query:{
                                xinxi:that.hi
                              }

                            })

                                //    this.$router.push({
                                //        path: '/xiang' ,
                                //        query: {
                                //          xinxi:t,
                                //          policyId:this.nu.policyId,
                                //          memberId:this.mu,
                                //          renyuan: this.benren,
                                 //
                                //      }
                                //  })
                        },
                        error:function(){
                          console.info("发送数据到服务器111失败")
                        }

                    });


    },
  },
  created() {
    var that = this;
     console.log(this.$route.query);
     that.nu = this.$route.query.xinxi;
     that.dom = that.nu.productName;
     console.log(that.nu.productType);
      that.dom1 = that.baoxianType[that.nu.productType+''];
      console.log(that.dom1);
      that.dom2 =  parseInt(that.nu.sumInsured)/10000;
     this.benren = this.$route.query.renyuan;
     var mber = this.$route.query.memver;
     this.mu = this.$route.query.memver;
     var ii = this.$route.query.policyId;
     that.policyId = ii;
     this.axios.get(this.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res) {
       if(res.data.isSuccess){
         console.log(res.data.result.members);
         for (var i = 0; i < res.data.result.members.length; i++) {
           for (var j = 0; j < res.data.result.members[i].policies.length; j++) {
                  if (res.data.result.members[i].policies[j].policyId==ii) {
                    console.log('ddddd');
                        that.nu = res.data.result.members[i].policies[j]
                        console.log(that.nu);
                        that.dom = that.nu.productName
                  }
           }
         }
       } else if(res.data.errorCode == '10001'){
         this.login();
       } else {
         alert(res.data.errorMsg);
       }

     })
  },
  mounted() {
    //  $('.name').val(this.member[0].productName);
  }
}
</script>
@import './assets/index.css'
<style lang="css" scoped>

.l-title{
    height: 100px;
    background: white;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display:flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #E7E7E7;
}
.l-title img{

  width: 10%;
  height: 90%;
  flex: 0 1 auto;
}
.l-title p{
margin-top: -6px;
  line-height: 100px;
  font-size: 32px;
  text-align: center;
   width: 80%;
  flex: 0 1 auto;
}
.fan{
   text-align:right;
}
.add-ro{
  width: 100%;
  border-bottom: 0.01rem solid #E7E7E7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}
.l-ass{
  margin-top:100px;
  font-size: 32px;
}
.add-ro2{
  position: relative;
  font-size: 32px;
  height: 100px;
  width: 100%;
  border-bottom: 0.01rem solid #E7E7E7;
}
.add-ro2 .bao{
position: absolute;
left: 20px;
}
.add-ro2 .name{
  margin-top: 30px;
  border: none;
  width: auto;
  float: right;
  font-size: 32px;
}
.add-ro2 .name:focus{
  outline: none;
}
.add-ro2 .baoxian{
  float: left;
}
.add-ro img{
  width: 3%;
  height: 3%;

}
.add-ro p{
  font-size: 32px;

  width: 30%;

}
.add-ro span{
  font-size: 32px;
  text-align: right;
  width: 50%;
  margin-left: 40px;
}
.add-ro .baoxian{
  margin-left: -3px;
}
.add-ro .span{
  padding-right: 20px;
}

.add-ro .span1{
  margin-left: 50px;
}
.add-ro1{
  height: 54px;
    border-bottom: 0.01rem solid #E7E7E7;
  width: 100%;
}
.add-ro1 .baoe{
  margin-left: 6px;
  float: left;
}
.add-ro1 .span4{
  margin-top: 20px;
  float: right;
  margin-right: 8px;
}
.add-ro1 .inpu1{
  border: none;
  margin-top: 20px;
  float: right;
  width: 30px;
}
.add-ro1 .inpu1:focus{
  outline: none;
}
.add-ro1 .inpu2{
  border: none;
  margin-top: 20px;
  float: right;
  width: 50px;
}
.add-ro1 .inpu2:focus{
  outline: none;
}
.l-bottom{
  font-size: 32px;
  height: 60px;
  margin-top: 50px;
  border-radius: 3% 3% 3% 3%;
  background: #F4D046;
  width: 90%;
  margin-left: 20px;
}
.l-bottom p{
  text-align: center;
  line-height: 60px;
}

</style>
