---
title: Claude Code · Codex 필수 커맨드 비교
category: AI / Tools
status: draft
source: https://adorable-hail-415.notion.site/Claude-Code-Codex-39d137efedf6802ab385d3cdfc29580b?pvs=25
captured: 2026-07-29
---

# Claude Code · Codex 필수 커맨드 비교

## 핵심 정리

두 도구 모두 프로젝트 초기화, 컨텍스트 관리, 상태 확인, 계획, 리뷰 흐름을 제공한다. Claude Code는 세션·코드 체크포인트 관리가 강하고, Codex Desktop은 작업 단위와 프로젝트 지침 파일 중심으로 사용한다.

## Claude Code

| 커맨드 | 용도 |
| --- | --- |
| `/init` | 현재 저장소 분석 후 `CLAUDE.md` 초안 생성 |
| `/clear` | 대화 컨텍스트 초기화 |
| `/compact` | 긴 대화 요약 |
| `/status` | 버전·모델·계정·연결 상태 확인 |
| `/resume` | 이전 세션 재개 |
| `/rewind` | 대화와 코드 체크포인트 복원 |
| `/plan` | 분석·계획 후 구현 |
| `/diff` | 변경 코드 확인 |
| `/context` | 컨텍스트와 메모리 파일 현황 확인 |

## Codex Desktop

| 커맨드 | 용도 |
| --- | --- |
| `/init` | 현재 프로젝트용 `AGENTS.md` 초안 생성 |
| `/compact` | 현재 작업 대화 압축 |
| `/status` | Task ID·컨텍스트·사용량 확인 |
| `/goal` | 지속 목표 설정 |
| `/review` | 변경 사항 또는 기준 브랜치 차이 리뷰 |
| `/plan` | 구현 전 계획 작성 |

## JY Lab 적용

새 프로젝트 시작 시 `AGENTS.md`를 먼저 확인하고, 큰 작업은 계획 → 구현 → 리뷰 → 검증 순서로 진행한다.
