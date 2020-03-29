<template>
  <div class="category">
    <van-search placeholder="商品搜索 共239万款好物" input-align="center" v-model="searchData" />
    <van-tree-select
      height="calc(100vh - 104px)"
      :items="items"
      :main-active-index.sync="activeIndex"
      @click-nav="changeRight"
    >
      <template #content>
        <div class="imgbanner">
          <img :src="bannerImg" width="100%" alt="">
        </div>

        <van-grid :column-num="3">
          <van-grid-item v-for="(item,index) in subCategoryList" :key="index" :icon="item.wap_banner_url" :text="item.name" :to="'/categoryList/'+item.id" />        </van-grid>
      </template>
    </van-tree-select>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import TabBtn from "@/components/TabBtn.vue";
import axios from "axios";
import api from "@/assets/config/api.js";
export default {
  name: "",
  data() {
    return {
      searchData: "",
      activeIndex: 0,
      subCategoryList:[],
      data: {},
      bannerImg:''
    };
  },
  async created() {
    let res = await axios.get(api.CatalogList)
    let data = res.data;
    this.data = data.data;
    this.subCategoryList = this.data.currentCategory.subCategoryList
    this.bannerImg = this.data.currentCategory.img_url
    // console.log(data)
  },
  computed: {
      items() {
        //[{text: '分组1'},{text: '分组2'}],
        // console.log(this.data)
        if (this.data.categoryList == undefined) {
          return []
        } else {
          let arr = []
          this.data.categoryList.forEach((item, index) => {
            item.text = item.name
            arr.push(item)
          })
          return arr;
        }
      },
  },
  methods: {
    changeRight(index) {
      // console.log(index)
      this.activeIndex = index;
    }
  },  
  watch:{
    async activeIndex(){
      if(this.items.length!==0){
        let id = this.items[this.activeIndex].id;
        let res = await axios.get(api.CatalogCurrent,{params:{id}})
        // console.log(res)
        this.subCategoryList = res.data.data.currentCategory.subCategoryList
        this.bannerImg = this.items[this.activeIndex].img_url
        // console.log(this.subCategoryList)
      }else{
        this.subCategoryList = []
      }
    }
  },
  components: {
    TabBtn
  }
};
</script>
<style lang="less" scoped>
    .category{
      .imgbanner{
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
      }
    }
</style>