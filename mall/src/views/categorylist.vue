<template>
  <div class="categoryList">
    <van-tabs v-model="tabActive">
      <van-tab v-for="(item,index) of clist"
      :key="index" 
      :title="item.name">
      <h3>{{item.name}} </h3>
      <p>{{item.front_name}} </p>
  <div v-if="item.plist">

<van-grid :border="true" :column-num="2">
  <van-grid-item :to="'/product/'+item1.id" v-for="(item1,index1) of item.plist.data" :key="index1">
    <van-image fit="contain" width="100" height="100" :src="item1.list_pic_url" />
    <h4 class="van-ellipsis">{{item1.name}}</h4>
    <p class="price">¥{{item1.retail_price}} </p>
  </van-grid-item>
</van-grid>
</div>

      </van-tab>
    </van-tabs>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from 'axios'
import TabBtn from "@/components/TabBtn.vue";

export default {
  name: "categorylist",
  props:['id'],
  data() {
    return {
      tabActive: 0,
      clist:[]
    };
  },
  async created(){
    // console.log(this.id)
    // console.log(this.$root.api)
    let res = await axios.get(this.$root.api.GoodsCategory,{params:{id:this.id}})
    // console.log(res.data)
    this.clist = res.data.data.brotherCategory
    let id = this.clist[0].id;
    
    //this.getlist(id,1)
    this.clist.forEach(async (item,index)=>{
      item.plist = await this.getlist(item.id,1)
      // console.log(item.plist)
      this.$forceUpdate()
    })
  },
  methods: {
    async getlist(cid,page){
     let res = await axios.get(this.$root.api.GoodsList,{params:{categoryId:cid,page,size:20}})
      this.data = res.data.data;
      return this.data
    },
  },
  components: {
    TabBtn
  }
};
</script>
<style lang="less" scoped>
  .categoryList{
    .van-ellipsis{
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }
    .van-grid-item{
      overflow: hidden;
      box-sizing: border-box;
    }
    .price{
      padding: 0 10px;
      color: red;
    }
  }
</style>