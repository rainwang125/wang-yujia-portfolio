/*
  作品内容编辑区：把下方的标题、说明、标签和链接换成你的真实作品即可。
  image 可填图片路径（例如 "images/project-01.jpg"）；留空则显示彩色占位封面。
*/
const portfolioWorks = {
  copywriting: [
    { number: "01", title: "《朝疆》世界观设定", type: "游戏文案 / 世界观", description: "古风权谋 RPG 的核心规则、四大阵营与主少国疑的叙事设定。", tag: "World Building", color: "pink", link: "web-assets/copywriting/world.jpg", image: "web-assets/covers/copywriting/world.jpg" },
    { number: "02", title: "《朝疆》角色设计", type: "游戏文案 / 角色", description: "武将世家质子纪清霜的人物小传、核心冲突与成长弧光。", tag: "Character Design", color: "butter", link: "web-assets/copywriting/character.jpg", image: "web-assets/covers/copywriting/character.jpg" },
    { number: "03", title: "《囚笼》系统文案", type: "游戏文案 / 悬疑", description: "围绕心理惊悚游戏的技能、道具、任务与关键选择交互文案。", tag: "Game Writing", color: "mint", link: "web-assets/copywriting/system.jpg", image: "web-assets/covers/copywriting/system.jpg" },
    { number: "04", title: "游戏化剧情脚本设计", type: "互动叙事 / 心理悬疑", description: "以《囚笼》为例，设计治疗对话、梦境解谜、现实调查与关键抉择的分支体验。", tag: "Narrative Design", color: "peach", link: "web-assets/copywriting/narrative.jpg", image: "web-assets/covers/copywriting/narrative.jpg" },
    { number: "05", title: "角色对话台词设计", type: "角色对话设计", description: "以花滑姐妹为主角的日常与冲突对话，呈现竞技体育中的情感张力。", tag: "Dialogue", color: "sky", link: "web-assets/copywriting/dialogue.jpg", image: "web-assets/covers/copywriting/dialogue.jpg" }
  ],
  screenplays: [
    { number: "01", title: "《囚笼》", type: "心理悬疑 / 游戏化剧情", description: "治疗师追查病人的犯罪梦境，却发现自己才是被操控的实验品。", tag: "悬疑", color: "sky", link: "screenplay-pages.html?script=cage", image: "" },
    { number: "02", title: "《双生》", type: "现实 / 运动题材", description: "两位花滑少女在阶级差异与体育公平之间做出选择。", tag: "现实", color: "lilac", link: "screenplay-pages.html?script=twins", image: "" },
    { number: "03", title: "《我与我》", type: "成长 / 奇幻", description: "花滑少女意外遇见八年后的自己，重新理解热爱与未来。", tag: "成长", color: "peach", link: "screenplay-pages.html?script=self", image: "" },
    { number: "04", title: "《最后的心跳》", type: "情感 / 运动题材", description: "姐姐因空难离世后，妹妹如何完成两人未尽的花滑梦想。", tag: "情感", color: "pink", link: "screenplay-pages.html?script=heartbeat", image: "" },
    { number: "05", title: "Speculum", type: "心理惊悚", description: "家庭主妇卷入杀夫案件，在梦境与现实之间追问真相。", tag: "惊悚", color: "mint", link: "screenplay-pages.html?script=speculum", image: "" }
  ],
  directing: [
    { number: "01", title: "《双生》", type: "导演作品", description: "点击前往 Bilibili 观看完整作品。", tag: "Bilibili", color: "pink", link: "https://www.bilibili.com/video/BV1NiuH6hERH/", image: "web-assets/covers/directing/twins.jpg" },
    { number: "02", title: "《Speculum》", type: "导演作品", description: "点击前往 Bilibili 观看完整作品。", tag: "Bilibili", color: "sky", link: "https://www.bilibili.com/video/BV17wuK6BEoN/", image: "web-assets/covers/directing/speculum.jpg" },
    { number: "03", title: "《马拉美的婚礼》", type: "导演作品", description: "点击前往 Bilibili 观看完整作品。", tag: "Bilibili", color: "butter", link: "https://www.bilibili.com/video/BV1MjtJ63E9K/", image: "web-assets/covers/directing/wedding.jpg" },
    { number: "04", title: "《我与我》", type: "导演作品", description: "点击前往 Bilibili 观看完整作品。", tag: "Bilibili", color: "lilac", link: "https://www.bilibili.com/video/BV12Ptn6METS/", image: "web-assets/covers/directing/self.jpg" },
    { number: "05", title: "《最后的心跳ai》", type: "AI 视频作品", description: "点击播放视频作品。", tag: "Video", color: "peach", link: "web-assets/videos/last-heartbeat-ai-web.mp4", video: "web-assets/videos/last-heartbeat-ai-web.mp4" }
  ],
  planning: [
    { number: "01", title: "汉服社国风市集活动", type: "校园活动策划", description: "以传统文化体验为核心，设计国风换装、民俗游戏、手作与舞台展示。", tag: "Event Planning", color: "mint", link: "planning-gallery.html?project=market", image: "web-assets/covers/planning/market-1.jpg", gallery: ["web-assets/planning/market-1.jpg", "web-assets/planning/market-2.jpg"] },
    { number: "02", title: "汉服社及笄礼", type: "传统文化活动策划", description: "围绕女子成人礼设计仪程、现场分工、物料与活动传播流程。", tag: "Culture Event", color: "peach", link: "planning-gallery.html?project=ceremony", image: "web-assets/covers/planning/ceremony-1.jpg", gallery: ["web-assets/planning/ceremony-1.jpg", "web-assets/planning/ceremony-2.jpg"] }
  ]
};
