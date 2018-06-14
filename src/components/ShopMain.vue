<template>

  <el-container style="height: 800px; border: 1px solid gray;">
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
        <el-menu-item index="1">Shop</el-menu-item>
        <el-menu-item index="2">增加数据</el-menu-item>
      </el-menu>

      <div id="newRow" v-show="true">
        <el-table
          v-show="isMove"
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

        <div v-show="!isMove" style="background: white; padding: 10px 50px 10px 10px;"
             v-loading="loading2"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
          <div style="margin: 20px;"></div>

          <el-form :model="shopInfo" status-icon :rules="rules" ref="shopInfo" label-width="120px">
            <el-form-item label="默认 Id:" prop="id">
              <el-input v-model.number="shopInfo.id" ></el-input>
            </el-form-item>
            <el-form-item label="商品名称 Pid:" prop="pid">
              <el-input v-model.number="shopInfo.pid" ></el-input>
            </el-form-item>
            <el-form-item label="商品名称:">
              <el-input v-model="shopInfo.name" ></el-input>
            </el-form-item>
            <el-form-item label="商品价格:" prop="price">
              <el-input v-model.number="shopInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="商品描述:">
              <el-input v-model="shopInfo.des"></el-input>
            </el-form-item>
          </el-form>

          <el-button type="primary" @click="confirmInfo(shopInfo)"> 提交按钮</el-button>
        </div>
      </div>
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
        rules: {
          id: [
            { validator: checkNumber}
          ],
          pid: [
            { validator: checkNumber}
          ],
          price: [
            { validator: checkNumber, trigger: 'blur'}
          ]
        },

        shopInfo: {
          id: '1',
          pid: '11',
          name: '11_name',
          price: '101',
          des: '描述'
        },
        shopData: [],
        movieData: [],
        activeIndex: '1',
        activeIndex2: '1',
        loading2: false,
        isMove: true,
      };
    },
    methods: {

      handleSelect(key, keyPath) {
        if (key == 1) {
          this.isMove = true;
          this.getShopData()
        } else if (key == 2) {
          this.isMove = false;
        }
      },
      getShopData: function () {
        var url = "/zkteam/Shop/jsonShow?pageCount=10";
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
            that.addDataSuccess();
            return true;
          }
          that.addDataError();
        }).catch(function (error) {
          console.log(error);
          that.addDataError();
        });
      },
      addDataSuccess() {
        this.$message({
          message: '添加数据成功！',
          type: 'success'
        });
      },
      addDataError() {
        this.$message.error('添加数据失败！');
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
