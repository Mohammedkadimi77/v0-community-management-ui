"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Video,
  FileText,
  Lightbulb,
  Rocket,
  Shield,
  CreditCard
} from "lucide-react"

const helpCategories = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Learn the basics of SocialHub AI",
    articles: 12,
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Create and schedule posts",
    articles: 18,
  },
  {
    icon: Lightbulb,
    title: "AI Features",
    description: "Using AI to enhance content",
    articles: 8,
  },
  {
    icon: Shield,
    title: "Account & Security",
    description: "Manage your account settings",
    articles: 10,
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description: "Subscription and payments",
    articles: 6,
  },
  {
    icon: BookOpen,
    title: "API Documentation",
    description: "Developer resources",
    articles: 15,
  },
]

const faqs = [
  {
    question: "How do I connect my social media accounts?",
    answer: "To connect your social media accounts, go to the Accounts page and click on 'Connect' next to the platform you want to add. You'll be redirected to the platform's authorization page where you can grant access to SocialHub AI.",
  },
  {
    question: "What are the best times to post?",
    answer: "The best times to post vary by platform and audience. Our AI analyzes your followers' activity patterns and provides personalized recommendations in the Analytics section. Generally, weekday mornings and early afternoons tend to have higher engagement.",
  },
  {
    question: "How does the AI content generation work?",
    answer: "Our AI uses advanced language models to generate content based on your input. You can provide a topic, tone, or existing text, and the AI will create or enhance content accordingly. All generated content is original and tailored to your brand voice.",
  },
  {
    question: "Can I schedule posts across multiple platforms at once?",
    answer: "Yes! When creating a post, you can select multiple platforms to publish to simultaneously. Each post will be optimized for the selected platforms, including character limits and hashtag recommendations.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "To cancel your subscription, go to Settings > Billing and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period. You can reactivate your subscription at any time.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and never share your data with third parties. You can enable two-factor authentication for additional protection.",
  },
]

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers, tutorials, and resources to help you get the most out of SocialHub AI.
          </p>
        </div>

        {/* Search */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="py-8">
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles, tutorials, FAQs..."
                  className="h-12 pl-12 text-base"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category) => (
              <Card
                key={category.title}
                className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="mt-1 text-xs text-primary">{category.articles} articles</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Chat with our support team in real-time.
              </p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Send us an email and we&apos;ll respond within 24 hours.
              </p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Video Tutorials</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Watch step-by-step guides and tutorials.
              </p>
              <Button variant="outline" className="w-full">Watch Videos</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
