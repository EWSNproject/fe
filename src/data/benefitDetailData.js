export const benefitDetailData = [
  {
    id: 1,
    categories: [
      { name: '보육/교육', bgColor: 'bg-tag-red' },
      { name: '청년', bgColor: 'bg-tag-orange' },
      { name: '주거', bgColor: 'bg-tag-green' }
    ],
    serviceName: '전국민 마음투자 지원사업',
    servicePurpose: '우울/불안 등 정서적 어려움으로 인해 심리상담이 필요한 국민에게 전문적인 심리상담 서비스를 제공',
    isBookmarked: true,
    details: {
      department: '보건복지부',
      supportTarget: '만 19세 이상 국민',
      selectionCriteria: '기준 중위소득 120% 이하',
      supportDetails: '1인당 연간 최대 80만원 상당의 심리상담 서비스 제공',
      supportType: '바우처',
      applicationMethod: '온라인 신청',
      applicationDeadline: '2024.12.31까지',
      requiredDocuments: [
        '신분증',
        '주민등록등본',
        '건강보험료 납부확인서'
      ],
      location: '전국',
      contactInfo: '보건복지부/1577-0199',
      onlineApplicationUrl: 'https://www.bokjiro.go.kr'
    }
  },
  {
    id: 2,
    categories: [
      { name: '취업', bgColor: 'bg-tag-red' },
      { name: '청년', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '청년 취업 지원 프로그램',
    servicePurpose: '만 18-34세 청년을 대상으로 취업 상담, 직무 교육, 일자리 매칭 서비스를 제공',
    isBookmarked: false,
    details: {
      department: '고용노동부',
      supportTarget: '만 18-34세 청년',
      selectionCriteria: '미취업자, 최종학력 졸업 후 2년 이내',
      supportDetails: '1:1 취업상담, 직무교육 무료 제공',
      supportType: '현금(수당)',
      applicationMethod: '온라인/오프라인 신청',
      applicationDeadline: '2024년 연중 수시',
      requiredDocuments: [
        '신분증',
        '졸업증명서',
        '구직활동 증빙서류'
      ],
      location: '전국',
      contactInfo: '고용노동부/1350',
      onlineApplicationUrl: 'https://www.work.go.kr/youth'
    }
  },
  {
    id: 3,
    categories: [
      { name: '주거', bgColor: 'bg-tag-red' },
      { name: '신혼부부', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '신혼부부 주거지원 사업',
    servicePurpose: '신혼부부의 주거비용 부담을 덜어주기 위한 임대주택 지원 및 전세자금 대출 지원',
    isBookmarked: true,
    details: {
      department: '국토교통부',
      supportTarget: '혼인 7년 이내 신혼부부',
      selectionCriteria: '무주택세대구성원, 소득기준 충족',
      supportDetails: '임대주택 공급, 전세자금 최대 2억원 대출지원',
      supportType: '주택, 대출',
      applicationMethod: '청약홈 온라인 신청',
      applicationDeadline: '공고별 상이',
      requiredDocuments: [
        '혼인관계증명서',
        '주민등록등본',
        '소득증빙서류'
      ],
      location: '전국',
      contactInfo: '국토교통부/1599-0001',
      onlineApplicationUrl: 'https://www.applyhome.co.kr'
    }
  },
  {
    id: 4,
    categories: [
      { name: '창업', bgColor: 'bg-tag-red' },
      { name: '청년', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '청년 창업 지원금 사업',
    servicePurpose: '혁신적인 아이디어를 가진 청년 창업가를 위한 초기 사업자금 및 멘토링을 지원',
    isBookmarked: false,
    details: {
      department: '중소벤처기업부',
      supportTarget: '만 39세 이하 예비창업자',
      selectionCriteria: '창업 아이템 사업화 평가 통과자',
      supportDetails: '창업자금 최대 1억원, 멘토링 지원',
      supportType: '현금, 컨설팅',
      applicationMethod: '온라인 신청 후 심사',
      applicationDeadline: '2024년 상반기',
      requiredDocuments: [
        '사업계획서',
        '신분증',
        '창업교육 이수증'
      ],
      location: '전국',
      contactInfo: '중소벤처기업부/1357',
      onlineApplicationUrl: 'https://www.k-startup.go.kr'
    }
  },
  {
    id: 5,
    categories: [
      { name: '복지', bgColor: 'bg-tag-red' },
      { name: '노인', bgColor: 'bg-tag-orange' },
      { name: '건강', bgColor: 'bg-tag-green' }
    ],
    serviceName: '어르신 돌봄서비스',
    servicePurpose: '65세 이상 어르신을 위한 방문 돌봄 서비스와 일상생활 지원 서비스를 제공',
    isBookmarked: true,
    details: {
      department: '보건복지부',
      supportTarget: '만 65세 이상 어르신',
      selectionCriteria: '혼자 생활하기 어려운 노인',
      supportDetails: '방문요양, 주간보호, 단기보호 등 돌봄서비스',
      supportType: '서비스',
      applicationMethod: '읍면동 주민센터 방문 신청',
      applicationDeadline: '상시',
      requiredDocuments: [
        '신분증',
        '건강보험증',
        '의사소견서'
      ],
      location: '전국',
      contactInfo: '보건복지부/129',
      onlineApplicationUrl: 'https://www.bokjiro.go.kr'
    }
  },
  {
    id: 6,
    categories: [
      { name: '문화', bgColor: 'bg-tag-red' },
      { name: '생활', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '통합문화이용권',
    servicePurpose: '문화생활을 즐길 수 있도록 연간 문화바우처를 지원하는 사업',
    isBookmarked: false,
    details: {
      department: '문화체육관광부',
      supportTarget: '6세 이상 기초생활수급자 및 차상위계층',
      selectionCriteria: '소득인정액 기준 중위소득 120% 이하',
      supportDetails: '연간 11만원 문화바우처 지원',
      supportType: '바우처',
      applicationMethod: '온라인 또는 주민센터 방문 신청',
      applicationDeadline: '2024년 연중',
      requiredDocuments: [
        '신분증',
        '주민등록등본',
        '소득증빙서류'
      ],
      location: '전국',
      contactInfo: '문화체육관광부/1544-3412',
      onlineApplicationUrl: 'https://www.mnuri.kr'
    }
  },
  {
    id: 7,
    categories: [
      { name: '교육', bgColor: 'bg-tag-red' },
      { name: '초중고', bgColor: 'bg-tag-orange' },
      { name: '복지', bgColor: 'bg-tag-green' }
    ],
    serviceName: '방과후 학습 지원',
    servicePurpose: '저소득층 가정 자녀를 위한 방과후 학습 프로그램 수강료를 지원',
    isBookmarked: true,
    details: {
      department: '교육부',
      supportTarget: '초중고 재학생',
      selectionCriteria: '기초생활수급자, 차상위계층 가정 자녀',
      supportDetails: '방과후 학습 프로그램 수강료 전액 지원',
      supportType: '현금(감면)',
      applicationMethod: '학교 행정실 방문 신청',
      applicationDeadline: '학기 초',
      requiredDocuments: [
        '수급자증명서',
        '주민등록등본',
        '학생증'
      ],
      location: '전국',
      contactInfo: '교육부/02-6222-6060',
      onlineApplicationUrl: 'https://www.neis.go.kr'
    }
  },
  {
    id: 8,
    categories: [
      { name: '취업', bgColor: 'bg-tag-red' },
      { name: '장애인', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '장애인 취업 지원',
    servicePurpose: '장애인의 성공적인 사회진출을 위한 맞춤형 취업 교육과 일자리 연계를 지원',
    isBookmarked: false,
    details: {
      department: '고용노동부',
      supportTarget: '만 18세 이상 장애인',
      selectionCriteria: '장애인 등록자',
      supportDetails: '직업훈련, 취업알선, 고용유지 지원',
      supportType: '서비스',
      applicationMethod: '한국장애인고용공단 방문 신청',
      applicationDeadline: '상시',
      requiredDocuments: [
        '장애인증명서',
        '신분증',
        '구직신청서'
      ],
      location: '전국',
      contactInfo: '한국장애인고용공단/1588-1519',
      onlineApplicationUrl: 'https://www.kead.or.kr'
    }
  },
  {
    id: 9,
    categories: [
      { name: '창업', bgColor: 'bg-tag-red' },
      { name: '여성', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '여성 창업가 육성사업',
    servicePurpose: '여성 예비 창업가를 위한 창업교육, 멘토링, 사업화 자금을 지원',
    isBookmarked: true,
    details: {
      department: '중소벤처기업부',
      supportTarget: '여성 예비창업자 및 창업 3년 미만 기업',
      selectionCriteria: '사업계획 평가 통과자',
      supportDetails: '창업자금 최대 7천만원, 멘토링 지원',
      supportType: '현금, 컨설팅',
      applicationMethod: '온라인 신청',
      applicationDeadline: '2024년 상반기',
      requiredDocuments: [
        '사업계획서',
        '신분증',
        '창업교육 이수증'
      ],
      location: '전국',
      contactInfo: '여성기업종합지원센터/02-369-0900',
      onlineApplicationUrl: 'https://www.wbiz.or.kr'
    }
  },
  {
    id: 10,
    categories: [
      { name: '주거', bgColor: 'bg-tag-red' },
      { name: '청년', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '청년 전세자금 대출지원',
    servicePurpose: '무주택 청년의 주거비 부담 완화를 위해 저금리로 전세자금을 대출해주는 지원 사업',
    isBookmarked: false,
    details: {
      department: '국토교통부',
      supportTarget: '만 19-34세 무주택 청년',
      selectionCriteria: '연소득 5천만원 이하',
      supportDetails: '전세자금 최대 1억원, 연 1.5% 금리',
      supportType: '대출',
      applicationMethod: '주택도시기금 수탁은행 방문',
      applicationDeadline: '2024.12.31까지',
      requiredDocuments: [
        '신분증',
        '주민등록등본',
        '근로소득증명서'
      ],
      location: '전국',
      contactInfo: '국토교통부/1599-0001',
      onlineApplicationUrl: 'https://www.hf.go.kr'
    }
  },
  {
    id: 11,
    categories: [
      { name: '교육', bgColor: 'bg-tag-red' },
      { name: '장애인', bgColor: 'bg-tag-orange' },
      { name: '복지', bgColor: 'bg-tag-green' }
    ],
    serviceName: '장애인 평생교육 지원',
    servicePurpose: '장애인의 자기개발과 사회참여를 위한 다양한 평생교육 프로그램 수강을 지원',
    isBookmarked: true,
    details: {
      department: '교육부',
      supportTarget: '등록 장애인',
      selectionCriteria: '만 18세 이상 장애인',
      supportDetails: '교육비 전액 지원, 맞춤형 교육 프로그램 제공',
      supportType: '바우처',
      applicationMethod: '주민센터 방문 신청',
      applicationDeadline: '분기별 모집',
      requiredDocuments: [
        '장애인등록증',
        '신분증',
        '수강신청서'
      ],
      location: '전국',
      contactInfo: '교육부/02-6222-6060',
      onlineApplicationUrl: 'https://www.nise.go.kr'
    }
  },
  {
    id: 12,
    categories: [
      { name: '복지', bgColor: 'bg-tag-red' },
      { name: '다문화', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '다문화가정 적응지원',
    servicePurpose: '다문화가정의 안정적인 한국생활 적응을 위한 언어교육 및 문화체험을 지원',
    isBookmarked: false,
    details: {
      department: '여성가족부',
      supportTarget: '다문화가족',
      selectionCriteria: '한국거주 5년 이내 결혼이민자 및 자녀',
      supportDetails: '한국어교육, 문화이해교육, 자녀교육 지원',
      supportType: '서비스',
      applicationMethod: '다문화가족지원센터 방문',
      applicationDeadline: '상시',
      requiredDocuments: [
        '외국인등록증',
        '가족관계증명서',
        '주민등록등본'
      ],
      location: '전국',
      contactInfo: '다누리콜센터/1577-1366',
      onlineApplicationUrl: 'https://www.liveinkorea.kr'
    }
  },
  {
    id: 13,
    categories: [
      { name: '취업', bgColor: 'bg-tag-red' },
      { name: '경력단절', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '경력단절여성 재취업 지원',
    servicePurpose: '결혼, 임신, 출산으로 경력이 단절된 여성들의 재취업을 위한 직업교육을 제공',
    isBookmarked: true,
    details: {
      department: '여성가족부',
      supportTarget: '경력단절여성',
      selectionCriteria: '미취업 여성',
      supportDetails: '직업교육훈련, 취업알선, 사후관리',
      supportType: '서비스',
      applicationMethod: '여성새로일하기센터 방문',
      applicationDeadline: '수시',
      requiredDocuments: [
        '신분증',
        '구직신청서',
        '경력증명서'
      ],
      location: '전국',
      contactInfo: '여성새로일하기센터/1544-1199',
      onlineApplicationUrl: 'https://saeil.mogef.go.kr'
    }
  },
  {
    id: 14,
    categories: [
      { name: '창업', bgColor: 'bg-tag-red' },
      { name: '장년', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '신중년 창업 지원사업',
    servicePurpose: '40-64세 중장년층의 성공적인 창업을 위한 교육, 컨설팅, 사업화 자금을 지원',
    isBookmarked: false,
    details: {
      department: '중소벤처기업부',
      supportTarget: '만 40-64세 예비창업자',
      selectionCriteria: '창업 아이템 보유자',
      supportDetails: '창업자금 최대 5천만원, 창업교육 제공',
      supportType: '현금, 교육',
      applicationMethod: '온라인 신청',
      applicationDeadline: '2024년 상반기',
      requiredDocuments: [
        '사업계획서',
        '신분증',
        '경력증명서'
      ],
      location: '전국',
      contactInfo: '중소벤처기업부/1357',
      onlineApplicationUrl: 'https://www.k-startup.go.kr'
    }
  },
  {
    id: 15,
    categories: [
      { name: '복지', bgColor: 'bg-tag-red' },
      { name: '아동', bgColor: 'bg-tag-orange' },
      { name: '건강', bgColor: 'bg-tag-green' }
    ],
    serviceName: '아동 발달지원 서비스',
    servicePurpose: '발달 지연이 우려되는 아동에게 맞춤형 발달지원 서비스를 제공',
    isBookmarked: true,
    details: {
      department: '보건복지부',
      supportTarget: '만 0-12세 아동',
      selectionCriteria: '발달 지연 우려 아동',
      supportDetails: '발달검사, 언어치료, 놀이치료 등 제공',
      supportType: '바우처',
      applicationMethod: '주민센터 방문 신청',
      applicationDeadline: '상시',
      requiredDocuments: [
        '신분증',
        '검사결과지',
        '의사소견서'
      ],
      location: '전국',
      contactInfo: '보건복지부/129',
      onlineApplicationUrl: 'https://www.bokjiro.go.kr'
    }
  },
  {
    id: 16,
    categories: [
      { name: '주거', bgColor: 'bg-tag-red' },
      { name: '노인', bgColor: 'bg-tag-orange' },
      { name: '복지', bgColor: 'bg-tag-green' }
    ],
    serviceName: '어르신 주거환경 개선',
    servicePurpose: '65세 이상 어르신 가구의 안전하고 편리한 주거생활을 위한 주택 개보수를 지원',
    isBookmarked: false,
    details: {
      department: '국토교통부',
      supportTarget: '만 65세 이상 어르신',
      selectionCriteria: '기초생활수급자 또는 차상위계층',
      supportDetails: '주택 개보수 비용 최대 500만원 지원',
      supportType: '현물',
      applicationMethod: '주민센터 방문 신청',
      applicationDeadline: '2024년 상반기',
      requiredDocuments: [
        '신분증',
        '주민등록등본',
        '소득증빙서류'
      ],
      location: '전국',
      contactInfo: '국토교통부/1599-0001',
      onlineApplicationUrl: 'https://www.myhome.go.kr'
    }
  },
  {
    id: 17,
    categories: [
      { name: '문화', bgColor: 'bg-tag-red' },
      { name: '청년', bgColor: 'bg-tag-orange' },
      { name: '교육', bgColor: 'bg-tag-green' }
    ],
    serviceName: '청년 예술인 지원사업',
    servicePurpose: '청년 예술인의 창작활동 지원을 위한 활동비와 공간을 제공',
    isBookmarked: true,
    details: {
      department: '문화체육관광부',
      supportTarget: '만 39세 이하 예술인',
      selectionCriteria: '예술활동증명 완료자',
      supportDetails: '창작지원금 월 100만원, 작업공간 제공',
      supportType: '현금, 공간',
      applicationMethod: '온라인 신청',
      applicationDeadline: '2024년 분기별 모집',
      requiredDocuments: [
        '예술활동증명서',
        '포트폴리오',
        '신분증'
      ],
      location: '전국',
      contactInfo: '한국예술인복지재단/02-3668-0200',
      onlineApplicationUrl: 'https://www.kawf.kr'
    }
  },
  {
    id: 18,
    categories: [
      { name: '복지', bgColor: 'bg-tag-red' },
      { name: '한부모', bgColor: 'bg-tag-orange' },
      { name: '주거', bgColor: 'bg-tag-green' }
    ],
    serviceName: '한부모가족 주거자립 지원',
    servicePurpose: '한부모가족의 주거안정을 위한 임대주택 지원 및 주거환경 개선을 지원',
    isBookmarked: false,
    details: {
      department: '여성가족부',
      supportTarget: '한부모가족',
      selectionCriteria: '소득인정액 기준 중위소득 60% 이하',
      supportDetails: '임대주택 우선공급, 주거비용 지원',
      supportType: '주택, 현금',
      applicationMethod: '주민센터 방문 신청',
      applicationDeadline: '상시',
      requiredDocuments: [
        '한부모가족증명서',
        '주민등록등본',
        '소득증빙서류'
      ],
      location: '전국',
      contactInfo: '여성가족부/1644-6621',
      onlineApplicationUrl: 'https://www.mogef.go.kr'
    }
  },
  {
    id: 19,
    categories: [
      { name: '교육', bgColor: 'bg-tag-red' },
      { name: '청소년', bgColor: 'bg-tag-orange' },
      { name: '복지', bgColor: 'bg-tag-green' }
    ],
    serviceName: '학업중단 청소년 지원',
    servicePurpose: '학교 밖 청소년의 학업 복귀와 자립을 위한 맞춤형 지원 서비스를 제공',
    isBookmarked: true,
    details: {
      department: '여성가족부',
      supportTarget: '만 9-24세 학교 밖 청소년',
      selectionCriteria: '학업중단 청소년',
      supportDetails: '학업복귀 지원, 직업교육, 자립지원',
      supportType: '서비스',
      applicationMethod: '청소년지원센터 꿈드림 방문',
      applicationDeadline: '상시',
      requiredDocuments: [
        '신분증',
        '학교 제적(중퇴)증명서',
        '주민등록등본'
      ],
      location: '전국',
      contactInfo: '청소년지원센터/1388',
      onlineApplicationUrl: 'https://www.kdream.or.kr'
    }
  },
  {
    id: 20,
    categories: [
      { name: '창업', bgColor: 'bg-tag-red' },
      { name: '농어촌', bgColor: 'bg-tag-orange' },
      { name: '금융', bgColor: 'bg-tag-green' }
    ],
    serviceName: '귀농귀촌 창업 지원',
    servicePurpose: '귀농귀촌을 희망하는 도시민의 성공적인 정착을 위한 교육과 초기 사업비를 지원',
    isBookmarked: false,
    details: {
      department: '농림축산식품부',
      supportTarget: '귀농귀촌 희망자',
      selectionCriteria: '도시 1년 이상 거주자',
      supportDetails: '정착자금 최대 3억원 융자, 교육비 지원',
      supportType: '대출, 교육',
      applicationMethod: '농림사업정보시스템 온라인 신청',
      applicationDeadline: '2024년 상반기',
      requiredDocuments: [
        '귀농교육 이수증',
        '주민등록등본',
        '사업계획서'
      ],
      location: '전국',
      contactInfo: '농림축산식품부/1577-1372',
      onlineApplicationUrl: 'https://www.returnfarm.com'
    }
  }
]; 