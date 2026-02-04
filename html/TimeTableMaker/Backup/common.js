/**
 * SBS 시간표 공통 엔진 (Rotation & Focus Animation)
 */
const CommonEngine = {
    rotation: {
        interval: 30,
        timer: null,
        count: 0,
        barColor: '#54a0ff'
    },
    focus: {
        targets: [],
        timer: null,
        currentIndex: -1
    },

    // 초기화 실행
    init(nextFile, barColor, isWeekday = false) {
        this.rotation.barColor = barColor;
        this.startRotation(nextFile, isWeekday);
        //this.startFocusAnimation();
    },

    // 1. 페이지 자동 순환 로직
    startRotation(nextFile, isWeekday) {
        const bar = document.createElement('div');
        bar.id = 'rotation-bar';
        bar.style.background = this.rotation.barColor;
        document.body.appendChild(bar);

        this.rotation.timer = setInterval(() => {
            this.rotation.count++;
            const progress = (this.rotation.count / this.rotation.interval) * 100;
            bar.style.width = progress + "%";

            if (this.rotation.count >= this.rotation.interval) {
				/*
                if (isWeekday && typeof app !== 'undefined' && app.currentWeek === 'A') {
                    app.setWeek('B'); // 평일 A주면 B주로 변경
                    this.rotation.count = 0;
                } else {
				*/
                window.location.href = nextFile; // 아니면 다음 파일로 이동
                
            }
        }, 1000);
    },

    // 2. 포커스 이동 애니메이션 로직
    startFocusAnimation() {
        this.focus.targets = [];
        const grid = document.getElementById('mainGrid');
        
        // 1. 하이라이트 대상(강의카드) 수집
        document.querySelectorAll('.lecture-cell').forEach(cell => {
            const splits = cell.querySelectorAll('.split-item');
            if (splits.length > 0) splits.forEach(s => this.focus.targets.push(s));
            else {
                const card = cell.querySelector('.class-card');
                if (card) this.focus.targets.push(card);
            }
        });

        if (this.focus.targets.length === 0) return;

        const stepTime = Math.max(800, Math.floor(28000 / this.focus.targets.length));
        
        this.focus.timer = setInterval(() => {
            // 이전 하이라이트 일괄 제거 (헤더 포함)
            document.querySelectorAll('.focus-highlight, .header-highlight').forEach(el => {
                el.classList.remove('focus-highlight', 'header-highlight');
            });

            this.focus.currentIndex = (this.focus.currentIndex + 1) % this.focus.targets.length;
            const target = this.focus.targets[this.focus.currentIndex];
            
            // 2. 현재 강의 카드 하이라이트
            target.classList.add('focus-highlight');

            // 3. 십자선(Crosshair) 하이라이트 로직
            const parentCell = target.closest('.lecture-cell');
            if (parentCell) {
                const col = parentCell.style.gridColumnStart || parentCell.style.gridColumn.split(' / ')[0];
                const row = parentCell.style.gridRowStart || parentCell.style.gridRow.split(' / ')[0];

                // 해당 컬럼의 헤더(강의실 명) 찾기
                const headers = document.querySelectorAll('.grid > .header');
                headers.forEach(h => {
                    // 계산된 그리드 컬럼과 일치하는 헤더 강조
                    const hStyle = window.getComputedStyle(h);
                    if (h.style.gridColumnStart == col || (h.innerText !== 'TIME' && Array.from(headers).indexOf(h) + 1 == col)) {
                         h.classList.add('header-highlight');
                    }
                });

                // 해당 로우의 시간 셀 찾기
                document.querySelectorAll('.time-col').forEach(t => {
                    if (t.style.gridRowStart == row) {
                        t.classList.add('header-highlight');
                    }
                });
            }
        }, stepTime);
    }
};
