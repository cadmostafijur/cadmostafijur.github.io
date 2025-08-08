import { Card, CardContent } from "@/components/ui/card";
import { FileText, Settings, Wand2, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Paste Job Description",
    description: "Copy and paste the job posting or scholarship description into our secure text area"
  },
  {
    step: "02",
    icon: Settings,
    title: "Choose Your Tone",
    description: "Select from Formal, Friendly, Persuasive, or Academic tone to match your needs"
  },
  {
    step: "03",
    icon: Wand2,
    title: "Generate Email",
    description: "Our AI analyzes the description and crafts a professional, personalized email"
  },
  {
    step: "04",
    icon: Download,
    title: "Copy & Send",
    description: "Review, copy, or download your email. Make final edits and send with confidence"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How Letterm8 Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground">
            Generate professional emails in four simple steps
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection Line - Only show on larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 transform translate-x-4 -translate-y-1/2 z-0" />
                  )}
                  
                  <Card className="relative border border-border bg-card hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 z-10 h-full">
                    <CardContent className="p-6 sm:p-8 text-center flex flex-col h-full">
                      {/* Step Number */}
                      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-bold">
                          {step.step}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mt-3 sm:mt-4">
                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-3 sm:mb-4">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white mx-auto max-w-2xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h3>
              <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-4 sm:mb-6">
                Join millions of professionals who trust Letterm8 for their email needs
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => {
                    const emailSection = document.querySelector('[data-email-generator]');
                    emailSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  Generate Your First Email
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Features */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">⚡ Lightning Fast</div>
              <div className="text-sm sm:text-base text-muted-foreground">Generate emails in under 10 seconds</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">🎯 Personalized</div>
              <div className="text-sm sm:text-base text-muted-foreground">Tailored to each job description</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border sm:col-span-2 lg:col-span-1">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">🔒 Secure</div>
              <div className="text-sm sm:text-base text-muted-foreground">Your data is never stored</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}