# JY Lab 자료 수집 workflow

## 원칙

- Notion 원본은 그대로 두고, 저장소에는 정리된 사본을 만든다.
- 새 자료는 항상 `draft`로 시작한다.
- `approved`로 표시한 자료만 홈페이지 반영 대상이다.
- GitHub 업로드는 별도 승인 후 진행한다.
- 모든 자료에 원본 URL과 수집일을 남긴다.

## 상태

| 상태 | 의미 |
| --- | --- |
| `draft` | 로컬 수집·정리 중. 공개하지 않음 |
| `approved` | 내용 확인 완료. 홈페이지 반영 가능 |
| `published` | GitHub 홈페이지에 반영 완료 |
| `blocked` | 권한·파일·저작권 확인 필요 |

## 다음 자료 추가 방법

1. Notion 또는 웹 링크를 제공한다.
2. 자료를 읽고 `content/sources.json`에 등록한다.
3. 내용을 `content/ai/` 아래 Markdown page로 만든다.
4. 로컬에서 확인한다.
5. 사용자가 원하는 자료만 `approved`로 변경한다.
6. 승인 자료만 홈페이지와 GitHub에 반영한다.

## 확인 명령

```powershell
npm.cmd run content:check
```

이 명령은 원본 링크, 상태값, 로컬 파일 존재 여부만 검사한다. 네트워크 업로드는 하지 않는다.
