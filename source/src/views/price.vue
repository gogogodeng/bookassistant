<template>
  <div>
    <div>
      一键抄作业：活动开始前手动录入购物车书名和价格，输入凑单金额，自动计算出符合的凑单组合，然后照着抄吧。
    </div>
    <hr />
    <table>
      <tr>
        <td style="width: 200px">书名</td>
        <!-- <td style="width: 250px">链接</td> -->
        <td style="width: 100px">现价</td>
        <td style="width: 100px">原价</td>
        <td style="width: 100px">锁定</td>
        <!-- <td style="width: 100px">折扣率</td> -->
      </tr>
      <tr v-for="(item, index) in books" :key="item.guid">
        <td>
          <input
            type="text"
            v-model="item.title"
            style="max-width: 90%; width: 90%"
          />
        </td>
        <!-- <td>
          <input
            type="text"
            v-model="item.url"
            style="max-width: 250px; width: 250px"
          />
        </td> -->
        <td>
          <input
            type="number"
            v-model="item.price"
            style="max-width: 70%; width: 70%"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.original_price"
            style="max-width: 70%; width: 70%"
          />
        </td>
        <td>
          <input type="checkbox" v-model="item.lock">
          <!-- <button @click="swapArrayElements(books, index, index - 1)">
            上移
          </button>
          <button @click="swapArrayElements(books, index, index + 1)">
            下移
          </button> -->
        </td>
        <td style="position: relative">
          <!-- {{ item.pr }}% -->
          <span
            @click="removebook(item.guid)"
            style="
              position: absolute;
              right: 0;
              top: 5px;
              cursor: pointer;
              color: red;
            "
            >&times;</span
          >
        </td>
      </tr>
    </table>
    <br />
    <button @click="addbook">添加</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="search">暂存</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="clear">清空</button>
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
    <hr />
    <br />
    凑单金额 <input type="number" v-model="curMoney" /> 显示
    <input type="number" v-model="curNum" /> 个结果
    <button @click="getCombo">计算凑单组合</button>
    <br />
    <strong>备注：算法默认按排列顺序计算优先级，点击锁定, 就会优先显示锁定书的组合</strong>
    <hr />
    <div>
      <ul v-for="(item, i) in combo" :key="i">
        <li>组合{{ i + 1 }}：</li>
        <li v-for="c in item.items" :key="c">
          [优惠后{{ c.total }}元，折扣率{{ c.pr }}%] 【{{ c.title }}】
        </li>
        <li>总价：[优惠后{{ item.prTotal }}元] 原价 {{ item.money }} 元</li>
      </ul>
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
      books: [
        {
          guid: guid(),
          url: "https://u.dangdang.com/qDztD",
          pid: "",
          title: "三岛由纪夫套装",
          price: 200,
          original_price: 300,
          pr: "",
          total: 0,
        },
        {
          guid: guid(),
          url: "https://u.dangdang.com/m5xfH",
          pid: "",
          title: "关于女儿",
          price: 30,
          original_price: 49,
          pr: "",
          total: 0,
        },
        {
          guid: guid(),
          url: "https://u.dangdang.com/XmZEC",
          pid: "",
          title: "诅咒兔（与诺奖得主托卡尔丘克一同入围2022年国际布克奖！）",
          price: 30,
          original_price: 60,
          pr: "",
          total: 0,
        },
        {
          guid: guid(),
          url: "https://u.dangdang.com/XmZEC",
          pid: "",
          title: "翦商",
          price: 49,
          original_price: 99,
          pr: "",
          total: 0,
        },
      ],
      options: [
        {
          guid: guid(),
          max: 300,
          dis: 100,
          checked: false,
        },
        {
          guid: guid(),
          max: 300,
          dis: 80,
          checked: false,
        },
        {
          guid: guid(),
          max: 200,
          dis: 50,
          checked: false,
        },
      ],
      evr: true,
      evrV: {
        max: 100,
        dis: 50,
      },
      curMoney: 300,
      curNum: 5,
      combo: [],
    };
  },
  computed: {
    booksTotal() {
      return this.books.length
        ? this.books.reduce((p, c) => p + +c.price, 0)
        : 0;
    },
    maxValue() {
      let list = this.options.filter((f) => f.checked === true);
      let max, sum, evrsum;
      if (list.length) {
        max = this.curMoney;

        sum = list.reduce((p, c) => {
          if (max < c.max) {
            return 0;
          }
          return p + c.dis;
        }, 0);
      } else {
        max = this.curMoney;
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
    addbook() {
      this.books.push({
        guid: guid(),
        url: "",
        title: "",
        price: "",
        original_price: "",
        pr: "",
        total: 0,
        lock: false
      });
    },
    removebook(guid) {
      var isok = confirm("你确定要删除吗？");
      if (isok) {
        this.books = this.books.filter((f) => f.guid != guid);
      }
    },
    clear() {
      this.books = [];
    },
    swapArrayElements(array, index1, index2) {
      if (
        index1 < 0 ||
        index1 >= array.length ||
        index2 < 0 ||
        index2 >= array.length
      ) {
        return;
      }
      const temp = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
    },
    search() {
      // let num = 0
      // this.books.forEach(item => {
      //   setTimeout(async () => {
      //     let res = await axios({
      //       method: 'get',
      //       url: 'http://localhost:3001/scrap/dangdang',
      //       params: {
      //         url: item.url
      //       }
      //     })
      //     item = Object.assign(item, res.data)
      //     num++
      //     if (num === this.books.length) {
      //       localStorage.setItem('books', JSON.stringify(this.books))
      //     }
      //   }, 500)
      // })
      // 暂存localstorage
      localStorage.setItem("books", JSON.stringify(this.books));
    },
    getCombo() {
      let res = this.findCombinations(
        this.books.map((m) => {
          m.money = +m.price;
          m.name = m.title;
          return m;
        }),
        this.curMoney,
        this.curNum
      );
      console.log(res);
      this.calcAll();
      this.combo = res.map((m) => {
        let filterData = this.filterObjectsById(this.books, m.guid);
        return {
          items: filterData,
          prTotal: filterData.length
            ? filterData.reduce((p, c) => p + +c.total, 0).toFixed(2)
            : 0,
          money: m.money,
        };
      });
    },
    filterObjectsById(objArray, idArray) {
      return objArray.filter((obj) => idArray.includes(obj.guid));
    },
    findObjectsByIds(targetArray, idArray) {
      return targetArray.filter(function (item) {
        var containsAllIds = idArray.every(function (id) {
          return item.guid.indexOf(id) !== -1;
        });
        return containsAllIds;
      });
    },
    findCombinations(arr, target, num = 5) {
      let result = [];
      let temp = [];
      const dfs = (start, sum) => {
        if (sum > target + 10) return;
        if (sum > target && sum <= target + 10) {
          result.push({
            guid: [...temp],
            money: sum,
          });
          return;
        }
        for (let i = start; i < arr.length; i++) {
          if (temp.includes(arr[i].guid)) continue;
          temp.push(arr[i].guid);
          dfs(i + 1, sum + arr[i].money);
          temp.pop();
        }
      };
      dfs(0, 0);
      result.sort((a, b) => {
        const diffA = Math.abs(a.money - target);
        const diffB = Math.abs(b.money - target);
        return diffA - diffB;
      });

      result = this.findObjectsByIds(result, this.books.filter(f=>!!f.lock).map(m=>{
        return m.guid
      }))
      return result.splice(0, num);
    },
    findCombinations2(arr, target, num = 5) {
      const dp = new Array(arr.length + 1);
      for (let i = 0; i <= arr.length; i++) {
        dp[i] = new Array(target + 1).fill(Number.MAX_SAFE_INTEGER);
      }
      dp[0][0] = 0;

      const choices = new Array(arr.length + 1);
      for (let i = 0; i <= arr.length; i++) {
        choices[i] = new Array(target + 1).fill(-1);
      }

      for (let i = 1; i <= arr.length; i++) {
        for (let j = 0; j <= target; j++) {
          if (j >= arr[i - 1].money) {
            if (
              dp[i - 1][j - arr[i - 1].money] !== Number.MAX_SAFE_INTEGER &&
              dp[i - 1][j - arr[i - 1].money] + arr[i - 1].money - j <
                dp[i][j] - target
            ) {
              dp[i][j] = dp[i - 1][j - arr[i - 1].money] + arr[i - 1].money;
              choices[i][j] = i - 1;
            }
          }
          if (
            dp[i - 1][j] !== Number.MAX_SAFE_INTEGER &&
            dp[i - 1][j] - j < dp[i][j] - target
          ) {
            dp[i][j] = dp[i - 1][j];
            choices[i][j] = choices[i - 1][j];
          }
        }
      }

      let idx = target;
      const result = [];
      const set = new Set();
      for (let i = 0; i < num; i++) {
        if (choices[arr.length][idx] === -1) break;
        const temp = [];
        let j = choices[arr.length][idx];
        while (j >= 0) {
          temp.push(arr[j].guid);
          idx -= arr[j].money;
          j = choices[j][idx];
        }
        const str = temp.join(",");
        if (!set.has(str)) {
          set.add(str);
          result.push({
            guid: [...temp].reverse(),
            name: temp.map((g) => arr.find((o) => o.guid === g).name).join("#"),
            money: dp[arr.length][target] - idx,
          });
        }
        idx = dp[arr.length][target] - idx;
      }

      return result;
    },
    calcAll() {
      this.books.map((m) => {
        console.log(this.maxValue)
        let x = (this.maxValue.total / this.maxValue.max) * m.price;
        m.total = x.toFixed(2);
        m.pr = ((x / m.original_price) * 100).toFixed(2);
      });
    },
  },
  mounted() {
    if (localStorage.getItem("books")) {
      this.books = JSON.parse(localStorage.getItem("books"));
    }
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
