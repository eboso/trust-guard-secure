import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ThreatMonitor } from "@/components/dashboard/ThreatMonitor";
import { SecurityAnalytics } from "@/components/dashboard/SecurityAnalytics";
import { SystemStatus } from "@/components/dashboard/SystemStatus";

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        
        <main className="container mx-auto px-6 py-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time monitoring and threat detection for mobile banking security
            </p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ThreatMonitor />
            <SystemStatus />
          </div>

          <SecurityAnalytics />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
