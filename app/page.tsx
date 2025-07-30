"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Moon,
  Sun,
  Menu,
  X,
  RotateCcw,
  Clock,
  Target,
  Zap,
  Home,
  Info,
  Keyboard,
  GraduationCap,
  MessageCircle,
  Youtube,
  TrendingUp,
  Award,
  Timer,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const uzbekTexts = [
  "Muvaffaqiyat bu yo‘lning oxiri emas. Har bir muvaffaqiyatsizlik – bu yangi boshlanish uchun imkoniyat. Davom etish jasorati insonning haqiqiy kuchini ifodalaydi. Kelajak, orzularining go‘zalligiga ishona olganlar uchundir.",
  "Innovatsiya lider va izdoshni farqlaydi. Yangi g‘oya – bu oddiy ko‘ringan muammoni boshqacha ko‘ra olish qobiliyatidir. Texnologiya faqat vosita, muhim narsa — uni qanday ishlatishingiz.",
  "Buyuk ish qilishning yagona yo‘li bu ishni chin dildan sevishdir. Agar hali sevimli ish topilmagan bo‘lsa, izlanishni to‘xtatmang. Har bir yangi kun — yangi imkoniyatlar demakdir.",
  "Och qoling, ahmoq qoling — bu chaqiriq emas, balki har doim savol berishga, o‘rganishga tayyor bo‘lish kerakligining belgisi. Hayotingizni boshqalarning fikrlari asosida yashamang.",
  "Dasturlash bu shunchaki buyruqlar yig‘indisi emas. U — muammolarni tushunish, strukturali fikrlash, sabr va mantiqning uyg‘unligidir. Har qanday dastur muammoni hal qilishdan boshlanadi.",
  "Kod yozishdan oldin o‘ylang. Tushunilmaydigan kod — bu noto‘g‘ri yozilgan koddir. Kod san’atga o‘xshaydi — mukammal bo‘lishi uchun uni ilhom bilan yozish kerak.",
  "Kompyuterlar ilgari mavjud bo‘lmagan muammolarni yaratish uchun juda yaxshi vosita. Ammo uni to‘g‘ri yo‘naltirish inson ongining donoligiga bog‘liq.",
  "Texnologiyaning go‘zalligi uning sezilmaydigan qulayligida. Eng yaxshi texnologiyalar kundalik hayotda tabiiy bo‘lib qoladi. Texnologiya insoniyatga xizmat qilishi kerak, aksincha emas.",
  "Muhandislik va san’at o‘rtasidagi chegarani yo‘q qilgan narsa — bu dasturiy ta’minotdir. Har bir dasturchi o‘z kodini mukammal kompozitsiya kabi yaratishi kerak.",
  "Dasturlash bu – nima bilishingiz emas, balki qanday o‘rganishingiz, qanday muammolarni yechishingiz haqida. Har bir xatolik – bu yangi darsdir.",
  "Kod faqat mashinaga emas, odamlarga ham tushunarli bo‘lishi kerak. Agar kodni izohlab tushuntirishga majbur bo‘lsangiz, uni boshqacha yozing.",
  "Siz qilgan har bir kichik harakat katta o‘zgarishlar sari olib boradi. Davom eting. To‘xtamang. Harakatdagi inson hech qachon yutqazmaydi.",
  "Orzu qilishdan to‘xtamang. Har qanday katta yutuq – kichik orzularning yig‘indisidir. Har bir katta narsa avval kichik fikr sifatida boshlanadi.",
  "Kelajakni yaratish — uni taxmin qilish emas, balki uni bugun yaratish bilan bog‘liq. Har bir yozgan kodingiz, har bir o‘rganilgan dars — bu kelajak uchun poydevordir.",
  "Yaxshi dasturchi bu — kod yozuvchi emas, balki kodni o‘chirishni ham biladigan insondir. Soddalik — bu mukammallikning eng yuqori darajasi.",
  "Yodingizda bo‘lsin: kod – bu fikrlar oynasi. Yaxshi fikrlashsiz yaxshi kod bo‘lishi mumkin emas. Avval o‘ylang, keyin yozing.",
  "Hayot – bu o‘rganish jarayoni. Har bir qiyinchilik – yangi imkoniyat. Har bir xatolik – yangi dars. Dasturlash ham hayotga o‘xshaydi.",
  "Dasturlash orqali siz o‘z dunyoqarashingizni kodga aylantirasiz. Har bir satr – bu sizning tafakkuringizning aksidir. Shu bois, chiroyli fikrlang.",
  "Yaxshi dastur nafaqat ishlashi kerak, balki tushunarli, kengaytiriladigan va ishonchli bo‘lishi shart. Kod – bu insonlar o‘qiydigan hikoya.",
  "🎓 Dasturlashni, texnologiyani va hayotiy motivatsiyalarni @IT_Creative YouTube kanalida o‘rganing — ilhomlaning va o‘zingizni rivojlantiring!"
]


interface CompletedWord {
  word: string
  isCorrect: boolean
  typedWord: string
}

export default function TypingPracticeApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [currentText, setCurrentText] = useState("")
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWordInput, setCurrentWordInput] = useState("")
  const [completedWords, setCompletedWords] = useState<CompletedWord[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [totalErrors, setTotalErrors] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const randomText = uzbekTexts[Math.floor(Math.random() * uzbekTexts.length)]
    setCurrentText(randomText)
    setWords(randomText.split(" "))
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    if (isTyping && startTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setTimeElapsed(elapsed)

        const minutes = elapsed / 60
        const currentWpm = minutes > 0 ? Math.round(correctWords / minutes) : 0
        setWpm(currentWpm)

        const totalWordsTyped = completedWords.length
        const currentAccuracy = totalWordsTyped > 0 ? Math.round((correctWords / totalWordsTyped) * 100) : 100
        setAccuracy(currentAccuracy)
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTyping, startTime, completedWords, correctWords])

  const resetTyping = () => {
    setIsTyping(false)
    setStartTime(null)
    setCurrentWordIndex(0)
    setCurrentWordInput("")
    setCompletedWords([])
    setTimeElapsed(0)
    setWpm(0)
    setAccuracy(100)
    setTotalErrors(0)
    setCorrectWords(0)
    setIsCompleted(false)
    setShowStats(false)
    setCurrentCharIndex(0)
    const randomText = uzbekTexts[Math.floor(Math.random() * uzbekTexts.length)]
    setCurrentText(randomText)
    setWords(randomText.split(" "))
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const currentWord = words[currentWordIndex]

    // Avtomatik boshlash
    if (!isTyping && value.length > 0) {
      setIsTyping(true)
      setStartTime(Date.now())
      setShowStats(true)
    }

    // O'chirish imkoniyatini cheklash
    if (value.length < currentWordInput.length) {
      return
    }

    // Faqat harf, raqam va belgilarni qabul qilish
    const lastChar = value[value.length - 1]
    if (lastChar && !/[\w\u0400-\u04FF\u0100-\u017F.,!?;:'"()-]/.test(lastChar)) {
      return
    }

    setCurrentWordInput(value)
    setCurrentCharIndex(value.length)

    // Space tugmasi bosilganda yoki so'z tugaganda
    if (value.endsWith(" ") || value.length >= currentWord.length + 3) {
      const typedWord = value.replace(" ", "").trim()
      const isCorrect = typedWord === currentWord

      // So'zni tugallangan ro'yxatga qo'shish
      setCompletedWords((prev) => [
        ...prev,
        {
          word: currentWord,
          isCorrect,
          typedWord,
        },
      ])

      if (isCorrect) {
        setCorrectWords((prev) => prev + 1)
      } else {
        setTotalErrors((prev) => prev + 1)
      }

      setCurrentWordInput("")
      setCurrentCharIndex(0)

      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex((prev) => prev + 1)
      } else {
        // Barcha so'zlar tugadi
        setIsTyping(false)
        setIsCompleted(true)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace, Delete va boshqa o'chirish tugmalarini bloklash
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault()
      return
    }

    // Space tugmasi har doim ishlashi (xato bo'lsa ham keyingi so'zga o'tish)
    if (e.key === " ") {
      const currentWord = words[currentWordIndex]
      const typedWord = currentWordInput.trim()
      const isCorrect = typedWord === currentWord

      setCompletedWords((prev) => [
        ...prev,
        {
          word: currentWord,
          isCorrect,
          typedWord,
        },
      ])

      if (isCorrect) {
        setCorrectWords((prev) => prev + 1)
      } else {
        setTotalErrors((prev) => prev + 1)
      }

      setCurrentWordInput("")
      setCurrentCharIndex(0)

      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex((prev) => prev + 1)
      } else {
        setIsTyping(false)
        setIsCompleted(true)
      }

      e.preventDefault()
    }
  }

  const getCurrentWordClass = (char: string, index: number) => {
    if (index >= currentWordInput.length) {
      return "text-gray-400 dark:text-gray-500 transition-all duration-300 ease-in-out"
    }
    if (currentWordInput[index] === char) {
      return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 transition-all duration-300 ease-in-out transform scale-110 shadow-sm"
    }
    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 transition-all duration-300 ease-in-out transform scale-110 shadow-sm animate-shake"
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const progressPercentage = words.length > 0 ? (completedWords.length / words.length) * 100 : 0

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          .animate-slide-up {
            animation: slideInUp 0.6s ease-out;
          }
          .animate-slide-left {
            animation: slideInLeft 0.6s ease-out;
          }
          .animate-slide-right {
            animation: slideInRight 0.6s ease-out;
          }
          .animate-zoom-in {
            animation: zoomIn 0.5s ease-out;
          }
        `}</style>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-float">
                  ITC-Typing
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {[
                    { name: "Bosh sahifa", id: "home", icon: Home },
                    { name: "Biz haqimizda", id: "about", icon: Info },
                    { name: "Yozish mashqi", id: "typing", icon: Keyboard },
                    { name: "IT kursi", id: "it-course", icon: GraduationCap },
                  ].map((item) => {
                    const IconComponent = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg animate-glow"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md"
                        }`}
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {item.name}
                      </button>
                    )
                  })}
                  <Link href="https://t.me/husanbek_coder" target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 bg-transparent hover:scale-110 transition-all duration-300 hover:shadow-lg border-2 hover:border-blue-400"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Telegram
                    </Button>
                  </Link>
                  <Link href="https://youtube.com/@it_creative" target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent hover:scale-110 transition-all duration-300 hover:shadow-lg border-2"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      YouTube
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg"
                >
                  {darkMode ? <Sun className="h-5 w-5 animate-spin" /> : <Moon className="h-5 w-5 animate-pulse" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:scale-110 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { name: "Bosh sahifa", id: "home", icon: Home },
                  { name: "Biz haqimizda", id: "about", icon: Info },
                  { name: "Yozish mashqi", id: "typing", icon: Keyboard },
                  { name: "IT kursi", id: "it-course", icon: GraduationCap },
                ].map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 animate-slide-left ${
                        activeSection === item.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
              Yozish Ko'nikmangizni Oshiring
            </h2>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              Zamonaviy va interaktiv yozish mashq platformamiz bilan yozish tezligi va aniqligingizni yaxshilang. IT
              ta'limi va professional rivojlanish uchun mukammal.
            </p>
            <Button
              onClick={() => scrollToSection("typing")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-zoom-in animate-glow"
              style={{ animationDelay: "400ms" }}
            >
              <Keyboard className="h-5 w-5 mr-2" />
              Hoziroq Mashq Qilishni Boshlang
            </Button>
          </div>
        </section>

        {/* Typing Practice Section */}
        <section
          id="typing"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="max-w-4xl mx-auto">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-3xl font-bold text-center mb-12 animate-slide-up">
                <Keyboard className="h-8 w-8 inline mr-3 text-blue-600 animate-float" />
                Yozish Mashqi
              </h3>

              {/* Progress Bar */}
              {showStats && (
                <div className="mb-8 animate-slide-up">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Jarayon</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {completedWords.length} / {words.length} so'z
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-4 animate-glow" />
                </div>
              )}

              {/* Real-time Stats */}
              {showStats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Zap, value: wpm, label: "So'z/Daqiqa", color: "blue", delay: "0ms" },
                    { icon: Target, value: `${accuracy}%`, label: "Aniqlik", color: "green", delay: "100ms" },
                    {
                      icon: Timer,
                      value: `${Math.floor(timeElapsed)}s`,
                      label: "Vaqt",
                      color: "purple",
                      delay: "200ms",
                    },
                    { icon: TrendingUp, value: totalErrors, label: "Xatolar", color: "red", delay: "300ms" },
                  ].map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <Card
                        key={index}
                        className="hover:scale-110 transition-all duration-300 hover:shadow-xl animate-zoom-in border-2 hover:border-blue-300"
                        style={{ animationDelay: stat.delay }}
                      >
                        <CardContent className="flex items-center justify-center p-4">
                          <IconComponent className={`h-8 w-8 text-${stat.color}-600 mr-3 animate-pulse`} />
                          <div>
                            <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Typing Area */}
              <Card className="mb-6 hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-300 animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600 animate-float" />
                      Quyidagi matnni yozing:
                    </span>
                    <Button
                      onClick={resetTyping}
                      variant="outline"
                      size="sm"
                      className="hover:scale-110 transition-all duration-300 bg-transparent border-2 hover:border-blue-400 hover:shadow-lg"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Qaytadan
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Text Display */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl text-lg leading-relaxed font-mono min-h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all duration-300">
                    <div className="flex flex-wrap gap-2">
                      {/* Tugallangan so'zlar */}
                      {completedWords.map((wordObj, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 animate-slide-left ${
                            wordObj.isCorrect
                              ? "text-green-700 dark:text-green-300 bg-green-200 dark:bg-green-900/40 shadow-md"
                              : "text-red-700 dark:text-red-300 bg-red-200 dark:bg-red-900/40 shadow-md"
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {wordObj.typedWord}{" "}
                          {wordObj.isCorrect ? (
                            <CheckCircle className="inline h-4 w-4 ml-1" />
                          ) : (
                            <XCircle className="inline h-4 w-4 ml-1" />
                          )}
                        </span>
                      ))}

                      {/* Hozirgi so'z */}
                      {currentWordIndex < words.length && (
                        <span className="inline-block animate-slide-right">
                          {words[currentWordIndex].split("").map((char, index) => (
                            <span key={index} className={getCurrentWordClass(char, index)}>
                              {char}
                            </span>
                          ))}
                          {currentCharIndex === currentWordInput.length && (
                            <span className="animate-pulse text-blue-600 dark:text-blue-400 font-bold">|</span>
                          )}
                        </span>
                      )}

                      {/* Keyingi so'zlar */}
                      <span className="text-gray-300 dark:text-gray-600 ml-2 animate-pulse">
                        {currentWordIndex < words.length - 1 && "..."}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        So'z: {currentWordIndex + 1} / {words.length}
                      </span>
                      {isTyping && (
                        <span className="flex items-center animate-pulse">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-ping"></div>
                          Yozish davom etmoqda...
                        </span>
                      )}
                    </div>
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={currentWordInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={isCompleted}
                    placeholder="Yozishni boshlash uchun matnni yoza boshlang..."
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-lg font-mono focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg animate-glow"
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                  />

                  <div className="mt-3 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      Eslatma: Xato yozgan so'z ham keyingi so'zga o'tadi
                    </span>
                    {isTyping && (
                      <span className="flex items-center text-green-600 dark:text-green-400 animate-pulse">
                        <Clock className="h-4 w-4 mr-1" />
                        {Math.floor(timeElapsed)}s
                      </span>
                    )}
                  </div>

                  {isCompleted && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl animate-zoom-in hover:shadow-2xl transition-all duration-500">
                      <div className="text-center">
                        <div className="text-8xl mb-6 animate-bounce">🎉</div>
                        <h4 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 animate-slide-up">
                          Tabriklaymiz! Matn tugallandi!
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[
                            { icon: Zap, value: wpm, label: "So'z/Daqiqa", color: "blue" },
                            { icon: Target, value: `${accuracy}%`, label: "Aniqlik", color: "green" },
                            { icon: Timer, value: `${Math.floor(timeElapsed)}s`, label: "Vaqt", color: "purple" },
                            { icon: CheckCircle, value: correctWords, label: "To'g'ri so'zlar", color: "emerald" },
                          ].map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                              <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-110 transition-all duration-300 animate-zoom-in border-2 hover:border-blue-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <IconComponent
                                  className={`h-8 w-8 text-${stat.color}-600 mx-auto mb-2 animate-float`}
                                />
                                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                              </div>
                            )
                          })}
                        </div>
                        <Button
                          onClick={resetTyping}
                          size="lg"
                          className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl animate-glow"
                        >
                          <RotateCcw className="h-5 w-5 mr-2" />
                          Yana Mashq Qilish
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-3xl font-bold text-center mb-12 animate-slide-up">
                <Info className="h-8 w-8 inline mr-3 text-blue-600 animate-float" />
                ITC-Typing Haqida
              </h3>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-left">
                  <h4 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Bizning Maqsadimiz</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    ITC-Typing IT sohasiga intilayotgan mutaxassislar va talabalarning yozish tezligi va aniqligini
                    oshirishga yordam berish uchun yaratilgan. Bugungi raqamli dunyoda samarali yozish ko'nikmalari
                    dasturlash, hujjatlashtirish va umumiy samaradorlik uchun zarur.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    IT ta'limiga tayyorgarlik ko'rayotgan bo'lsangiz, coding bootcamp-larga qatnashmoqchi bo'lsangiz
                    yoki shunchaki raqamli savodxonligingizni oshirmoqchi bo'lsangiz, bizning platformamiz sizga
                    muvaffaqiyat qozonish uchun zarur vositalar va mashq materiallarini taqdim etadi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Yozish Mashqi", "IT Tayyorgarlik", "Ko'nikma Rivojlantirish", "Taraqqiyot Kuzatuvi"].map(
                      (badge, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="hover:scale-110 transition-all duration-300 animate-zoom-in hover:shadow-lg"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {badge}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl animate-slide-right hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border-2 hover:border-blue-300">
                  <h4 className="text-xl font-semibold mb-4">Nega ITC-Typing?</h4>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {[
                      "Real vaqtda yozish statistikasi va fikr-mulohaza",
                      "Sizni jalb qilish uchun motivatsion kontent",
                      "Barcha qurilmalar uchun zamonaviy, javobgar dizayn",
                      "Qulay mashq uchun qorong'u rejim qo'llab-quvvatlash",
                      "IT karyera tayyorgarlik uchun mukammal",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slide-right hover:scale-105 transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-green-500 mr-2 animate-pulse">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IT Course Section */}
        <section
          id="it-course"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-3xl font-bold mb-6 animate-slide-up">
                <GraduationCap className="h-8 w-8 inline mr-3 text-blue-600 animate-float" />
                ITga o'qishga kirish
              </h3>
              <p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                IT sohasiga kirish uchun zarur bo'lgan asosiy ko'nikmalarni o'rganing. Yozish tezligini oshirish IT
                ta'limining muhim qismidir.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    emoji: "💻",
                    title: "Dasturlash Asoslari",
                    desc: "Dasturlashning asosiy tushunchalari va sintaksisini o'rganing",
                    delay: "300ms",
                  },
                  {
                    emoji: "⚡",
                    title: "Yozish Tezligi",
                    desc: "Kodlash uchun tez va aniq yozish ko'nikmalarini rivojlantiring",
                    delay: "400ms",
                  },
                  {
                    emoji: "🎯",
                    title: "Karyera Tayyorgarlik",
                    desc: "IT karyera imkoniyatlari va intervyularga tayyorgarlik ko'ring",
                    delay: "500ms",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="hover:scale-110 transition-all duration-500 animate-zoom-in hover:shadow-2xl border-2 hover:border-blue-300"
                    style={{ animationDelay: item.delay }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-float hover:shadow-lg transition-all duration-300">
                        <span className="text-3xl">{item.emoji}</span>
                      </div>
                      <h4 className="font-semibold mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link href="https://itclms.uz/signup" target="_blank">
                            <Button
                onClick={() => scrollToSection("typing")}
                size="lg"
                className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl animate-glow animate-zoom-in"
                style={{ animationDelay: "600ms" }}
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                IT Kursida o'qishga kirish
              </Button>
              </Link>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-slide-up">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float">
                ITC-Typing
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Muvaffaqiyatli IT karyera uchun yozish ko'nikmalaringizni oshiring
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="https://t.me/husanbek_coder" target="_blank">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:scale-110 transition-all duration-300 hover:shadow-lg border-2"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                </Link>
                <Link href="https://youtube.com/@it_creative" target="_blank">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent hover:scale-110 transition-all duration-300 hover:shadow-lg border-2"
                  >
                    <Youtube className="h-4 w-4 mr-2" />
                    YouTube
                  </Button>
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm">© 2024 ITC-Typing. Barcha huquqlar himoyalangan.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
