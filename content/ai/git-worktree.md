---
title: git worktree 명령어
category: AI / Git
status: draft
source: https://adorable-hail-415.notion.site/git-worktree-39e137efedf6806cb8aac2e7bb54ff4b?pvs=25
captured: 2026-07-29
---

# git worktree 명령어

Git worktree는 하나의 저장소에서 여러 브랜치를 별도 폴더로 동시에 작업하게 해준다. 에이전트 병렬 작업이나 기능별 격리에 유용하다.

| 목적 | 명령어 |
| --- | --- |
| 새 브랜치와 worktree | `git worktree add -b practice/builder ../builder_worktree main` |
| 기존 브랜치 연결 | `git worktree add ../builder_worktree practice/builder` |
| 목록 확인 | `git worktree list` |
| 현재 브랜치 확인 | `git branch --show-current` |
| worktree 제거 | `git worktree remove ../builder_worktree` |
| 강제 제거 | `git worktree remove --force ../builder_worktree` |
| 연결 정보 정리 | `git worktree prune` |
| 브랜치 삭제 | `git branch -d practice/builder` |

## 안전 규칙

- worktree 제거 전 변경 사항과 커밋 여부 확인
- `--force`는 미커밋 변경을 버릴 수 있으므로 검토 후 사용
- 병렬 작업 시작 전 각 worktree의 브랜치와 목적 기록
