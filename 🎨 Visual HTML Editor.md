🎨 Visual HTML Editor (비주얼 HTML 에디터)
Visual HTML Editor는 별도의 설치나 서버 없이 웹 브라우저만으로 HTML 파일을 열어 내용을 수정할 수 있는 초경량 에디터입니다. 코드를 몰라도 텍스트를 클릭하여 수정하고, 이미지를 클릭하여 교체할 수 있습니다.

✨ 주요 기능 (Key Features)
📂 HTML 파일 불러오기 & 저장: 로컬 HTML 파일을 열어 편집하고, 수정된 내용을 깨끗한 HTML 파일로 다시 다운로드할 수 있습니다.

✏️ 직관적인 텍스트 편집: contentEditable 기술을 활용하여, 화면에 보이는 텍스트를 클릭하는 것만으로 즉시 수정이 가능합니다.

🖼️ 간편한 이미지 교체: 이미지를 클릭하고 로컬 파일을 선택하면 즉시 해당 이미지를 교체(Base64 인코딩)합니다.

📱 반응형 뷰 모드 지원: 데스크탑, 태블릿, 모바일 해상도에 맞춰 미리보기를 전환하며 레이아웃을 점검할 수 있습니다.

🛡️ 편집/미리보기 모드 전환: 편집 모드에서는 수정 가이드를 제공하고, 미리보기 모드에서는 실제 작동 화면을 확인할 수 있습니다.

🧼 클린 세이브: 저장 시 에디터 작동을 위해 주입된 스크립트와 스타일 클래스를 자동으로 제거하여 순수한 HTML 코드만 저장합니다.

🚀 시작하기 (Getting Started)
이 프로젝트는 단일 HTML 파일로 구성되어 있어 설치 과정이 필요 없습니다.

이 저장소를 클론(Clone)하거나 ZIP으로 다운로드합니다.

Visual HTML Editor.html 파일을 웹 브라우저(Chrome, Edge, Safari 등)에서 엽니다.

바로 사용하실 수 있습니다!

참고: UI 스타일링을 위해 Tailwind CSS와 Font Awesome을 CDN으로 불러옵니다. 인터넷 연결이 필요합니다.

📖 사용 방법 (How to Use)
파일 열기: 왼쪽 사이드바의 HTML 열기 버튼을 클릭하여 수정할 .html 파일을 선택합니다.

텍스트 수정: 편집 화면(오른쪽)에서 수정하고 싶은 텍스트를 클릭하고 내용을 입력합니다.

이미지 교체: 이미지를 클릭하면 파일 업로드 창이 뜹니다. 내 컴퓨터의 이미지를 선택하면 바로 교체됩니다.

디바이스 확인: 사이드바 하단의 아이콘(🖥️, 📱)을 눌러 모바일/태블릿 뷰를 확인합니다.

저장하기: HTML 저장 버튼을 누르면 수정된 파일이 edited_page.html로 다운로드됩니다.

🛠 기술 스택 (Tech Stack)
Core: HTML5, Vanilla JavaScript

Styling: Tailwind CSS (CDN)

Icons: Font Awesome (CDN)

Architecture:

Iframe Sandbox: 에디터 UI와 편집 대상 HTML의 스타일 충돌을 방지하기 위해 iframe 내에서 편집이 이루어집니다.

FileReader API: 로컬 파일 읽기 및 이미지 미리보기(Data URL) 처리에 사용됩니다.

🧩 작동 원리 (Under the Hood)
사용자가 파일을 업로드하면 FileReader가 HTML 코드를 읽어와 iframe 내부에 주입합니다.

편집 모드(ON) 상태가 되면 injectEditorStyles() 함수가 실행되어 편집 가능한 요소(텍스트, 이미지)에 시각적인 가이드라인(파란색 점선 등)을 표시합니다.

텍스트 태그에는 contentEditable="true" 속성을 부여하고, 이미지 태그에는 click 이벤트를 가로채는 리스너를 등록합니다.

저장(Save) 시에는 disableEditing() 함수가 호출되어 에디터가 주입한 모든 임시 클래스와 속성을 제거한 뒤, 순수 HTML 문자열을 Blob 형태로 변환하여 다운로드합니다.