---
title: 터미널 명령어 & Frontmatter
category: AI / Development
status: draft
source: https://adorable-hail-415.notion.site/Frontmatter-39d137efedf68040b0e9c710f32125eb?pvs=25
captured: 2026-07-29
---

# 터미널 명령어 & Frontmatter

## Windows 터미널 기본 명령

| 목적 | 명령어 |
| --- | --- |
| 위치 확인 | `pwd` |
| 파일 목록 | `dir` |
| 폴더 이동 | `cd 폴더명` |
| 상위 폴더 | `cd ..` |
| 폴더 생성 | `mkdir test` |
| 파일 생성 | `ni app.py` |
| 파일 내용 | `type app.py` |
| 파일 이동 | `move app.py src\\app.py` |
| Git 상태 | `git status` |
| 커밋 | `git commit -m "msg"` |
| 원격 업로드 | `git push` |

## Python 환경

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install torch
python app.py
```

## Frontmatter

Frontmatter는 Markdown page 맨 위에 제목·분류·상태·원본·수집일을 기록하는 메타데이터다. JY Lab은 모든 수집 자료에 다음 필드를 사용한다.

```yaml
---
title: 자료 제목
category: AI / Tools
status: draft
source: https://example.com
captured: 2026-07-29
---
```
