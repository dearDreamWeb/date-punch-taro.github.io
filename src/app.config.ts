export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '早睡计划',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#27d5ef",
    "borderStyle": "white",
    "position": "bottom",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "pages/home/home",
        "iconPath": "assets/images/home.png",
        "selectedIconPath": "assets/images/hone-selected.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/statistics/statistics",
        "iconPath": "assets/images/home.png",
        "selectedIconPath": "assets/images/hone-selected.png",
        "text": "统计"
      },
    ],
  },
})
