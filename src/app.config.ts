export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/statistics/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '早睡计划',
    navigationBarTextStyle: 'black'
  },
  tabBar : {
    color: "#999",
    selectedColor: "#27d5ef",
    borderStyle: "black",
    position: "bottom",
    backgroundColor: "#fff",
    list: [
      {
        "pagePath": "pages/home/index",
        "iconPath": "assets/images/home.png",
        "selectedIconPath": "assets/images/hone-selected.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/statistics/index",
        "iconPath": "assets/images/statistics.png",
        "selectedIconPath": "assets/images/statistics-selected.png",
        "text": "统计"
      },
    ],
  },
})
