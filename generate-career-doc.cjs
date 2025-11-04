const fs = require('fs');

// Read projects data
const projects = JSON.parse(
  fs.readFileSync('./app/features/projects/data/fixtures/projects.json', 'utf8')
);

// Group projects by year
const projectsByYear = {};
projects.forEach((project) => {
  project.project_year.forEach((year) => {
    if (!projectsByYear[year]) {
      projectsByYear[year] = [];
    }
    projectsByYear[year].push(project);
  });
});

// Sort years in descending order
const years = Object.keys(projectsByYear).sort((a, b) => b - a);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>경력 기술서</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'Malgun Gothic', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            padding: 40px 60px;
            max-width: 900px;
            margin: 0 auto;
        }

        @media print {
            @page {
                margin: 12mm 20mm;
                size: A4 portrait;
            }

            body {
                padding: 0 8mm;
                max-width: 100%;
                font-size: 9pt;
                line-height: 1.35;
            }

            /* 페이지 구분 */
            .page-break {
                page-break-before: always;
            }

            /* 연도 헤더가 혼자 떨어지지 않도록만 */
            .year-header {
                page-break-after: avoid;
                page-break-inside: avoid;
                margin: 18px 0 10px 0;
                padding: 8px 16px;
                font-size: 1.25em;
            }

            /* 섹션 제목이 혼자 떨어지지 않도록 */
            .section-title {
                page-break-after: avoid;
                margin: 6px 0 4px 0;
                font-size: 0.9em;
            }

            /* 프로젝트 헤더가 분리되지 않도록 */
            .project-header {
                page-break-after: avoid;
                margin-bottom: 8px;
            }

            /* 프로젝트 설명과 이미지 그룹 */
            .project-description {
                page-break-after: avoid;
                margin: 8px 0;
                padding: 8px;
            }

            /* 이미지는 작은 경우만 끊김 방지 */
            .image-wrapper {
                page-break-inside: avoid;
            }

            /* 배경색 출력 */
            * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
            }

            /* 그림자 제거로 잉크 절약 */
            .project {
                box-shadow: none;
                border: 1px solid #d1d5db;
            }

            .image-wrapper {
                box-shadow: none;
            }

            .project-image {
                box-shadow: none;
            }

            .year-header {
                box-shadow: none;
            }

            /* 링크 밑줄 제거 */
            a {
                text-decoration: none;
            }

            /* 여백 최적화 */
            .summary {
                margin: 8px 0;
                padding: 12px;
                page-break-inside: avoid;
            }

            .summary h3 {
                font-size: 1.05em;
                margin-bottom: 5px;
            }

            .summary h4 {
                font-size: 0.9em;
                margin: 6px 0 4px 0;
            }

            .summary ul {
                margin-left: 14px;
            }

            .summary li {
                margin: 3px 0;
                font-size: 0.85em;
            }

            .project {
                margin: 8px 0;
                padding: 10px;
            }

            h1 {
                font-size: 1.5em;
                margin-bottom: 4px;
                padding-bottom: 4px;
            }

            h2 {
                font-size: 1.2em;
                margin: 12px 0 6px 0;
                padding-bottom: 3px;
            }

            .project-title {
                font-size: 1.1em;
                margin-bottom: 2px;
            }

            .project-meta {
                font-size: 0.8em;
                margin: 4px 0;
            }

            .badge {
                padding: 3px 10px;
                font-size: 0.75em;
            }

            .project-images {
                margin: 6px 0;
                gap: 5px;
                grid-template-columns: repeat(2, 1fr);
            }

            .image-wrapper {
                height: 180px;
            }

            .role-list li {
                padding: 2px 0 2px 16px;
                font-size: 0.85em;
                line-height: 1.25;
            }

            .role-list li:before {
                left: 4px;
            }

            .tech-stack {
                gap: 4px;
                margin: 6px 0;
            }

            .tech-badge {
                padding: 3px 8px;
                font-size: 0.7em;
            }

            .skill-category {
                margin: 6px 0;
                padding: 8px;
                page-break-inside: avoid;
            }

            .skill-category h4 {
                font-size: 0.85em;
                margin-bottom: 3px;
            }

            .skill-list {
                font-size: 0.75em;
                line-height: 1.4;
            }

            .contact-info {
                margin: 10px 0;
                padding: 10px;
                page-break-inside: avoid;
            }

            .contact-info h3 {
                font-size: 1.05em;
            }

            .contact-info p {
                font-size: 0.85em;
                margin: 2px 0;
            }
        }

        h1 {
            color: #2563eb;
            font-size: 2.5em;
            margin-bottom: 10px;
            border-bottom: 4px solid #2563eb;
            padding-bottom: 10px;
        }

        h2 {
            color: #1e40af;
            font-size: 1.8em;
            margin: 40px 0 20px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #ddd;
        }

        h3 {
            color: #1e40af;
            font-size: 1.4em;
            margin: 30px 0 15px 0;
        }

        h4 {
            color: #475569;
            font-size: 1.1em;
            margin: 20px 0 10px 0;
        }

        .summary {
            background: #ffffff;
            padding: 20px 0;
            border-radius: 0;
            margin: 25px 0;
            border-left: none;
            border-bottom: 2px solid #e5e7eb;
        }

        .summary h3 {
            margin-top: 0;
            color: #1e40af;
        }

        .summary ul {
            margin-left: 20px;
            margin-top: 10px;
        }

        .summary li {
            margin: 8px 0;
        }

        .project {
            background: #fff;
            border: none;
            border-radius: 0;
            padding: 20px 0;
            margin: 20px 0;
            box-shadow: none;
            border-bottom: 1px solid #e5e7eb;
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .project-title {
            color: #1e40af;
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .project-meta {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin: 10px 0;
            font-size: 0.9em;
            color: #64748b;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
            margin: 3px;
        }

        .badge-type {
            background: #dbeafe;
            color: #1e40af;
        }

        .badge-team {
            background: #f3e8ff;
            color: #6b21a8;
        }

        .project-description {
            background: #ffffff;
            padding: 12px 0;
            border-radius: 0;
            margin: 12px 0;
            border-left: none;
        }

        .project-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
            margin: 20px 0;
        }

        .image-wrapper {
            width: 100%;
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            overflow: hidden;
        }

        .project-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section-title {
            color: #1e40af;
            font-size: 1.1em;
            font-weight: bold;
            margin: 15px 0 10px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .role-list {
            list-style: none;
            margin: 10px 0;
        }

        .role-list li {
            padding: 5px 0 5px 25px;
            position: relative;
            line-height: 1.5;
        }

        .role-list li:before {
            content: "▪";
            color: #2563eb;
            font-weight: bold;
            position: absolute;
            left: 8px;
        }

        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 15px 0;
        }

        .tech-badge {
            background: #eff6ff;
            color: #1e40af;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 0.85em;
            font-weight: 500;
            border: 1px solid #bfdbfe;
        }

        .year-header {
            background: #ffffff;
            color: #1e40af;
            padding: 10px 0;
            border-radius: 0;
            margin: 35px 0 20px 0;
            font-size: 1.4em;
            font-weight: bold;
            box-shadow: none;
            border-bottom: 3px solid #2563eb;
        }

        .skill-category {
            background: #ffffff;
            padding: 12px 0;
            border-radius: 0;
            margin: 12px 0;
            border: none;
            border-bottom: 1px solid #e5e7eb;
        }

        .skill-category h4 {
            color: #1e40af;
            margin-bottom: 8px;
            font-size: 1.05em;
        }

        .skill-list {
            color: #475569;
            line-height: 1.7;
            font-size: 0.9em;
        }

        .contact-info {
            background: #ffffff;
            padding: 15px 0;
            border-radius: 0;
            margin: 25px 0;
            text-align: center;
            border-top: 2px solid #e5e7eb;
        }

        code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #dc2626;
        }

    </style>
</head>
<body>
    <h1>📱 모바일 개발자 경력 기술서</h1>

    <div class="summary">
        <h3>📋 경력 요약</h3>
        <p><strong>총 경력:</strong> 2015년 ~ 현재 (약 10년)</p>
        <br>
        <h4>주요 역량</h4>
        <ul>
            <li>Android / iOS 모바일 앱 개발 (Native, Hybrid)</li>
            <li>Kotlin, Swift, Java, Flutter 기반 네이티브 및 크로스 플랫폼 개발</li>
            <li>GPS, BLE, 센서 등 디바이스 기능 활용</li>
            <li>WebView 하이브리드 앱 구조 설계 및 구현</li>
            <li>Firebase, 결제 모듈, 푸시 알림 등 서드파티 SDK 연동</li>
        </ul>
    </div>

    <h2>📱 프로젝트 상세</h2>

${years
  .map((year, yearIndex) => {
    const yearProjects = projectsByYear[year];
    let projectCounter = 1;

    // Calculate the running project number
    for (let i = 0; i < yearIndex; i++) {
      projectCounter += projectsByYear[years[i]].length;
    }

    return `
    ${yearIndex > 0 ? '<div class="page-break"></div>' : ''}
    <div class="year-header">${year}년</div>

${yearProjects
  .map((project, idx) => {
    const projectNumber = projectCounter + idx;
    const period = `${project.project_s_date} ~ ${project.project_e_date ?? '현재 (진행중)'}`;
    const team = `👥 ${project.project_team.total}명 (모바일 ${project.project_team.roles.mobile}, 서버 ${project.project_team.roles.server})`;

    return `    <div class="project">
        <div class="project-header">
            <div>
                <div class="project-title">${projectNumber}. ${project.project_title}</div>
                <div class="project-meta">
                    <span class="meta-item">📅 ${period}</span>
                    <span class="badge badge-type">${project.project_type}</span>
                    <span class="badge badge-team">${team}</span>
                </div>
            </div>
        </div>

${
  project.project_images && project.project_images.length > 0
    ? `        <div class="project-images">
${project.project_images
  .map(
    (img) => `            <div class="image-wrapper">
                <img src="./public${img}" alt="${project.project_title}" class="project-image">
            </div>`
  )
  .join('\n')}
        </div>
`
    : ''
}
        <div class="project-description">
            <strong>📝 프로젝트 설명</strong><br>
            ${project.project_description}
        </div>

${
  project.project_contributionRole &&
  project.project_contributionRole.length > 0
    ? `        <div class="section-title">👨‍💻 담당 역할</div>
        <ul class="role-list">
${project.project_contributionRole.map((role) => `            <li>${role}</li>`).join('\n')}
        </ul>
`
    : ''
}
${
  project.project_skills && project.project_skills.length > 0
    ? `        <div class="section-title">🛠️ 기술 스택</div>
        <div class="tech-stack">
${project.project_skills.map((skill) => `            <span class="tech-badge">${skill}</span>`).join('\n')}
        </div>`
    : ''
}
    </div>
`;
  })
  .join('\n')}`;
  })
  .join('\n')}

    <!-- 기술 스택 요약 -->
    <div class="page-break"></div>
    <h2>🎓 기술 스택 요약</h2>

    <div class="skill-category">
        <h4>Mobile Development</h4>
        <div class="skill-list">
            <strong>Android:</strong> Kotlin, Jetpack Compose, Java, MVVM, Clean Architecture<br>
            <strong>iOS:</strong> Swift, SwiftUI, Combine, CoreMotion<br>
            <strong>Cross-Platform:</strong> Flutter, Dart | React Native (유지보수)
        </div>
    </div>

    <div class="skill-category">
        <h4>Device & Hardware Integration</h4>
        <div class="skill-list">
            Bluetooth (Classic/BLE), GPS Tracking, Motion Sensors, Camera, OCR, Barcode Scanner
        </div>
    </div>

    <div class="skill-category">
        <h4>Third-Party & Backend</h4>
        <div class="skill-list">
            <strong>Firebase:</strong> FCM, Analytics, Crashlytics | <strong>Payment:</strong> In-App Purchase, Inicis<br>
            <strong>Map:</strong> Google Maps, KakaoMap | <strong>Marketing:</strong> Braze, Amplitude<br>
            <strong>Auth:</strong> JWT, SNS Login | <strong>Backend:</strong> Spring Boot, PHP | <strong>DB:</strong> Room, SQLite, MySQL
        </div>
    </div>

    <div class="skill-category">
        <h4>Architecture & Tools</h4>
        <div class="skill-list">
            MVVM, Clean Architecture, Hilt, Riverpod, Coroutines, REST API, WebView Bridge
        </div>
    </div>

    <div class="contact-info">
        <h3>📞 연락처 정보</h3>
        <p><strong>이메일:</strong> jhr7124@gmail.com</p>
        <p><strong>전화번호:</strong> 010-8767-7124</p>
        <p><strong>GitHub:</strong> github.com/janghaeryong</p>
        <p><strong>작성일:</strong> 2025년</p>
    </div>
</body>
</html>`;

// Write to file
fs.writeFileSync('경력기술서.html', html, 'utf8');
console.log('✅ 경력기술서.html 파일이 생성되었습니다.');
console.log(`📊 총 ${projects.length}개 프로젝트 포함`);
console.log(`📅 연도: ${years.join(', ')}`);
