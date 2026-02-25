import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Progress } from "../components/ui/progress";
import { 
  Sparkles, 
  Send, 
  Mic, 
  Upload,
  Home,
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Bot,
  User,
  Loader2,
  CheckCheck,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface ContextType {
  language: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
}

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  agent?: 'planner' | 'retrieval' | 'document' | 'form' | 'followup';
  timestamp: Date;
}

interface SchemeRecommendation {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  eligibility: number;
  benefit: string;
  benefitHi: string;
  benefitMr: string;
  status: 'eligible' | 'pending' | 'not-eligible';
}

const translations = {
  en: {
    title: "AI Assistant Dashboard",
    subtitle: "Chat with your intelligent scheme navigator",
    back: "Back to Home",
    tracker: "Application Tracker",
    schemes: "Browse Schemes",
    inputPlaceholder: "Ask me anything about government schemes...",
    send: "Send",
    voice: "Voice Input",
    upload: "Upload Documents",
    activeApplications: "Active Applications",
    recommendations: "Recommended Schemes",
    eligibility: "Eligibility",
    apply: "Apply Now",
    viewDetails: "View Details",
    agents: {
      planner: "Planner Agent",
      retrieval: "Retrieval Agent",
      document: "Document Agent",
      form: "Form Agent",
      followup: "Follow-up Agent"
    }
  },
  hi: {
    title: "AI सहायक डैशबोर्ड",
    subtitle: "अपने बुद्धिमान योजना नेविगेटर से बात करें",
    back: "होम पर वापस जाएं",
    tracker: "आवेदन ट्रैकर",
    schemes: "योजनाएं ब्राउज़ करें",
    inputPlaceholder: "सरकारी योजनाओं के बारे में कुछ भी पूछें...",
    send: "भेजें",
    voice: "वॉयस इनपुट",
    upload: "दस्तावेज़ अपलोड करें",
    activeApplications: "सक्रिय आवेदन",
    recommendations: "अनुशंसित योजनाएं",
    eligibility: "पात्रता",
    apply: "अभी आवेदन करें",
    viewDetails: "विवरण देखें",
    agents: {
      planner: "योजनाकार एजेंट",
      retrieval: "खोज एजेंट",
      document: "दस्तावेज़ एजेंट",
      form: "फॉर्म एजेंट",
      followup: "अनुवर्ती एजेंट"
    }
  },
  mr: {
    title: "AI सहाय्यक डॅशबोर्ड",
    subtitle: "तुमच्या बुद्धिमान योजना नेव्हिगेटरशी बोला",
    back: "मुख्यपृष्ठावर परत जा",
    tracker: "अर्ज ट्रॅकर",
    schemes: "योजना ब्राउझ करा",
    inputPlaceholder: "सरकारी योजनांबद्दल काहीही विचारा...",
    send: "पाठवा",
    voice: "व्हॉइस इनपुट",
    upload: "दस्तऐवज अपलोड करा",
    activeApplications: "सक्रिय अर्ज",
    recommendations: "शिफारस केलेल्या योजना",
    eligibility: "पात्रता",
    apply: "आता अर्ज करा",
    viewDetails: "तपशील पहा",
    agents: {
      planner: "नियोजक एजंट",
      retrieval: "शोध एजंट",
      document: "दस्तऐवज एजंट",
      form: "फॉर्म एजंट",
      followup: "पाठपुरावा एजंट"
    }
  }
};

const schemes: SchemeRecommendation[] = [
  {
    id: '1',
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    nameMr: 'पीएम किसान सन्मान निधी',
    eligibility: 95,
    benefit: '₹6,000/year in 3 installments',
    benefitHi: '₹6,000/वर्ष 3 किस्तों में',
    benefitMr: '₹6,000/वर्ष 3 हप्त्यांमध्ये',
    status: 'eligible'
  },
  {
    id: '2',
    name: 'Ayushman Bharat',
    nameHi: 'आयुष्मान भारत',
    nameMr: 'आयुष्मान भारत',
    eligibility: 88,
    benefit: 'Health insurance up to ₹5 lakh',
    benefitHi: '₹5 लाख तक स्वास्थ्य बीमा',
    benefitMr: '₹5 लाख पर्यंत आरोग्य विमा',
    status: 'eligible'
  },
  {
    id: '3',
    name: 'PM Mudra Yojana',
    nameHi: 'पीएम मुद्रा योजना',
    nameMr: 'पीएम मुद्रा योजना',
    eligibility: 72,
    benefit: 'Loan up to ₹10 lakh for business',
    benefitHi: 'व्यवसाय के लिए ₹10 लाख तक ऋण',
    benefitMr: 'व्यवसायासाठी ₹10 लाख पर्यंत कर्ज',
    status: 'pending'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { language } = useOutletContext<ContextType>();
  const t = translations[language];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका सरकारी साथी हूं। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने और आवेदन में मदद करने के लिए यहां हूं। आप मुझसे कुछ भी पूछ सकते हैं!'
        : language === 'mr'
        ? 'नमस्कार! मी तुमचा सरकारी साथी आहे। मी तुम्हाला सरकारी योजनांबद्दल माहिती देण्यासाठी आणि अर्जात मदत करण्यासाठी येथे आहे. तुम्ही मला काहीही विचारू शकता!'
        : 'Hello! I\'m your Sarkari Saathi. I\'m here to help you discover and apply for government schemes. Ask me anything!',
      agent: 'planner',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const agentResponses = {
    planner: {
      en: "I'm analyzing your profile to find the best schemes for you...",
      hi: "मैं आपके लिए सर्वोत्तम योजनाएं खोजने के लिए आपकी प्रोफ़ाइल का विश्लेषण कर रहा हूं...",
      mr: "मी तुमच्यासाठी सर्वोत्तम योजना शोधण्यासाठी तुमच्या प्रोफाइलचे विश्लेषण करत आहे..."
    },
    retrieval: {
      en: "Found 3 relevant schemes based on your criteria. Let me check your eligibility...",
      hi: "आपके मानदंडों के आधार पर 3 प्रासंगिक योजनाएं मिलीं। मुझे आपकी पात्रता जांचने दें...",
      mr: "तुमच्या निकषांवर आधारित 3 संबंधित योजना सापडल्या. मला तुमची पात्रता तपासू द्या..."
    },
    document: {
      en: "I've verified your documents. Everything looks good! You're eligible for PM Kisan Samman Nidhi.",
      hi: "मैंने आपके दस्तावेज़ों को सत्यापित कर लिया है। सब कुछ ठीक दिख रहा है! आप पीएम किसान सम्मान निधि के लिए पात्र हैं।",
      mr: "मी तुमची कागदपत्रे सत्यापित केली आहेत. सर्व काही चांगले दिसते! तुम्ही पीएम किसान सन्मान निधीसाठी पात्र आहात."
    },
    form: {
      en: "I can help you fill the application form. I've already pre-filled your basic details. Would you like to proceed?",
      hi: "मैं आपको आवेदन फॉर्म भरने में मदद कर सकता हूं। मैंने पहले से ही आपकी बुनियादी जानकारी भर दी है। क्या आप आगे बढ़ना चाहेंगे?",
      mr: "मी तुम्हाला अर्ज फॉर्म भरण्यात मदत करू शकतो. मी आधीच तुमचे मूलभूत तपशील भरले आहेत. तुम्ही पुढे जाऊ इच्छिता?"
    },
    followup: {
      en: "Your application has been submitted! I'll track the status and notify you of any updates.",
      hi: "आपका आवेदन सबमिट हो गया है! मैं स्थिति को ट्रैक करूंगा और आपको किसी भी अपडेट के बारे में सूचित करूंगा।",
      mr: "तुमचा अर्ज सबमिट झाला आहे! मी स्थिती ट्रॅक करीन आणि तुम्हाला कोणत्याही अपडेटबद्दल सूचित करीन."
    }
  };

  const simulateAgentResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    const agentSequence: Array<'planner' | 'retrieval' | 'document' | 'form' | 'followup'> = 
      ['planner', 'retrieval', 'document'];

    for (const agent of agentSequence) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const agentMessage: Message = {
        id: Date.now().toString() + agent,
        type: 'agent',
        content: agentResponses[agent][language],
        agent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }
    
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await simulateAgentResponse(input);
  };

  const handleVoiceInput = () => {
    toast.success(language === 'hi' ? 'वॉइस इनपुट सक्रिय...' : language === 'mr' ? 'व्हॉइस इनपुट सक्रिय...' : 'Voice input activated...');
  };

  const handleUpload = () => {
    toast.success(language === 'hi' ? 'दस्तावेज़ अपलोड शुरू...' : language === 'mr' ? 'दस्तऐवज अपलोड सुरू...' : 'Document upload started...');
  };

  const getAgentColor = (agent?: string) => {
    switch (agent) {
      case 'planner': return 'from-blue-500 to-blue-600';
      case 'retrieval': return 'from-purple-500 to-purple-600';
      case 'document': return 'from-green-500 to-green-600';
      case 'form': return 'from-orange-500 to-orange-600';
      case 'followup': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSchemeName = (scheme: SchemeRecommendation) => {
    if (language === 'hi') return scheme.nameHi;
    if (language === 'mr') return scheme.nameMr;
    return scheme.name;
  };

  const getSchemeBenefit = (scheme: SchemeRecommendation) => {
    if (language === 'hi') return scheme.benefitHi;
    if (language === 'mr') return scheme.benefitMr;
    return scheme.benefit;
  };

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
                onClick={() => navigate('/')}
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/schemes')}
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.schemes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/tracker')}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                {t.tracker}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user'
                          ? 'bg-gray-200'
                          : `bg-gradient-to-br ${getAgentColor(message.agent)}`
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'items-end' : ''}`}>
                        {message.agent && (
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {t.agents[message.agent]}
                            </Badge>
                          </div>
                        )}
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white ml-auto'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceInput}
                    className="gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    {t.voice}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpload}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {t.upload}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.inputPlaceholder}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-orange-500 to-orange-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Schemes */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold">{t.recommendations}</h3>
              </div>
              <div className="space-y-4">
                {schemes.map((scheme) => (
                  <Card key={scheme.id} className="p-4 border-2 hover:border-orange-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{getSchemeName(scheme)}</h4>
                      <Badge
                        variant={scheme.status === 'eligible' ? 'default' : 'secondary'}
                        className={scheme.status === 'eligible' ? 'bg-green-500' : ''}
                      >
                        {scheme.eligibility}%
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{getSchemeBenefit(scheme)}</p>
                    <Progress value={scheme.eligibility} className="h-1.5 mb-3" />
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600"
                      onClick={() => toast.success('Application process started!')}
                    >
                      {t.apply}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Active Applications */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">{t.activeApplications}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">PM Kisan</p>
                    <p className="text-xs text-gray-600">Approved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Ayushman Bharat</p>
                    <p className="text-xs text-gray-600">Under Review</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
