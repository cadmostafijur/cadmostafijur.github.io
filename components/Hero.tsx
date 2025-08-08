import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-100/[0.03] dark:bg-grid-slate-800/[0.03] bg-[size:20px_20px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Email Generation</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Letterm8
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Transform job descriptions into compelling, professional emails in seconds. 
            Choose your tone, paste the description, and let AI craft the perfect application email.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700"
            >
              <Mail className="mr-2 h-5 w-5" />
              Generate Email
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 p-3">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Professional Emails</h3>
              <p className="mt-2 text-muted-foreground">Craft emails that stand out and get results</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 p-3">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Multiple Tones</h3>
              <p className="mt-2 text-muted-foreground">Choose from formal, friendly, persuasive, or academic styles</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Instant Results</h3>
              <p className="mt-2 text-muted-foreground">Get your email ready in seconds, not hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}