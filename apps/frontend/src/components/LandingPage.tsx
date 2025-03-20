import { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert(`Thank you! We'll reach out to ${email} with early access information.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 py-4 z-10 transition-all duration-300 backdrop-blur-sm bg-opacity-80">
        <div className="absolute inset-0 bg-[#0A2540] bg-opacity-80 shadow-md"></div>
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f5f5f5]">ZeroBalance</div>
          <div>
            <Link to="/auth" className="text-white hover:text-[#26A69A] px-4 py-2 transition-colors duration-200">
              Log in
            </Link>
            <Link 
              to="/auth" 
              className="ml-4 bg-[#26A69A] hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Join Beta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-screen bg-[#0A2540] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjMTAyQzRDIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDIwIGgyMCB2MjAgaC0yMCB6TTIwIDAgaDIwIHYyMCBoLTIwIHoiLz48L2c+PC9zdmc+')] opacity-30 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block shadow-[0_0_15px_rgba(38,166,154,0.3)] animate-pulse backdrop-blur-sm">
              Now in Beta
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f5f5f5]">
              Eliminate Debt <span className="bg-gradient-to-r from-[#26A69A] to-[#4dd0c2] bg-clip-text text-transparent inline-block">Faster</span> with<br />AI-Powered Planning
            </h1>
            <p className="text-2xl font-medium text-transparent bg-gradient-to-r from-[#26A69A] to-[#4dd0c2] bg-clip-text mb-8">Pay smarter. Debt faster.</p>
            <p className="text-xl text-[#F5F5F5] opacity-80 mb-12">
              Smart AI suggests the best time to pay your bills based on your income—helping you become debt-free faster.
            </p>
            
            {/* Primary CTA */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#26A69A] w-full sm:w-96"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#26A69A] to-[#2ed3c3] hover:from-[#2ed3c3] hover:to-[#26A69A] px-8 py-4 rounded-full font-medium transition-all duration-300"
              >
                Join Beta Program
              </button>
            </form>
            
            <div className="text-gray-400 text-sm mb-12">
              Limited spots available. No credit card required.
            </div>

            {/* Beta Features Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-[#102C4C] px-4 py-2 rounded-full text-sm">🎯 Smart Payment Planning</span>
              <span className="bg-[#102C4C] px-4 py-2 rounded-full text-sm">📊 Debt-Free Date Calculator</span>
              <span className="bg-[#102C4C] px-4 py-2 rounded-full text-sm">⚡ AI-Powered Insights</span>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center text-gray-400">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm">Bank-grade security</span>
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">FDIC compliant</span>
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Gradient */}
      <section className="w-screen py-24 bg-gradient-to-b from-[#0A2540] via-[#15325b] to-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0yMCAzMCBDMjQuOTcgMzAgMjkgMjUuOTcgMjkgMjEgQzI5IDE2LjAzIDI0Ljk3IDEyIDIwIDEyIEMxNS4wMyAxMiAxMSAxNi4wMyAxMSAyMSBDMTEgMjUuOTcgMTUuMDMgMzAgMjAgMzAiLz48L2c+PC9zdmc+')] opacity-40 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#26A69A] font-medium text-sm uppercase tracking-wide">How It Works</span>
            <h2 className="text-3xl font-bold mt-2">Get started in three easy steps</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#102C4C] p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="bg-[#26A69A] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enter Your Finances</h3>
              <p className="text-gray-300">Add your income, bills, and debts manually. Bank syncing coming soon!</p>
            </div>
            
            <div className="bg-[#102C4C] p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="bg-[#26A69A] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get AI Insights</h3>
              <p className="text-gray-300">Our AI analyzes your finances and suggests the optimal payment schedule.</p>
            </div>
            
            <div className="bg-[#102C4C] p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="bg-[#26A69A] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-300">Watch your debt decrease with our smart dashboard and progress tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-screen py-24 bg-gradient-to-b from-[#1E3A8A] via-[#1a3377] to-[#0A2540] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSI1MiIgdmlld0JveD0iMCAwIDUyIDUyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGQ9Ik0wIDI2IEMwIDExLjY0IDExLjY0IDAgMjYgMCBDNDAuMzYgMCA1MiAxMS42NCA1MiAyNiBDNTIgNDAuMzYgNDAuMzYgNTIgMjYgNTIgQzExLjY0IDUyIDAgNDAuMzYgMCAyNiBaIE0yNiA2IEMxNC45NSA2IDYgMTQuOTUgNiAyNiBDNiAzNy4wNSAxNC45NSA0NiAyNiA0NiBDMzcuMDUgNDYgNDYgMzcuMDUgNDYgMjYgQzQ2IDE0Ljk1IDM3LjA1IDYgMjYgNiB6Ii8+PC9zdmc+')] opacity-30 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#26A69A] font-medium text-sm uppercase tracking-wide">Benefits</span>
            <h2 className="text-3xl font-bold mt-2">Why Choose ZeroBalance?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#0A2540] p-8 rounded-xl flex items-start relative backdrop-filter backdrop-blur-sm bg-opacity-90 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-[#26A69A] to-[#1d7972] h-10 w-10 rounded-full flex items-center justify-center mr-5 shrink-0 mt-1 shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Smart Payment Planning</h3>
                <p className="text-gray-300">AI suggests which bills to pay first based on due dates and your available income, maximizing your cash flow.</p>
                <span className="inline-block mt-4 text-xs bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-2 py-1 rounded-full">Beta</span>
              </div>
            </div>
            
            <div className="bg-[#0A2540] p-8 rounded-xl flex items-start relative backdrop-filter backdrop-blur-sm bg-opacity-90 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-[#26A69A] to-[#1d7972] h-10 w-10 rounded-full flex items-center justify-center mr-5 shrink-0 mt-1 shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Debt-Free Date Calculator</h3>
                <p className="text-gray-300">See exactly when you'll be debt-free and how different payment strategies affect your timeline.</p>
                <span className="inline-block mt-4 text-xs bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
            
            <div className="bg-[#0A2540] p-8 rounded-xl flex items-start relative backdrop-filter backdrop-blur-sm bg-opacity-90 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-[#26A69A] to-[#1d7972] h-10 w-10 rounded-full flex items-center justify-center mr-5 shrink-0 mt-1 shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Scenario Planning</h3>
                <p className="text-gray-300">Explore "what-if" scenarios to see how extra payments or different strategies impact your debt payoff.</p>
                <span className="inline-block mt-4 text-xs bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
            
            <div className="bg-[#0A2540] p-8 rounded-xl flex items-start relative backdrop-filter backdrop-blur-sm bg-opacity-90 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-[#26A69A] to-[#1d7972] h-10 w-10 rounded-full flex items-center justify-center mr-5 shrink-0 mt-1 shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Smart Alerts</h3>
                <p className="text-gray-300">Get notified about upcoming bills and receive AI-powered suggestions for optimal payment timing.</p>
                <span className="inline-block mt-4 text-xs bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-screen py-24 bg-gradient-to-b from-[#0A2540] to-[#102C4C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48cGF0aCBkPSJNMCAwaDEwdjEwSDB6Ii8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#26A69A] font-medium text-sm uppercase tracking-wide">Pricing</span>
            <h2 className="text-3xl font-bold mt-2">Simple, Transparent Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#102C4C] p-8 rounded-xl flex flex-col h-full backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow">
              <div>
                <div className="text-[#26A69A] font-medium mb-4">Free Tier</div>
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manual tracking
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic AI suggestions
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Debt-free date calculator
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold mb-2">$0 <span className="text-sm font-normal text-gray-400">/month</span></div>
                <div className="invisible text-sm text-[#26A69A] mb-8">Placeholder for alignment</div>
                <button className="w-full bg-[#26A69A] hover:bg-opacity-90 px-8 py-4 rounded-full font-medium transition-all">
                  Get Started
                </button>
              </div>
            </div>

            <div className="bg-[#102C4C] p-8 rounded-xl border-2 border-[#26A69A] flex flex-col h-full backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgba(38,166,154,0.15)] transition-shadow">
              <div>
                <div className="text-[#26A69A] font-medium mb-4">Premium</div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <span className="bg-[#26A69A] bg-opacity-20 text-[#26A69A] px-2 py-1 rounded-full text-xs">Beta Special</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Basic
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI-driven payment automation
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Smart alerts & notifications
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-[#26A69A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced scenario planning
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold mb-2">$9.99 <span className="text-sm font-normal text-gray-400">/month</span></div>
                <div className="text-sm text-[#26A69A] mb-8">50% off for beta users - normally $19.99/mo</div>
                <button className="w-full bg-gradient-to-r from-[#26A69A] to-[#2ed3c3] hover:from-[#2ed3c3] hover:to-[#26A69A] px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                  Join Beta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-screen py-24 bg-gradient-to-b from-[#102C4C] via-[#15325b] to-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDQiPjxwYXRoIGQ9Ik0yMCAwIEMyMCAxMSA5IDIwIDAgMjAgQzAgOSAxMSAwIDIwIDAiLz48cGF0aCBkPSJNNDAgMjAgQzQwIDkgMjkgMCAyMCAwIEMyMCAxMSAzMSAyMCA0MCAyMCIvPjxwYXRoIGQ9Ik0yMCA0MCBDOSA0MCAwIDI5IDAgMjAgQzExIDIwIDIwIDMxIDIwIDQwIi8+PHBhdGggZD0iTTQwIDIwIEM0MCAzMSAzMSA0MCAyMCA0MCBDMjAgMjkgMjkgMjAgNDAgMjAiLz48L2c+PC9zdmc+')] opacity-30 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Be One of Our First Users</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our beta program and help shape the future of debt management. Limited spots available.
            </p>
            
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#26A69A] w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#26A69A] to-[#2ed3c3] hover:from-[#2ed3c3] hover:to-[#26A69A] px-8 py-4 rounded-full font-medium transition-all duration-300"
                >
                  Join Beta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="w-screen py-16 bg-gradient-to-b from-[#1E3A8A] to-[#0A2540] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48cGF0aCBkPSJNMCAwaDEwdjEwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-30 mix-blend-soft-light"></div>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#26A69A] font-medium text-sm uppercase tracking-wide">Beta Program</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">Help Shape the Future</h2>
            <p className="text-gray-300 mb-8">
              As a beta user, you'll get:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-[#102C4C] p-6 rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow">
                <div className="text-[#26A69A] text-2xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Early Access</h3>
                <p className="text-sm text-gray-400">Be among the first to try new features</p>
              </div>
              <div className="bg-[#102C4C] p-6 rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow">
                <div className="text-[#26A69A] text-2xl mb-4">💎</div>
                <h3 className="font-semibold mb-2">50% Lifetime Discount</h3>
                <p className="text-sm text-gray-400">Lock in the beta pricing forever</p>
              </div>
              <div className="bg-[#102C4C] p-6 rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow">
                <div className="text-[#26A69A] text-2xl mb-4">🎤</div>
                <h3 className="font-semibold mb-2">Direct Input</h3>
                <p className="text-sm text-gray-400">Your feedback shapes our roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-screen py-12 bg-gradient-to-b from-[#0A2540] to-[#071b30] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjMTAyQzRDIiBmaWxsLW9wYWNpdHk9IjAuMDQiPjxwYXRoIGQ9Ik0wIDBoNXY1SDB6TTEwIDBoNXY1SDEwek0yMCAwaDV2NUgyMHpNMzAgMGg1djVIMzB6TTUgNWg1djVINXpNMTUgNWg1djVIMTV6TTI1IDVoNXY1SDI1ek0zNSA1aDV2NUgzNXpNMCAxMGg1djVIMHpNMTAgMTBoNXY1SDEwek0yMCAxMGg1djVIMjB6TTMwIDEwaDV2NUgzMHpNNSAxNWg1djVINXpNMTUgMTVoNXY1SDE1ek0yNSAxNWg1djVIMjV6TTM1IDE1aDV2NUgzNXoiLz48L2c+PC9zdmc+')] opacity-30 mix-blend-soft-light"></div>
        <div className="border-b border-gray-800 pb-8 mb-8">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f5f5f5]">ZeroBalance</div>
                <p className="text-gray-400 max-w-md">
                  We're building the future of debt management with AI-powered insights and smart payment scheduling.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ZeroBalance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#26A69A] transition-colors duration-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 