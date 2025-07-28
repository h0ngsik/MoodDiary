# Mood Diary (감정 일기)

Next.js로 구현한 감정 일기 웹 애플리케이션입니다.

## 배포 링크

- [Mood Diary 웹사이트](https://mood-diary-indol-gamma.vercel.app/)

## 주요 기능

### 1. 감정 일기

- 감정 일기 작성/수정/삭제
- 5가지 감정 타입 선택 가능
- 제목과 내용 입력
- 실시간 미리보기
- 감정별 필터링 및 검색
- 최신순/오래된순 정렬
- 페이지네이션 (12개씩 표시)
- 그리드 레이아웃 (4열)

### 2. 사진 보관함

- 사진 업로드 및 미리보기
- 드래그 앤 드롭 이미지 업로드
- 이미지 갤러리 (1열 레이아웃)
- 무한 스크롤
- 최신순/오래된순 정렬
- localStorage를 활용한 데이터 저장

### 3. UI/UX

- 반응형 디자인
- 모바일부터 데스크탑까지 대응
- 그리드 레이아웃 자동 조정
- 모달 반응형 크기 조정
- 다크모드 지원 (준비 중)
- 모달 기반의 작성/수정 인터페이스
- 직관적인 필터링 및 검색

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Zustand
- localStorage (데이터 저장)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js 앱 라우터
│   ├── page.tsx           # 메인 페이지 (일기 보관함)
│   └── photos/            # 사진 보관함
│       └── page.tsx
├── components/            # 리액트 컴포넌트
│   ├── layout/           # 레이아웃 관련 컴포넌트
│   │   ├── Banner.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── mood/             # 감정 일기 관련 컴포넌트
│   │   ├── CancelModal.tsx
│   │   ├── DeleteMoodModal.tsx
│   │   ├── MoodCard.tsx
│   │   ├── MoodHistory.tsx
│   │   ├── SuccessModal.tsx
│   │   └── WriteMoodModal.tsx
│   ├── photo/            # 사진 보관함 관련 컴포넌트
│   │   ├── PhotoGallery.tsx
│   │   └── UploadPhotoModal.tsx
│   └── ui/               # 공통 UI 컴포넌트
│       ├── Modal.tsx
│       ├── Pagination.tsx
│       └── ScrollToTop.tsx
├── stores/               # Zustand 스토어
│   ├── moodStore.ts      # 감정 일기 상태 관리
│   └── photoStore.ts     # 사진 보관함 상태 관리
├── types/                # TypeScript 타입 정의
│   ├── mood.ts
│   └── photo.ts
├── constants/            # 상수 정의
│   └── moods.ts
└── utils/               # 유틸리티 함수
    └── sampleData.ts
```
