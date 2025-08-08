import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, FileText, Clock, Star } from "lucide-react";

const tips = [
  {
    icon: Target,
    title: "Be Specific",
    description: "Mention specific skills, experiences, or achievements that match the job requirements."
  },
  {
    icon: Users,
    title: "Research the Company",
    description: "Show that you've done your homework by mentioning company values or recent news."
  },
  {
    icon: FileText,
    title: "Keep It Concise",
    description: "Aim for 3-4 short paragraphs. Busy hiring managers appreciate brevity."
  },
  {
    icon: Clock,
    title: "Follow Up Appropriately",
    description: "Wait 1-2 weeks after sending before following up, unless they specify a timeline."
  },
  {
    icon: CheckCircle,
    title: "Proofread Carefully",
    description: "Check for typos, grammar errors, and ensure names and company details are correct."
  },
  {
    icon: Star,
    title: "Stand Out Professionally",
    description: "Use a professional email address and include relevant links (portfolio, LinkedIn)."
  }
];

export default function Tips() {
  return (
    <section className="bg-gradient-to-br from-muted/30 to-blue-50 dark:from-muted/10 dark:to-blue-950/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Email Writing Tips
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground">
            Follow these professional guidelines to make your emails more effective
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <Card key={index} className="border border-border bg-card/80 backdrop-blur-sm hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                      <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-3xl mx-auto">
            <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">💡 Pro Tip</h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed opacity-90">
                Customize the generated email template with specific details about your experience 
                and achievements. The AI provides a great foundation, but personal touches make all the difference!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Tips Grid */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm sm:text-base font-semibold text-card-foreground mb-1">Perfect Grammar</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Always proofread before sending</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm sm:text-base font-semibold text-card-foreground mb-1">Quick Response</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Apply within 48 hours</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm sm:text-base font-semibold text-card-foreground mb-1">Be Relevant</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Match job requirements</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm sm:text-base font-semibold text-card-foreground mb-1">Stand Out</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Show your unique value</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}