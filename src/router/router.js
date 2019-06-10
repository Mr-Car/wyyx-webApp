import index from '../controllers/index'
import error from '../controllers/error'
import search from '../controllers/search'
import sort from '../controllers/sort'
export default class Router {
  constructor(obj) {
    this.mode = obj.mode
    // this.mode = 'history'
    // 路由配置
    this.routes = {
      '/': index,
      '/error': error,
      '/search': search,
      '/sort': sort,
    }
    // 组件挂载根元素
    // this.root = $('#main')
    // 导航菜单列表
    this.navList = $('.footNav a')
    this.init()
  }

  init() {
    // index()
    if (this.mode === 'hash') {
      window.addEventListener('load', this.hashRefresh.bind(this), false);
      window.addEventListener('hashchange', this.hashRefresh.bind(this), false);
    } 
  }

  /**
   * hash路由刷新执行
   * @param {object} e
   */
  hashRefresh(e) {
    // console.log(e)
    if (e.newURL) {
      var newURL = e.newURL.split('#')[1];
      var oldURL = e.oldURL.split('#')[1];
      // console.log(newURL,oldURL);
    }
    // 获取当前路径,默认'/'
    var currentURL = location.hash.slice(1).split('?')[0] || '/';
    console.log("当前路径"+currentURL);
    this.loadView(currentURL)
  }

  /**
   * 加载页面
   * @param {string} currentURL 
   */
  loadView(currentURL) {

    // 多级链接拆分为数组,遍历依次加载
    this.currentURLlist = currentURL.slice(1).split('/')
    this.url = ""
    this.currentURLlist.forEach((item, index) => {
      // 导航菜单激活显示
      if (index === 0) {
        this.navActive(item)
      }
      console.log(item);
      this.url += "/" + item
      this.controllerName = this.routes[this.url]
      // 404页面处理
      if (!this.controllerName) {
        this.errorPage()
        return false
      }
      // 对于嵌套路由的处理
      console.log("oldUrl:"+this.oldURL);
      if (this.oldURL && this.oldURL[index] == this.currentURLlist[index]) {
        this.handleSubRouter(item, index)
      } else {
        this.controller(this.controllerName)
      }
    });
    // 记录链接数组,后续处理子级组件
    this.oldURL = JSON.parse(JSON.stringify(this.currentURLlist))
  }
  /**
   * 处理嵌套路由
   * @param {string} item 链接list中当前项
   * @param {number} index 链接list中当前索引
   */
  handleSubRouter(item, index) {
    // 新路由是旧路由的子级
    if (this.oldURL.length < this.currentURLlist.length) {
      // 相同路由部分不重新加载
      if (item !== this.oldURL[index]) {
        this.controller(this.name)
        console.log('解绑状态监听事件')
        store.getSubject().unsubscribe('stateChange')
      }
    }
    // 新路由是旧路由的父级
    if (this.oldURL.length > this.currentURLlist.length) {
      var len = Math.min(this.oldURL.length, this.currentURLlist.length)
      // 只重新加载最后一个路由
      if (index == len - 1) {
        this.controller(this.name)
      }
    }
  }
  /**
   * 404页面处理
   */
  errorPage() {
    if (this.mode === 'hash') {
      location.href = '#/error'
    } else {
      history.replaceState({
        path: '/error'
      }, null, '/error')
      this.loadView('/error')
    }
  }
  /**
   * 组件控制器
   * @param {string} name 
   */
  controller(name) {
    name() // name 是当前路由匹配的那个 controller
  }
 

  /**
   * 导航激活显示
   * @param  item 当前router对象
   */
  navActive(item) {
    console.log($(`.footNav a[href="#\/${item}"] .icon-footer`).css("background-position-y"));
    $(`.footNav a[href="#\/${item}"]`).addClass("active").siblings().removeClass("active")
  }
}