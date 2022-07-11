## 프로토타입... 공사중

## WritingHelper
글쓰기에 도움이 되는 웹페이지를 만들어 보고자 한다.   

1. 글을 쓰다가 적절한 단어를 찾고 싶을 때 관련어 검색을 해보자.

## 링크
[https://moaksan.github.io/writinghelper/](https://moaksan.github.io/writinghelper/)

## 디렉토리 구조
```
.root
├─build
├─node_modules
├─public
└─src
  ├─assets
  ├─components
  │  ├─header
  │  ├─initialize
  │  └─pages
  │      ├─login
  │      ├─logout
  │      ├─mainPage
  │      ├─notFound
  │      ├─signup
  │      ├─storage
  │      │  ├─pageSearch
  │      │  ├─readingStyle
  │      │  └─renderPagesReading
  │      └─workplace
  │          ├─manipulateFolderFile
  │          ├─renderFolders
  │          ├─renderPageList
  │          ├─renderPages
  │          └─utility
  └─fonts
      ├─Nanum_Pen_Script
      └─Poppins
```

## 사용
- 로그인
  - 로그인 시 본인의 데이터 불러오기
  <br>
  
- 작업장
  - 글 편집
  - 파일 생성, 폴더 생성, 파일 또는 폴더 삭제, 이름 바꾸기
  - 저장, 관련어 검색
  <br>
  
- 저장소
  - 저장된 글 읽기
  - word 모드, book 모드
  - page 찾기
