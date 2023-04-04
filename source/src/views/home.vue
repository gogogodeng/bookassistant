<template>
  <div>
    <div>
      本工具仅供参考，主要用于对比不同平台活动价格差异。（不同平台之间算法可能存在略微差异，误差在几毛钱之间）
    </div>
    <hr />
    <br />
    <div v-for="(b, i) in books" :key="b.guid" style="margin-bottom: 5px">
      <label
        >名称
        <input type="text" v-model="b.name" />
      </label>
      <label
        >现价
        <input type="number" v-model="b.price" />
      </label>
      <label
        >原价
        <input type="number" v-model="b.oldprice" />
      </label>
      &nbsp;&nbsp;
      <label>预计到手价格: {{ b.total }}元, 折扣率: {{ b.percent }}%</label>
      &nbsp;
      <button
        v-if="i > 0"
        @click="removebook(b.guid)"
        style="background-color: rgb(235, 135, 135); color: #fff"
      >
        &times;
      </button>
    </div>
    <br />
    <button @click="addbook">添加书籍</button>
    <br />
    <br />
    <div v-if="tab == 2">
      合计：{{ books.length }}本，总价：{{ booksTotal }} 元，折后总价：{{
        maxValue.total
      }}
      元
    </div>
    <br />
    <div style="display: flex; margin-bottom: 5px">
      <label style="display: flex; align-items: center"
        >自定义凑单总金额
        <input type="radio" name="a" checked @change="tab = 1" />
      </label>
      &nbsp;&nbsp;
      <label style="display: flex; align-items: center"
        >使用已选书籍总价
        <input type="radio" name="a" @change="tab = 2" />
      </label>
    </div>
    <div v-if="tab == 1">
      <label
        >总共凑单金额
        <input type="text" v-model="custMax" />
      </label>
      <p>（不填自动按满减最大值计算，比如600-50，默认为刚好凑满600的价格）</p>
    </div>
    <button
      @click="calcAll()"
      style="width: 100px; height: 30px; font-size: 14px"
    >
      计算
    </button>
    <br />
    <hr />
    <div>
      <div>折扣选择</div>
      <br />
      <div>
        <label style="display: flex; align-items: center">
          <input type="checkbox" v-model="evr" />
          <div style="width: 300px; text-align: right">
            每满
            <input type="number" v-model="evrV.max" />
            减
            <input type="number" v-model="evrV.dis" />
          </div>
        </label>
      </div>
      <div>
        <label
          style="display: flex; align-items: center"
          v-for="o in options"
          :key="o.guid"
        >
          <input type="checkbox" v-model="o.checked" />
          <div style="width: 300px; text-align: right">
            满
            <input type="number" v-model="o.max" />
            减
            <input type="number" v-model="o.dis" />
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
//生成随机 GUID 数
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export default {
  data() {
    return {
      message: "",
      tab: 1,
      evr: true,
      evrV: {
        max: 100,
        dis: 50,
      },
      custMax: "",
      books: [
        {
          guid: guid(),
          name: "剪商",
          price: 99,
          oldprice: 99,
          total: undefined,
          percent: undefined,
        },
      ],
      options: [
        {
          guid: guid(),
          max: 300,
          dis: 50,
          checked: false,
        },
        {
          guid: guid(),
          max: 600,
          dis: 50,
          checked: false,
        },
        {
          guid: guid(),
          max: 600,
          dis: 60,
          checked: false,
        },
      ],
    };
  },
  computed: {
    booksTotal() {
      return this.books.length
        ? this.books.reduce((p, c) => p + c.price, 0)
        : 0;
    },
    maxValue() {
      let list = this.options.filter((f) => f.checked === true);
      let max, sum, evrsum;
      if (list.length) {
        if (this.tab == 1) {
          max = this.custMax
            ? this.custMax
            : Math.max.apply(
                Math,
                list.map((item) => {
                  return item.max;
                })
              );
        } else {
          max = this.booksTotal;
        }
        sum = list.reduce((p, c) => {
          if (max < c.max) {
            return 0;
          }
          return p + c.dis;
        }, 0);
      } else {
        max = this.booksTotal;
        sum = 0;
      }
      evrsum = this.evr ? Math.floor(max / this.evrV.max) * this.evrV.dis : 0;
      return {
        max,
        sum,
        evrsum,
        total: max - sum - evrsum,
      };
    },
  },
  methods: {
    calc(b) {
      console.log(this.maxValue);
      let x = (this.maxValue.total / this.maxValue.max) * b.price;
      b.total = x.toFixed(2);
      b.percent = (x / b.oldprice).toFixed(2) * 100;
      console.log(b);
    },
    calcAll() {
      this.books.map((m) => {
        let x = (this.maxValue.total / this.maxValue.max) * m.price;
        m.total = x.toFixed(2);
        m.percent = (x / m.oldprice).toFixed(2) * 100;
      });
    },
    addbook() {
      this.books.push({
        guid: guid(),
        name: "",
        price: 0,
        oldprice: 0,
        total: undefined,
        percent: undefined,
      });
    },
    removebook(guid) {
      this.books = this.books.filter((f) => f.guid != guid);
    },
  },
};
</script>

<style>
input {
  max-width: 100px;
  height: 20px;
  font-size: 14px;
  outline: none;
}
</style>
