
import React from 'react';
import { 
  Mic, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  Navigation,
  Accessibility,
  TrendingDown,
  Clock,
  Layers,
  Search,
  MessageSquare,
  Volume2
} from 'lucide-react';
import { PricingTier, Feature, Stat, Testimonial } from './types';

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/ 30 days",
    description: "Perfect for evaluating VocalizeWeb on small projects.",
    features: [
      "500 queries/month",
      "1 website integration",
      "Basic analytics",
      "Email support",
      "Standard voice models"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Professional",
    price: "$299",
    period: "/ month",
    description: "Ideal for growing businesses and university departments.",
    features: [
      "10,000 queries/month",
      "3 website integrations",
      "Advanced dashboard",
      "Priority support",
      "Custom knowledge base",
      "Multi-language support"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    description: "Full-scale solutions for large institutions.",
    features: [
      "Unlimited queries",
      "Unlimited integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom AI training",
      "White-label options"
    ],
    cta: "Contact Sales"
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Mic className="w-6 h-6 text-blue-600" />,
    title: "True Voice-to-Voice",
    description: "A full conversational experience—users hear intelligent, human-like responses instead of just reading text."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Real-Time Performance",
    description: "Industry-leading latency of 5-10 seconds for natural, fluid interactions that don't leave users waiting."
  },
  {
    icon: <Navigation className="w-6 h-6 text-blue-600" />,
    title: "Intelligent Navigation",
    description: "The assistant can automatically scroll to and highlight relevant page sections based on user conversation."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant, Azure-powered infrastructure ensuring your data and user privacy are always protected."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "Analytics Dashboard",
    description: "Gain deep insights into user needs with sentiment analysis, query tracking, and conversion metrics."
  },
  {
    icon: <Layers className="w-6 h-6 text-blue-600" />,
    title: "Easy Integration",
    description: "Add one line of JavaScript to your site and go live in minutes. No complex backend setup required."
  }
];

export const STATS: Stat[] = [
  { value: "8.4B", label: "Voice-enabled devices by 2028", source: "Juniper Research" },
  { value: "3x", label: "Faster than typing on mobile", source: "Stanford University" },
  { value: "763M", label: "Adults needing voice accessibility", source: "Global Literacy Report" },
  { value: "50%+", label: "Enterprises investing in voice tech", source: "Gartner" }
];

export const SOLUTION_STEPS = [
  { icon: <Mic />, title: "User Speaks", desc: "Natural voice query" },
  { icon: <Layers />, title: "Whisper AI", desc: "Speech-to-text" },
  { icon: <Search />, title: "RAG Pipeline", desc: "Knowledge retrieval" },
  { icon: <Cpu />, title: "AI Reasoning", desc: "GPT/Claude generation" },
  { icon: <Volume2 />, title: "Voice Out", desc: "Natural synthesis" }
];

export const PROBLEM_CARDS = [
  {
    icon: <Accessibility className="w-10 h-10 text-orange-500" />,
    title: "Limited Accessibility",
    desc: "Over 1.3 billion people with disabilities struggle with text-heavy, complex digital interfaces."
  },
  {
    icon: <TrendingDown className="w-10 h-10 text-orange-500" />,
    title: "Poor Engagement",
    desc: "Static chatbots and legacy forms create friction, leading to a 40% reduction in user conversion."
  },
  {
    icon: <Clock className="w-10 h-10 text-orange-500" />,
    title: "Hidden Inefficiency",
    desc: "Typing is slow and frustrating. Voice interaction allows users to find answers 3x faster than typing."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "VocalizeWeb has transformed how our students interact with our campus portal. Accessibility is no longer an afterthought—it's at the core of our digital experience.",
    author: "Dr. Sarah Jenkins",
    role: "CIO",
    company: "Standard University",
    image: "https://picsum.photos/seed/jenkins/100/100"
  },
  {
    quote: "Integrating voice into our e-commerce flow reduced support tickets by 35%. Our customers love the 'speak-and-find' simplicity.",
    author: "Mark Thompson",
    role: "VP of Product",
    company: "RetailFlow Corp",
    image: "https://picsum.photos/seed/thompson/100/100"
  }
];
