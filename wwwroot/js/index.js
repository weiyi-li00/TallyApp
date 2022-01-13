
const options = {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
  
      const res = await fetch(url);
      if ( !res.ok )
        throw Object.assign(new Error(res.statusText + ' ' + url), { res });
      return {
        getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
      }
    },
    addStyle(styleStr) {
      const style = document.createElement('style');
      style.textContent = styleStr;
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
  
}
const { loadModule } = window['vue3-sfc-loader'];
const { ref , onMounted , reactive} = Vue;
const App = {
    data() {
      return {
        message: "Hello Element Plus",
      };
    },
    // mounted() {
    //     Vue.defineAsyncComponent( () => loadModule('sail-vue3/src/App.vue', options) )
    // },
    components: {
        'my-component': Vue.defineAsyncComponent( () => loadModule('sail-vue3/src/App.vue', options) )
      },
      template: '<my-component></my-component>'
  };
  const app = Vue.createApp(App);
  app.use(ElementPlus);
  app.mount("#app");