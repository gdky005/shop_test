<template>

  <el-container style="height: 800px; border: 1px solid gray;">
    <el-header>
      <el-button type="text" class="fontStyle">Shop Test</el-button>


    </el-header>
    <el-main>

      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Shop" :name=GLOBAL.tabs[0]>

          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#409EFF"
            text-color="#fff"
            active-text-color="#ffb49a">
            <el-menu-item index="1">刷新</el-menu-item>
          </el-menu>

          <el-table
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
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
                  <p>Id: {{ scope.row.id }}</p>
                  <p>PID: {{ scope.row.pid }}</p>
                  <p>名称: {{ scope.row.name }}</p>
                  <p>价格: {{ scope.row.price }}</p>
                  <p>描述: {{ scope.row.des }}</p>
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
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>


        <el-tab-pane label="增加数据" :name=GLOBAL.tabs[1]>
          <div style="background: white; padding: 10px 50px 10px 10px;"
               v-loading="loading2"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
            <div style="margin: 20px;"></div>

            <el-form :model="shopInfo" status-icon :rules="rules" ref="shopInfo" label-width="120px">
              <el-form-item label="默认 Id:" prop="id">
                <el-input v-model.number="shopInfo.id"></el-input>
              </el-form-item>
              <el-form-item label="商品名称 Pid:" prop="pid">
                <el-input v-model.number="shopInfo.pid"></el-input>
              </el-form-item>
              <el-form-item label="商品名称:">
                <el-input v-model="shopInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model.number="shopInfo.price"></el-input>
              </el-form-item>
              <el-form-item label="商品描述:">
                <el-input v-model="shopInfo.des"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="primary" @click="confirmInfo(shopInfo)"> 提交</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="搜索" :name=GLOBAL.tabs[2]>

          <div>

            <el-row :gutter="20">
              <el-col :span="10" :offset="6">
                <el-input
                  placeholder="请输入 pid 搜索"
                  prefix-icon="el-icon-search"
                  v-model="searchPid">
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="searchShopInfo" :loading="searchLoading">搜索</el-button>
              </el-col>
            </el-row>



            <!--<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">-->
              <!--<el-form-item label="名称">-->
                <!--<el-input v-model="formLabelAlign.name"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="活动区域">-->
                <!--<el-input v-model="formLabelAlign.region"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="活动形式">-->
                <!--<el-input v-model="formLabelAlign.type"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-form>-->



            <div style="margin: 20px;"></div>
            <div style="background: #F5F7FA; padding: 20px; border: 2px solid #F5F7FA; text-align: left">

              <el-form :model="searchInfo" style="padding: 10px;" :label-position="left">
                <el-form-item label="Id  : ">
                  <el-text class="fontStyle">{{ searchInfo.id }}</el-text>
                </el-form-item>

                <el-form-item label="PID: ">
                  <el-text class="fontStyle">{{ searchInfo.pid }}</el-text>
                </el-form-item>

                <el-form-item label="名称: ">
                  <el-text class="fontStyle">{{ searchInfo.name }}</el-text>
                </el-form-item>

                <el-form-item label="价格: ">
                  <el-text class="fontStyle">{{ searchInfo.price }}</el-text>
                </el-form-item>

                <el-form-item label="描述: ">
                  <el-text class="fontStyle">{{ searchInfo.des }}</el-text>
                </el-form-item>
              </el-form>
            </div>



          </div>
        </el-tab-pane>
      </el-tabs>

    </el-main>
  </el-container>

</template>

<script>
  export default {

    name: "ShopMain",
    data() {
      this.getShopData();

      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!/^[0-9]+$/.test(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('必须大于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };



      return {
        activeName: this.GLOBAL.tabs[2],
        activeIndex: '1',

        searchPid: '',
        searchLoading: false,

        isMove: true,
        loading2: false,

        shopData: [],
        movieData: [],

        shopInfo: {
          id: '1',
          pid: '11',
          name: '11_name',
          price: '101',
          des: '描述'
        },
        searchInfo: {
          id: '',
          pid: '',
          name: '',
          price: '',
          des: ''
        },

        rules: {
          id: [
            {validator: checkNumber}
          ],
          pid: [
            {validator: checkNumber}
          ],
          price: [
            {validator: checkNumber, trigger: 'blur'}
          ]
        },
      };
    },
    methods: {

      handleClick(tab, event) {
        console.log(tab, event);
        if (tab.name === this.GLOBAL.tabs[0]) {
          this.getShopData();
        }  else if (tab.name === this.GLOBAL.tabs[1]) {
          this.shopInfo = {};
        } else if (tab.name === this.GLOBAL.tabs[2]) {
          this.searchInfo = {};
        }

      },

      handleSelect(key, keyPath) {
        if (key == 1) {
          this.isMove = true;
          this.getShopData()
        } else if (key == 2) {
          this.isMove = false;
        }
      },
      getShopData: function () {
        var url = "/zkteam/Shop/jsonShow?pageCount=20";
        var that = this;
        that.loading2 = true;

        this.$axios.get(url).then(function (result) {
          console.log(result);
          that.shopData = result.data.result;
          that.loading2 = false;
        });
      },
      submitButton: function (shopInfo) {
        var url = "/zkteam/Shop/add";
        var that = this;
        that.loading2 = true;

        this.$axios.get(url, {
          params: {
            id: shopInfo.id,
            pid: shopInfo.pid,
            name: shopInfo.name,
            price: shopInfo.price,
            des: shopInfo.des
          }
        }).then(function (result) {
          console.log(result);

          that.loading2 = false;
          if (result.data.message === "ok") {
            that.addDataSuccess('添加数据成功！');
            return true;
          }
          that.addDataError('添加数据失败！');
        }).catch(function (error) {
          console.log(error);
          that.addDataError('添加数据失败！');
        });
      },


      deleteButton: function (shopInfo) {
        var url = "/zkteam/Shop/delete";
        var that = this;
        that.loading2 = true;

        this.$axios.get(url, {
          params: {
            pid: shopInfo.pid
          }
        }).then(function (result) {
          console.log(result);

          that.loading2 = false;
          if (result.data.message === "ok") {
            that.addDataSuccess("删除数据成功！");
            that.getShopData();
            return true;
          }
          that.addDataError("删除数据失败！");
        }).catch(function (error) {
          console.log(error);
          that.addDataError("删除数据失败！");
        });
      },

      queryButton: function (shopInfo) {
        var url = "/zkteam/Shop/query";
        var that = this;
        that.loading2 = false;

        this.$axios.get(url, {
          params: {
            pid: shopInfo.pid
          }
        }).then(function (result) {
          console.log(result);
          // that.loading2 = false;
          if (result.data.message === "ok") {
            that.shopInfo = result.data.result;
            that.isMove = false;

            return true;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      searchShopInfo: function () {
        var url = "/zkteam/Shop/query";
        var that = this;
        this.searchLoading = true;

        this.$axios.get(url, {
          params: {
            pid: this.searchPid
          }
        }).then(function (result) {
          console.log(result);
          that.searchLoading = false;

          if (result.data.message === "ok") {
            that.searchInfo = result.data.result;

            if (that.searchInfo !== '') {
              that.addDataSuccess("搜索成功");
            } else {
              that.addDataError("搜索数据为空");
            }
            return true;
          }
          that.addDataError("搜索出现异常：" + result.data.result);
        }).catch(function (error) {
          console.log(error);
          that.searchLoading = false;
          that.addDataError("搜索出现异常：" + error);
        });
      },

      addDataSuccess(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      addDataError(msg) {
        this.$message.error(msg);
      },


      confirmInfo(shopInfo) {
        this.$confirm('是否确定修改数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitButton(shopInfo);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      confirmItemInfo(shopInfo) {
        this.$confirm('是否删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteButton(shopInfo);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },


      handleEdit(index, row) {
        console.log(index, row);
        this.activeName = this.GLOBAL.tabs[1];
        this.queryButton(row);

      },
      handleDelete(index, row) {
        console.log(index, row);
        this.confirmItemInfo(row);
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
