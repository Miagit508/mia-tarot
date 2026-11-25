/* 牌阵配置：positions 的 x/y 为牌位中心在棋盘内的百分比，rot 为牌面倾斜角度 */
window.TAROT_SPREADS = [
  {
    id: "one", name: "单张牌解析", count: 1, size: "xl",
    desc: "是非判断 · 单日运程",
    intro: "抽取一张牌做判断，简单直指核心，适合是非题与每日运势。",
    positions: [
      { label: "当下", x: 50, y: 50 }
    ]
  },
  {
    id: "free3", name: "万用三张", count: 3, size: "lg", editable: true,
    desc: "自由定义 · 万能牌阵",
    intro: "通用型牌阵，三个牌位含义可自由定义（点击牌位名可修改），适用于任何场合。",
    positions: [
      { label: "情境", x: 25, y: 50 },
      { label: "行动", x: 50, y: 50 },
      { label: "结果", x: 75, y: 50 }
    ]
  },
  {
    id: "timeline", name: "时间流", count: 3, size: "lg",
    desc: "预测未来 · 时间流向",
    intro: "平行流向的时间解析法，事件沿着时间轨道从过去延伸到未来。",
    positions: [
      { label: "过去", x: 22, y: 70 },
      { label: "现在", x: 50, y: 48 },
      { label: "未来", x: 78, y: 26 }
    ]
  },
  {
    id: "triangle", name: "圣三角", count: 3, size: "lg",
    desc: "判断情势 · 寻找成因",
    intro: "梳理问题的前因后果，比时间流更注重事物内在的因果。",
    positions: [
      { label: "起因", x: 50, y: 22 },
      { label: "经过", x: 26, y: 72 },
      { label: "结果", x: 74, y: 72 }
    ]
  },
  {
    id: "core", name: "直指核心", count: 3, size: "lg",
    desc: "问题探索 · 切中要害",
    intro: "从表象下钻到核心，适合遇到瓶颈、需要找到症结所在的时候。",
    positions: [
      { label: "表象", x: 50, y: 20 },
      { label: "核心", x: 50, y: 52 },
      { label: "突破", x: 50, y: 84 }
    ]
  },
  {
    id: "free5", name: "万用五张", count: 5, size: "md", editable: true,
    desc: "深入挖掘 · 自定义牌位",
    intro: "较复杂的通用牌阵，五个牌位含义可自由定义（点击牌位名可修改）。",
    positions: [
      { label: "现状", x: 50, y: 18 },
      { label: "阻碍", x: 26, y: 46 },
      { label: "助力", x: 74, y: 46 },
      { label: "建议", x: 36, y: 80 },
      { label: "结果", x: 64, y: 80 }
    ]
  },
  {
    id: "choice", name: "二择一", count: 6, size: "md",
    desc: "面临选择 · 权衡走向",
    intro: "两条路径摊开在眼前，比较两种选择各自的展开与最终指引。",
    positions: [
      { label: "现状", x: 50, y: 12 },
      { label: "选择A近况", x: 25, y: 40 },
      { label: "选择A走向", x: 25, y: 72 },
      { label: "选择B近况", x: 75, y: 40 },
      { label: "选择B走向", x: 75, y: 72 },
      { label: "指引", x: 50, y: 92 }
    ]
  },
  {
    id: "horseshoe", name: "马蹄铁", count: 7, size: "md",
    desc: "整体脉络 · 因果走势",
    intro: "七张牌沿马蹄弧线铺开，从过去到环境再到行动与结果，脉络完整。",
    positions: [
      { label: "现在", x: 13, y: 78 },
      { label: "过去", x: 13, y: 40 },
      { label: "自身态度", x: 30, y: 15 },
      { label: "阻碍", x: 50, y: 8 },
      { label: "环境", x: 70, y: 15 },
      { label: "行动建议", x: 87, y: 40 },
      { label: "结果", x: 87, y: 78 }
    ]
  },
  {
    id: "hexagram", name: "六芒星", count: 7, size: "md",
    desc: "解析发展 · 窥视未来",
    intro: "六芒环列、结果居中，兼具显意识与潜意识的分析，是真正的预测型牌阵。",
    positions: [
      { label: "过去", x: 50, y: 10 },
      { label: "现在", x: 80, y: 27 },
      { label: "未来", x: 80, y: 66 },
      { label: "环境", x: 50, y: 84 },
      { label: "期盼与恐惧", x: 20, y: 66 },
      { label: "建议", x: 20, y: 27 },
      { label: "结果", x: 50, y: 46 }
    ]
  },
  {
    id: "yspread", name: "Y字抉择", count: 7, size: "md",
    desc: "岔路抉择 · 看清代价",
    intro: "两条分支从同一个当下分出：守成与突破各自的走向，以及心底真正的愿望。",
    positions: [
      { label: "守成之路", x: 20, y: 12 },
      { label: "守成的代价", x: 32, y: 36 },
      { label: "突破之路", x: 80, y: 12 },
      { label: "突破的代价", x: 68, y: 36 },
      { label: "问题关键", x: 50, y: 56 },
      { label: "当下处境", x: 50, y: 80 },
      { label: "内心真愿", x: 50, y: 98 }
    ]
  },
  {
    id: "love6", name: "爱情金字塔", count: 6, size: "md",
    desc: "感情关系 · 双人视角",
    intro: "你我双方的近况、关系当下的温度、横亘的障碍与可行的行动，最终指向发展。",
    positions: [
      { label: "我的状态", x: 25, y: 16 },
      { label: "对方的状态", x: 75, y: 16 },
      { label: "关系现状", x: 50, y: 42 },
      { label: "障碍", x: 25, y: 68 },
      { label: "我可以做的", x: 75, y: 68 },
      { label: "发展方向", x: 50, y: 92 }
    ]
  },
  {
    id: "celtic", name: "凯尔特十字", count: 10, size: "sm",
    desc: "宏观审视 · 经典之首",
    intro: "十张牌层层剖析：现状与挑战交叉于中心，四柱铺开因果，权杖列出现实与结局。",
    positions: [
      { label: "当下", x: 28, y: 44 },
      { label: "挑战", x: 28, y: 44, rot: 90, cross: true },
      { label: "目标之上", x: 28, y: 14 },
      { label: "根基之下", x: 28, y: 74 },
      { label: "刚发生的过去", x: 9, y: 20 },
      { label: "临近的未来", x: 9, y: 60 },
      { label: "自我态度", x: 76, y: 88 },
      { label: "环境影响", x: 76, y: 64 },
      { label: "期盼与恐惧", x: 76, y: 40 },
      { label: "最终结果", x: 76, y: 16 }
    ]
  },
  {
    id: "diamond", name: "菱形之径", count: 4, size: "lg",
    desc: "目标路径 · 四角分明",
    intro: "四个角摊开一场行动：你站在哪、想要什么、挡在路上的是什么、最终通向哪。",
    positions: [
      { label: "处境", x: 50, y: 16 },
      { label: "所求", x: 22, y: 48 },
      { label: "阻碍", x: 78, y: 48 },
      { label: "归处", x: 50, y: 82 }
    ]
  },
  {
    id: "hearts", name: "读心牌阵", count: 5, size: "md",
    desc: "暧昧试探 · 看清对方",
    intro: "两个人各怀什么心思，明面上演的是什么，台面下藏着什么，最后的真相是什么。",
    positions: [
      { label: "我的心思", x: 25, y: 18 },
      { label: "对方的心思", x: 75, y: 18 },
      { label: "明面", x: 50, y: 45 },
      { label: "暗面", x: 50, y: 72 },
      { label: "真相", x: 50, y: 95 }
    ]
  },
  {
    id: "scale", name: "抉择天平", count: 7, size: "md",
    desc: "理性感性 · 两秤对照",
    intro: "天平两端放上理性与感性各自的得与失，再看外界之声与内心答案孰轻孰重。",
    positions: [
      { label: "悬于心上的问题", x: 50, y: 10 },
      { label: "理性之得", x: 20, y: 34 },
      { label: "理性之失", x: 20, y: 66 },
      { label: "感性之得", x: 80, y: 34 },
      { label: "感性之失", x: 80, y: 66 },
      { label: "外界之声", x: 50, y: 52 },
      { label: "内心答案", x: 50, y: 90 }
    ]
  },
  {
    id: "career6", name: "事业蓝图", count: 6, size: "md",
    desc: "职场定位 · 破局方向",
    intro: "现在的坐标、手里的牌、周遭的人与环境、卡住你的那堵墙，以及一年后的图景。",
    positions: [
      { label: "当前位置", x: 50, y: 12 },
      { label: "你的所长", x: 20, y: 38 },
      { label: "环境与人际", x: 80, y: 38 },
      { label: "瓶颈所在", x: 20, y: 70 },
      { label: "破局方向", x: 80, y: 70 },
      { label: "一年之后", x: 50, y: 93 }
    ]
  },
  {
    id: "twin", name: "双生之火", count: 8, size: "md",
    desc: "深度关系 · 灵魂课题",
    intro: "两段本质如何相遇：联结、课题与天赋并陈，穿过挑战之后看缘分归处。",
    positions: [
      { label: "我的本质", x: 25, y: 14 },
      { label: "你的本质", x: 75, y: 14 },
      { label: "我们之间的联结", x: 50, y: 34 },
      { label: "关系课题", x: 20, y: 55 },
      { label: "关系天赋", x: 80, y: 55 },
      { label: "考验", x: 28, y: 80 },
      { label: "如何共处", x: 72, y: 80 },
      { label: "去向", x: 50, y: 97 }
    ]
  },
  {
    id: "year", name: "年度之轮", count: 12, size: "xs",
    desc: "十二月运 · 命运钟面",
    intro: "十二张牌排成钟面，从一月到十二月各自值守一个月份，一整年的气韵尽收眼底。",
    positions: [
      { label: "一月", x: 50, y: 12 },
      { label: "二月", x: 69, y: 17 },
      { label: "三月", x: 82, y: 31 },
      { label: "四月", x: 88, y: 50 },
      { label: "五月", x: 82, y: 69 },
      { label: "六月", x: 69, y: 83 },
      { label: "七月", x: 50, y: 88 },
      { label: "八月", x: 31, y: 83 },
      { label: "九月", x: 18, y: 69 },
      { label: "十月", x: 12, y: 50 },
      { label: "十一月", x: 18, y: 31 },
      { label: "十二月", x: 31, y: 17 }
    ]
  }
];
