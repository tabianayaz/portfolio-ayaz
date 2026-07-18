export type Language = 'jp' | 'en';

export const dictionary = {
  jp: {
    nav: {
      home: 'ホーム',
      about: '自己紹介',
      skills: 'スキル',
      projects: '制作実績',
      qualifications: '資格',
      contact: 'お問い合わせ'
    },
    hero: {
      hello: 'こんにちは 👋',
      name: 'アヤズ タビアン イスラム',
      university: '文教大学',
      faculty: '情報学部',
      department: '情報システム学科',
      roles: ['Software Engineer', 'Unity Developer', 'Cloud Enthusiast'],
      statement: '「アイデアを形にし、人々の生活を便利にするソフトウェアを開発したい。」',
      viewProjects: '制作実績を見る',
      viewGithub: 'GitHubを見る'
    },
    about: {
      title: '自己紹介',
      subtitle: 'ABOUT ME',
      bioParagraphs: [
        'アヤズ タビアン イスラムです。',
        '現在、文教大学情報学部情報システム学科で学んでいます。',
        'AI、クラウド技術、Webアプリケーション開発、Androidアプリ開発、Unityゲーム開発に興味があります。',
        '「作ること」が好きで、新しい技術を学びながら様々なプロジェクトを制作しています。',
        '将来は世界中の人に使われるサービスを開発できるソフトウェアエンジニアを目指しています。'
      ],
      hobbiesTitle: '趣味 / 興味',
      hobbies: [
        { icon: 'Gamepad2', text: 'ゲームを遊ぶこと' },
        { icon: 'Code', text: 'Unityでゲームを作ること' },
        { icon: 'Camera', text: '日本の自然風景を撮影すること' },
        { icon: 'Brain', text: 'AI・Azure・Web技術を学ぶこと' }
      ]
    },
    skills: {
      title: 'スキル',
      subtitle: 'SKILLS',
      bentoDescription: '大学での学習や個人開発を通して習得した技術です。現在も新しい技術を学びながら、継続的にスキルアップしています。',
      currentlyLearningTitle: '現在学習中',
      currentlyLearningSubtitle: 'CURRENTLY LEARNING'
    },
    projects: {
      title: '制作実績',
      subtitle: 'PROJECTS',
      confidenceText: 'AI判定 信頼度',
      demoDashboard: 'ダッシュボードプレビュー',
      items: {
        dragonBlaze: {
          title: 'Dragon Blaze',
          category: 'Unity RPG',
          description: 'Unityで制作した2D RPGゲーム。敵AI、戦闘システム、NPC会話、インベントリ、ピクセルアートをすべて実装。',
          tags: ['Unity', 'C#', 'AI', '2D Pixel Art']
        },
        touchakuWake: {
          title: 'Touchaku Wake',
          category: 'Android App',
          description: 'Android向けに制作したモバイルアプリケーション。日常生活を便利にすることを目的として開発。',
          tags: ['Android', 'Java/Kotlin', 'SQLite', 'Mobile UX']
        },
        jaNishiuwa: {
          title: 'JAにしうわ 新規就農者受入資源情報管理システム',
          category: 'Full-Stack GIS/IoT Web App',
          description: '卒業制作 — JAにしうわ（西宇和農業協同組合）向けに構築した資源マッチングプラットフォーム。従来の手作業・関係性ベースのマッチング手法を脱却し、農地面積、作物適性、傾斜度、倉庫への近接性、および候補地に設置したESP32センサーで取得した土壌水分・日照量のIoTデータを活用して加重スコアリング。職員が新規就農者に最適な農地を効率的にマッチングできるように支援します。',
          tags: ['Next.js', 'FastAPI', 'Supabase (PostGIS)', 'Firebase Auth', 'ESP32 / IoT', 'Vercel + Render'],
          visitPage: 'サイトを訪問'
        },
        azureChat: {
          title: 'Azure AI Chat',
          category: 'Web App',
          description: 'Azure OpenAI Serviceを活用した安全で高機能なAIチャットウェブアプリケーション。ユーザーアカウント管理、メッセージ履歴保存、詳細なチャット設定機能を搭載。',
          tags: ['React', 'Next.js', 'TypeScript', 'Azure OpenAI']
        },
        fitAi: {
          title: 'FitAI Trainer',
          category: 'Desktop App',
          description: 'PySide6 (Qt for Python)、OpenCV、MediaPipe Poseを組み合わせたAIフィットネストレーナー。カメラ映像からリアルタイムで骨格（ポーズ）を推定し、スクワットなどの姿勢の正確性を解析・カウントします。ユーザー管理、ワークアウト履歴や目標設定はFirebase (Auth / Firestore)と連携しています。',
          tags: ['Python', 'PySide6', 'OpenCV', 'MediaPipe', 'Firebase']
        }
      }
    },
    qualifications: {
      title: '保有資格',
      subtitle: 'CERTIFICATIONS'
    },
    education: {
      title: '学歴',
      subtitle: 'EDUCATION',
      items: [
        {
          school: '東北外語観光専門学校（日本語学校）',
          degree: '日本語科',
          period: '2022 - 2024',
          status: '卒業'
        },
        {
          school: '文教大学',
          degree: '情報学部 情報システム学科',
          period: '2024 - 2028',
          status: '卒業見込み'
        }
      ]
    },
    selfPR: {
      title: '自己PR',
      subtitle: 'MY STRENGTH',
      prText: [
        '私の強みは、新しい技術を積極的に学び、実際に形にする行動力です。',
        'Unityゲーム、Androidアプリ、AI画像認識システム、Webアプリケーションなど、様々な開発に挑戦してきました。',
        '課題を分析し、試行錯誤しながら解決する力を身につけています。',
        '今後も学び続け、ユーザーに価値を提供できるソフトウェアエンジニアとして成長していきたいと考えています。'
      ]
    },
    career: {
      title: 'キャリア目標',
      subtitle: 'CAREER GOALS',
      goalsText: [
        'AI・クラウド・Web技術を活用し、世界中の人々が使うサービスを開発できるエンジニアになることを目標としています。',
        '常に学び続け、社会に価値を提供できるプロダクトを作りたいと考えています。'
      ]
    },
    github: {
      title: 'GitHub アクティビティ',
      subtitle: 'GITHUB STATS'
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'CONTACT',
      intro: '新しいプロジェクトのご相談、コラボレーション、または採用に関するお問い合わせは、以下のリンクからお気軽にご連絡ください。',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Emailを送信',
      resume: '履歴書を請求',
      copied: 'コピーしました！',
      copyEmail: 'メールアドレスをコピー'
    },
    footer: {
      developedBy: 'Designed & Developed by アヤズ タビアン イスラム',
      rights: 'All Rights Reserved.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      qualifications: 'Certifications',
      contact: 'Contact'
    },
    hero: {
      hello: "Hello 👋 I'm",
      name: 'Ayaz Tabian Islam',
      university: 'Bunkyo University',
      faculty: 'Faculty of Information and Communications',
      department: 'Department of Information Systems',
      roles: ['Software Engineer', 'Unity Developer', 'Cloud Enthusiast'],
      statement: '“Transforming ideas into interactive software that makes lives simpler.”',
      viewProjects: 'View Projects',
      viewGithub: 'View GitHub'
    },
    about: {
      title: 'About Me',
      subtitle: 'ABOUT ME',
      bioParagraphs: [
        "I'm Ayaz Tabian Islam.",
        'Currently studying at Bunkyo University, Faculty of Information and Communications, Department of Information Systems.',
        'I am highly passionate about AI, Cloud computing, Web application development, Android app development, and Unity game creation.',
        'I love building things and always seek out new technologies to integrate into my personal and collaborative projects.',
        'My future goal is to work as a Software Engineer developing services used by people worldwide.'
      ],
      hobbiesTitle: 'Hobbies & Interests',
      hobbies: [
        { icon: 'Gamepad2', text: 'Playing video games' },
        { icon: 'Code', text: 'Developing games in Unity' },
        { icon: 'Camera', text: 'Photographing Japanese landscapes' },
        { icon: 'Brain', text: 'Learning AI, Azure & Web technologies' }
      ]
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'SKILLS',
      bentoDescription: 'Technologies acquired through university coursework and personal development. Continuously upgrading my skill set while exploring new tools.',
      currentlyLearningTitle: 'Currently Learning',
      currentlyLearningSubtitle: 'CURRENTLY LEARNING'
    },
    projects: {
      title: 'Works',
      subtitle: 'PROJECTS',
      confidenceText: 'AI Confidence',
      demoDashboard: 'Dashboard Preview',
      items: {
        dragonBlaze: {
          title: 'Dragon Blaze',
          category: 'Unity RPG',
          description: 'A 2D RPG built in Unity, featuring custom enemy AI, combat mechanics, NPC dialogs, inventory systems, and retro pixel art.',
          tags: ['Unity', 'C#', 'AI', '2D Pixel Art']
        },
        touchakuWake: {
          title: 'Touchaku Wake',
          category: 'Android App',
          description: 'A mobile utility application designed for Android to enhance everyday productivity and simplify user routines.',
          tags: ['Android', 'Java/Kotlin', 'SQLite', 'Mobile UX']
        },
        jaNishiuwa: {
          title: 'JA Nishiuwa New Farmer Resource Matching System',
          category: 'Full-Stack GIS/IoT Web App',
          description: 'Graduation Project — Full-Stack GIS/IoT Web Application built for JA Nishiuwa, an agricultural cooperative in Japan, to help staff match new farmers with suitable farmland. The system replaces a manual, relationship-based matching process with a data-driven tool that scores candidate farmland using land size, crop suitability, slope, warehouse proximity, and IoT-sensed soil moisture and light data — collected via ESP32 sensor units deployed only on shortlisted candidate plots.',
          tags: ['Next.js', 'FastAPI', 'Supabase (PostGIS)', 'Firebase Auth', 'ESP32 / IoT', 'Vercel + Render'],
          visitPage: 'Visit Live Site'
        },
        azureChat: {
          title: 'Azure AI Chat',
          category: 'Web App',
          description: 'An AI conversational web application powered by Azure OpenAI Service, featuring user account authentication, chat session history persistence, and custom model parameter adjustments.',
          tags: ['React', 'Next.js', 'TypeScript', 'Azure OpenAI']
        },
        fitAi: {
          title: 'FitAI Trainer',
          category: 'Desktop App',
          description: 'A desktop AI fitness coach built with PySide6 (Qt for Python), OpenCV, and MediaPipe Pose. It tracks user posture in real-time, counts workout repetitions (e.g. squats), and judges pose accuracy. Integrates Firebase (Auth & Firestore) for secure user sessions, workout history tracking, and settings configuration.',
          tags: ['Python', 'PySide6', 'OpenCV', 'MediaPipe', 'Firebase']
        }
      }
    },
    qualifications: {
      title: 'Certifications',
      subtitle: 'CERTIFICATIONS'
    },
    education: {
      title: 'Education',
      subtitle: 'EDUCATION',
      items: [
        {
          school: 'Tohoku Foreign Language, Tourism and Business College',
          degree: 'Japanese Language Course',
          period: '2022 - 2024',
          status: 'Graduated'
        },
        {
          school: 'Bunkyo University',
          degree: 'Faculty of Information and Communications, Department of Information Systems',
          period: '2024 - 2028',
          status: 'Expected Graduation'
        }
      ]
    },
    selfPR: {
      title: 'Self Promotion',
      subtitle: 'MY STRENGTH',
      prText: [
        'My primary strength lies in my proactive mindset to explore new technologies and convert them into tangible solutions.',
        'I have developed a diverse set of applications, including Unity games, native Android apps, OpenCV AI classifiers, and Next.js sites.',
        'Through trial and error, I have sharpened my ability to analyze root errors and design robust, creative fixes.',
        'I am committed to lifelong learning and creating high-quality systems that deliver true value to users.'
      ]
    },
    career: {
      title: 'Career Goals',
      subtitle: 'CAREER GOALS',
      goalsText: [
        'To leverage AI, Cloud, and Web technologies to design and architect software that is utilized globally.',
        'To remain a continuous learner and deliver meaningful social impact through engineering.'
      ]
    },
    github: {
      title: 'GitHub Activity',
      subtitle: 'GITHUB STATS'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'CONTACT',
      intro: 'If you want to collaborate, discuss a project, or chat about recruitment, feel free to reach out using the links below!',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Send Email',
      resume: 'Resume Request',
      copied: 'Copied to clipboard!',
      copyEmail: 'Copy Email Address'
    },
    footer: {
      developedBy: 'Designed & Developed by Ayaz Tabian Islam',
      rights: 'All Rights Reserved.'
    }
  }
};
