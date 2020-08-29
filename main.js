import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
	
Vue.prototype.checkLogin = function(backpage, backtype) {
	var SUID  = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SFACE=='' || SUID =='' || SRAND ==''){
		uni.redirectTo({
			url:"../login/login?backpage="+backpage+"&backtype="+backtype
		})
		return false;
	}
	return [SUID,SRAND,SNAME,SFACE];
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()