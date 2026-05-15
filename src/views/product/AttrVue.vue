<template>
  <div>
    <el-card class="search-card">
      <el-form ref="form" :model="form" label-width="80px" >
          <el-form-item label="一级分类" >
            <el-select v-model="model" placeholder="" >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="二级分类" >
            <el-select v-model="model" placeholder="">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="三级分类" >
            <el-select v-model="model" placeholder="">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
      </el-form>
    </el-card>
    <el-card class="attr-card">
      <el-button type="primary" disabled>
        <el-icon>
          <Plus />
        </el-icon>
        <span>
          添加平台属性
        </span>
      </el-button>
      <el-table :data="data" style="width: 100%">
          <el-table-column prop="prop" width="width">
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.el-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0;
  margin: 0;
  .el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
    .el-select{
      width: 300px;
    }
  }
}
.attr-card{
  margin-top: 20px;
}
</style>
