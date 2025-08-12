import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Shield, User, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TrustGuard
              </h1>
              <p className="text-xs text-muted-foreground">Security Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
              3
            </Badge>
          </div>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 pl-4 border-l">
            <div className="text-right">
              <p className="text-sm font-medium">Security Admin</p>
              <p className="text-xs text-muted-foreground">admin@bank.co.ke</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};