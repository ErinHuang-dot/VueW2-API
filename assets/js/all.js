"use strict";

// ------Vue------
var url = 'https://vue3-course-api.hexschool.io/v2';
var path = 'erinhuang-lab'; // 登入頁

var login = Vue.createApp({
  data: function data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login: function login() {
      axios.post("".concat(url, "/admin/signin"), this.user).then(function (res) {
        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired;
        document.cookie = "erinToken=".concat(token, "; expires=").concat(new Date(expired), "GMT;");
        window.location.href = 'products.html';
        window.alert('登入成功，即將進入商品頁面');
      })["catch"](function (error) {
        window.alert('登入失敗，請重新輸入一次');
      });
    }
  }
}).mount('#login');
var product = Vue.createApp({
  data: function data() {
    return {
      temp: {},
      products: []
    };
  },
  methods: {
    checkLogin: function checkLogin() {
      var _this = this;

      axios.post("".concat(url, "/api/user/check")).then(function (res) {
        _this.getProducts();
      })["catch"](function (error) {
        window.alert('驗證失敗，請重新登入');
        window.location.href = 'index.html';
      });
    },
    getProducts: function getProducts() {
      var _this2 = this;

      axios.get("".concat(url, "/api/").concat(path, "/admin/products")).then(function (res) {
        _this2.products = res.data.products;
      })["catch"](function (error) {
        window.alert(error);
      });
    }
  },
  mounted: function mounted() {
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)erinToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  }
}).mount('#product'); // ------JS練習------
// const url = 'https://vue3-course-api.hexschool.io/v2';
// const path = 'erinhuang-lab';
// const inputEmail = document.querySelector('#floatingEmail');
// const inputPassword = document.querySelector('#floatingPass');
// const btnLogin = document.querySelector('#btnLogin');
// const btnCheckLogin = document.querySelector('#btnCheckLogin');
// const btnGetProducts = document.querySelector('#getProducts');
// const btnAddProduct = document.querySelector('#addProduct');
// const btnDeleteProduct = document.querySelector('#deleteProduct');
// ---登入頁面
// btnLogin.addEventListener('click', login);
// function login() {
//   const username = inputEmail.value;
//   const password = inputPassword.value;
//   const user = {
//     username,
//     password
//   }
//   // 登入 API
//   axios.post(`${url}/admin/signin`, user)
//     .then((res) => {
//       console.log(res.data);
//       // 使用 cookie 儲存資訊
//       const { token, expired} = res.data;
//       document.cookie = `erinToken=${token}; expires=${new Date(expired)}GMT;`;
//       window.location.href = 'products.html';
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }
// btnCheckLogin.addEventListener('click', checkLogin);
// function checkLogin() {
//   // 使用驗證登入的API，檢視回傳訊息
//   axios.post(`${url}/api/user/check`)
//     .then((res) => {
//       console.log(res.data);
//       window.location.href = 'products.html';
//     })
//     .catch((error) => {
//       console.dir(error);
//     })
// }
// // 取得 token
// const token = document.cookie.replace(/(?:(?:^|.*;\s*)erinToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
// // 在 axios headers 加入 token 資訊
// axios.defaults.headers.common['Authorization'] = token;
// // ---產品頁面－取得產品列表資料
// btnGetProducts.addEventListener('click', getProducts);
// function getProducts() {
//   // 管理控制台API，一定要登入才能運作
//   axios.get(`${url}/api/${path}/admin/products`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((error) => {
//       console.dir(error);
//     })  
// }
// // ---產品頁面－新增產品
// btnAddProduct.addEventListener('click', addProduct);
// function addProduct() {
//   const product = {
//     data: {
//       // id: -Mu4zmvEnoJWF_P2O7BQ
//       title: "草莓莓果夾心圈",
//       category: "甜甜圈",
//       origin_price: 150,
//       price: 99,
//       unit: "個",
//       description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
//       content: "尺寸：14x14cm",
//       is_enabled: 1,
//       imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//       imagesUrl: [
//         "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
//         "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//       ]
//     }
//   }
//   // 新增產品 API(一次只能建立一筆資料)
//   axios.post(`${url}/api/${path}/admin/product`, product)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.dir(error);
//   })  
// }
// // ---產品頁面－刪除產品
// btnDeleteProduct.addEventListener('click', deleteProduct);
// function deleteProduct() {
//   axios.delete(`${url}/api/${path}/admin/product/-Mu4zmvEnoJWF_P2O7BQ`)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.dir(error);
//   })  
// }
//# sourceMappingURL=all.js.map
