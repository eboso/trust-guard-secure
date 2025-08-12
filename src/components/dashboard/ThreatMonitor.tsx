import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Clock, User } from "lucide-react";

export const ThreatMonitor = () => {
  const threats = [
    {
      id: "T-001",
      type: "IP Spoofing",
      severity: "critical",
      user: "john.doe@email.com",
      location: "Lagos, Nigeria",
      time: "2 min ago",
      score: 95,
      description: "Impossible travel detected: Login from Nigeria while previous session active in Nairobi"
    },
    {
      id: "T-002", 
      type: "SIM Swap",
      severity: "high",
      user: "mary.smith@email.com",
      location: "Mombasa, Kenya",
      time: "5 min ago",
      score: 88,
      description: "SIM swap event detected from telecom provider webhook"
    },
    {
      id: "T-003",
      type: "Device Anomaly",
      severity: "medium",
      user: "peter.wilson@email.com", 
      location: "Nairobi, Kenya",
      time: "12 min ago",
      score: 72,
      description: "New device fingerprint detected with unusual browser characteristics"
    },
    {
      id: "T-004",
      type: "Behavioral Anomaly",
      severity: "low",
      user: "susan.clark@email.com",
      location: "Nakuru, Kenya",
      time: "25 min ago",
      score: 45,
      description: "Transaction pattern differs from historical behavior profile"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-threat-critical text-white';
      case 'high': return 'bg-threat-high text-white';
      case 'medium': return 'bg-threat-medium text-white';
      case 'low': return 'bg-threat-low text-white';
      default: return 'bg-threat-info text-white';
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2 border-0 shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span>Real-time Threat Monitor</span>
          <Badge variant="destructive" className="ml-auto">
            {threats.filter(t => t.severity === 'critical' || t.severity === 'high').length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-card to-muted/50 border">
            <div className="flex-shrink-0">
              <Badge className={getSeverityColor(threat.severity)}>
                {threat.severity.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  {threat.type} - {threat.id}
                </h4>
                <span className="text-lg font-bold text-primary">
                  {threat.score}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">
                {threat.description}
              </p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{threat.user}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{threat.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{threat.time}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Button size="sm" variant="outline">
                Investigate
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};