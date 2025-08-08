import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Zap, Award, Globe, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Trusted by Millions",
    description: "Join over 2.5 million professionals worldwide who trust Letterm8 for their email needs"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional emails in under 10 seconds with our advanced AI technology"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays secure. We don't store your job descriptions or generated emails"
  },
  {
    icon: Award,
    title: "Professional Quality",
    description: "AI-crafted emails that match industry standards and hiring manager expectations"
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Used by job seekers, students, and professionals in over 150 countries"
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Generate emails anytime, anywhere. No registration or subscription required"
  }
];

export default function WhyChoose() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why Choose Letterm8?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground">
            Trusted by millions worldwide. Join our community of users who've simplified their email writing.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border border-border bg-card hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-2 sm:p-3">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">2.5M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Users Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">150+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">10M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Emails Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">99%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}