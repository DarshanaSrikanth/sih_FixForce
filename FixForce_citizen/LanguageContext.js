import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // HomeScreen
    app_title : 'CivicSync',
    tagline: 'Empowering Citizens to Build Better Communities',
    description: 'Report civic issues instantly with photo evidence and GPS tracking. Track resolution progress and help make your city a better place to live.',
    feature_photo: 'Photo Reporting',
    feature_photo_sub: 'Instant Capture',
    feature_gps: 'GPS Tracking',
    feature_gps_sub: 'Precise Location',
    feature_live: 'Live Updates',
    feature_live_sub: 'Real-Time Status',
    get_started: 'Get Started',
    join_citizens: 'Join thousands of citizens making a difference',

  pothole: 'Pothole',
  streetlight: 'Streetlight',
  trash: 'Trash',
  water_issue: 'Water Issue',
  road_damage: 'Road Damage',
  other: 'Other',
  // Dashboard
    dashboard: 'Dashboard',
    greeting: 'Welcome',
    total_reports: 'Total Reports',
    all_time: 'All Time',
    pending: 'Pending',
    awaiting_review: 'Awaiting Review',
    resolved: 'Resolved',
    issues_fixed: 'Issues Fixed',
    report_new_issue: 'Report New Issue',
    capture_and_submit: 'Capture photo and submit instantly',
    your_recent_reports: 'Your Recent Reports',
    issue: 'Issue',
    issues: 'Issues',
    reported: 'Reported',
    no_reports: 'No Reports Yet',
    no_reports_hint: 'Tap "Report New Issue" above to submit your first civic issue report',
    view_details: 'View Details',

    // ReportIssue
    report_issue: 'Report Issue',
    capture_issue: 'Capture Issue',
    categorize_issue: 'Categorize Issue',
    describe_issue: 'Describe Issue',
    photo_captured: 'Photo Captured',
    tap_to_capture: 'Tap to Capture Photo',
    next_categorize: 'Next: Categorize',
    next_describe: 'Next: Describe',
    back: 'Back',
    submit_issue: 'Submit Issue',
    success: 'Issue Submitted Successfully!',
    step1: 'Capture Issue',
    step2: 'Categorize Issue',
    step3: 'Describe Issue',
    step2_full: 'Step 2: Categorize Issue',
    step3_full: 'Step 3: Describe Issue',
    describe_placeholder: 'Describe the issue in detail...',
    listening: 'Listening...',
  voice_to_text: 'Voice to Text',
  voice_to_text_placeholder: 'Speak or type your issue here...',
  voice_to_text_example: 'Broken pipe flooding the street near my house',
    header: 'Report Civic Issue',

    desc_pothole: "Large pothole on Main Street causing traffic issues and vehicle damage",
    desc_streetlight: "Broken streetlight near bus stop creating safety concerns at night",
    desc_trash: "Garbage overflow in residential area attracting pests and causing bad odor",
    // TrackStatus
    track_status: 'Track Status',
    track_issue_status: 'Track Issue Status',
    no_issue_selected: 'No issue selected. Go back to Dashboard and pick a report to track its status.',
    assigned_team: 'Assigned Team',
    team_specialization: 'Specialization',
    feedback: 'Feedback',
    submit_feedback: 'Submit Feedback',
    status_pending: 'Pending',
    status_under_review: 'Under Review',
    status_assigned: 'Assigned',
    status_in_progress: 'In Progress',
    status_completed: 'Completed',
    priority_high: 'High',
    priority_medium: 'Medium',
    priority_low: 'Low',
  },
  hi: {
    // HomeScreen
    app_title : 'सिविकसिंक',
    tagline: 'बेहतर समुदायों के निर्माण के लिए नागरिकों को सशक्त बनाना',
    description: 'फोटो प्रमाण और जीपीएस ट्रैकिंग के साथ नागरिक समस्याओं की तुरंत रिपोर्ट करें। समाधान प्रगति को ट्रैक करें और अपने शहर को रहने के लिए बेहतर बनाएं।',
    feature_photo: 'फोटो रिपोर्टिंग',
    feature_photo_sub: 'तुरंत कैप्चर',
    feature_gps: 'जीपीएस ट्रैकिंग',
    feature_gps_sub: 'सटीक स्थान',
    feature_live: 'लाइव अपडेट्स',
    feature_live_sub: 'रीयल-टाइम स्थिति',
    get_started: 'शुरू करें',
    join_citizens: 'हजारों नागरिकों के साथ बदलाव लाएं',


    desc_pothole: "मुख्य सड़क पर बड़ा गड्ढा, जिससे ट्रैफिक और वाहन क्षति हो रही है",
    desc_streetlight: "बस स्टॉप के पास टूटी स्ट्रीटलाइट, जिससे रात में सुरक्षा की चिंता",
    desc_trash: "आवासीय क्षेत्र में कचरा जमा, जिससे बदबू और कीट आ रहे हैं",
  pothole: 'गड्ढा',
  streetlight: 'स्ट्रीटलाइट',
  trash: 'कचरा',
  water_issue: 'पानी की समस्या',
  road_damage: 'सड़क क्षति',
  other: 'अन्य',
  // Dashboard
    dashboard: 'डैशबोर्ड',
    greeting: 'स्वागत है',
    total_reports: 'कुल रिपोर्ट',
    all_time: 'सभी समय',
    pending: 'लंबित',
    awaiting_review: 'समीक्षा लंबित',
    resolved: 'हल किया गया',
    issues_fixed: 'समस्याएं हल',
    report_new_issue: 'नई समस्या रिपोर्ट करें',
    capture_and_submit: 'फोटो लें और तुरंत सबमिट करें',
    your_recent_reports: 'आपकी हाल की रिपोर्ट',
    issue: 'समस्या',
    issues: 'समस्याएं',
    reported: 'रिपोर्ट की गई',
    no_reports: 'अभी तक कोई रिपोर्ट नहीं',
    no_reports_hint: 'ऊपर "नई समस्या रिपोर्ट करें" टैप करें और अपनी पहली नागरिक समस्या रिपोर्ट सबमिट करें',
    view_details: 'विवरण देखें',

    // ReportIssue
    report_issue: 'समस्या रिपोर्ट करें',
    capture_issue: 'समस्या कैप्चर करें',
    categorize_issue: 'समस्या वर्गीकृत करें',
    describe_issue: 'समस्या का विवरण',
    photo_captured: 'फोटो कैप्चर किया गया',
    tap_to_capture: 'फोटो कैप्चर करने के लिए टैप करें',
    next_categorize: 'अगला: वर्गीकृत करें',
    next_describe: 'अगला: विवरण',
    back: 'वापस',
    submit_issue: 'समस्या सबमिट करें',
    success: 'समस्या सफलतापूर्वक सबमिट हुई!',
    step1: 'समस्या कैप्चर करें',
    step2: 'समस्या वर्गीकृत करें',
    step3: 'समस्या का विवरण',
    step2_full: 'चरण 2: समस्या वर्गीकृत करें',
    step3_full: 'चरण 3: समस्या का विवरण',
    describe_placeholder: 'समस्या का विस्तार से वर्णन करें...',
    listening: 'सुन रहे हैं...',
  voice_to_text: 'आवाज से लिखें',
  voice_to_text_placeholder: 'यहां अपनी समस्या बोलें या लिखें...',
  voice_to_text_example: 'मेरे घर के पास टूटी पाइप से सड़क पर पानी भर गया है',
    header: 'नागरिक समस्या रिपोर्ट करें',

    // TrackStatus
    track_status: 'स्थिति ट्रैक करें',
    track_issue_status: 'समस्या स्थिति ट्रैक करें',
    no_issue_selected: 'कोई समस्या चयनित नहीं है। डैशबोर्ड पर जाएं और ट्रैक करने के लिए एक रिपोर्ट चुनें।',
    assigned_team: 'नियुक्त टीम',
    team_specialization: 'विशेषज्ञता',
    feedback: 'प्रतिक्रिया',
    submit_feedback: 'प्रतिक्रिया सबमिट करें',
    status_pending: 'लंबित',
    status_under_review: 'समीक्षा में',
    status_assigned: 'नियुक्त',
    status_in_progress: 'प्रगति पर',
    status_completed: 'पूर्ण',
    priority_high: 'उच्च',
    priority_medium: 'मध्यम',
    priority_low: 'निम्न',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = (key) => translations[language][key] || key;
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
