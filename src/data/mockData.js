// Mock data for CivicSync - Government of Jharkhand

export const mockIssues = [
  {
    id: "JH_POT_2024_001",
    category: "roads",
    title: "Large pothole near Ranchi University Gate",
    titleHindi: "रांची विश्वविद्यालय गेट के पास बड़ा गड्ढा",
    location: {
      area: "Ranchi University Road",
      areaHindi: "रांची विश्वविद्यालय रोड",
      coordinates: [85.3240, 23.3441],
      landmark: "Near Gate No. 2",
      landmarkHindi: "गेट नंबर 2 के पास"
    },
    priority_score: 95,
    severity: "HIGH",
    special_tags: ["UNIVERSITY_ZONE", "HIGH_TRAFFIC"],
    reported_by: "citizen_123",
    image_url: "/uploads/pothole_001.jpg",
    description: "Large dangerous pothole causing vehicle damage and traffic congestion",
    descriptionHindi: "बड़ा खतरनाक गड्ढा जो वाहन क्षति और यातायात भीड़ का कारण बन रहा है",
    workers_needed: 3,
    estimated_resolution: "4 hours",
    status: "pending_assignment",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "JH_WST_2024_002",
    category: "waste",
    title: "Garbage overflow at Marina Beach area",
    titleHindi: "मरीना बीच क्षेत्र में कचरा अतिप्रवाह",
    location: {
      area: "Marina Beach Road",
      areaHindi: "मरीना बीच रोड",
      coordinates: [85.2800, 23.3500],
      landmark: "Near Beach Entrance",
      landmarkHindi: "बीच प्रवेश द्वार के पास"
    },
    priority_score: 88,
    severity: "HIGH",
    special_tags: ["TOURIST_ZONE", "HEALTH_HAZARD"],
    reported_by: "citizen_456",
    image_url: "/uploads/waste_002.jpg",
    description: "Garbage bins overflowing with waste, creating health hazard",
    descriptionHindi: "कचरे से भरे डिब्बे अतिप्रवाह, स्वास्थ्य खतरा पैदा कर रहे हैं",
    workers_needed: 4,
    estimated_resolution: "2 hours",
    status: "assigned",
    created_at: "2024-01-15T09:15:00Z",
    updated_at: "2024-01-15T11:00:00Z"
  },
  {
    id: "JH_LGT_2024_003",
    category: "lighting",
    title: "Street light not working near school",
    titleHindi: "स्कूल के पास स्ट्रीट लाइट काम नहीं कर रही",
    location: {
      area: "DPS School Road",
      areaHindi: "डीपीएस स्कूल रोड",
      coordinates: [85.3100, 23.3600],
      landmark: "Near School Gate",
      landmarkHindi: "स्कूल गेट के पास"
    },
    priority_score: 92,
    severity: "HIGH",
    special_tags: ["SCHOOL_ZONE", "SAFETY_ISSUE"],
    reported_by: "citizen_789",
    image_url: "/uploads/lighting_003.jpg",
    description: "Multiple street lights not working, creating safety concern for students",
    descriptionHindi: "कई स्ट्रीट लाइट्स काम नहीं कर रहीं, छात्रों के लिए सुरक्षा चिंता",
    workers_needed: 2,
    estimated_resolution: "3 hours",
    status: "in_progress",
    created_at: "2024-01-15T08:45:00Z",
    updated_at: "2024-01-15T12:30:00Z"
  },
  {
    id: "JH_WTR_2024_004",
    category: "water",
    title: "Water leakage from main pipeline",
    titleHindi: "मुख्य पाइपलाइन से पानी का रिसाव",
    location: {
      area: "Bariatu Road",
      areaHindi: "बरियातू रोड",
      coordinates: [85.2900, 23.3700],
      landmark: "Near Water Tank",
      landmarkHindi: "वाटर टैंक के पास"
    },
    priority_score: 85,
    severity: "MEDIUM",
    special_tags: ["WATER_WASTAGE", "INFRASTRUCTURE"],
    reported_by: "citizen_101",
    image_url: "/uploads/water_004.jpg",
    description: "Continuous water leakage from main pipeline causing water wastage",
    descriptionHindi: "मुख्य पाइपलाइन से लगातार पानी का रिसाव, जल बर्बादी का कारण",
    workers_needed: 3,
    estimated_resolution: "6 hours",
    status: "pending_assignment",
    created_at: "2024-01-15T07:20:00Z",
    updated_at: "2024-01-15T07:20:00Z"
  },
  {
    id: "JH_DRN_2024_005",
    category: "drainage",
    title: "Blocked drainage causing water logging",
    titleHindi: "अवरुद्ध जल निकासी से जल भराव",
    location: {
      area: "Hinoo Road",
      areaHindi: "हिनू रोड",
      coordinates: [85.2700, 23.3800],
      landmark: "Near Market Area",
      landmarkHindi: "बाजार क्षेत्र के पास"
    },
    priority_score: 78,
    severity: "MEDIUM",
    special_tags: ["WATER_LOGGING", "COMMERCIAL_AREA"],
    reported_by: "citizen_202",
    image_url: "/uploads/drainage_005.jpg",
    description: "Blocked drainage system causing water logging during rains",
    descriptionHindi: "अवरुद्ध जल निकासी प्रणाली से बारिश के दौरान जल भराव",
    workers_needed: 4,
    estimated_resolution: "5 hours",
    status: "assigned",
    created_at: "2024-01-15T06:30:00Z",
    updated_at: "2024-01-15T10:15:00Z"
  },
  {
    id: "JH_ELE_2024_006",
    category: "electricity",
    title: "Power outage in residential area",
    titleHindi: "आवासीय क्षेत्र में बिजली कटौती",
    location: {
      area: "Kanke Road",
      areaHindi: "कांके रोड",
      coordinates: [85.3000, 23.3900],
      landmark: "Near Residential Complex",
      landmarkHindi: "आवासीय परिसर के पास"
    },
    priority_score: 90,
    severity: "HIGH",
    special_tags: ["RESIDENTIAL_AREA", "POWER_OUTAGE"],
    reported_by: "citizen_303",
    image_url: "/uploads/electricity_006.jpg",
    description: "Power outage affecting multiple residential buildings",
    descriptionHindi: "बिजली कटौती से कई आवासीय इमारतें प्रभावित",
    workers_needed: 2,
    estimated_resolution: "2 hours",
    status: "in_progress",
    created_at: "2024-01-15T05:45:00Z",
    updated_at: "2024-01-15T11:45:00Z"
  },
  {
    id: "JH_PRK_2024_007",
    category: "parks",
    title: "Broken playground equipment in city park",
    titleHindi: "शहर पार्क में टूटा खेल का सामान",
    location: {
      area: "Rock Garden Park",
      areaHindi: "रॉक गार्डन पार्क",
      coordinates: [85.3200, 23.4000],
      landmark: "Near Children's Play Area",
      landmarkHindi: "बच्चों के खेल क्षेत्र के पास"
    },
    priority_score: 65,
    severity: "LOW",
    special_tags: ["CHILDREN_SAFETY", "RECREATION"],
    reported_by: "citizen_404",
    image_url: "/uploads/park_007.jpg",
    description: "Broken swing and slide equipment posing safety risk to children",
    descriptionHindi: "टूटा झूला और स्लाइड उपकरण बच्चों के लिए सुरक्षा जोखिम",
    workers_needed: 2,
    estimated_resolution: "3 hours",
    status: "pending_assignment",
    created_at: "2024-01-15T04:20:00Z",
    updated_at: "2024-01-15T04:20:00Z"
  },
  {
    id: "JH_TRN_2024_008",
    category: "transport",
    title: "Bus stop shelter damaged",
    titleHindi: "बस स्टॉप शेल्टर क्षतिग्रस्त",
    location: {
      area: "Main Road",
      areaHindi: "मेन रोड",
      coordinates: [85.2800, 23.4100],
      landmark: "Near Central Bus Stand",
      landmarkHindi: "केंद्रीय बस स्टैंड के पास"
    },
    priority_score: 72,
    severity: "MEDIUM",
    special_tags: ["PUBLIC_TRANSPORT", "COMMUTER_SAFETY"],
    reported_by: "citizen_505",
    image_url: "/uploads/transport_008.jpg",
    description: "Bus stop shelter roof damaged, no protection from rain",
    descriptionHindi: "बस स्टॉप शेल्टर की छत क्षतिग्रस्त, बारिश से कोई सुरक्षा नहीं",
    workers_needed: 3,
    estimated_resolution: "4 hours",
    status: "assigned",
    created_at: "2024-01-15T03:15:00Z",
    updated_at: "2024-01-15T09:30:00Z"
  }
];

export const mockEmployees = [
  {
    id: "EMP_001",
    name: "Rajesh Kumar",
    nameHindi: "राजेश कुमार",
    department: "roads",
    skills: ["Pothole Repair", "Road Maintenance", "Asphalt Work"],
    skillsHindi: ["गड्ढा मरम्मत", "सड़क रखरखाव", "डामर कार्य"],
    rating: 4.8,
    status: "available",
    experience: "8 years",
    location: "Ranchi",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@jharkhand.gov.in"
  },
  {
    id: "EMP_002",
    name: "Priya Singh",
    nameHindi: "प्रिया सिंह",
    department: "waste",
    skills: ["Waste Collection", "Sanitation", "Public Health"],
    skillsHindi: ["कचरा संग्रह", "सफाई", "सार्वजनिक स्वास्थ्य"],
    rating: 4.6,
    status: "available",
    experience: "6 years",
    location: "Ranchi",
    phone: "+91 98765 43211",
    email: "priya.singh@jharkhand.gov.in"
  },
  {
    id: "EMP_003",
    name: "Amit Verma",
    nameHindi: "अमित वर्मा",
    department: "lighting",
    skills: ["Electrical Work", "Street Light Repair", "Power Systems"],
    skillsHindi: ["विद्युत कार्य", "स्ट्रीट लाइट मरम्मत", "पावर सिस्टम"],
    rating: 4.9,
    status: "busy",
    experience: "10 years",
    location: "Ranchi",
    phone: "+91 98765 43212",
    email: "amit.verma@jharkhand.gov.in"
  },
  {
    id: "EMP_004",
    name: "Sunita Devi",
    nameHindi: "सुनीता देवी",
    department: "water",
    skills: ["Pipeline Repair", "Water Supply", "Plumbing"],
    skillsHindi: ["पाइपलाइन मरम्मत", "जल आपूर्ति", "प्लंबिंग"],
    rating: 4.7,
    status: "available",
    experience: "7 years",
    location: "Ranchi",
    phone: "+91 98765 43213",
    email: "sunita.devi@jharkhand.gov.in"
  },
  {
    id: "EMP_005",
    name: "Vikash Kumar",
    nameHindi: "विकाश कुमार",
    department: "drainage",
    skills: ["Drainage Cleaning", "Sewer Maintenance", "Water Logging"],
    skillsHindi: ["जल निकासी सफाई", "सीवर रखरखाव", "जल भराव"],
    rating: 4.5,
    status: "available",
    experience: "5 years",
    location: "Ranchi",
    phone: "+91 98765 43214",
    email: "vikash.kumar@jharkhand.gov.in"
  },
  {
    id: "EMP_006",
    name: "Ravi Shankar",
    nameHindi: "रवि शंकर",
    department: "electricity",
    skills: ["Power Line Repair", "Transformer Maintenance", "Electrical Safety"],
    skillsHindi: ["पावर लाइन मरम्मत", "ट्रांसफॉर्मर रखरखाव", "विद्युत सुरक्षा"],
    rating: 4.8,
    status: "available",
    experience: "12 years",
    location: "Ranchi",
    phone: "+91 98765 43215",
    email: "ravi.shankar@jharkhand.gov.in"
  },
  {
    id: "EMP_007",
    name: "Meera Kumari",
    nameHindi: "मीरा कुमारी",
    department: "parks",
    skills: ["Park Maintenance", "Equipment Repair", "Public Safety"],
    skillsHindi: ["पार्क रखरखाव", "उपकरण मरम्मत", "सार्वजनिक सुरक्षा"],
    rating: 4.4,
    status: "available",
    experience: "4 years",
    location: "Ranchi",
    phone: "+91 98765 43216",
    email: "meera.kumari@jharkhand.gov.in"
  },
  {
    id: "EMP_008",
    name: "Suresh Yadav",
    nameHindi: "सुरेश यादव",
    department: "transport",
    skills: ["Infrastructure Repair", "Public Transport", "Safety Standards"],
    skillsHindi: ["बुनियादी ढांचा मरम्मत", "सार्वजनिक परिवहन", "सुरक्षा मानक"],
    rating: 4.6,
    status: "available",
    experience: "9 years",
    location: "Ranchi",
    phone: "+91 98765 43217",
    email: "suresh.yadav@jharkhand.gov.in"
  }
];

export const mockStats = {
  totalIssuesResolved: 15847,
  activeCases: 1234,
  responseTime: "4.2 hrs avg",
  successRate: "94.3%",
  highPriorityIssues: 23,
  mediumPriorityIssues: 45,
  lowPriorityIssues: 12,
  resolvedToday: 67
};

export const mockCategories = [
  {
    id: "roads",
    name: "Roads & Potholes",
    nameHindi: "सड़क और गड्ढे",
    icon: "🛣️",
    color: "bg-orange-500",
    issuesCount: 45,
    resolvedCount: 38
  },
  {
    id: "lighting",
    name: "Street Lighting",
    nameHindi: "स्ट्रीट लाइटिंग",
    icon: "💡",
    color: "bg-yellow-500",
    issuesCount: 32,
    resolvedCount: 28
  },
  {
    id: "waste",
    name: "Waste Management",
    nameHindi: "अपशिष्ट प्रबंधन",
    icon: "🗑️",
    color: "bg-green-500",
    issuesCount: 67,
    resolvedCount: 59
  },
  {
    id: "water",
    name: "Water Supply",
    nameHindi: "जल आपूर्ति",
    icon: "💧",
    color: "bg-blue-500",
    issuesCount: 28,
    resolvedCount: 24
  },
  {
    id: "drainage",
    name: "Drainage & Sewerage",
    nameHindi: "जल निकासी",
    icon: "🏘️",
    color: "bg-purple-500",
    issuesCount: 41,
    resolvedCount: 35
  },
  {
    id: "electricity",
    name: "Electricity",
    nameHindi: "बिजली",
    icon: "⚡",
    color: "bg-red-500",
    issuesCount: 23,
    resolvedCount: 20
  },
  {
    id: "parks",
    name: "Public Parks",
    nameHindi: "सार्वजनिक पार्क",
    icon: "🌳",
    color: "bg-emerald-500",
    issuesCount: 15,
    resolvedCount: 13
  },
  {
    id: "transport",
    name: "Public Transport",
    nameHindi: "सार्वजनिक परिवहन",
    icon: "🚌",
    color: "bg-indigo-500",
    issuesCount: 19,
    resolvedCount: 16
  }
];

export const mockAnalytics = {
  resolutionTrends: [
    { month: "Jan", resolved: 1200, pending: 200 },
    { month: "Feb", resolved: 1350, pending: 180 },
    { month: "Mar", resolved: 1420, pending: 160 },
    { month: "Apr", resolved: 1380, pending: 190 },
    { month: "May", resolved: 1500, pending: 150 },
    { month: "Jun", resolved: 1620, pending: 140 }
  ],
  categoryDistribution: [
    { category: "Waste Management", count: 67, percentage: 25 },
    { category: "Roads & Potholes", count: 45, percentage: 17 },
    { category: "Drainage", count: 41, percentage: 15 },
    { category: "Water Supply", count: 28, percentage: 10 },
    { category: "Street Lighting", count: 32, percentage: 12 },
    { category: "Electricity", count: 23, percentage: 9 },
    { category: "Public Transport", count: 19, percentage: 7 },
    { category: "Public Parks", count: 15, percentage: 5 }
  ],
  employeeEfficiency: [
    { name: "Amit Verma", rating: 4.9, tasksCompleted: 45 },
    { name: "Rajesh Kumar", rating: 4.8, tasksCompleted: 42 },
    { name: "Ravi Shankar", rating: 4.8, tasksCompleted: 38 },
    { name: "Sunita Devi", rating: 4.7, tasksCompleted: 35 },
    { name: "Priya Singh", rating: 4.6, tasksCompleted: 33 },
    { name: "Suresh Yadav", rating: 4.6, tasksCompleted: 31 },
    { name: "Vikash Kumar", rating: 4.5, tasksCompleted: 28 },
    { name: "Meera Kumari", rating: 4.4, tasksCompleted: 25 }
  ]
};
