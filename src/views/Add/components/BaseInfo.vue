<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" style="width: 100%">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="form.goods_name"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model.number="form.goods_price"></el-input>
      </el-form-item>

      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model.number="form.goods_weight"></el-input>
      </el-form-item>

      <el-form-item label="商品数量" prop="goods_quantity">
        <el-input v-model.number="form.goods_quantity"></el-input>
      </el-form-item>

      <p>商品分类</p>
      <br />
      <el-select v-model="form.goods_category" placeholder="请选择">
        <el-option label="111" value="111"></el-option>
      </el-select>
    </el-form>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      // 表单数据
      form: {
        goods_name: '',
        goods_weight: '',
        goods_quantity: '',
        goods_category: '',
        goods_price: ''
      },
      // 表单校验规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' },
          { min: 2, max: 8, message: '商品名为2-8个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '商品价格必须为数字', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { type: 'number', message: '商品重量必须为数字', trigger: 'blur' }
        ],
        goods_quantity: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { type: 'number', message: '商品数量必须为数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
