import { Outlet } from "react-router";
import { useState, useEffect } from "react";

export default function Root() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | 'mr';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'hi' | 'mr') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Outlet context={{ language, setLanguage: handleLanguageChange }} />
    </div>
  );
}
