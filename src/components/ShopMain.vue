<template>

  <el-container tyle="height: 500px; border: 1px solid #eee">
    <el-header>
      <el-button type="text" class="fontStyle">Shop Test</el-button>


    </el-header>
    <el-main>

      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#E6A23C">
        <el-menu-item index="1" @click.native="getApiData">电影排行榜</el-menu-item>
        <el-menu-item index="2">未知数据</el-menu-item>
      </el-menu>

      <el-table :data="movieData">
        <el-table-column prop="id" label="id" width="100" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="500" align="center">
        </el-table-column>
        <el-table-column prop="quote" label="评价" align="center">
        </el-table-column>
      </el-table>

    </el-main>
  </el-container>

</template>

<script>
  // import axios from 'axios'

  export default {

    name: "ShopMain",
    data() {

      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };

      return {
        tableData: Array(3).fill(item),
        movieData: [],
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      getApiData: function () {
        // var url = "http://zkteam.cc/Shop/show";
        // var url = "http://zkteam.cc/api/json/movie/";

        var url = "/zkteam/api/json/movie/";
        var that = this;


        this.$axios.get(url).then(function (result) {
          console.log(result);
          that.movieData = result.data.result
        });
      }
    }
  }
</script>

<style scoped>
  .fontStyle {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
  }
</style>
