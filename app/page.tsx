"use client";

import { useMemo, useState } from "react";

type CategoryId = "social" | "video" | "web" | "mobile";

type Category = {
  id: CategoryId;
  number: string;
  label: string;
  english: string;
};

type Project = {
  id: string;
  title: string;
  meta: string;
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
  category: string;
  meta: string;
  source?: string;
  poster: string;
  href?: string;
};

const socialLinks = [
  { id: "x", number: "01", label: "X", english: "X / TWITTER", handle: "@LangYi31007", href: "https://x.com/LangYi31007" },
  { id: "github", number: "02", label: "GitHub", english: "CODE / REPOSITORIES", handle: "@LangYY", href: "https://github.com/LangYY" },
  { id: "xiaohongshu", number: "03", label: "小红书", english: "XIAOHONGSHU", handle: "@xhslink", href: "https://xhslink.cn/m/9tKm5K7ACjg" },
];

const categories: Category[] = [
  { id: "social", number: "01", label: "社交链接", english: "ELSEWHERE" },
  { id: "video", number: "02", label: "影像创作", english: "MOVING IMAGE" },
  { id: "web", number: "03", label: "网页", english: "WEB" },
  { id: "mobile", number: "04", label: "移动端", english: "MOBILE" },
];

const webProjects: Project[] = [
  {
    id: "focus-tree",
    title: "Focus Tree",
    meta: "自由职业者 / 内容创作者",
    type: "个人系统 / AI 助手",
    status: "已上线",
    image: "/assets/projects/focus-tree.png",
    description: "给自由职业者和内容创作者使用的“外脑、个人助理和成长地图”。",
    tags: ["个人系统", "AI 助手", "成长地图"],
    url: "https://focus.buzzegg.cn/",
  },
  {
    id: "frame-sonata",
    title: "Frame Sonata",
    meta: "已上线 / 商业化持续迭代",
    type: "AI 视频 / 制作工作台",
    status: "已上线",
    image: "/assets/projects/frame-sonata.png",
    description: "把分镜从创建延伸到演示和制作推进，支持整理 storyboard / pitch deck，并记录场景、道具等制作信息。",
    tags: ["AI 视频", "工作流", "制作"],
    url: "https://frame-sonata.buzzegg.cn/",
  },
  {
    id: "dictation",
    title: "English Dictation",
    meta: "已部署 / 小范围试用",
    type: "英语学习 / 语音工具",
    status: "小范围试用",
    image: "/assets/projects/dictation.png",
    description: "一个基于本地音频、在线视频链接和逐句播放器的轻量英语学习工具，独立完成并已部署。",
    tags: ["英语学习", "本地音频", "逐句播放器"],
    url: "https://dictation.buzzegg.cn/",
  },
];

const mobileProjects: Project[] = [
  {
    id: "html-preview",
    title: "HTML 预览",
    meta: "微信小程序",
    type: "微信小程序 / HTML 分发",
    status: "项目记录",
    image: "/assets/projects/html-preview.jpg",
    description: "从个人预览逐步扩展到 HTML Slides、网页、小游戏、小工具和单页应用的免部署分享。",
    tags: ["微信小程序", "HTML", "分发"],
  },
  {
    id: "ig-saver",
    title: "IG 链接存图",
    meta: "微信小程序",
    type: "微信小程序 / 链接解析",
    status: "项目记录",
    image: "/assets/projects/ig-saver.jpg",
    description: "追星过程中顺手做的方便大家的小程序，链接经由 Google Cloud 中部署的 YT-DLP 解析，再传回阿里云 ECS。",
    tags: ["微信小程序", "Instagram", "解析"],
  },
  {
    id: "shunbian",
    title: "顺便",
    meta: "Personal Agent",
    type: "移动端 / Personal Agent",
    status: "项目记录",
    image: "/assets/projects/shunbian.png",
    description: "生活中那些有机会可以做、但不值得专门安排的事情；当机会出现时，重新想起曾经产生过的意图。",
    tags: ["Personal Agent", "机会型意图", "生活场景"],
    url: "https://shunbian-853b693f.eazo.dev/",
  },
];

const videoItems: VideoItem[] = [
  {
    id: "cherry",
    title: "键盘外设品牌 CHERRY 70 周年 TVC",
    category: "品牌广告",
    meta: "新片场",
    poster: "/assets/projects/frame-sonata.png",
    href: "https://www.xinpianchang.com/a12492855?channel=copyLink&from=webShare",
  },
  {
    id: "surface",
    title: "微软 Surface Pro 9 笔记本电脑",
    category: "产品广告",
    meta: "新片场",
    poster: "/assets/projects/focus-tree.png",
    href: "https://www.xinpianchang.com/a12334071?from=webShare&channel=copyLink",
  },
  {
    id: "mustang",
    title: "福特电马 Mustang Mach-E：传奇尾灯带电起跑",
    category: "品牌广告",
    meta: "新片场",
    poster: "/assets/projects/comfypilot.png",
    href: "https://www.xinpianchang.com/a12334050?from=webShare&channel=copyLink",
  },
  {
    id: "panda",
    title: "熊猫团团认世界 · 儿童生活百科启蒙系列",
    category: "AI 动画",
    meta: "优酷上线",
    poster: "/assets/lab/panda-tuantuan.png",
    href: "https://v.youku.com/v_show/id_XNjUyMjk5NzAxNg==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dtitle&s=edbef4e65b4d4b1aba02",
  },
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
    </section>
  );
}

function VideoView() {
  const [activeId, setActiveId] = useState(videoItems[0].id);
  const active = videoItems.find((item) => item.id === activeId) ?? videoItems[0];

  return (
    <section className="view viewVideo" aria-labelledby="video-title">
      <div className="viewIntro">
        <div>
          <p className="viewEyebrow">02 / MOVING IMAGE</p>
          <h1 id="video-title">影像创作</h1>
        </div>
      </div>
      <div className="videoStage">
        <div className="videoMain">
          {active.source ? (
            <video key={active.id} controls playsInline preload="metadata" poster={active.poster} src={active.source} />
          ) : (
            <a className="videoPosterLink" href={active.href} target="_blank" rel="noreferrer" aria-label={`打开 ${active.title} 外部视频`}>
              <img src={active.poster} alt={`${active.title} 封面`} />
              <span>打开外部视频 ↗</span>
            </a>
          )}
          <div className="videoMainMeta">
            <div><span className="redDot" />{active.category} / {active.meta}</div>
            <h2>{active.title}</h2>
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
              <span className="thumbText"><small>0{index + 1} / {item.category}</small><b>{item.title}</b><em>{item.meta}</em></span>
            </button>
          ))}
        </div>
      </div>
      <div className="channelRail">
        <span>影像记录 / 传统制作与 AIGC</span>
        <a href="https://www.xinpianchang.com/u13462261?searchKw=buzzegg&from=search_post&channel=copyLink&from=webShare" target="_blank" rel="noreferrer">打开新片场 <ExternalArrow /></a>
      </div>
    </section>
  );
}

function WebView() {
  const [activeId, setActiveId] = useState(webProjects[0].id);
  const active = webProjects.find((project) => project.id === activeId) ?? webProjects[0];

  return (
    <section className="view viewWeb" aria-labelledby="web-title">
      <div className="viewIntro">
        <div>
          <p className="viewEyebrow">03 / WEB</p>
          <h1 id="web-title">网页</h1>
        </div>
      </div>
      <div className="webArchive">
        <div className="webFeature">
          <div className="featureTop"><span>SELECTED / {active.meta}</span><span>{active.status}</span></div>
          <div className="featureImage"><img src={active.image} alt={`${active.title} 项目封面`} /></div>
          <div className="featureCopy">
            <p>{active.type}</p>
            <h2>{active.title}</h2>
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
        </div>
      </div>
    </section>
  );
}

function MobileView() {
  return (
    <section className="view viewMobile" aria-labelledby="mobile-title">
      <div className="viewIntro">
        <div>
          <p className="viewEyebrow">04 / MOBILE</p>
          <h1 id="mobile-title">移动端</h1>
        </div>
      </div>
      <div className="deviceShelf">
        {mobileProjects.map((project, index) => (
          <article className={`deviceCard deviceCard${index + 1}`} key={project.id}>
            <div className="deviceFrame"><div className="deviceSpeaker" /><img src={project.image} alt={`${project.title} 移动端界面`} /></div>
            <div className="deviceCaption"><span>0{index + 1} / {project.status}</span><h2>{project.title}</h2><small>{project.type}</small></div>
          </article>
        ))}
      </div>
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
          <div className="railIntro"><span>INDEX</span><i /></div>
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
                <span className="categoryArrow">→</span>
              </button>
            ))}
          </nav>
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
