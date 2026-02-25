import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  Bell,
  TrendingUp,
  AlertCircle,
  CheckCheck
} from "lucide-react";

interface ContextType {
  language: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
}

interface Application {
  id: string;
  schemeName: string;
  schemeNameHi: string;
  schemeNameMr: string;
  applicationId: string;
  status: 'approved' | 'pending' | 'rejected' | 'in-review';
  submittedDate: string;
  lastUpdate: string;
  progress: number;
  benefit: string;
  benefitHi: string;
  benefitMr: string;
  nextAction?: string;
  nextActionHi?: string;
  nextActionMr?: string;
  timeline: {
    step: string;
    stepHi: string;
    stepMr: string;
    completed: boolean;
    date?: string;
  }[];
}

const translations = {
  en: {
    title: "Application Tracker",
    subtitle: "Track all your scheme applications in one place",
    back: "Back to Dashboard",
    allApplications: "All Applications",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    status: "Status",
    applicationId: "Application ID",
    submitted: "Submitted",
    lastUpdate: "Last Update",
    progress: "Progress",
    nextAction: "Next Action",
    timeline: "Application Timeline",
    benefit: "Expected Benefit",
    downloadReceipt: "Download Receipt",
    setReminder: "Set Reminder",
    contactSupport: "Contact Support",
    noApplications: "No applications found",
    statusLabels: {
      approved: "Approved",
      pending: "Pending",
      rejected: "Rejected",
      "in-review": "Under Review"
    }
  },
  hi: {
    title: "आवेदन ट्रैकर",
    subtitle: "अपने सभी योजना आवेदनों को एक जगह ट्रैक करें",
    back: "डैशबोर्ड पर वापस जाएं",
    allApplications: "सभी आवेदन",
    approved: "स्वीकृत",
    pending: "लंबित",
    rejected: "अस्वीकृत",
    status: "स्थिति",
    applicationId: "आवेदन आईडी",
    submitted: "जमा किया गया",
    lastUpdate: "अंतिम अपडेट",
    progress: "प्रगति",
    nextAction: "अगली कार्रवाई",
    timeline: "आवेदन समयरेखा",
    benefit: "अपेक्षित लाभ",
    downloadReceipt: "रसीद डाउनलोड करें",
    setReminder: "रिमाइंडर सेट करें",
    contactSupport: "सहायता से संपर्क करें",
    noApplications: "कोई आवेदन नहीं मिला",
    statusLabels: {
      approved: "स्वीकृत",
      pending: "लंबित",
      rejected: "अस्वीकृत",
      "in-review": "समीक्षा में"
    }
  },
  mr: {
    title: "अर्ज ट्रॅकर",
    subtitle: "तुमचे सर्व योजना अर्ज एका ठिकाणी ट्रॅक करा",
    back: "डॅशबोर्डवर परत जा",
    allApplications: "सर्व अर्ज",
    approved: "मंजूर",
    pending: "प्रलंबित",
    rejected: "नाकारले",
    status: "स्थिती",
    applicationId: "अर्ज आयडी",
    submitted: "सबमिट केले",
    lastUpdate: "शेवटचे अपडेट",
    progress: "प्रगती",
    nextAction: "पुढील कृती",
    timeline: "अर्ज टाइमलाइन",
    benefit: "अपेक्षित लाभ",
    downloadReceipt: "पावती डाउनलोड करा",
    setReminder: "रिमाइंडर सेट करा",
    contactSupport: "समर्थनाशी संपर्क साधा",
    noApplications: "कोणतेही अर्ज आढळले नाहीत",
    statusLabels: {
      approved: "मंजूर",
      pending: "प्रलंबित",
      rejected: "नाकारले",
      "in-review": "पुनरावलोकन अंतर्गत"
    }
  }
};

const applications: Application[] = [
  {
    id: '1',
    schemeName: 'PM Kisan Samman Nidhi',
    schemeNameHi: 'पीएम किसान सम्मान निधि',
    schemeNameMr: 'पीएम किसान सन्मान निधी',
    applicationId: 'PMK2024001234',
    status: 'approved',
    submittedDate: '2024-01-15',
    lastUpdate: '2024-02-20',
    progress: 100,
    benefit: '₹6,000/year',
    benefitHi: '₹6,000/वर्ष',
    benefitMr: '₹6,000/वर्ष',
    nextAction: 'First installment credited to your account',
    nextActionHi: 'पहली किस्त आपके खाते में जमा की गई',
    nextActionMr: 'पहिला हप्ता तुमच्या खात्यात जमा झाला',
    timeline: [
      { 
        step: 'Application Submitted', 
        stepHi: 'आवेदन जमा किया गया',
        stepMr: 'अर्ज सबमिट केला',
        completed: true, 
        date: '2024-01-15' 
      },
      { 
        step: 'Document Verification', 
        stepHi: 'दस्तावेज़ सत्यापन',
        stepMr: 'दस्तऐवज सत्यापन',
        completed: true, 
        date: '2024-01-18' 
      },
      { 
        step: 'Eligibility Check', 
        stepHi: 'पात्रता जांच',
        stepMr: 'पात्रता तपासणी',
        completed: true, 
        date: '2024-01-22' 
      },
      { 
        step: 'Approved', 
        stepHi: 'स्वीकृत',
        stepMr: 'मंजूर',
        completed: true, 
        date: '2024-02-20' 
      }
    ]
  },
  {
    id: '2',
    schemeName: 'Ayushman Bharat (PM-JAY)',
    schemeNameHi: 'आयुष्मान भारत (पीएम-जेएवाई)',
    schemeNameMr: 'आयुष्मान भारत (पीएम-जेएवाई)',
    applicationId: 'PMJAY2024005678',
    status: 'in-review',
    submittedDate: '2024-02-10',
    lastUpdate: '2024-02-23',
    progress: 60,
    benefit: '₹5 lakh health coverage',
    benefitHi: '₹5 लाख स्वास्थ्य कवरेज',
    benefitMr: '₹5 लाख आरोग्य कव्हरेज',
    nextAction: 'Document verification in progress',
    nextActionHi: 'दस्तावेज़ सत्यापन प्रगति में है',
    nextActionMr: 'दस्तऐवज सत्यापन प्रगतीपथावर आहे',
    timeline: [
      { 
        step: 'Application Submitted', 
        stepHi: 'आवेदन जमा किया गया',
        stepMr: 'अर्ज सबमिट केला',
        completed: true, 
        date: '2024-02-10' 
      },
      { 
        step: 'Document Verification', 
        stepHi: 'दस्तावेज़ सत्यापन',
        stepMr: 'दस्तऐवज सत्यापन',
        completed: true, 
        date: '2024-02-15' 
      },
      { 
        step: 'Eligibility Check', 
        stepHi: 'पात्रता जांच',
        stepMr: 'पात्रता तपासणी',
        completed: false 
      },
      { 
        step: 'Approved', 
        stepHi: 'स्वीकृत',
        stepMr: 'मंजूर',
        completed: false 
      }
    ]
  },
  {
    id: '3',
    schemeName: 'PM Mudra Yojana',
    schemeNameHi: 'पीएम मुद्रा योजना',
    schemeNameMr: 'पीएम मुद्रा योजना',
    applicationId: 'MUDRA2024009012',
    status: 'pending',
    submittedDate: '2024-02-18',
    lastUpdate: '2024-02-19',
    progress: 25,
    benefit: '₹2 lakh loan',
    benefitHi: '₹2 लाख ऋण',
    benefitMr: '₹2 लाख कर्ज',
    nextAction: 'Upload income certificate',
    nextActionHi: 'आय प्रमाणपत्र अपलोड करें',
    nextActionMr: 'उत्पन्न प्रमाणपत्र अपलोड करा',
    timeline: [
      { 
        step: 'Application Submitted', 
        stepHi: 'आवेदन जमा किया गया',
        stepMr: 'अर्ज सबमिट केला',
        completed: true, 
        date: '2024-02-18' 
      },
      { 
        step: 'Document Verification', 
        stepHi: 'दस्तावेज़ सत्यापन',
        stepMr: 'दस्तऐवज सत्यापन',
        completed: false 
      },
      { 
        step: 'Bank Approval', 
        stepHi: 'बैंक अनुमोदन',
        stepMr: 'बँक मंजुरी',
        completed: false 
      },
      { 
        step: 'Loan Disbursed', 
        stepHi: 'ऋण वितरित',
        stepMr: 'कर्ज वितरीत',
        completed: false 
      }
    ]
  }
];

export default function ApplicationTracker() {
  const navigate = useNavigate();
  const { language } = useOutletContext<ContextType>();
  const t = translations[language];
  
  const [selectedTab, setSelectedTab] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'in-review':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'in-review':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSchemeName = (app: Application) => {
    if (language === 'hi') return app.schemeNameHi;
    if (language === 'mr') return app.schemeNameMr;
    return app.schemeName;
  };

  const getBenefit = (app: Application) => {
    if (language === 'hi') return app.benefitHi;
    if (language === 'mr') return app.benefitMr;
    return app.benefit;
  };

  const getNextAction = (app: Application) => {
    if (language === 'hi') return app.nextActionHi;
    if (language === 'mr') return app.nextActionMr;
    return app.nextAction;
  };

  const getTimelineStep = (step: Application['timeline'][0]) => {
    if (language === 'hi') return step.stepHi;
    if (language === 'mr') return step.stepMr;
    return step.step;
  };

  const filteredApplications = applications.filter(app => {
    if (selectedTab === 'all') return true;
    return app.status === selectedTab;
  });

  const stats = {
    all: applications.length,
    approved: applications.filter(a => a.status === 'approved').length,
    pending: applications.filter(a => a.status === 'pending' || a.status === 'in-review').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold">{t.title}</h1>
                <p className="text-xs text-gray-600">{t.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.allApplications}</p>
                <p className="text-2xl font-bold mt-1">{stats.all}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.approved}</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.pending}</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.rejected}</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">{t.allApplications}</TabsTrigger>
            <TabsTrigger value="approved">{t.approved}</TabsTrigger>
            <TabsTrigger value="pending">{t.pending}</TabsTrigger>
            <TabsTrigger value="in-review">{t.statusLabels['in-review']}</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-6">
            {filteredApplications.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{t.noApplications}</p>
              </Card>
            ) : (
              filteredApplications.map((app) => (
                <Card key={app.id} className="p-6 hover:shadow-xl transition-all">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-2">{getSchemeName(app)}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>{t.applicationId}: {app.applicationId}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1">{t.statusLabels[app.status]}</span>
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{t.progress}</span>
                          <span className="text-gray-600">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>

                      {/* Timeline */}
                      <div>
                        <h4 className="font-semibold text-sm mb-3">{t.timeline}</h4>
                        <div className="space-y-3">
                          {app.timeline.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                step.completed 
                                  ? 'bg-green-100' 
                                  : 'bg-gray-100'
                              }`}>
                                {step.completed ? (
                                  <CheckCheck className="w-4 h-4 text-green-600" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                  step.completed ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {getTimelineStep(step)}
                                </p>
                                {step.date && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {new Date(step.date).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-4">
                      {/* Info Cards */}
                      <Card className="p-4 bg-gradient-to-br from-orange-50 to-green-50 border-none">
                        <p className="text-xs text-gray-600 mb-1">{t.benefit}</p>
                        <p className="font-bold text-lg">{getBenefit(app)}</p>
                      </Card>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{t.submitted}: {new Date(app.submittedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{t.lastUpdate}: {new Date(app.lastUpdate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {app.nextAction && (
                        <Card className="p-3 bg-blue-50 border-blue-200">
                          <p className="text-xs font-semibold text-blue-900 mb-1">{t.nextAction}</p>
                          <p className="text-sm text-blue-700">{getNextAction(app)}</p>
                        </Card>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Download className="w-4 h-4" />
                          {t.downloadReceipt}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Bell className="w-4 h-4" />
                          {t.setReminder}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
