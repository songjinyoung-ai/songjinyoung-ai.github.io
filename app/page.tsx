import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JY Lab | AI, Investment, Samsung, Projects",
  description: "송진영의 AI 학습, 투자 기록, 삼성 관련 노트와 프로젝트를 모아둔 개인 연구실.",
};

const materials = [
  {
    tag: "THEORY",
    title: "멀티에이전트 오케스트레이션",
    description: "에이전트 역할 분리, 작업 분배, 결과 통합 구조를 공부하는 이론 자료.",
    status: "PDF 자료",
  },
  {
    tag: "PRACTICE",
    title: "Codex Desktop 실습",
    description: "Codex Desktop을 활용해 실제 작업을 설계하고 실행한 실습 기록.",
    status: "실습 기록",
  },
  {
    tag: "REFERENCE",
    title: "프롬프트와 개발 도구",
    description: "프롬프트 엔지니어링, Frontmatter, Git worktree를 한곳에서 정리.",
    status: "참고 자료",
  },
  {
    tag: "LOOP ENGINEERING",
    title: "트랙 2: 루프 엔지니어링",
    description: "계획, 실행, 검증, 수정의 반복 구조와 실습자료를 정리한 초안.",
    status: "로컬 초안",
  },
];

const navItems = ["AI", "Investment", "Samsung", "Projects"];

const projects = [
  { number: "01", type: "DEVICE DEVELOPMENT", title: "Galaxy Series", description: "삼성전자 CP Modem 분야 20년의 단말 개발 경험과 Galaxy 시리즈 글로벌 프로젝트 기록.", color: "project-samsung" },
  { number: "02", type: "INTERACTIVE GAME", title: "Cosmic Worm", description: "우주를 배경으로 만든 로컬 지렁이 게임. 방향키와 WASD, 터치 조작을 지원합니다.", color: "project-blue" },
  { number: "03", type: "LOCAL ARCADE", title: "Cosmic Tetris", description: "러시아 아케이드 무드로 만든 1P·2P 로컬 테트리스 실험.", color: "project-lime" },
  { number: "04", type: "EXPERIMENTS", title: "Practical Ideas", description: "기술을 더 쉽게 경험하도록 게임과 인터랙션을 실험하는 프로젝트 모음.", color: "project-olive" },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="주요 메뉴">
        <a className="brand" href="#top" aria-label="JY Lab 홈">
          <span className="brand-mark">JY</span>
          <span>JY Lab</span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a className="contact-link" href="#about">ABOUT ↗</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL RESEARCH LAB · 2026</p>
          <h1>배운 것을<br /><em>만들고,</em> 기록한다.</h1>
          <p className="hero-description">
            AI를 배우고, 투자와 기술을 관찰하며,<br />작은 프로젝트로 생각을 현실에 옮깁니다.
          </p>
          <a className="primary-button" href="#ai">AI 자료 보기 <span>↓</span></a>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core"><span>JY</span><small>LAB</small></div>
          <span className="orbit-label label-top">LEARN</span>
          <span className="orbit-label label-right">BUILD</span>
          <span className="orbit-label label-bottom">SHARE</span>
        </div>
      </section>

      <section className="section intro-grid" id="about">
        <p className="section-index">01 / ABOUT</p>
        <div>
          <h2>관찰하고, 정리하고,<br /><span>직접 만들어봅니다.</span></h2>
          <p className="body-copy">JY Lab은 공부한 내용을 쌓아두는 개인 아카이브입니다. 수업에서 배운 도구를 내 프로젝트에 적용하고, 결과와 시행착오를 다시 기록합니다.</p>
        </div>
        <div className="stat-card"><strong>04</strong><span>FOCUS AREAS</span><i>AI · INVESTMENT<br />SAMSUNG · PROJECTS</i></div>
      </section>

      <section className="section material-section" id="ai">
        <div className="section-heading">
          <div><p className="section-index">02 / AI NOTES</p><h2>AI <span>학습 자료</span></h2></div>
          <p className="heading-note">최근 수업에서 배운 내용을<br />내 언어로 다시 정리합니다.</p>
        </div>
        <div className="material-list">
          {materials.map((material, index) => (
            <article className="material-card" key={material.title}>
              <span className="card-number">0{index + 1}</span>
              <div className="card-main"><p className="card-tag">{material.tag}</p><h3>{material.title}</h3><p>{material.description}</p></div>
              <span className="card-status">{material.status} <b>↗</b></span>
            </article>
          ))}
        </div>
        <a className="text-link" href="/ai/index.html">로컬 AI 자료 페이지 열기 ↗</a>
        <a className="text-link" href="https://adorable-hail-415.notion.site/1-7-8-38b137efedf680099c68fe3522acc834?p=460137efedf6826480e1014ef81b5677&pm=s" target="_blank" rel="noreferrer">원본 Notion 자료실 열기 ↗</a>
      </section>

      <section className="section areas-section" id="investment">
        <p className="section-index">03 / AREAS</p>
        <div className="area-grid">
          <a href="#investment" className="area-card area-investment"><span>02</span><h3>Investment</h3><p>시장 흐름과 투자 아이디어</p><b>↗</b></a>
          <a href="#samsung" className="area-card area-samsung"><span>03</span><h3>Samsung</h3><p>업무와 기술에 관한 노트</p><b>↗</b></a>
          <a href="#projects" className="area-card area-projects"><span>04</span><h3>Projects</h3><p>직접 만든 결과물 모음</p><b>↗</b></a>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading"><div><p className="section-index">04 / PROJECTS</p><h2>만든 것들을<br /><span>모아둡니다.</span></h2></div><p className="heading-note">기존 홈페이지의 프로젝트도<br />이곳으로 이동했습니다.</p></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.color}`} key={project.title}>
              <span className="project-number">{project.number}</span><p>{project.type}</p><h3>{project.title}</h3><div className="project-bottom"><span>{project.description}</span><b>↗</b></div>
            </article>
          ))}
        </div>
        <a className="text-link" href="https://github.com/songjinyoung-ai/songjinyoung-ai.github.io" target="_blank" rel="noreferrer">기존 프로젝트 저장소 보기 ↗</a>
      </section>

      <footer><div><span className="brand-mark">JY</span><strong>JY Lab</strong></div><p>LEARN · BUILD · SHARE</p><small>© 2026 JY Lab. Personal archive.</small></footer>
    </main>
  );
}
