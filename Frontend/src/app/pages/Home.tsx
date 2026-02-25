import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Bell, 
  Languages,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Brain
} from "lucide-react";

interface ContextType {
  language: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
}

const translations = {
  en: {
    title: "Sarkari Saathi",
    subtitle: "Your Intelligent Government Scheme Assistant",
    description: "Powered by Multi-Agent AI • Access 100+ Schemes • Available in Hindi, English & Marathi",
    cta: "Start Your Journey",
    features: {
      title: "Intelligent Agent System",
      items: [
        { icon: Brain, label: "Planner Agent", desc: "Analyzes your profile" },
        { icon: FileText, label: "Retrieval Agent", desc: "Finds relevant schemes" },
        { icon: Shield, label: "Document Agent", desc: "Validates your papers" },
        { icon: Zap, label: "Form Agent", desc: "Auto-fills applications" },
        { icon: Bell, label: "Follow-up Agent", desc: "Tracks your status" }
      ]
    },
    stats: [
      { value: "100+", label: "Govt Schemes" },
      { value: "12", label: "Languages" },
      { value: "500K+", label: "People Helped" },
      { value: "95%", label: "Success Rate" }
    ],
    benefits: [
      "No more confusion about eligibility",
      "Automatic form filling in your language",
      "Real-time application tracking",
      "Smart document verification",
      "Alternative scheme suggestions"
    ]
  },
  hi: {
    title: "सरकारी साथी",
    subtitle: "आपका बुद्धिमान सरकारी योजना सहायक",
    description: "मल्टी-एजेंट AI द्वारा संचालित • 100+ योजनाएं • हिंदी, अंग्रेजी और मराठी में उपलब्ध",
    cta: "अपनी यात्रा शुरू करें",
    features: {
      title: "बुद्धिमान एजेंट प्रणाली",
      items: [
        { icon: Brain, label: "योजनाकार एजेंट", desc: "आपकी प्रोफ़ाइल का विश्लेषण" },
        { icon: FileText, label: "खोज एजेंट", desc: "प्रासंगिक योजनाएं खोजता है" },
        { icon: Shield, label: "दस्तावेज़ एजेंट", desc: "आपके कागजात सत्यापित करता है" },
        { icon: Zap, label: "फॉर्म एजेंट", desc: "स्वचालित फॉर्म भरता है" },
        { icon: Bell, label: "अनुवर्ती एजेंट", desc: "आपकी स्थिति ट्रैक करता है" }
      ]
    },
    stats: [
      { value: "100+", label: "सरकारी योजनाएं" },
      { value: "12", label: "भाषाएं" },
      { value: "500K+", label: "लोगों की मदद की" },
      { value: "95%", label: "सफलता दर" }
    ],
    benefits: [
      "पात्रता के बारे में कोई भ्रम नहीं",
      "आपकी भाषा में स्वचालित फॉर्म भरना",
      "रीयल-टाइम आवेदन ट्रैकिंग",
      "स्मार्ट दस्तावेज़ सत्यापन",
      "वैकल्पिक योजना सुझाव"
    ]
  },
  mr: {
    title: "सरकारी साथी",
    subtitle: "तुमचा बुद्धिमान सरकारी योजना सहाय्यक",
    description: "मल्टी-एजंट AI द्वारे चालवले • 100+ योजना • हिंदी, इंग्रजी आणि मराठीमध्ये उपलब्ध",
    cta: "तुमचा प्रवास सुरू करा",
    features: {
      title: "बुद्धिमान एजंट प्रणाली",
      items: [
        { icon: Brain, label: "नियोजक एजंट", desc: "तुमच्या प्रोफाइलचे विश्लेषण" },
        { icon: FileText, label: "शोध एजंट", desc: "संबंधित योजना शोधते" },
        { icon: Shield, label: "दस्तऐवज एजंट", desc: "तुमचे कागदपत्रे सत्यापित करते" },
        { icon: Zap, label: "फॉर्म एजंट", desc: "स्वयंचलित फॉर्म भरते" },
        { icon: Bell, label: "पाठपुरावा एजंट", desc: "तुमची स्थिती ट्रॅक करते" }
      ]
    },
    stats: [
      { value: "100+", label: "सरकारी योजना" },
      { value: "12", label: "भाषा" },
      { value: "500K+", label: "लोकांना मदत केली" },
      { value: "95%", label: "यश दर" }
    ],
    benefits: [
      "पात्रतेबद्दल कोणताही गोंधळ नाही",
      "तुमच्या भाषेत स्वयंचलित फॉर्म भरणे",
      "रिअल-टाइम अर्ज ट्रॅकिंग",
      "स्मार्ट दस्तऐवज सत्यापन",
      "पर्यायी योजना सूचना"
    ]
  }
};

export default function Home() {
  const navigate = useNavigate();
  const { language, setLanguage } = useOutletContext<ContextType>();
  const t = translations[language];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">{t.title}</h1>
              <p className="text-xs text-gray-600">Powered by Agentic AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'en' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'hi' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                हिं
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'mr' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                मर
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            Multi-Agent AI System
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            {t.subtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 gap-2"
              onClick={() => navigate('/dashboard')}
            >
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/schemes')}
            >
              <Users className="w-4 h-4 mr-2" />
              Explore Schemes
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Agent System */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-3">{t.features.title}</h3>
          <p className="text-gray-600">5 specialized AI agents working together for you</p>
        </div>
        <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {t.features.items.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-orange-200"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-center mb-2">{feature.label}</h4>
              <p className="text-sm text-gray-600 text-center">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-orange-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-3">Why Choose Sarkari Saathi?</h3>
            </div>
            <div className="space-y-4">
              {t.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 text-white p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of Indians who have already benefited from government schemes with our AI assistant
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Launch AI Assistant
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2026 Sarkari Saathi • Empowering Bharat with AI • Made with ❤️ for India</p>
        </div>
      </footer>
    </div>
  );
}
