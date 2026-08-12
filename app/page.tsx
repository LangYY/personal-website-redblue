"use client";

import { useMemo, useState } from "react";

type CategoryId = "social" | "video" | "web" | "mobile";

type Category = {
  id: CategoryId;
  number: string;
  label: string;
  english: string;
  note: string;
};

type Project = {
  id: string;
  title: string;
  chinese: string;
  year: string;
  type: string;
  status: string;
  image: string;
  description: string;
  tags: string[];
  url?: string;
};

type VideoItem = {
  id: string;
  title: string;
  chinese: string;
  category: string;
  year: string;
  source: string;
  poster: string;
  href?: string;
};

const categories: Category[] = [
  { id: "social", number: "01", label: "社交链接", english: "ELSEWHERE", note: "在别处继续" },
  { id: "video", number: "02", label: "影像", english: "MOVING IMAGE", note: "视频与动效" },
  { id: "web", number: "03", label: "网页", english: "WEB", note: "网页与互动产品" },
  { id: "mobile", number: "04", label: "移动端", english: "MOBILE", note: "小程序与手机 App" },
];

const webProjects: Project[] = [
  {
    id: "html-preview",
    title: "HTML Preview",
    chinese: "让生成的网页被看见、分享和交付",
    year: "2025—现在",
    type: "微信小程序 / 网页分发",
    status: "已上线",
    image: "/assets/projects/html-preview.jpg",
    description: "一个把 AI 生成的 HTML、Slides 和前端 Demo 变成可预览、可分享交付物的小程序。",
    tags: ["AI 产品", "分发", "预览"],
  },
  {
    id: "frame-sonata",
    title: "Frame Sonata",
    chinese: "从分镜到制作推进的视觉工作台",
    year: "2025—现在",
    type: "AI 视频 / 制作工作台",
    status: "商业化迭代",
    image: "/assets/projects/frame-sonata.png",
    description: "把分镜、提案、场景、道具和制作信息放进同一个可继续推进的工作台。",
    tags: ["AI 视频", "工作流", "制作"],
  },
  {
    id: "focus-tree",
    title: "Focus Tree",
    chinese: "给太多可能性找到当前重心",
    year: "2024—现在",
    type: "个人系统 / AI 工作流",
    status: "实验中",
    image: "/assets/projects/focus-tree.png",
    description: "用一棵会变化的项目树，把目标、项目、进展和下一个行动放在同一张地图上。",
    tags: ["个人系统", "AI 助手", "注意力"],
  },
  {
    id: "comfypilot",
    title: "ComfyPilot",
    chinese: "把脆弱的节点图变成可重复的生产流程",
    year: "2025—现在",
    type: "本地 AI 视频 / 生成工作台",
    status: "工作中",
    image: "/assets/projects/comfypilot.png",
    description: "把 workflow、素材、prompt、队列、历史和失败重试组织进一个本地 AI 视频工作台。",
    tags: ["AI 视频", "本地工具", "生产流程"],
  },
  {
    id: "wavetables",
    title: "Wavetables",
    chinese: "声音结构如何变成运动与质地",
    year: "2024",
    type: "生成式视觉 / 视听实验",
    status: "实验",
    image: "/assets/lab/wavetables.jpg",
    description: "一项位于产品思维与影像创作交界处的声音、波形和视觉实验。",
    tags: ["生成式视觉", "声音", "实验"],
  },
];

const mobileProjects: Project[] = [
  webProjects[0],
  {
    id: "dictation",
    title: "英语听写练习工具",
    chinese: "把听写变成可以反复回看的练习",
    year: "2025—现在",
    type: "移动学习工具",
    status: "原型",
    image: "/assets/projects/dictation.png",
    description: "支持多来源音频、智能转录、逐句播放和分段批改的听写练习工具。",
    tags: ["学习工具", "语音", "练习"],
  },
  webProjects[2],
];

const videoItems: VideoItem[] = [
  {
    id: "panda",
    title: "熊猫团团认世界",
    chinese: "AI 动画儿童系列",
    category: "AI 动画",
    year: "2026",
    source: "/assets/videos/demo-01.mp4",
    poster: "/assets/images/video-poster-01.jpg",
    href: "https://v.youku.com/v_show/id_XNjUyMjk5NzAxNg==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dtitle&s=edbef4e65b4d4b1aba02",
  },
  {
    id: "bloom",
    title: "Bloom Drift",
    chinese: "生成式运动研究",
    category: "动效",
    year: "2025",
    source: "/assets/videos/demo-02.mp4",
    poster: "/assets/images/video-thumb-02.jpg",
  },
  {
    id: "orbit",
    title: "Orbit",
    chinese: "形状、节奏和空间",
    category: "视觉实验",
    year: "2025",
    source: "/assets/videos/demo-03.mp4",
    poster: "/assets/images/video-thumb-03.jpg",
  },
  {
    id: "process",
    title: "Process",
    chinese: "从草图到成片",
    category: "过程记录",
    year: "2025",
    source: "/assets/videos/demo-04.mp4",
    poster: "/assets/images/video-thumb-04.jpg",
  },
  {
    id: "prototype",
    title: "Prototype",
    chinese: "正在施工的影像工具",
    category: "原型",
    year: "2024",
    source: "/assets/videos/demo-05.mp4",
    poster: "/assets/images/video-thumb-05.jpg",
  },
];

const socialLinks = [
  { id: "xiaohongshu", number: "01", label: "小红书", english: "XIAOHONGSHU", handle: "链接待补", href: "" },
  { id: "x", number: "02", label: "X", english: "X / TWITTER", handle: "链接待补", href: "" },
  { id: "github", number: "03", label: "GitHub", english: "CODE / REPOSITORIES", handle: "链接待补", href: "" },
];

function ExternalArrow() {
  return <span aria-hidden="true" className="externalArrow">↗</span>;
}

function SocialView() {
  return (
    <section className="view viewSocial" aria-labelledby="social-title">
      <div className="viewIntro">
        <p className="viewEyebrow">01 / ELSEWHERE</p>
        <h1 id="social-title">社交链接</h1>
        <p className="viewDescription">一些作品之外的线索。更新、代码和没有被整理成项目的片段。</p>
      </div>
      <div className="socialGrid">
        {socialLinks.map((item) => (
          item.href ? (
            <a className="socialCard" key={item.id} href={item.href} target="_blank" rel="noreferrer">
              <span className="cardNumber">{item.number}</span>
              <span className="cardMain"><b>{item.label}</b><small>{item.english}</small></span>
              <span className="cardHandle">{item.handle}</span>
              <ExternalArrow />
            </a>
          ) : (
            <div className="socialCard isPending" key={item.id} aria-disabled="true">
              <span className="cardNumber">{item.number}</span>
              <span className="cardMain"><b>{item.label}</b><small>{item.english}</small></span>
              <span className="cardHandle">{item.handle}</span>
              <span className="pendingMark">—</span>
            </div>
          )
        ))}
      </div>
      <div className="socialNote">
        <span>NOTES / 01</span>
        <p>链接会在确认公开地址后补上。暂时留白也是档案的一部分。</p>
      </div>
    </section>
  );
}

function VideoView() {
  const [activeId, setActiveId] = useState(videoItems[0].id);
  const active = videoItems.find((item) => item.id === activeId) ?? videoItems[0];

  return (
    <section className="view viewVideo" aria-labelledby="video-title">
      <div className="viewIntro splitIntro">
        <div>
          <p className="viewEyebrow">02 / MOVING IMAGE</p>
          <h1 id="video-title">影像</h1>
        </div>
        <p className="viewDescription">从广告片、AI 动画到过程测试。先看画面，再决定要不要读说明。</p>
      </div>
      <div className="videoStage">
        <div className="videoMain">
          <video key={active.id} controls playsInline preload="metadata" poster={active.poster} src={active.source} />
          <div className="videoMainMeta">
            <div><span className="redDot" />{active.category} / {active.year}</div>
            <h2>{active.title}</h2>
            <p>{active.chinese}</p>
            {active.href ? <a href={active.href} target="_blank" rel="noreferrer">打开外部链接 <ExternalArrow /></a> : <span className="pendingInline">外部链接待补</span>}
          </div>
        </div>
        <div className="videoStrip" role="list" aria-label="影像项目">
          {videoItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeId ? "videoThumb isActive" : "videoThumb"}
              onClick={() => setActiveId(item.id)}
              aria-pressed={item.id === activeId}
            >
              <span className="thumbImage"><img src={item.poster} alt="" /></span>
              <span className="thumbText"><small>0{index + 1} / {item.category}</small><b>{item.title}</b><em>{item.year}</em></span>
            </button>
          ))}
        </div>
      </div>
      <div className="channelRail">
        <span>B站频道 / 可补充更多影像</span>
        <a href="https://space.bilibili.com/1018472242?spm_id_from=333.788.upinfo.detail.click" target="_blank" rel="noreferrer">打开 Bilibili <ExternalArrow /></a>
      </div>
    </section>
  );
}

function WebView() {
  const [activeId, setActiveId] = useState(webProjects[0].id);
  const active = webProjects.find((project) => project.id === activeId) ?? webProjects[0];

  return (
    <section className="view viewWeb" aria-labelledby="web-title">
      <div className="viewIntro splitIntro">
        <div>
          <p className="viewEyebrow">03 / WEB</p>
          <h1 id="web-title">网页</h1>
        </div>
        <p className="viewDescription">产品、网页和互动实验。每个项目先展示它是什么，再慢慢展开它为什么存在。</p>
      </div>
      <div className="webArchive">
        <div className="webFeature">
          <div className="featureTop"><span>SELECTED / {active.year}</span><span>{active.status}</span></div>
          <div className="featureImage"><img src={active.image} alt={`${active.title} 项目封面`} /></div>
          <div className="featureCopy">
            <p>{active.type}</p>
            <h2>{active.title}</h2>
            <h3>{active.chinese}</h3>
            <span>{active.description}</span>
            <div className="tagRow">{active.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
            {active.url ? <a href={active.url} target="_blank" rel="noreferrer">查看项目 <ExternalArrow /></a> : <span className="pendingInline">项目链接待补</span>}
          </div>
        </div>
        <div className="projectIndex" role="list" aria-label="网页项目列表">
          <div className="indexHeading"><span>PROJECT ARCHIVE</span><span>{webProjects.length} ITEMS</span></div>
          {webProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={project.id === activeId ? "projectRow isActive" : "projectRow"}
              onClick={() => setActiveId(project.id)}
              aria-pressed={project.id === activeId}
            >
              <span className="projectNumber">0{index + 1}</span>
              <span className="projectTitle"><b>{project.title}</b><small>{project.type}</small></span>
              <span className="projectStatus">{project.status}<i>↗</i></span>
            </button>
          ))}
          <div className="indexNote"><span>ARCHIVE NOTE</span><p>网页视图是默认入口。点击左侧其他编号，右侧会切换为另一种作品排版。</p></div>
        </div>
      </div>
    </section>
  );
}

function MobileView() {
  return (
    <section className="view viewMobile" aria-labelledby="mobile-title">
      <div className="viewIntro splitIntro">
        <div>
          <p className="viewEyebrow">04 / MOBILE</p>
          <h1 id="mobile-title">移动端</h1>
        </div>
        <p className="viewDescription">小程序和手机 App。竖屏不是尺寸限制，而是另一种使用情境。</p>
      </div>
      <div className="deviceShelf">
        {mobileProjects.map((project, index) => (
          <article className={`deviceCard deviceCard${index + 1}`} key={project.id}>
            <div className="deviceFrame"><div className="deviceSpeaker" /><img src={project.image} alt={`${project.title} 移动端界面`} /></div>
            <div className="deviceCaption"><span>0{index + 1} / {project.status}</span><h2>{project.title}</h2><p>{project.chinese}</p><small>{project.type}</small></div>
          </article>
        ))}
      </div>
      <div className="mobileNote"><span>SMALL SCREENS / LARGE QUESTIONS</span><p>移动端项目的链接和演示会在确认公开地址后补充。</p></div>
    </section>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("web");
  const active = useMemo(() => categories.find((item) => item.id === activeCategory) ?? categories[2], [activeCategory]);

  return (
    <div className="portfolioShell">
      <header className="topbar">
        <a className="brandMark" href="#top" aria-label="回到顶部">LY</a>
        <div className="topIdentity"><b>郎懿莹</b><span>AI 产品 / 影像 / 工具</span></div>
        <div className="topMeta"><span>上海 / 中国</span><span>作品档案 2026</span></div>
      </header>

      <div className="portfolioBody" id="top">
        <aside className="categoryRail" aria-label="作品分类">
          <div className="railIntro"><span>INDEX</span><i /> <small>选择一个方向</small></div>
          <nav>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={activeCategory === category.id ? "categoryButton isActive" : "categoryButton"}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <span className="categoryNumber">{category.number}</span>
                <span className="categoryLabel"><b>{category.label}</b><small>{category.english}</small></span>
                <span className="categoryNote">{category.note}</span>
                <span className="categoryArrow">→</span>
              </button>
            ))}
          </nav>
          <div className="railFooter"><span>SCROLL / EXPLORE</span><span>∞</span></div>
        </aside>

        <main className="contentColumn">
          <div className="contentTopline"><span>郎懿莹 / LANG YIYING</span><span>VIEW / {active.english}</span></div>
          {activeCategory === "social" && <SocialView />}
          {activeCategory === "video" && <VideoView />}
          {activeCategory === "web" && <WebView />}
          {activeCategory === "mobile" && <MobileView />}
          <footer className="siteFooter"><span>© 2026 LANG YIYING</span><a href="mailto:lang.soda@gmail.com">lang.soda@gmail.com</a><span>中文版本 / v.01</span></footer>
        </main>
      </div>
    </div>
  );
}
