import Vue from 'vue'
import App from './App'
import request from 'utils/request.js'
import uView from "uview-ui";
import moment from 'moment';

// 设置语言为中文
moment.locale("zh-cn");

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.request = request;
Vue.prototype.CONFIGURL = 'http://157.122.54.189:9088';
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
