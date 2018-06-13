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
        <el-menu-item index="1" @click.native="getApiData">处理中心</el-menu-item>
        <el-menu-item index="2">个人中心</el-menu-item>
      </el-menu>

      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
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
        tableData: Array(20).fill(item),
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
        //
        // this.$axios.jsonp(url, {}, {headers: {}, emulateJSON: true})
        //   .then((result) => {
        //       console.log(result.data.message[0]);
        //       that.name = result.data.message[0].name;
        //   }
        // );


        this.$axios.get(url).then(function (result) {
          console.log(result);
          // that.name = result.data.message[0].name;
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
