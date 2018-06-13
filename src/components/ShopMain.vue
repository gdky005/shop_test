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
        <el-menu-item index="1">电影排行榜</el-menu-item>
        <el-menu-item index="2">未知数据</el-menu-item>
      </el-menu>

      <div id="newRow">
        <el-table
          :data="shopData"
          style="width: 100%">
          <el-table-column
            label="id"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>名称: {{ scope.row.name }}</p>
                <p>PID: {{ scope.row.pid }}</p>
                <p>价格: {{ scope.row.price }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="处理">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row.pid)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.name)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="false">

        <el-table
          v-show="isMove"
          v-loading="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="movieData">
          <el-table-column prop="id" label="id" width="100" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="500" align="center">
          </el-table-column>
          <el-table-column prop="quote" label="评价" align="center">
          </el-table-column>
        </el-table>

        <div v-show="!isMove">
          测试页面！！！
        </div>


      </div>
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

      this.getApiData();
      this.getShopData();

      return {
        // shopData: [{
        //   id: 1,
        //   pid: "000_73",
        //   name: "HYShop_name8",
        //   price: 6,
        //   des: "HYShop_des4",
        //   add_date: 1526985868,
        //   update_time: 1526985868
        // },
        //   {
        //     id: 2,
        //     pid: "000_59",
        //     name: "HYShop_name9",
        //     price: 6,
        //     des: "HYShop_des6",
        //     add_date: 1526985877,
        //     update_time: 1526985877
        //   },
        //   {
        //     id: 3,
        //     pid: "000_61",
        //     name: "HYShop_name4",
        //     price: 5,
        //     des: "HYShop_des1",
        //     add_date: 1526985877,
        //     update_time: 1526985877
        //   },
        //   {
        //     id: 4,
        //     pid: "000_4",
        //     name: "HYShop_name5",
        //     price: 8,
        //     des: "HYShop_des3",
        //     add_date: 1526985878,
        //     update_time: 1526985878
        //   },
        //   {
        //     id: 5,
        //     pid: "000_67",
        //     name: "HYShop_name6",
        //     price: 4,
        //     des: "HYShop_des2",
        //     add_date: 1526985878,
        //     update_time: 1526985878
        //   }],
        shopData: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        // tableData: Array(3).fill(item),
        movieData: [],
        activeIndex: '1',
        activeIndex2: '1',
        loading2: false,
        isMove: true,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if (key == 1) {
          this.isMove = true;
          this.getApiData()
        } else if (key == 2) {
          this.isMove = false;
        }
      },
      getApiData: function () {
        // var url = "http://zkteam.cc/Shop/show";
        // var url = "http://zkteam.cc/api/json/movie/";

        var url = "/zkteam/api/json/movie/";
        var that = this;
        that.loading2 = true;


        this.$axios.get(url).then(function (result) {
          console.log(result);
          that.movieData = result.data.result;
          that.loading2 = false;
        });
      },
      getShopData: function () {
        var url = "/zkteam/Shop/jsonShow";
        var that = this;
        that.loading2 = true;


        this.$axios.get(url).then(function (result) {
          console.log(result);
          that.shopData = result.data.result;
          that.loading2 = false;
        });
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
