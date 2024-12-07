# Todo List - 할 일 목록을 관리하는 To Do 서비스

Next.js로 만든 할 일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할 일 추가/수정/삭제
- 할 일 완료 체크
- 할 일 상세 페이지 (메모 및 이미지 첨부 가능)
- 반응형 디자인 (모바일/태블릿/데스크탑)

## 기술 스택

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **이미지 저장**: AWS S3
- **데이터베이스**: MongoDB

## 프로젝트 구조

```
app/
├── components/     # UI 컴포넌트
│   ├── layout/    # 레이아웃 관련 컴포넌트
│   ├── todo/      # Todo 관련 컴포넌트
│   └── ui/        # 공통 UI 컴포넌트
├── lib/           # 유틸리티 함수들
├── types/         # TypeScript 타입 정의
└── api/           # API 라우트 핸들러
```
