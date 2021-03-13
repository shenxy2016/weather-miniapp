// components/Search/SearchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputValue:{
      type: String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      this.triggerEvent("search",  e.detail.value);
    },

    textChange(e){
      this.triggerEvent("changeInput",  e.detail.value);
    }
  }
})
