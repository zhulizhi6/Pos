<template>
  <div class="Pos">
   <el-row>
     <el-col :span="7" id="order-list">
       <el-tabs>
         <el-tab-pane label="结账">
           <!-- 表格列表 -->
            <el-table border :data="tableData" style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column label="操作" fixed="right">
               <template slot-scope="scope">
                <el-button type="text" size="small" @click="addGood(scope.row)">增加</el-button>
                <el-button type="text" size="small" @click="delSignelGood(scope.row)">删除</el-button>
               </template>
              </el-table-column>
           </el-table>
             <p>总数量: <span>{{totalCount}}</span>个  总价格: <span>{{totalPrice}}</span>元</p>
             <div class="btn">
             <el-button type="success" @click="chekOut()">结账</el-button>
             <el-button type="warning">挂单</el-button>
             <el-button type="danger" @click="delAllGood()">删除</el-button>
            </div>
         </el-tab-pane>
         <el-tab-pane label="挂单">挂单</el-tab-pane>
         <el-tab-pane label="外卖">外卖</el-tab-pane>
       </el-tabs>
     
     </el-col>
     <el-col :span="17">
       <!-- 高频率商品 -->
     <div class="ofent-goods">
       <div class="title">高频率商品</div>
       <div class="ofentGoods-list">
         <ul>
           <li v-for="goods in  oftenGoods" @click="addGood(goods)">
             <span>{{goods.goodsName}}</span>
            <span class="price">￥{{goods.price}}元</span>
           </li>
         </ul>
       </div>
     </div>
     <!-- 套餐 -->
     <div class="goods-type">
     <el-tabs>
      <el-tab-pane label="主食">
        <ul class="cookList">
          <li v-for="goods in type0Goods" @click="addGood(goods)">
           <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
           <span class="foodName">{{goods.goodsName}}</span>
           <span class="foodPrice">￥{{goods.price}}元</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="小食">
        <ul class="cookList">
          <li v-for="goods in type1Goods" @click="addGood(goods)">
           <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
           <span class="foodName">{{goods.goodsName}}</span>
           <span class="foodPrice">￥{{goods.price}}元</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="饮料">
        <ul class="cookList">
          <li v-for="goods in type2Goods" @click="addGood(goods)">
           <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
           <span class="foodName">{{goods.goodsName}}</span>
           <span class="foodPrice">￥{{goods.price}}元</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="套餐">
        <ul class="cookList">
          <li v-for="goods in type3Goods" @click="addGood(goods)">
           <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
           <span class="foodName">{{goods.goodsName}}</span>
           <span class="foodPrice">￥{{goods.price}}元</span>
          </li>
        </ul>
      </el-tab-pane>
     </el-tabs>
    </div>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Pos",
  data() {
    return {
      //  tableData: [
      //    {
      //     goodsName: "可口可乐",
      //     price: 10,
      //     count: 1
      //    },
      //    {
      //      goodsName: "爱心薯条",
      //      price: 12,
      //      count: 2
      //    },
      //    {
      //     goodsName: "香辣鸡腿堡",
      //     price: 12,
      //     count: 2
      
      //   }],
       totalCount:0,
       totalPrice:0,
       tableData:[],
       oftenGoods:[],
       type0Goods:[],
       type1Goods:[],
       type2Goods:[],
       type3Goods:[]
      // ofentGoods:[{
      //         goodsId:1,
      //         goodsName:'香辣鸡腿堡',
      //         price:18
      //     }, {
      //         goodsId:2,
      //         goodsName:'田园鸡腿堡',
      //         price:15
      //     }, {
      //         goodsId:3,
      //         goodsName:'和风汉堡',
      //         price:15
      //     }, {
      //         goodsId:4,
      //         goodsName:'快乐全家桶',
      //         price:80
      //     }, {
      //         goodsId:5,
      //         goodsName:'脆皮炸鸡腿',
      //         price:10
      //     }, {
      //         goodsId:6,
      //         goodsName:'魔法鸡块',
      //         price:20
      //     }, {
      //         goodsId:7,
      //         goodsName:'可乐大杯',
      //         price:10
      //     }, {
      //         goodsId:8,
      //         goodsName:'雪顶咖啡',
      //         price:18
      //     }, {
      //         goodsId:9,
      //         goodsName:'大块鸡米花',
      //         price:15
      //     }, {
      //         goodsId:20,
      //         goodsName:'香脆鸡柳',
      //         price:17
          
      // }],
      // type0Goods:[
      //     {
      //         goodsId:1,
      //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
      //         goodsName:'香辣鸡腿堡',
      //         price:18
      //     }, {
      //         goodsId:2,
      //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
      //         goodsName:'田园鸡腿堡',
      //         price:15
      //     }, {
      //         goodsId:3,
      //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
      //         goodsName:'和风汉堡',
      //         price:15
      //     }, {
      //         goodsId:4,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
      //         goodsName:'快乐全家桶',
      //         price:80
      //     }, {
      //         goodsId:5,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
      //         goodsName:'脆皮炸鸡腿',
      //         price:10
      //     }, {
      //         goodsId:6,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
      //         goodsName:'魔法鸡块',
      //         price:20
      //     }, {
      //         goodsId:7,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
      //         goodsName:'可乐大杯',
      //         price:10
      //     }, {
      //         goodsId:8,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
      //         goodsName:'雪顶咖啡',
      //         price:18
      //     }, {
      //         goodsId:9,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
      //         goodsName:'大块鸡米花',
      //         price:15
      //     }, {
      //         goodsId:20,
      //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
      //         goodsName:'香脆鸡柳',
      //         price:17
      //     }
          
      // ]
    }
  },
  //当页面加载完成后，讲挂单页面高度设为100%
  mounted: function() {
    //获取页面可视区的高度
    var orderList = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderList + "px";
  },
  created(){
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response=>{
      console.log(response);
      this.oftenGoods=response.data;
    })
    .catch(error=>{
      console.log(error);
      alert('亲，您的网络存在错误,请您的网络是否正常连接'); 
    })
    axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response=>{
      console.log(response);
      this.type0Goods = response.data[0];
      this.type1Goods = response.data[1];
      this.type2Goods = response.data[2];
      this.type3Goods = response.data[3];

    })
    .catch(error=>{
      console.log(error);
      alert('亲，您的网络存在错误,请您的网络是否正常连接');
    })
  },
  methods:{
    addGood(goods){
     
      //判断商品是否存在列表中
      let isHave = false;
      //定义一个变量，假设不存在
      for(let i=0;i<this.tableData.length;i++){
       if(this.tableData[i].goodsId == goods.goodsId){
         isHave = true;//设置为存在
       }
      }
      
        //存在编写相应的业务逻辑
        //如果存在，改变列表中商品的数量
      if(isHave){
        //定义一个新的数组，用过滤的方法查找goodId一样商品的位置并赋值给新的数组
       let arr = this.tableData.filter(o=>o.goodsId==goods.goodsId);
       arr[0].count++;
      }else{
        //否侧定义一个新的商品对象
        let newsGood = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};   
        //将新定义的商品对象添加到列表中
        this.tableData.push(newsGood);
      }
       this.getMoney();    
    },
    //删除单个商品
    delSignelGood(goods){
     this.tableData =  this.tableData.filter(o=>o.goodsId != goods.goodsId);
     this.getMoney();
    },
    //计算总的价格和商品数量
    getMoney(){
      this.totalCount = 0;
      this.totalPrice = 0;
      if(this.tableData){
        this.tableData.forEach((element) => {
        this.totalCount+=element.count;
        this.totalPrice=this.totalPrice+(element.price*element.count);  
        })
      }                     
    },
    //删除所有订单
    delAllGood(){
      this.tableData = [];
      this.totalCount = 0;
      this.totalPrice = 0;
    },
    //结账
    chekOut(){
      if(this.totalCount != 0){
        this.tableData = [];
        this.totalCount = 0;
        this.totalPrice = 0;
        this.$message({
          message:'恭喜你有为本店做出了一份贡献',
          type:'success'
        })
      }else{
        this.$message({
          message:'不能空结',
          type:'error'
        })
      }
    }
    
  }
  
};
</script>
<style scoped>
#order-list {
  border-right: 1px solid #ccc;
  text-align: center;
}
#order-list span {
  font-size: 20px;
  font-weight: border;
  color: #f00;
  padding: 0px 5px;
}
.title{
 padding:10px;
 height:20px;
 border-bottom:1px solid #D3DCE6;
 background-color: #F9FAFC;
}

.ofentGoods-list ul li{
  list-style-type: none;
  float:left;
  border:1px solid #E5E9F2;
  padding:10px;
  margin:5px;
  background-color:#fff;
}
.ofentGoods-list ul li .price{
  color:rgb(31, 156, 240);
}
.goods-type{
  float:left;
  margin-top:30px;
  width:100%;
  padding-left:20px;
}
.cookList{
  list-style:none; 
}
.cookList li{
  width:23%;
  height:auto;
  border:1px solid #E5E9F2;
  background:#fff;
  float:left;
  padding:10px;
  margin:2px;
  overflow: hidden;
}
.cookList li span{
  display:block;
  float:left;
  
}
.cookList .foodImg {
  width:40%;
  
}
.foodName{
  font-size:18px;
  padding-left:5px;
}
.foodPrice{
  color:#f00;
  padding:10px 0px 0px 5px;
}
</style>
