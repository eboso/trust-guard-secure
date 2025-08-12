import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Users, Activity } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Active Threats",
      value: "12",
      change: "+3 from yesterday",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Protected Sessions",
      value: "8,547",
      change: "+245 from yesterday",
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+12% this week",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "All systems operational",
      icon: Activity,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 pointer-events-none" />
        </Card>
      ))}
    </div>
  );
};