import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, DollarSign, Brain, Shield, TrendingUp, Users, Star, Clock, Send, BarChart3, Zap, Target, Award, ArrowRight, Sparkles, Globe, Heart, Briefcase, Car, Scale, PiggyBank, Gamepad2, Handshake, Eye, FileText, Video, Music, Code, Rocket, UserCheck, Lightbulb } from 'lucide-react';

const TitlePageBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let circles = [];

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        class Circle {
            constructor() {
                this.pos = { x: Math.random() * width, y: Math.random() * height };
                this.size = Math.random() * 400 + 200;
                this.speed = { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 };
                const colors = [
                    'hsla(45, 100%, 50%, 0.5)',  // Gold - Hidden Genius colors
                    'hsla(0, 0%, 0%, 0.3)',      // Black
                    'hsla(210, 100%, 85%, 0.5)', // Blue accent
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.filter = 'blur(100px)';
                ctx.fill();
            }

            update() {
                this.pos.x += this.speed.x;
                this.pos.y += this.speed.y;

                if (this.pos.x > width + this.size || this.pos.x < -this.size) {
                    this.speed.x *= -1;
                }
                if (this.pos.y > height + this.size || this.pos.y < -this.size) {
                    this.speed.y *= -1;
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            circles.forEach(circle => {
                circle.update();
                circle.draw();
            });
            requestAnimationFrame(animate);
        };

        for (let i = 0; i < 3; i++) {
            circles.push(new Circle());
        }

        window.addEventListener('resize', resize);
        animate();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10"></canvas>;
};

const HGPFinancialLiteracyApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pollResponses, setPollResponses] = useState({});
  const [userDataValue, setUserDataValue] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [brotherhoodActivityTime, setBrotherhoodActivityTime] = useState(900); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [geniusProject, setGeniusProject] = useState({ name: '', problem: '', solution: '', impact: '' });
  const [codeExample, setCodeExample] = useState('');

  // Timer countdown
  useEffect(() => {
    if (isTimerRunning && brotherhoodActivityTime > 0) {
      const timer = setTimeout(() => setBrotherhoodActivityTime(brotherhoodActivityTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (brotherhoodActivityTime === 0 && isTimerRunning) {
        setIsTimerRunning(false);
    }
  }, [isTimerRunning, brotherhoodActivityTime]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const slides = [
    {
      id: 'title-page',
      title: 'Welcome Geniuses',
      component: <TitleSlide onStart={nextSlide} />
    },
    {
      id: 'brotherhood-check',
      title: 'Brotherhood Tech Check',
      component: <BrotherhoodPoll responses={pollResponses} setPollResponses={setPollResponses} />
    },
    {
      id: 'data-sovereignty',
      title: 'Your Data, Your Power',
      component: <DataSovereigntyModule setUserDataValue={setUserDataValue} userDataValue={userDataValue} />
    },
    {
      id: 'ai-training-data',
      title: 'How Your Data Trains AI',
      component: <AITrainingDataModule />
    },
    {
      id: 'tech-leadership',
      title: 'Technology Leadership',
      component: <TechLeadershipModule codeExample={codeExample} setCodeExample={setCodeExample} />
    },
    {
      id: 'ai-justice',
      title: 'AI Justice: Breaking Digital Barriers',
      component: <AIJusticeModule />
    },
    {
      id: 'genius-tools',
      title: 'Genius AI Tools',
      component: <GeniusToolsDemo selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} aiResponse={aiResponse} setAiResponse={setAiResponse} />
    },
    {
      id: 'brotherhood-build',
      title: 'Brotherhood Build Session',
      component: <BrotherhoodBuildModule time={brotherhoodActivityTime} isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} setBrotherhoodActivityTime={setBrotherhoodActivityTime} />
    },
    {
      id: 'genius-showcase',
      title: 'Genius Project Showcase',
      component: <GeniusShowcaseModule />
    },
    {
      id: 'genius-revealed',
      title: 'Your Genius Revealed',
      component: <GeniusRevealedModule geniusProject={geniusProject} setGeniusProject={setGeniusProject} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-amber-900 text-slate-100 overflow-hidden font-sans relative">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg z-50 px-6 py-3 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-lg shadow-md">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-400">
                Hidden Genius AI Module
              </h1>
              <p className="text-xs text-amber-200">Revealing Genius Through Technology</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-amber-200">The value of one, the power of all</div>
            <div className="flex gap-1.5">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    index === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl min-h-[600px] border border-amber-500/30 ${currentSlide === 0 ? 'bg-transparent shadow-none border-none' : ''}`}>
             {currentSlide > 0 && (
                <h2 className="text-4xl font-bold mb-8 text-center text-amber-400">
                {slides[currentSlide].title}
                </h2>
            )}
            <div className="slide-content">
              {slides[currentSlide].component}
            </div>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-lg px-6 py-3 border-t border-amber-500/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 bg-black/60 rounded-lg hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-amber-500/30 text-amber-200"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <div className="text-center">
            <p className="text-sm text-amber-200">Module {currentSlide} of {slides.length - 1}</p>
            <p className="text-xs text-amber-300/60">{slides[currentSlide].id}</p>
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-md"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
};

// Title Slide - Hidden Genius Branded
const TitleSlide = ({ onStart }) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-full text-center -mt-16 overflow-hidden rounded-3xl">
            <TitlePageBackground />
            <div className="z-10">
                <div className="mb-8">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">#GeniusRevealed</h1>
                    <p className="mt-4 text-3xl text-amber-200">AI Literacy & Leadership</p>
                </div>
                
                <p className="mt-4 text-2xl text-amber-300/80">Harness Technology, Lead Your Community</p>
                
                <div className="mt-12 max-w-md mx-auto text-lg space-y-2 text-amber-200/90">
                    <p>"You have hidden genius within you."</p>
                    <p className="font-bold">Today, we reveal it through technology and leadership.</p>
                </div>

                <button
                    onClick={onStart}
                    className="mt-16 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xl font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                >
                    Begin Your Journey
                </button>

                <div className="mt-12 flex items-center gap-8 text-amber-300/70">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Brotherhood</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        <span>Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        <span>Leadership</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Brotherhood Tech Check - Community Building
const BrotherhoodPoll = ({ responses, setPollResponses }) => {
  const [inputValue, setInputValue] = useState('');
  const [studentCount, setStudentCount] = useState(0);
  
  const handleAddResponse = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= 0 && value <= 50) {
      setPollResponses(prev => ({
        ...prev,
        [value]: (prev[value] || 0) + 1
      }));
      setStudentCount(prev => prev + 1);
      setInputValue('');
    }
  };
  
  const totalResponses = Object.values(responses).reduce((sum, count) => sum + count, 0);
  const totalApps = Object.entries(responses).reduce((sum, [apps, count]) => sum + (parseInt(apps) * count), 0);
  const averageApps = totalResponses > 0 ? (totalApps / totalResponses).toFixed(1) : 0;
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-2xl mb-4 text-amber-200">💪🏿 Brotherhood Check: How many apps are mining YOUR data?</p>
        <div className="inline-flex items-center gap-3 bg-black/60 px-6 py-3 rounded-full border border-amber-500/30">
          <UserCheck className="w-5 h-5 text-amber-400" />
          <span className="text-lg text-amber-200">Real-time brotherhood data</span>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-black/60 p-6 rounded-2xl space-y-4 border border-amber-500/30">
          <h3 className="text-lg font-bold text-amber-400">Each Genius Reports:</h3>
          <p className="text-amber-200">"How many apps did you use yesterday?"</p>
          
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddResponse()}
              placeholder="Number of apps"
              min="0"
              max="50"
              className="flex-1 px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-xl font-mono text-center text-amber-200"
            />
            <button
              onClick={handleAddResponse}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-lg hover:opacity-90 transition-all font-bold"
            >
              Add
            </button>
          </div>
          
          <div className="text-sm text-amber-300">
            Geniuses surveyed: <span className="text-amber-400 font-bold">{studentCount}</span>
            {studentCount >= 10 && <span className="ml-2 text-green-400">🔥 Brotherhood strong!</span>}
          </div>
        </div>
      </div>
      
      {totalResponses > 0 && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-black/60 p-4 rounded-xl text-center border border-amber-500/30">
              <p className="text-3xl font-bold text-amber-400">{averageApps}</p>
              <p className="text-sm text-amber-200">Average Apps Per Genius</p>
            </div>
            <div className="bg-black/60 p-4 rounded-xl text-center border border-amber-500/30">
              <p className="text-3xl font-bold text-amber-400">{totalApps}</p>
              <p className="text-sm text-amber-200">Total Apps Mining Our Data</p>
            </div>
            <div className="bg-black/60 p-4 rounded-xl text-center border border-amber-500/30">
              <p className="text-3xl font-bold text-amber-400">${(totalApps * 15 * 365).toLocaleString()}</p>
              <p className="text-sm text-amber-200">Brotherhood's Annual Data Value</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-8 space-y-4">
        <div className="bg-black/60 p-6 rounded-2xl max-w-2xl mx-auto border border-amber-500/30">
          <Quote text="From Oakland to the world, we're revealing genius everywhere" author="The Hidden Genius Project" />
          <p className="mt-4 text-lg text-amber-200">Every app is a goldmine. You are the gold. Time to take control!</p>
        </div>
      </div>
    </div>
  );
};

// AI Training Data Module - How Your Data Trains AI
const AITrainingDataModule = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const trainingSteps = [
    {
      title: "Data Collection",
      description: "Your posts, photos, and interactions are collected",
      icon: "📱",
      detail: "Every time you post on social media, upload a photo, or interact with content, that data becomes part of massive datasets. Companies collect billions of these data points daily."
    },
    {
      title: "Data Processing", 
      description: "Raw data is cleaned and labeled for training",
      icon: "⚙️",
      detail: "Human workers and algorithms sort through the data, labeling what's in images, categorizing text sentiment, and organizing it into training datasets worth millions of dollars."
    },
    {
      title: "Model Training",
      description: "AI systems learn patterns from your data", 
      icon: "🧠",
      detail: "Powerful computers process millions of examples to teach AI systems how to recognize faces, generate text, recommend content, and make decisions that affect your life."
    },
    {
      title: "AI Deployment",
      description: "Trained models are used in apps and services",
      icon: "🚀", 
      detail: "The AI trained on your data is then used in recommendation algorithms, content moderation, advertising targeting, and even hiring decisions - often without your knowledge."
    },
    {
      title: "Profit Generation",
      description: "Companies make billions from AI trained on your data",
      icon: "💰",
      detail: "Tech companies generate massive profits from AI services, while the people whose data made it possible receive nothing. This is the new digital divide we must address."
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-xl text-amber-200">🤖 Understanding how YOUR data becomes THEIR AI</p>
        <div className="inline-flex items-center gap-3 bg-black/60 px-6 py-3 rounded-full border border-amber-500/30 mt-4">
          <Brain className="w-5 h-5 text-amber-400" />
          <span className="text-lg text-amber-200">The AI Training Pipeline</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {trainingSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-amber-400 border-amber-400 text-black' 
                      : 'border-amber-500/50 text-amber-300 hover:border-amber-400'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                </button>
                {index < trainingSteps.length - 1 && (
                  <div className={`w-8 h-0.5 transition-colors duration-300 ${
                    activeStep > index ? 'bg-amber-400' : 'bg-amber-500/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-black/60 p-8 rounded-2xl border border-amber-500/30">
          <h3 className="text-2xl font-bold text-amber-400 mb-4">
            {trainingSteps[activeStep].title}
          </h3>
          <p className="text-xl text-amber-200 mb-4">
            {trainingSteps[activeStep].description}
          </p>
          <p className="text-amber-300/80 leading-relaxed">
            {trainingSteps[activeStep].detail}
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-red-900/80 to-black/80 p-6 rounded-2xl border border-red-500/30">
          <h4 className="text-xl font-bold text-red-400 mb-4">The Problem</h4>
          <ul className="space-y-2 text-red-200">
            <li>• Your creative work trains AI without your consent</li>
            <li>• No compensation for data that generates billions</li>
            <li>• AI bias reflects historical inequalities</li>
            <li>• Limited control over how your data is used</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/80 to-black/80 p-6 rounded-2xl border border-green-500/30">
          <h4 className="text-xl font-bold text-green-400 mb-4">The Genius Solution</h4>
          <ul className="space-y-2 text-green-200">
            <li>• Build AI systems that respect data creators</li>
            <li>• Create fair compensation models</li>
            <li>• Develop bias-aware algorithms</li>
            <li>• Lead the ethical AI movement</li>
          </ul>
        </div>
      </div>
      
      <div className="text-center">
        <Quote text="When we understand how the system works, we can build a better one." author="Hidden Genius Project" />
      </div>
    </div>
  );
};

// Data Sovereignty Module - Empowerment Focus
const DataSovereigntyModule = ({ setUserDataValue, userDataValue }) => {
  const [appUsage, setAppUsage] = useState({ tiktok: 3, instagram: 2, youtube: 2, spotify: 1 });
  const [showCode, setShowCode] = useState(false);
  
  useEffect(() => {
    const total = Object.values(appUsage).reduce((sum, hours) => sum + hours, 0);
    setUserDataValue(total * 20); // $20 per hour - higher value for our geniuses
  }, [appUsage, setUserDataValue]);
  
  const pythonCode = `# Calculate Your Data Worth - Hidden Genius Style
apps = {
    "tiktok": ${appUsage.tiktok},
    "instagram": ${appUsage.instagram}, 
    "youtube": ${appUsage.youtube},
    "spotify": ${appUsage.spotify}
}

hourly_value = 20  # Your data is worth $20/hour
daily_value = sum(apps.values()) * hourly_value
annual_value = daily_value * 365

print(f"Daily: ${daily_value}")
print(f"Annual: ${annual_value:,}")
print("You're not just a user, you're an asset!")`;
  
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
            <DollarSign className="w-8 h-8" />
            Genius Data Calculator
          </h3>
          
          <div className="space-y-4">
            {Object.entries(appUsage).map(([app, hours]) => (
              <div key={app} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="capitalize text-lg text-amber-200">{app}</span>
                  <span className="text-amber-400 font-mono">{hours}h/day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={hours}
                  onChange={(e) => setAppUsage({...appUsage, [app]: parseInt(e.target.value)})}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer slider-amber"
                />
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-6 rounded-2xl text-black shadow-lg">
            <p className="text-sm font-bold uppercase">Your Annual Data Value</p>
            <p className="text-4xl font-bold">${(userDataValue * 365).toLocaleString()}</p>
            <p className="text-sm mt-2 font-semibold">Time to control and monetize YOUR data!</p>
          </div>
          
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg hover:bg-black/80 transition-all text-amber-200 font-bold flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5" />
            {showCode ? 'Hide' : 'Show'} Python Code
          </button>
        </div>
        
        <div className="space-y-6">
          {showCode ? (
            <div className="bg-black/80 p-6 rounded-2xl border border-amber-500/30">
              <h4 className="text-lg font-bold mb-4 text-amber-400 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Python Code to Calculate Your Worth
              </h4>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {pythonCode}
              </pre>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-amber-400">Your Data = Your Digital Legacy</h3>
              <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h4 className="text-lg font-bold text-amber-400">Tech Giants vs. Hidden Geniuses</h4>
                <div className="space-y-3 text-amber-200">
                  <p>🏦 <strong>Meta:</strong> Makes $32 per user quarterly from YOUR data</p>
                  <p>🎵 <strong>TikTok:</strong> Your creativity fuels a $75B AI company</p>
                  <p>📸 <strong>Instagram:</strong> Your photos train their image recognition</p>
                  <p className="pt-3 text-amber-400 font-bold">But what if WE controlled the data economy?</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/20 to-amber-600/20 p-6 rounded-2xl border border-green-500/30">
                <h4 className="text-lg font-bold mb-3 text-green-400">The Hidden Genius Way</h4>
                <ul className="space-y-2 text-amber-200">
                  <li>✓ Build platforms that empower creators</li>
                  <li>✓ Design ethical AI systems</li>
                  <li>✓ Code solutions for our communities</li>
                  <li>✓ Lead the next generation of tech leaders</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Technology Leadership Module - Building Technical Excellence
const TechLeadershipModule = ({ codeExample, setCodeExample }) => {
  const [selectedExample, setSelectedExample] = useState('javascript');
  
  const codeExamples = {
    javascript: {
      title: "JavaScript: Track Your App Usage",
      code: `// Hidden Genius App Tracker
class DataTracker {
  constructor() {
    this.apps = {};
    this.totalValue = 0;
  }
  
  trackApp(appName, hours) {
    this.apps[appName] = hours;
    this.calculateValue();
  }
  
  calculateValue() {
    const hourlyRate = 20; // $20/hour
    const totalHours = Object.values(this.apps)
      .reduce((sum, hours) => sum + hours, 0);
    this.totalValue = totalHours * hourlyRate * 365;
    console.log(\`Annual value: $\${this.totalValue.toLocaleString()}\`);
  }
}

// Use it like a Genius
const myData = new DataTracker();
myData.trackApp('TikTok', 3);
myData.trackApp('Instagram', 2);`
    },
    python: {
      title: "Python: AI Data Analyzer",
      code: `# Hidden Genius Data Analyzer
import pandas as pd
import matplotlib.pyplot as plt

class GeniusDataAnalyzer:
    def __init__(self):
        self.hourly_rate = 20  # $20/hour
        self.app_data = {}
    
    def add_app(self, name, hours):
        self.app_data[name] = hours
    
    def calculate_annual_value(self):
        daily_hours = sum(self.app_data.values())
        annual_value = daily_hours * self.hourly_rate * 365
        return annual_value
    
    def visualize_data(self):
        apps = list(self.app_data.keys())
        hours = list(self.app_data.values())
        
        plt.figure(figsize=(10, 6))
        plt.bar(apps, hours, color='gold')
        plt.title('My Data Empire', fontsize=16)
        plt.ylabel('Hours per Day')
        plt.show()

# Reveal your genius
analyzer = GeniusDataAnalyzer()
analyzer.add_app('TikTok', 3)
analyzer.add_app('YouTube', 2)
print(f"Your data is worth ${analyzer.calculate_annual_value():,} annually!")`
    },
    css: {
      title: "CSS: Style Your Data Dashboard",
      code: `/* Hidden Genius Data Dashboard */
.genius-dashboard {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.data-value {
  font-size: 3rem;
  font-weight: bold;
  color: #000;
  text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.genius-card {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid gold;
  transition: all 0.3s ease;
}

.genius-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
}`
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-xl text-amber-200">💻 Real Geniuses harness technology. Let's build solutions for our community!</p>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(codeExamples).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedExample(lang)}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              selectedExample === lang
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black'
                : 'bg-black/60 border border-amber-500/30 text-amber-200 hover:bg-black/80'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="bg-black/80 p-6 rounded-2xl border border-amber-500/30">
        <h3 className="text-xl font-bold mb-4 text-amber-400 flex items-center gap-2">
          <Code className="w-6 h-6" />
          {codeExamples[selectedExample].title}
        </h3>
        <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {codeExamples[selectedExample].code}
        </pre>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-black/60 p-6 rounded-xl border border-amber-500/30 text-center">
          <Rocket className="w-10 h-10 mx-auto text-amber-400 mb-3" />
          <h4 className="font-bold text-amber-400 mb-2">Build</h4>
          <p className="text-sm text-amber-200">Create apps that respect users</p>
        </div>
        <div className="bg-black/60 p-6 rounded-xl border border-amber-500/30 text-center">
          <Shield className="w-10 h-10 mx-auto text-amber-400 mb-3" />
          <h4 className="font-bold text-amber-400 mb-2">Protect</h4>
          <p className="text-sm text-amber-200">Code privacy-first solutions</p>
        </div>
        <div className="bg-black/60 p-6 rounded-xl border border-amber-500/30 text-center">
          <DollarSign className="w-10 h-10 mx-auto text-amber-400 mb-3" />
          <h4 className="font-bold text-amber-400 mb-2">Profit</h4>
          <p className="text-sm text-amber-200">Share value with communities</p>
        </div>
      </div>
      
      <div className="text-center">
        <Quote text="When we code, we code for liberation and community uplift." author="Hidden Genius Principle" />
      </div>
    </div>
  );
};

// AI Justice Module - Community Focus
const AIJusticeModule = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  
  const injusticeExamples = [
    {
      icon: <Briefcase className="w-10 h-10 mx-auto text-red-500" />,
      title: "The Zip Code Trap",
      front: "Marcus from East Oakland applies for a tech job. The AI screening tool sees his zip code...",
      back: "...and automatically ranks him lower than candidates from wealthier areas. His portfolio never gets seen. This is digital redlining in action."
    },
    {
      icon: <Scale className="w-10 h-10 mx-auto text-yellow-500" />,
      title: "The Algorithm Judge",
      front: "Two teens get caught shoplifting. One from the hills, one from the flats. The AI bail system calculates...",
      back: "...higher risk for the teen from the low-income neighborhood, despite identical offenses. One goes home, one stays in jail. Same crime, different algorithm outcome."
    },
    {
      icon: <Car className="w-10 h-10 mx-auto text-blue-500" />,
      title: "The Insurance AI",
      front: "Your cousin has perfect grades and no accidents. She applies for car insurance and the AI quotes...",
      back: "...$300/month because she lives in a 'high-risk' zip code. Her white classmate with worse grades pays $150. The AI learned discrimination from biased data."
    }
  ];
  
  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-xl mb-6 text-amber-200">⚖️ AI can either reinforce injustice or help us break it. As Hidden Geniuses, we choose justice.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {injusticeExamples.map((example, index) => (
          <div key={index} className="perspective-1000" onClick={() => setFlippedCard(flippedCard === index ? null : index)}>
            <div className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${flippedCard === index ? 'rotate-y-180' : ''}`}>
              <div className="absolute w-full h-full backface-hidden bg-black/60 p-6 rounded-2xl space-y-4 border border-amber-500/30 cursor-pointer">
                {example.icon}
                <h4 className="text-xl font-bold mt-2 text-amber-400">{example.title}</h4>
                <p className="text-amber-200 text-sm leading-relaxed">{example.front}</p>
                <p className="text-xs text-amber-400 mt-4">Click to reveal the injustice →</p>
              </div>
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-red-900/80 to-black/80 text-white rounded-2xl border border-red-500/30 cursor-pointer rotate-y-180 p-6 flex items-center">
                <p className="text-sm leading-relaxed">{example.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-black/60 p-6 rounded-2xl max-w-4xl mx-auto border border-amber-500/30">
        <h3 className="text-2xl font-bold mb-6 text-center text-amber-400">The Hidden Genius Solution</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-amber-400">The Problem</h4>
            <ul className="space-y-2 text-amber-200">
              <li>🚫 AI trained on biased historical data</li>
              <li>🚫 Algorithms that perpetuate inequality</li>
              <li>🚫 Tech that ignores our communities</li>
              <li>🚫 Systems built without our input</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-green-400">Our Response</h4>
            <ul className="space-y-2 text-green-300">
              <li>✊🏿 Build AI with justice at the core</li>
              <li>✊🏿 Create datasets that represent us</li>
              <li>✊🏿 Code algorithms that lift communities</li>
              <li>✊🏿 Lead the tech revolution from within</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Quote text="Justice delayed is justice denied. In tech, justice designed out is community harmed." author="Hidden Genius Project" />
      </div>
    </div>
  );
};

// Genius Tools Demo - Practical Applications
const GeniusToolsDemo = ({ selectedPrompt, setSelectedPrompt, aiResponse, setAiResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('community');
  
  const trackPrompts = {
    community: [
      "Design an app that connects local youth with tech mentors",
      "Create a platform for neighborhood skill sharing",
      "Build a community resource mapping tool"
    ],
    education: [
      "AI tutor for coding bootcamp students",
      "Interactive platform for learning tech entrepreneurship", 
      "Virtual reality coding classroom for underserved schools"
    ],
    justice: [
      "AI bias detection tool for hiring algorithms",
      "Platform to document and report digital discrimination",
      "App to promote equitable access to tech opportunities"
    ]
  };
  
  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setIsLoading(true);
    setAiResponse('');

    setTimeout(() => {
      const responses = {
        "Design an app that connects local youth with tech mentors": "MentorLink App Concept:\n\n1. Problem: Limited access to tech mentorship in underserved communities\n2. Solution: AI-powered matching based on interests, goals, and availability\n3. Features: Video calls, project collaboration, progress tracking\n4. Community focus: Local tech professionals giving back\n5. Tech stack: React Native + Firebase + AI matching algorithm\n\nImpact: Connect 1000+ youth with mentors in first year 🌆",
        "Create a platform for neighborhood skill sharing": "Community Skills Exchange Platform:\n\n1. Vision: Neighbors teaching neighbors valuable skills\n2. Features: Skill marketplace, reputation system, local events\n3. Tech implementation: Web platform with geolocation\n4. Community building: Virtual and in-person skill swaps\n5. Monetization: Small transaction fees supporting local economy\n\nGoal: Strengthen community bonds through knowledge sharing 🤝",
        "AI bias detection tool for hiring algorithms": "FairHire AI Audit Tool:\n\n1. Purpose: Detect discrimination in recruitment AI systems\n2. Method: Statistical analysis of hiring patterns by demographics\n3. Impact: Expose biased algorithms, promote fair hiring\n4. Target users: HR departments, advocacy organizations\n5. Technology: Python + machine learning + data visualization\n\nMission: Level the playing field in tech hiring ⚖️"
      };
      setAiResponse(responses[prompt] || "Let's build something powerful together...");
      setIsLoading(false);
    }, 1200);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <p className="text-xl text-amber-200">🛠️ AI tools designed for Hidden Geniuses, by Hidden Geniuses</p>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(trackPrompts).map((track) => (
          <button
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              selectedTrack === track
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black'
                : 'bg-black/60 border border-amber-500/30 text-amber-200 hover:bg-black/80'
            }`}
          >
            {track.charAt(0).toUpperCase() + track.slice(1)} Track
          </button>
        ))}
      </div>
      
      <div className="bg-black/60 p-6 rounded-2xl space-y-4 border border-amber-500/30">
        <h3 className="text-xl font-bold text-amber-400">Select a Genius Prompt:</h3>
        <div className="space-y-2">
          {trackPrompts[selectedTrack].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePromptSelect(prompt)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedPrompt === prompt 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black' 
                  : 'bg-black/60 hover:bg-black/80 text-amber-200 border border-amber-500/30'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30 min-h-[120px] flex items-center justify-center">
        {isLoading && (
          <div className="flex items-center gap-3 text-amber-400">
            <div className="w-5 h-5 border-2 border-t-transparent border-amber-400 rounded-full animate-spin"></div>
            <span>Genius AI thinking...</span>
          </div>
        )}
        {!isLoading && aiResponse && (
          <div>
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              AI Response:
            </h4>
            <pre className="text-amber-200 whitespace-pre-wrap font-mono text-sm">{aiResponse}</pre>
          </div>
        )}
        {!isLoading && !aiResponse && (
          <p className="text-amber-300">Select a prompt to see Genius AI in action!</p>
        )}
      </div>
      
      <div className="text-center">
        <Quote text="We don't just use technology - we shape it to serve our communities." author="Hidden Genius Project" />
      </div>
    </div>
  );
};

// Brotherhood Build Module - Collaboration
const BrotherhoodBuildModule = ({ time, isRunning, setIsRunning, setBrotherhoodActivityTime }) => {
  const [inputMinutes, setInputMinutes] = useState(15);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  const projectIdeas = [
    { 
      name: "MentorLink", 
      desc: "AI-powered platform connecting youth with local tech professionals", 
      icon: <Users />,
      track: "Community"
    },
    { 
      name: "CodeCommunity", 
      desc: "Collaborative coding platform for underrepresented students", 
      icon: <Handshake />,
      track: "Education"
    },
    { 
      name: "BiasDetector", 
      desc: "Tool that identifies discrimination in AI systems and algorithms", 
      icon: <Shield />,
      track: "Justice"
    },
    { 
      name: "NeighborhoodTech", 
      desc: "Platform showcasing local tech entrepreneurs and their journeys", 
      icon: <Rocket />,
      track: "Community"
    },
    { 
      name: "SkillBridge", 
      desc: "VR training program for emerging tech careers", 
      icon: <Zap />,
      track: "Education"
    },
    { 
      name: "EquityEngine", 
      desc: "Analytics dashboard tracking diversity in tech hiring and promotion", 
      icon: <Target />,
      track: "Justice"
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <p className="text-xl text-amber-200">🤝 Brotherhood builds together. Create your Genius tech solution!</p>
        
        <div className="inline-flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-black/60"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient-timer-genius)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * (time / (inputMinutes * 60))) / 1}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient-timer-genius">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock className="w-8 h-8 mb-2 text-amber-400" />
              <span className="text-3xl font-bold font-mono text-amber-400">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3 rounded-full font-bold transition-all w-48 shadow-md ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90 text-black'
            }`}
          >
            {isRunning ? 'Pause Build' : 'Start Building'}
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectIdeas.map((idea) => (
          <div key={idea.name} className="bg-black/60 p-6 rounded-2xl hover:bg-black/80 transition-all cursor-pointer group border border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg text-black group-hover:scale-110 transition-transform">
                {idea.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-lg text-amber-400">{idea.name}</h4>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{idea.track}</span>
                </div>
                <p className="text-sm text-amber-200">{idea.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30">
        <h3 className="text-xl font-bold mb-4 text-amber-400">Brotherhood Build Requirements:</h3>
        <div className="grid md:grid-cols-2 gap-6 text-amber-200">
          <div className="space-y-3">
            <h4 className="font-bold text-amber-400">Technical Excellence</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">💻</span>
                <span>Use at least 2 languages you've learned</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">🤖</span>
                <span>Integrate AI meaningfully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">📱</span>
                <span>Mobile-first design</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-amber-400">Community Impact</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">🌍</span>
                <span>How does it help our people?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">💰</span>
                <span>Clear path to financial empowerment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">🛡️</span>
                <span>Protects user data and dignity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Quote text="The value of one, the power of all - together we build the future." author="Hidden Genius Project" />
      </div>
    </div>
  );
};

// Genius Showcase Module
const GeniusShowcaseModule = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <p className="text-xl text-amber-200">🏆 See what your fellow Geniuses have built!</p>
        <div className="inline-flex items-center gap-3 bg-black/60 px-6 py-3 rounded-full border border-amber-500/30">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="text-lg text-amber-200">Real projects by real Geniuses</span>
        </div>
      </div>
      
      <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30">
        <h3 className="text-xl font-bold mb-4 text-amber-400">Featured: WealthBuilder Game</h3>
        <div className="aspect-video bg-black/80 rounded-lg overflow-hidden border border-amber-500/30">
          <iframe
            src="teen-finance-game.html"
            className="w-full h-full border-0"
            title="Genius Finance Game"
            allowFullScreen
          >
            Your browser does not support iframes.
          </iframe>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30">
          <h4 className="text-lg font-bold mb-4 text-amber-400 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technical Stack
          </h4>
          <ul className="space-y-2 text-amber-200">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span><strong>Frontend:</strong> React + Tailwind CSS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span><strong>AI Integration:</strong> OpenAI API for scenarios</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span><strong>Backend:</strong> Node.js + MongoDB</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span><strong>Deployment:</strong> Vercel + Railway</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/30">
          <h4 className="text-lg font-bold mb-4 text-green-400 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Community Impact
          </h4>
          <ul className="space-y-2 text-green-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>500+ youth played in first month</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Average credit score knowledge +40%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>3 schools adopted for financial literacy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Creator landed internship at fintech startup</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-600/20 to-amber-600/20 p-6 rounded-2xl border border-green-500/30 text-center">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">Alumni Success</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-3xl font-bold text-green-400">87%</p>
            <p className="text-amber-200">Pursuing tech careers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">$75K</p>
            <p className="text-amber-200">Average starting salary</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">23</p>
            <p className="text-amber-200">Startups launched</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Quote text="When one Genius succeeds, we all level up." author="Hidden Genius Motto" />
      </div>
    </div>
  );
};

// Genius Revealed Module - Final Commitment
const GeniusRevealedModule = ({ geniusProject, setGeniusProject }) => {
  const [commitmentMade, setCommitmentMade] = useState(false);
  
  const handleCommit = () => {
    if (geniusProject.name && geniusProject.problem && geniusProject.solution && geniusProject.impact) {
      setCommitmentMade(true);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl mb-4 text-amber-400">#GeniusRevealed - Your Financial Freedom Commitment</h3>
        <p className="text-lg text-amber-200">Transform your genius into action</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-black/60 p-6 rounded-2xl space-y-4 border border-amber-500/30">
          <h4 className="text-xl font-bold text-amber-400 mb-4">My Genius Project Commitment</h4>
          
          <label className="block">
            <span className="text-sm text-amber-300">Project Name:</span>
            <input
              type="text"
              value={geniusProject.name}
              onChange={(e) => setGeniusProject({...geniusProject, name: e.target.value})}
              className="mt-2 w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-amber-200"
              placeholder="e.g., WealthTracker, DataGuardian"
            />
          </label>
          
          <label className="block">
            <span className="text-sm text-amber-300">Problem I'm Solving:</span>
            <input
              type="text"
              value={geniusProject.problem}
              onChange={(e) => setGeniusProject({...geniusProject, problem: e.target.value})}
              className="mt-2 w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-amber-200"
              placeholder="e.g., Youth don't understand credit"
            />
          </label>
          
          <label className="block">
            <span className="text-sm text-amber-300">My Solution:</span>
            <input
              type="text"
              value={geniusProject.solution}
              onChange={(e) => setGeniusProject({...geniusProject, solution: e.target.value})}
              className="mt-2 w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-amber-200"
              placeholder="e.g., Gamified credit education app"
            />
          </label>
          
          <label className="block">
            <span className="text-sm text-amber-300">Community Impact:</span>
            <input
              type="text"
              value={geniusProject.impact}
              onChange={(e) => setGeniusProject({...geniusProject, impact: e.target.value})}
              className="mt-2 w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-amber-200"
              placeholder="e.g., Help 1000 teens build credit"
            />
          </label>
          
          <button
            onClick={handleCommit}
            disabled={!Object.values(geniusProject).every(val => val.trim())}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-lg hover:opacity-90 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Make My Commitment
          </button>
        </div>
        
        {commitmentMade && (
          <div className="bg-gradient-to-r from-green-500 to-amber-500 p-0.5 rounded-2xl shadow-md">
            <div className="bg-black/90 p-6 rounded-2xl text-center">
              <p className="text-2xl font-bold text-amber-400 mb-2">
                🔥 Genius Revealed! 🔥
              </p>
              <p className="text-amber-200">Welcome to the brotherhood of tech leaders building financial freedom!</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center space-y-6">
        <div className="bg-black/60 p-8 rounded-2xl max-w-3xl mx-auto border border-amber-500/30">
          <h3 className="text-2xl font-bold mb-6 text-amber-400">Your Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-6 text-amber-200">
            <div className="space-y-3">
              <Lightbulb className="w-10 h-10 mx-auto text-amber-400" />
              <h4 className="font-bold">This Week</h4>
              <p className="text-sm">Start building your project MVP</p>
            </div>
            <div className="space-y-3">
              <Users className="w-10 h-10 mx-auto text-amber-400" />
              <h4 className="font-bold">This Month</h4>
              <p className="text-sm">Test with 10 community members</p>
            </div>
            <div className="space-y-3">
              <Rocket className="w-10 h-10 mx-auto text-amber-400" />
              <h4 className="font-bold">This Year</h4>
              <p className="text-sm">Launch and scale your solution</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-600/20 to-green-600/20 p-6 rounded-2xl border border-amber-500/30 max-w-2xl mx-auto">
          <h4 className="text-xl font-bold mb-4 text-amber-400">Hidden Genius Resources</h4>
          <div className="space-y-2 text-amber-200">
            <p>📚 Access to coding resources and mentors</p>
            <p>💻 Free development tools and hosting</p>
            <p>🤝 Brotherhood network of 6,000+ Geniuses</p>
            <p>🏆 Demo Day opportunities with investors</p>
          </div>
        </div>
        
        <Quote text="Your genius was never hidden. It was just waiting for the right moment to shine." author="You, today" />
      </div>
    </div>
  );
};

// Helper Components
const Quote = ({ text, author }) => (
  <blockquote className="text-center">
    <p className="text-2xl font-semibold italic mb-2 text-amber-300">"{text}"</p>
    <cite className="text-lg text-amber-400">- {author}</cite>
  </blockquote>
);

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  .slider-amber::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #fbbf24;
    cursor: pointer;
    border-radius: 50%;
  }
  
  .slider-amber::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #fbbf24;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .perspective-1000 { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; }
`;
document.head.appendChild(style);

export default HGPFinancialLiteracyApp;