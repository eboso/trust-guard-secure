-- Create comprehensive security backend tables

-- Table for threat incidents
CREATE TABLE public.threat_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  threat_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'false_positive')),
  user_email TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Table for security analytics data
CREATE TABLE public.security_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  threat_count INTEGER NOT NULL DEFAULT 0,
  detection_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  threat_types JSONB,
  hourly_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for system status monitoring
CREATE TABLE public.system_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('operational', 'degraded', 'maintenance', 'down')),
  uptime_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  last_check TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for dashboard statistics
CREATE TABLE public.dashboard_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stat_type TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  change_description TEXT,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for user sessions tracking
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  location TEXT,
  is_protected BOOLEAN DEFAULT true,
  threat_score INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.threat_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for threat_incidents
CREATE POLICY "Users can view their own threat incidents" 
ON public.threat_incidents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own threat incidents" 
ON public.threat_incidents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threat incidents" 
ON public.threat_incidents 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for security_analytics
CREATE POLICY "Users can view their own analytics" 
ON public.security_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analytics" 
ON public.security_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for system_status (public read, restricted write)
CREATE POLICY "Users can view system status" 
ON public.system_status 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can modify system status" 
ON public.system_status 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for dashboard_stats
CREATE POLICY "Users can view their own stats" 
ON public.dashboard_stats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stats" 
ON public.dashboard_stats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_sessions
CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.user_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_threat_incidents_user_id ON public.threat_incidents(user_id);
CREATE INDEX idx_threat_incidents_severity ON public.threat_incidents(severity);
CREATE INDEX idx_threat_incidents_status ON public.threat_incidents(status);
CREATE INDEX idx_threat_incidents_created_at ON public.threat_incidents(created_at);

CREATE INDEX idx_security_analytics_user_id ON public.security_analytics(user_id);
CREATE INDEX idx_security_analytics_timestamp ON public.security_analytics(timestamp);

CREATE INDEX idx_system_status_service_name ON public.system_status(service_name);
CREATE INDEX idx_system_status_status ON public.system_status(status);

CREATE INDEX idx_dashboard_stats_user_id ON public.dashboard_stats(user_id);
CREATE INDEX idx_dashboard_stats_type ON public.dashboard_stats(stat_type);

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_started_at ON public.user_sessions(started_at);

-- Add update triggers for updated_at columns
CREATE TRIGGER update_threat_incidents_updated_at
BEFORE UPDATE ON public.threat_incidents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_status_updated_at
BEFORE UPDATE ON public.system_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system status data
INSERT INTO public.system_status (service_name, status, uptime_percentage) VALUES
('Authentication Service', 'operational', 99.9),
('Threat Detection Engine', 'operational', 99.8),
('ML Analytics Service', 'degraded', 98.5),
('Database Cluster', 'operational', 100.0),
('API Gateway', 'operational', 99.7),
('Mobile App Integration', 'maintenance', 0.0);