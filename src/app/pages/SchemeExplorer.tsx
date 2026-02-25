import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Sparkles,
  Heart,
  Landmark,
  Briefcase,
  GraduationCap,
  Home,
  Users,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

interface ContextType {
  language: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
}

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  category: string;
  categoryHi: string;
  categoryMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  benefit: string;
  benefitHi: string;
  benefitMr: string;
  eligibility: string[];
  eligibilityHi: string[];
  eligibilityMr: string[];
  icon: any;
  color: string;
  match: number;
}

const translations = {
  en: {
    title: "Explore Government Schemes",
    subtitle: "Browse 100+ schemes across different categories",
    back: "Back to Dashboard",
    search: "Search schemes...",
    filter: "Filter",
    categories: "Categories",
    all: "All Schemes",
    health: "Healthcare",
    agriculture: "Agriculture",
    business: "Business & Employment",
    education: "Education",
    housing: "Housing",
    social: "Social Welfare",
    eligibility: "Eligibility",
    benefit: "Benefit",
    checkEligibility: "Check Eligibility",
    apply: "Apply Now",
    match: "Match",
    schemes: "schemes"
  },
  hi: {
    title: "सरकारी योजनाएं देखें",
    subtitle: "विभिन्न श्रेणियों में 100+ योजनाएं ब्राउज़ करें",
    back: "डैशबोर्ड पर वापस जाएं",
    search: "योजनाएं खोजें...",
    filter: "फ़िल्टर",
    categories: "श्रेणियां",
    all: "सभी योजनाएं",
    health: "स्वास्थ्य सेवा",
    agriculture: "कृषि",
    business: "व्यवसाय और रोजगार",
    education: "शिक्षा",
    housing: "आवास",
    social: "सामाजिक कल्याण",
    eligibility: "पात्रता",
    benefit: "लाभ",
    checkEligibility: "पात्रता जांचें",
    apply: "अभी आवेदन करें",
    match: "मेल",
    schemes: "योजनाएं"
  },
  mr: {
    title: "सरकारी योजना पहा",
    subtitle: "विविध श्रेणींमध्ये 100+ योजना ब्राउझ करा",
    back: "डॅशबोर्डवर परत जा",
    search: "योजना शोधा...",
    filter: "फिल्टर",
    categories: "श्रेणी",
    all: "सर्व योजना",
    health: "आरोग्य सेवा",
    agriculture: "शेती",
    business: "व्यवसाय आणि रोजगार",
    education: "शिक्षण",
    housing: "गृहनिर्माण",
    social: "सामाजिक कल्याण",
    eligibility: "पात्रता",
    benefit: "लाभ",
    checkEligibility: "पात्रता तपासा",
    apply: "आता अर्ज करा",
    match: "जुळणी",
    schemes: "योजना"
  }
};

const schemes: Scheme[] = [
  {
    id: '1',
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    nameMr: 'पीएम किसान सन्मान निधी',
    category: 'Agriculture',
    categoryHi: 'कृषि',
    categoryMr: 'शेती',
    description: 'Income support to farmers',
    descriptionHi: 'किसानों को आय सहायता',
    descriptionMr: 'शेतकऱ्यांना उत्पन्न सहाय्य',
    benefit: '₹6,000 per year in 3 installments',
    benefitHi: '₹6,000 प्रति वर्ष 3 किस्तों में',
    benefitMr: '₹6,000 दरवर्षी 3 हप्त्यांमध्ये',
    eligibility: ['Small & marginal farmers', 'Landholding up to 2 hectares'],
    eligibilityHi: ['छोटे और सीमांत किसान', '2 हेक्टेयर तक भूमि'],
    eligibilityMr: ['लहान आणि सीमांत शेतकरी', '2 हेक्टर पर्यंत जमीन'],
    icon: Landmark,
    color: 'from-green-500 to-green-600',
    match: 95
  },
  {
    id: '2',
    name: 'Ayushman Bharat (PM-JAY)',
    nameHi: 'आयुष्मान भारत (पीएम-जेएवाई)',
    nameMr: 'आयुष्मान भारत (पीएम-जेएवाई)',
    category: 'Healthcare',
    categoryHi: 'स्वास्थ्य सेवा',
    categoryMr: 'आरोग्य सेवा',
    description: 'World\'s largest health insurance scheme',
    descriptionHi: 'विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना',
    descriptionMr: 'जगातील सर्वात मोठी आरोग्य विमा योजना',
    benefit: 'Health coverage up to ₹5 lakh per family per year',
    benefitHi: '₹5 लाख प्रति परिवार प्रति वर्ष तक स्वास्थ्य कवरेज',
    benefitMr: '₹5 लाख प्रति कुटुंब दरवर्षी आरोग्य कव्हरेज',
    eligibility: ['Economically vulnerable families', 'Based on SECC database'],
    eligibilityHi: ['आर्थिक रूप से कमजोर परिवार', 'एसईसीसी डेटाबेस के आधार पर'],
    eligibilityMr: ['आर्थिकदृष्ट्या असुरक्षित कुटुंबे', 'SECC डेटाबेसवर आधारित'],
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    match: 88
  },
  {
    id: '3',
    name: 'PM Mudra Yojana',
    nameHi: 'पीएम मुद्रा योजना',
    nameMr: 'पीएम मुद्रा योजना',
    category: 'Business & Employment',
    categoryHi: 'व्यवसाय और रोजगार',
    categoryMr: 'व्यवसाय आणि रोजगार',
    description: 'Micro-financing for small businesses',
    descriptionHi: 'छोटे व्यवसायों के लिए सूक्ष्म वित्तपोषण',
    descriptionMr: 'लहान व्यवसायांसाठी सूक्ष्म वित्तपुरवठा',
    benefit: 'Loans up to ₹10 lakh',
    benefitHi: '₹10 लाख तक ऋण',
    benefitMr: '₹10 लाख पर्यंत कर्ज',
    eligibility: ['Non-corporate, non-farm small enterprises', 'Income generating activities'],
    eligibilityHi: ['गैर-कॉर्पोरेट, गैर-कृषि लघु उद्यम', 'आय सृजन गतिविधियां'],
    eligibilityMr: ['गैर-कॉर्पोरेट, गैर-शेती लघु उद्योग', 'उत्पन्न निर्मिती क्रियाकलाप'],
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    match: 72
  },
  {
    id: '4',
    name: 'PM Awas Yojana (Urban)',
    nameHi: 'पीएम आवास योजना (शहरी)',
    nameMr: 'पीएम आवास योजना (शहरी)',
    category: 'Housing',
    categoryHi: 'आवास',
    categoryMr: 'गृहनिर्माण',
    description: 'Affordable housing for urban poor',
    descriptionHi: 'शहरी गरीबों के लिए किफायती आवास',
    descriptionMr: 'शहरी गरीबांसाठी परवडणारे घर',
    benefit: 'Interest subsidy & financial assistance',
    benefitHi: 'ब्याज सब्सिडी और वित्तीय सहायता',
    benefitMr: 'व्याज सवलत आणि आर्थिक मदत',
    eligibility: ['EWS/LIG/MIG categories', 'First-time home buyers'],
    eligibilityHi: ['EWS/LIG/MIG श्रेणियां', 'पहली बार घर खरीदने वाले'],
    eligibilityMr: ['EWS/LIG/MIG श्रेणी', 'प्रथमच घर खरेदी करणारे'],
    icon: Home,
    color: 'from-orange-500 to-orange-600',
    match: 65
  },
  {
    id: '5',
    name: 'National Scholarship Portal',
    nameHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    nameMr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल',
    category: 'Education',
    categoryHi: 'शिक्षा',
    categoryMr: 'शिक्षण',
    description: 'Scholarships for students',
    descriptionHi: 'छात्रों के लिए छात्रवृत्ति',
    descriptionMr: 'विद्यार्थ्यांसाठी शिष्यवृत्ती',
    benefit: 'Financial support for education',
    benefitHi: 'शिक्षा के लिए वित्तीय सहायता',
    benefitMr: 'शिक्षणासाठी आर्थिक सहाय्य',
    eligibility: ['Students from economically weaker sections', 'Merit-based & need-based'],
    eligibilityHi: ['आर्थिक रूप से कमजोर वर्गों के छात्र', 'मेरिट और आवश्यकता आधारित'],
    eligibilityMr: ['आर्थिकदृष्ट्या कमकुवत घटकांतील विद्यार्थी', 'गुणवत्ता आणि गरज आधारित'],
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    match: 78
  },
  {
    id: '6',
    name: 'PM Matru Vandana Yojana',
    nameHi: 'पीएम मातृ वंदना योजना',
    nameMr: 'पीएम मातृ वंदना योजना',
    category: 'Social Welfare',
    categoryHi: 'सामाजिक कल्याण',
    categoryMr: 'सामाजिक कल्याण',
    description: 'Maternity benefit scheme',
    descriptionHi: 'मातृत्व लाभ योजना',
    descriptionMr: 'मातृत्व लाभ योजना',
    benefit: '₹5,000 cash benefit in 3 installments',
    benefitHi: '₹5,000 नकद लाभ 3 किस्तों में',
    benefitMr: '₹5,000 रोख लाभ 3 हप्त्यांमध्ये',
    eligibility: ['Pregnant & lactating mothers', 'First living child'],
    eligibilityHi: ['गर्भवती और स्तनपान कराने वाली माताएं', 'पहला जीवित बच्चा'],
    eligibilityMr: ['गर्भवती आणि स्तनपान करणाऱ्या माता', 'पहिले जिवंत बाळ'],
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    match: 82
  }
];

export default function SchemeExplorer() {
  const navigate = useNavigate();
  const { language } = useOutletContext<ContextType>();
  const t = translations[language];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: t.all },
    { value: 'health', label: t.health },
    { value: 'agriculture', label: t.agriculture },
    { value: 'business', label: t.business },
    { value: 'education', label: t.education },
    { value: 'housing', label: t.housing },
    { value: 'social', label: t.social }
  ];

  const getCategoryName = (categoryEn: string) => {
    const categoryMap: Record<string, { hi: string; mr: string }> = {
      'Agriculture': { hi: 'कृषि', mr: 'शेती' },
      'Healthcare': { hi: 'स्वास्थ्य सेवा', mr: 'आरोग्य सेवा' },
      'Business & Employment': { hi: 'व्यवसाय और रोजगार', mr: 'व्यवसाय आणि रोजगार' },
      'Housing': { hi: 'आवास', mr: 'गृहनिर्माण' },
      'Education': { hi: 'शिक्षा', mr: 'शिक्षण' },
      'Social Welfare': { hi: 'सामाजिक कल्याण', mr: 'सामाजिक कल्याण' }
    };
    
    if (language === 'hi') return categoryMap[categoryEn]?.hi || categoryEn;
    if (language === 'mr') return categoryMap[categoryEn]?.mr || categoryEn;
    return categoryEn;
  };

  const getSchemeName = (scheme: Scheme) => {
    if (language === 'hi') return scheme.nameHi;
    if (language === 'mr') return scheme.nameMr;
    return scheme.name;
  };

  const getSchemeDescription = (scheme: Scheme) => {
    if (language === 'hi') return scheme.descriptionHi;
    if (language === 'mr') return scheme.descriptionMr;
    return scheme.description;
  };

  const getSchemeBenefit = (scheme: Scheme) => {
    if (language === 'hi') return scheme.benefitHi;
    if (language === 'mr') return scheme.benefitMr;
    return scheme.benefit;
  };

  const getSchemeEligibility = (scheme: Scheme) => {
    if (language === 'hi') return scheme.eligibilityHi;
    if (language === 'mr') return scheme.eligibilityMr;
    return scheme.eligibility;
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = getSchemeName(scheme).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getSchemeDescription(scheme).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           scheme.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.search}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>
              {filteredSchemes.length} {t.schemes} {selectedCategory !== 'all' && `in ${categories.find(c => c.value === selectedCategory)?.label}`}
            </span>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <Card key={scheme.id} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-orange-200">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    {scheme.match}% {t.match}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{getSchemeName(scheme)}</h3>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryName(scheme.category)}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{getSchemeDescription(scheme)}</p>

                  {/* Benefit */}
                  <div className="bg-gradient-to-r from-orange-50 to-green-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">{t.benefit}</p>
                    <p className="font-semibold text-sm">{getSchemeBenefit(scheme)}</p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">{t.eligibility}:</p>
                    <ul className="space-y-1">
                      {getSchemeEligibility(scheme).map((criteria, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t.checkEligibility}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t.apply}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
