export default defineAppConfig({
  pages: [
    'pages/planManage/planManage',
    'pages/addPlan/addPlan',
    'pages/home/index',
    'pages/index/index',
    'pages/statistics/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '计划清单',
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
        "pagePath": "pages/planManage/planManage",
        "iconPath": "assets/images/plan-manage.png",
        "selectedIconPath": "assets/images/plan-manage-selected.png",
        "text": "计划清单"
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
