import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Patient Dashboard",
    games: "Cognitive Games",
    progress: "Progress",
    reminders: "Reminders",
    caregiver: "Caregiver Portal",
    
    // Header & Badges
    online: "Online",
    offline: "Offline - Local Mode",
    voiceAssistant: "Voice Assist",
    tagline: "AI Cognitive Gaming & Memory Assistance for Elderly",
    
    // Landing
    heroTitle: "Empowering Minds, Preserving Memories",
    heroDesc: "A compassionate AI-powered cognitive health and memory support platform designed specifically for elderly individuals and dementia patients in the North Eastern Region.",
    getStarted: "Get Started",
    caregiverAccess: "Caregiver Access",
    keyFeatures: "Core Platform Capabilities",
    
    // Patient Dashboard
    welcome: "Welcome Back",
    greetingDesc: "Here is your gentle cognitive overview for today.",
    moodCheckTitle: "How are you feeling right now?",
    moodGreat: "Feeling Great",
    moodOkay: "Feeling Okay",
    moodSupport: "Need Support",
    startGamesCTA: "Start Today's Cognitive Games",
    todaysScore: "Today's Cognitive Score",
    nextReminder: "Next Reminder",
    waterTracker: "Hydration Progress",
    dailyActivities: "Daily Activity",

    // Games
    gameTitle: "Cognitive Training Center",
    gameSubtitle: "Scientifically structured games designed to strengthen memory, focus, and calculation.",
    autoMode: "AI Adaptive Mode",
    manualMode: "Manual Mode",
    currentAiLevel: "AI Difficulty Level",
    playNow: "Play Game",
    improvedMsg: "AI Insight: Outstanding accuracy! Next game session difficulty increased for optimal challenge.",
    adjustedMsg: "AI Insight: Good effort! Difficulty adjusted to match your comfortable cognitive pace.",

    // Progress
    progressTitle: "Cognitive Health Tracking",
    overallScore: "Overall Cognitive Index",
    memoryScore: "Memory Function",
    attentionScore: "Focus & Attention",
    calcScore: "Working Calculation",
    weeklyTrend: "Weekly Performance Trend",

    // Reminders
    remindersTitle: "Daily Health & Activity Schedule",
    markDone: "Mark Completed",
    completed: "Completed",
    addCup: "+1 Cup Water",
    
    // Caregiver
    caregiverTitle: "Caregiver & Family Dashboard",
    patientProfile: "Patient Overview",
    clinicalAlerts: "Clinical & Adherence Alerts",
    aiInsights: "AI Diagnostic Insights",
    memoryBank: "Family Memory Bank",
  },

  hi: {
    // Navigation
    home: "मुख्य पृष्ठ",
    dashboard: "मरीज डैशबोर्ड",
    games: "दिमागी खेल",
    progress: "प्रगति रिपोर्ट",
    reminders: "याद दिलाना (रिमाइंडर्स)",
    caregiver: "देखभालकर्ता पोर्टल",
    
    // Header & Badges
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन - लोकल मोड",
    voiceAssistant: "आवाज़ सहायता",
    tagline: "बुजुर्गों के लिए एआई संज्ञानात्मक खेल और स्मृति सहायता",
    
    // Landing
    heroTitle: "मस्तिष्क को सशक्त बनाएं, यादों को सहेजें",
    heroDesc: "उत्तर-पूर्वी क्षेत्र के बुजुर्गों और डिमेंशिया मरीजों के लिए विशेष रूप से डिज़ाइन किया गया एक देखभाल करने वाला AI प्लेटफॉर्म।",
    getStarted: "शुरू करें",
    caregiverAccess: "देखभालकर्ता पहुंच",
    keyFeatures: "प्रमुख विशेषताएं",
    
    // Patient Dashboard
    welcome: "नमस्ते",
    greetingDesc: "आज का आपका मानसिक स्वास्थ्य विवरण यहां है।",
    moodCheckTitle: "आप अभी कैसा महसूस कर रहे हैं?",
    moodGreat: "बहुत अच्छा",
    moodOkay: "ठीक-ठाक",
    moodSupport: "सहायता चाहिए",
    startGamesCTA: "आज के खेल शुरू करें",
    todaysScore: "आज का दिमागी स्कोर",
    nextReminder: "अगली दवा/काम",
    waterTracker: "पानी पीने का ट्रैक",
    dailyActivities: "दैनिक गतिविधियां",

    // Games
    gameTitle: "मस्तिष्क प्रशिक्षण केंद्र",
    gameSubtitle: "याददाश्त, ध्यान और गणना को मजबूत करने के लिए तैयार किए गए खेल।",
    autoMode: "एआई अनुकूलन मोड",
    manualMode: "मैनुअल मोड",
    currentAiLevel: "एआई कठिनाई स्तर",
    playNow: "खेलें",
    improvedMsg: "एआई सुझाव: बहुत बढ़िया प्रदर्शन! अगली चुनौती का स्तर बढ़ा दिया गया है।",
    adjustedMsg: "एआई सुझाव: अच्छा प्रयास! स्तर आपकी सुविधानुसार समायोजित किया गया है।",

    // Progress
    progressTitle: "मानसिक स्वास्थ्य रिपोर्ट",
    overallScore: "कुल दिमागी सूचकांक",
    memoryScore: "याददाश्त क्षमता",
    attentionScore: "ध्यान और एकाग्रता",
    calcScore: "कार्यशील गणना",
    weeklyTrend: "साप्ताहिक प्रगति ग्राफ",

    // Reminders
    remindersTitle: "दैनिक स्वास्थ्य व गतिविधि अनुसूची",
    markDone: "पूरा चिह्नित करें",
    completed: "पूरा हुआ",
    addCup: "+1 गिलास पानी",
    
    // Caregiver
    caregiverTitle: "देखभालकर्ता व परिवार डैशबोर्ड",
    patientProfile: "मरीज विवरण",
    clinicalAlerts: "स्वास्थ्य अलर्ट",
    aiInsights: "एआई नैदानिक ​​अंतर्दृष्टि",
    memoryBank: "पारिवारिक मेमोरी बैंक",
  },

  as: {
    // Navigation (Assamese / Axomiya)
    home: "প্রধান পৃষ্ঠা",
    dashboard: "ৰোগীৰ ডেশ্বব’ৰ্ড",
    games: "মগজুৰ খেল",
    progress: "অগ্রগতি",
    reminders: "সোঁৱৰণী",
    caregiver: "যত্নলওঁতাৰ প'ৰ্টেল",
    
    // Header & Badges
    online: "অনলাইন",
    offline: "অফলাইন - লোকেল ম'ড",
    voiceAssistant: "মাতৰ সহায়",
    tagline: "বয়স্কসকলৰ বাবে AI মগজুৰ খেল আৰু স্মৃতি সহায়",
    
    // Landing
    heroTitle: "মন শক্তিশালী কৰক, স্মৃতি ৰক্ষা কৰক",
    heroDesc: "উত্তৰ-পূব ভাৰতৰ জ্যেষ্ঠ আৰু ডিমেনচিয়া ৰোগীৰ বাবে বিশেষভাৱে প্ৰস্তুত কৰা মৰমিয়াল AI মঞ্চ।",
    getStarted: "আৰম্ভ কৰক",
    caregiverAccess: "যত্নলওঁতাৰ প্ৰৱেশ",
    keyFeatures: "মূল সুবিধাসমূহ",
    
    // Patient Dashboard
    welcome: "আদৰণি জনাইছোঁ",
    greetingDesc: "আজিৰ আপোনাৰ মানসীয় স্বাস্হ্যৰ চমু খতিয়ান।",
    moodCheckTitle: "আপুনি এতিয়া কেনে অনুভৱ কৰিছে?",
    moodGreat: "বহুত ভাল",
    moodOkay: "মোটামুটি",
    moodSupport: "সহায় লাগে",
    startGamesCTA: "আজিৰ খেলসমূহ আৰম্ভ কৰক",
    todaysScore: "আজিৰ মগজুৰ স্কোৰ",
    nextReminder: "পরৱৰ্তী সোঁৱৰণী",
    waterTracker: "পানী খোৱাৰ হিচাপ",
    dailyActivities: "দৈনিক কাম-কাজ",

    // Games
    gameTitle: "মানসীয় প্ৰশিক্ষণ কেন্দ্র",
    gameSubtitle: "স্মৃতি আৰু মনোযোগ বৃদ্ধিৰ বাবে বৈজ্ঞানিকভাৱে তৈয়াৰী খেল।",
    autoMode: "AI অনুকূলিত ম'ড",
    manualMode: "মেনুৱেল ম'ড",
    currentAiLevel: "AI কঠিনতাৰ স্তৰ",
    playNow: "খেলক",
    improvedMsg: "AI বাৰ্তা: সুন্দৰ প্ৰদৰ্শন! পৰৱৰ্তী খেলৰ স্তৰ বৃদ্ধি কৰা হৈছে।",
    adjustedMsg: "AI বাৰ্তা: ভাল চেষ্টা! স্তৰ আপোনাৰ সুবিধা অনুসৰি সলনি কৰা হৈছে।",

    // Progress
    progressTitle: "মানসীয় প্ৰগতি সূচকাংক",
    overallScore: "মুঠ মানসিক মান",
    memoryScore: "স্মৃতি শক্তি",
    attentionScore: "মনোযোগ",
    calcScore: "গণনা ক্ষমতা",
    weeklyTrend: "সাপ্তাহিক প্ৰগতিৰ চিত্ৰ",

    // Reminders
    remindersTitle: "দৈনিক স্বাস্থ্য সূচী",
    markDone: "সম্পূৰ্ণ হ’ল",
    completed: "সম্পূৰ্ণ",
    addCup: "+১ গ্লাছ পানী",
    
    // Caregiver
    caregiverTitle: "পৰিয়াল আৰু যত্নলওঁতাৰ ডেশ্বব’ৰ্ড",
    patientProfile: "ৰোগীৰ পৰিচয়",
    clinicalAlerts: "স্বাস্থ্য সতর্কবাৰ্তা",
    aiInsights: "AI ডায়াগনষ্টিক পৰামৰ্শ",
    memoryBank: "পৰিয়ালৰ স্মৃতি ভঁৰাল",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
