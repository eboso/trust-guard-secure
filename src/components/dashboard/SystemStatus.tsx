import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

export const SystemStatus = () => {
  const systems = [
    { name: "Authentication Service", status: "operational", uptime: 99.9 },
    { name: "Threat Detection Engine", status: "operational", uptime: 99.8 },
    { name: "ML Analytics Service", status: "degraded", uptime: 98.5 },
    { name: "Database Cluster", status: "operational", uptime: 100 },
    { name: "API Gateway", status: "operational", uptime: 99.7 },
    { name: "Mobile App Integration", status: "maintenance", uptime: 0 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'degraded': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'maintenance': return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational': return <Badge className="bg-success">Operational</Badge>;
      case 'degraded': return <Badge className="bg-warning">Degraded</Badge>;
      case 'maintenance': return <Badge variant="secondary">Maintenance</Badge>;
      default: return <Badge variant="destructive">Down</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-medium">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systems.map((system, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-card to-muted/30 border">
            <div className="flex items-center space-x-3">
              {getStatusIcon(system.status)}
              <div>
                <p className="font-medium text-sm">{system.name}</p>
                <p className="text-xs text-muted-foreground">
                  Uptime: {system.uptime}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-20">
                <Progress 
                  value={system.uptime} 
                  className="h-2"
                />
              </div>
              {getStatusBadge(system.status)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};