<template lang="html">
 <div class="ll-bao">
   <div v-if='shake' class="l-title">
      <img @click='back()' src="static/f1.png" alt="">
      <p @click='change(1)'>手工添加保单</p>
   </div>
   <div class="add-ro l-ass">
      <p class="type">被保险人</p>
      <p class="fan">{{er}}</p>
   </div>
   <div class="add-ro2">
     <p class="baoxian">保险产品名称</p>

      <input v-if='panduan' v-model='dom' class='name' type="text" name="" value="" placeholder='请填写'>
      <input v-else class='name' type="text" name="" value="" placeholder='请填写'>
   </div>
   <div v-if='panduan' @click='baotype()' class="add-ro">
     <p class="type">保险类型</p>
     <span class="baolei" v-if="show=='show2'">{{selectStr}}</span>
     <span v-else>{{baoxianType[zong.productType+'']}}</span>
     <img src="static/enter.png" alt="">
   </div>
   <div v-else @click='baotype()' class="add-ro">
     <p class="type">保险类型</p>
     <span class="baolei" v-if="show=='show2'">{{selectStr}}</span>
     <span v-else>请选择</span>
     <img src="static/enter.png" alt="">
   </div>
   <div v-if='panduan' @click='start()' class="add-ro">
     <p class="type">开始日期</p>
     <span v-if="show3=='show3'">{{selectStr1}}</span>
     <span v-else>{{zong.effectiveDate}}</span>
     <img src="static/enter.png" alt="">
   </div>
   <div v-else @click='start()' class="add-ro">
     <p class="type">开始日期</p>
     <span v-if="show3=='show3'">{{selectStr1}}</span>
     <span v-else>请选择</span>
     <img src="static/enter.png" alt="">
   </div>
   <div v-if='zong.expirationDate' @click='to()' class="add-ro">
       <p class="youxiao">有效期</p>
       <span v-if="show6=='show6'">{{selectStr2}}</span>
       <span v-else class="span1">{{zong.expirationDate}}</span>
       <img src="static/enter.png" alt="">
     </div>
   <div v-else class="add-ro">
     <p class="type">是否终身</p>
     <div class="add-ros lala">
       <p class="yes" @click='kai()'>是</p>
       <p class="no" @click='guan()'>否</p>
     </div>

   </div>
   <div v-if='zhanxian' @click='to()' class="add-ro">
     <p class="youxiao">有效期</p>
     <span v-if="show6=='show6'">{{selectStr2}}</span>
     <span v-else class="span1">请选择</span>
     <img src="static/enter.png" alt="">
   </div>
   <div class="add-ro1">
     <p class="baoe">保额(万元)</p>
     <!-- <span class="span4">万元</span> -->

     <input v-if='panduan' v-model='dom1' class='inpu1' type="text" name="" value="" placeholder='请填写'>
     <input v-else class="inpu1" type="text" name="" value="" placeholder='请填写保额'>
  </div>



   <vue-pickers :style="onj" :show="show1"
               :selectData="pickData1"
               v-on:cancel="close"
               v-on:confirm="confirmFn">
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
   <vue-pickers :style="onj4" :show="show8"
               :selectData="pickData3"
               v-on:cancel="close3"
               v-on:confirm="confirmFn3">
   </vue-pickers>
   <div @click='save(duixianga)' class="l-bottom">
       <p><img src="static/save.png" alt=""></p>
   </div>
 </div>
</template>
<script>

import VuePickers from 'vue-pickers'

export default {
 components: {
   VuePickers
 },

 data() {
   return {
     shake:true,
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
     panduan:false,
     zong:'',
     dom:'',
     dom1:'',
     cookie:'',
     mingc:'',
     edu:'',
     duixianga:{},
     qule: true,
     zhanxian:'',
     nianfen: '',
     er: '',
     duixiang: {},
     addbao: '',
     value1: '',
     value2: '',
     value3: '',
     show8: false,
     policyId:'',
     show9: '',
     show6: '',
     de: [],
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
     selectStr: '',
     selectStr1: '',
     selectStr2: '',
     selectStr4: '',
     show1: false,
     show2: false,
     pickData1: {
       columns: 1,
       pData1: [{
           text: '重疾险',
           value: '重疾险'
         },
         {
           text: '医疗险',
           value: '医疗险'
         },
         {
           text: '意外险',
           value: '意外险'
         },
         {
           text: '定期寿险',
           value: '定期寿险'
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
       pData2: [
         {
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
       pData3: [

         {
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
         }
       ]
     },
     pickData4: {
       columns: 3,
       pData1: [{
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

         }
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
         }
       ]
     },
     pickData3: {
       columns: 1,
       pData1: [{
           text: '父亲',
           value: '父亲'
         },
         {
           text: '母亲',
           value: '母亲'
         },
         {
           text: '儿子',
           value: '儿子'
         },
         {
           text: '女儿',
           value: '女儿'
         },
         {
           text: '本人',
           value: '本人'
         },
         {
           text: '配偶',
           value: '配偶'
         },
       ]
     },
   }
 },
 methods: {
   back() {
     this.$router.push({
       path: '/xiang',
       query: {
         xinxi:this.$route.query.xinxi,
         // policyId:this.pocy,
         renyuan: this.$route.query.renyuan,

       }
     })
   },
   kai(){
     this.zhanxian = false
   },
   guan(){
     this.zhanxian = true
   },
   close() {
     this.show1 = false;
     console.log('取消');
     this.onj = {
       display: 'none'
     }
     this.show = 'show2'
   },
   confirmFn(data) {
     this.onj = {
       display: 'none'
     }
     this.selectStr = data.select1.text
     console.log(data)
     if (data.select2) {
       this.selectStr += '-' + data.select2.text
     }
     if (data.select3) {
       this.selectStr += '-' + data.select3.text
     }
     this.close()
     this.show = 'show2'

     if (this.selectStr=='重疾险') {
       this.duixianga.productType = 1
     }else if (this.selectStr=='医疗险') {
        this.duixianga.productType = 3
     }else if (this.selectStr=='意外险') {
        this.duixianga.productType = 2
     }else if (this.selectStr=='定期寿险') {
        this.duixianga.productType = 4
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
   close3() {
     this.show8 = false;
     console.log('取消');
     this.onj4 = {
       display: 'none'
     }
     this.show9 = 'show9'
   },
   confirmFn3(data) {
     this.onj4 = {
       display: 'none'
     }
     this.selectStr4 = data.select1.text
     console.log(data)
     if (data.select2) {
       this.selectStr4 += '-' + data.select2.text
     }
     if (data.select3) {
       this.selectStr4 += '-' + data.select3.text
     }
     this.close3()
     this.show9 = 'show9'

   },
   baotype() {
     this.show1 = true
     this.onj = {
       display: ''
     }
   },
   start() {
     this.show2 = true
     this.onj2 = {
       display: '',
     }
   },
   to() {
     this.show5 = true
     this.onj3 = {
       display: '',
     }
   },
   save(er) {

    if (this.panduan!=true) {


     if ($('.name').val()&&this.selectStr&&this.selectStr1&&$('.inpu1').val()) {
       console.log(er);
       var that = this;

       $.ajax({
                  url: this.domain+'/policy/addPolicy',
                  type:"POST",//请求方法
                  headers : { 'content-type' : 'application/json', "token":this.getCookie("token")},
                  data:JSON.stringify(er),
                  success: data => {
                      console.info("成功发送数据到服务器")
                      console.info(data);

                      that.policyId = data.result.policyId;
                      console.log(that.policyId);
                      er.policyId = that.policyId;
                      this.$router.push({
                        // console.log(this.policyId);
                        path: '/goods',
                        query: {
                          id: this.$route.query.policyId,
                          guo: er

                        }
                      })

                  }

              });

     }else {
       this.$message({
         message: '请填写完整',
         type: 'warning'
       })
     }

  }else {
    var that = this;
    this.duixianga.productName = this.dom;
    this.duixianga.label = this.renyuan[this.er+''];
    if (this.selectStr) {
      this.duixianga.productType = this.baoxian[this.selectStr+''];
    }else {
       this.duixianga.productType = this.zong.productType;
    }

    // this.duixianga.productType = this.zong.productType;
    if (this.dom1) {
      this.duixianga.sumInsured = parseInt(this.dom1)*10000;
    }else {
      this.duixianga.sumInsured =  $('.inpu1').val()*10000;
    }

    if (this.selectStr1) {
      this.duixianga.effectiveDate = this.selectStr1;
    }else {
      this.duixianga.effectiveDate = this.zong.effectiveDate;
    }
    if (this.selectStr2) {
      this.duixianga.expirationDate = this.selectStr2;
    }else{
      this.duixianga.expirationDate = this.zong.expirationDate;
    }
    that.duixianga.policyId = this.$route.query.policyId;
    console.log(that.duixianga);




    $.ajax({
               url: this.domain+'/policy/updatePolicy',
               type:"POST",//请求方法
               headers : { 'content-type' : 'application/json', "token":this.getCookie("token")},
               data:JSON.stringify(that.duixianga),
               success: data => {
                   console.info("成功发送数据到服务器")
                   console.info(data);
                  //  that.policyId = data.result.policyId;
                  //  console.log(that.policyId);
                  //  er.policyId = that.policyId;
                   this.$router.push({
                     // console.log(this.policyId);
                     path: '/goods',
                     query: {
                       id: this.$route.query.policyId,
                       guo: er,
                       label:er.label

                     }
                   })

               }

           });
  }



     this.Bus.$emit('chuanzhi', 'my')




   }
 },
 created() {
   console.log(this.$route.query);
   if (this.$route.query.memberId) {
     this.shake = false
   }else {
     this.shake = true;
   }
   if (this.$route.query.xinxi) {
     this.panduan = true;
     this.zong = this.$route.query.xinxi
     this.dom = this.$route.query.xinxi.productName
     this.dom1 = parseInt(this.$route.query.xinxi.sumInsured)/10000
     console.log(this.dom1);
   }else {
     this.panduan = false;
   }
   this.duixianga.label = this.$route.query.memberId;
   this.er = this.$route.query.renyuan;
   console.log(this.er);
   var add = this.$route.params;
   this.addbao = add.id;
 },
 watch:{
   '$route' (newV, oldV) {
     console.log(oldV.path);
   if (oldV.path=='/goods') {
      this.shake = false;

   }else {
     this.shake = true;
   }
   if (oldV.path=='/xiang') {
      this.shake = true;
   }
 }
 },
 mounted() {
   var that = this; 
   $('.inpu1').blur(function(event) {
     var  reg  =  new  RegExp("^[0-9]*$");
     if (!reg.test($('.inpu1').val())) { 
       that.$message({
         type: 'info',
         message: `请输入数字`
       })  
     } 
   });
   $('.inpu2').blur(function(event) {
     var  reg  =  new  RegExp("^[0-9]*$");
     if (!reg.test($('.inpu2').val())) { 
       that.$message({
         type: 'info',
         message: `请输入数字`
       })  
     } 
   });
   var that = this;
   $(".name").blur(function() {
     this.value1 = $('.name').val();
     that.duixianga.productName = this.value1;

   });
   $(".inpu1").blur(function() {
     this.value2 = $('.inpu1').val();
     that.duixianga.sumInsured = parseInt(this.value2)*10000;

   });
   $('.no').click(function(event) {
      $(this).css({
        "border":"1px solid #EBBB00",
        "color":'#EBBB00'
      });
      $('.yes').css({
        "border":"1px solid #808080",
        "color":'#808080'
      });
   });
   $('.yes').click(function(event) {
      $(this).css({
        "border":"1px solid #EBBB00",
        "color":'#EBBB00'
      });
      $('.no').css({
        "border":"1px solid #808080",
        "color":'#808080'
      });
   });
 }
}
</script>
<style lang="css" scoped>

/*@import '../../src/assets/index.css'*/


.l-title{
   background: white;
   z-index: 100;
   display:flex;
   flex-direction: row;
   width: 100%;
   /*border-bottom: 1px solid #E7E7E7;*/
}
.ll-bao{
 width: 100%;
}
.l-title img{

 width: 10%;
 height: 90%;
 flex: 0 1 auto;
}
.l-title p{
 font-size: 32px;
 text-align: center;
  width: 80%;
 flex: 0 1 auto;
}
.fan{
  text-align:right;
  margin-right: 30px;
  color: #808080;
}
.add-ro{
 width: 100%;
 border-bottom: 0.01rem solid #E7E7E7;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;

}
/*.add-ros{
 display: flex;
 flex-direction: row;
 justify-content:space-between;
 align-items: center;
 width: 40%;
}*/
.lala{
 width: 50%;

}
.add-ros p{
 text-align:center;

 padding:10px 40px;
border:2px solid #808080;
 width:70px;
 border-radius:25px;
 font-size: 28px;
 -moz-border-radius:25px;
 float: left;
 margin-left: 20px;
 color: #808080;
}
.add-ros p:nth-of-type(1){
   border:2px solid #EBBB00;
   color: #EBBB00;
}
.l-ass{
 /*margin-top:100px;*/
 font-size: 32px;
 /*padding-left: 20px;*/
 /*padding-right: 20px;*/
}
.add-ro2{
 height: 100px;
 font-size: 32px;
 width: 100%;
 border-bottom: 0.01rem solid #E7E7E7;
}
.add-ro2 .name{
 margin-top: 20px;
 border: none;
 width: auto;
 float: right;
 font-size:32px;
 color: #808080;
}
.add-ro2 .name:focus{
 outline: none;
}
.add-ro2 .baoxian{
 float: left;
 margin-left: 20px;
}
.add-ro img{
 width: 3%;
 height: 3%;
 margin-left: -100px;
}

.add-ro span{
 font-size: 32px;
 text-align: right;
 width: 50%;
 margin-left: 40px;
 color: #808080;
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
 font-size: 32px;
 height: 100px;
 border-bottom: 0.01rem solid #E7E7E7;
 width: 100%;
}
.add-ro1 .baoe{
 margin-left: 20px;
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
 width: 200px;
 font-size: 32px;
 color: #808080;
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

 margin-top:80px;
 /*border-radius: 3% 3% 3% 3%;
 background: #F4D046;*/
 width: 100%;

 /*margin-left: 30px;*/
 /*height: 80px;
 line-height: 80px;*/
 /*border-radius: 25px;*/
}
.l-bottom p img{
width: 100%;
 text-align: center;
 /*line-height: 80px;
 font-size: 32px;*/
}
.type{
 margin-left: 20px;
 font-size: 30px;
}
.youxiao{
 font-size: 30px;
 margin-left: 20px;
}
</style>
