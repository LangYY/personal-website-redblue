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
  category: string;
  year: string;
  source?: string;
  poster: string;
  href?: string;
};

const socialLinks = [
  { id: "xiaohongshu", number: "01", label: "小红书", english: "XIAOHONGSHU", handle: "@xhslink", href: "https://xhslink.cn/m/9tKm5K7ACjg" },
  { id: "x", number: "02", label: "X", english: "X / TWITTER", handle: "@LangYi31007", href: "https://x.com/LangYi31007" },
  { id: "github", number: "03", label: "GitHub", english: "CODE / REPOSITORIES", handle: "@LangYY", href: "https://github.com/LangYY" },
];

const categories: Category[] = [
  { id: "social", number: "01", label: "社交链接", english: "ELSEWHERE" },
  { id: "video", number: "02", label: "影像", english: "MOVING IMAGE" },
  { id: "web", number: "03", label: "网页", english: "WEB" },
  { id: "mobile", number: "04", label: "移动端", english: "MOBILE" },
];

const webProjects: Project[] = [
  {
    id: "focus-tree",
    title: "Focus Tree",
    year: "2024—现在",
    type: "个人系统 / AI 工作流",
    status: "已上线",
    image: "/assets/projects/focus-tree.png",
    description: "给自由职业者和内容创作者使用的外脑、个人助理和成长地图。",
    tags: ["个人系统", "AI 助手", "注意力"],
    url: "https://focus.buzzegg.cn/",
  },
  {
    id: "frame-sonata",
    title: "Frame Sonata",
    year: "2025—现在",
    type: "AI 视频 / 制作工作台",
    status: "商业化迭代",
    image: "/assets/projects/frame-sonata.png",
    description: "把分镜从创建延伸到演示和制作推进，减少整理与沟通成本。",
    tags: ["AI 视频", "工作流", "制作"],
    url: "https://frame-sonata.buzzegg.cn/",
  },
  {
    id: "dictation",
    title: "英语听写练习工具",
    year: "2025—现在",
    type: "学习工具 / 语音工作流",
    status: "小范围试用",
    image: "/assets/projects/dictation.png",
    description: "支持本地音频、在线视频链接、智能转录和逐句播放器的英语学习工具。",
    tags: ["学习工具", "语音", "练习"],
    url: "https://dictation.buzzegg.cn/",
  },
  {
    id: "comfypilot",
    title: "ComfyPilot",
    year: "2025—现在",
    type: "本地 AI 视频 / 生成工作台",
    status: "工作中",
    image: "/assets/projects/comfypilot.png",
    description: "把 workflow、素材、prompt、队列、历史和失败重试组织进一个本地 AI 视频工作台。",
    tags: ["AI 视频", "本地工具", "生产流程"],
  },
];

const mobileProjects: Project[] = [
  {
    id: "html-preview",
    title: "HTML Preview",
    year: "2025—现在",
    type: "微信小程序 / 网页分发",
    status: "已上线",
    image: "/assets/projects/html-preview.jpg",
    description: "让 HTML、小游戏、小工具和单页应用免部署分享。",
    tags: ["AI 产品", "小程序", "分发"],
  },
  {
    id: "ig-saver",
    title: "IG 链接存图",
    year: "2025",
    type: "微信小程序 / 工具",
    status: "已上线",
    image: "/assets/projects/ig-saver.jpg",
    description: "把 Instagram 链接转换成手机里可直接保存的图片。",
    tags: ["小程序", "解析", "工具"],
  },
  {
    id: "shunbian",
    title: "顺便",
    year: "2026",
    type: "移动端 / Personal Agent",
    status: "MVP",
    image: "/assets/projects/shunbian.png",
    description: "管理那些有机会可以做、但不值得专门安排的事情。",
    tags: ["Personal Agent", "机会型意图", "生活"],
    url: "https://shunbian-853b693f.eazo.dev/",
  },
];

const videoItems: VideoItem[] = [
  {
    id: "panda",
    title: "熊猫团团认世界",
    category: "AI 动画",
    year: "2026",
    poster: "/assets/lab/panda-tuantuan.png",
    href: "https://v.youku.com/v_show/id_XNjUyMjk5NzAxNg==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dtitle&s=edbef4e65b4d4b1aba02",
  },
  {
    id: "cherry",
    title: "CHERRY 70 周年 TVC",
    category: "品牌广告",
    year: "2023",
    poster: "/assets/projects/frame-sonata.png",
    href: "https://www.xinpianchang.com/a12492855?channel=copyLink&from=webShare",
  },
  {
    id: "surface",
    title: "Microsoft Surface Pro 9",
    category: "产品广告",
    year: "2023",
    poster: "/assets/projects/focus-tree.png",
    href: "https://www.xinpianchang.com/a12334071?from=webShare&channel=copyLink",
  },
  {
    id: "mustang",
    title: "Mustang Mach-E",
    category: "品牌广告",
    year: "2023",
    poster: "/assets/projects/comfypilot.png",
    href: "https://www.xinpianchang.com/a12334050?from=webShare&channel=copyLink",
  },
  {
    id: "panda-process",
    title: "熊猫团团认世界",
    category: "AIGC 动画",
    year: "2026",
    poster: "/assets/lab/panda-tuantuan.png",
    href: "https://v.youku.com/v_show/id_XNjUyMjk5NzAxNg==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dchapters_1&s=edbef4e65b4d4b1aba02",
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
          <h1 id="video-title">影像</h1>
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
            <div><span className="redDot" />{active.category} / {active.year}</div>
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
              <span className="thumbText"><small>0{index + 1} / {item.category}</small><b>{item.title}</b><em>{item.year}</em></span>
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
          <div className="featureTop"><span>SELECTED / {active.year}</span><span>{active.status}</span></div>
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
