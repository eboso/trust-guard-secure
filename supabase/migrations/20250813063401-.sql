-- Insert sample threat incidents
INSERT INTO public.threat_incidents (
  incident_id, threat_type, severity, status, user_email, location, description, score, metadata, user_id
) VALUES 
  ('INC-2024-001', 'malware', 'high', 'active', 'user@example.com', 'New York, USA', 'Suspicious file execution detected on workstation WS-001', 85, '{"source_ip": "192.168.1.100", "affected_systems": ["WS-001"], "detection_method": "behavioral_analysis"}', auth.uid()),
  ('INC-2024-002', 'phishing', 'medium', 'investigating', 'user@example.com', 'London, UK', 'Phishing email campaign targeting finance team', 65, '{"email_count": 15, "clicked_links": 3, "domains": ["fake-bank.com"]}', auth.uid()),
  ('INC-2024-003', 'ddos', 'critical', 'resolved', 'user@example.com', 'Tokyo, Japan', 'Distributed denial of service attack on main servers', 95, '{"peak_requests": 100000, "duration_minutes": 45, "blocked_ips": 2500}', auth.uid()),
  ('INC-2024-004', 'unauthorized_access', 'high', 'active', 'user@example.com', 'Berlin, Germany', 'Multiple failed login attempts from suspicious IP', 78, '{"failed_attempts": 50, "source_ip": "203.0.113.45", "target_accounts": ["admin", "root"]}', auth.uid()),
  ('INC-2024-005', 'data_breach', 'critical', 'investigating', 'user@example.com', 'Sydney, Australia', 'Potential data exfiltration detected', 92, '{"data_volume_gb": 2.5, "classification": "confidential", "access_time": "2024-01-15T14:30:00Z"}', auth.uid());

-- Insert sample security analytics
INSERT INTO public.security_analytics (
  threat_count, detection_rate, threat_types, hourly_data, user_id
) VALUES 
  (25, 87.5, '{"malware": 8, "phishing": 6, "ddos": 3, "unauthorized_access": 5, "data_breach": 3}', 
   '[{"hour": 0, "threats": 2, "blocked": 2}, {"hour": 1, "threats": 1, "blocked": 1}, {"hour": 2, "threats": 0, "blocked": 0}, {"hour": 3, "threats": 3, "blocked": 2}, {"hour": 4, "threats": 1, "blocked": 1}, {"hour": 5, "threats": 2, "blocked": 2}, {"hour": 6, "threats": 4, "blocked": 3}, {"hour": 7, "threats": 3, "blocked": 3}, {"hour": 8, "threats": 5, "blocked": 4}, {"hour": 9, "threats": 2, "blocked": 2}, {"hour": 10, "threats": 1, "blocked": 1}, {"hour": 11, "threats": 1, "blocked": 0}]', 
   auth.uid()),
  (18, 94.4, '{"malware": 5, "phishing": 8, "unauthorized_access": 3, "data_breach": 2}', 
   '[{"hour": 0, "threats": 1, "blocked": 1}, {"hour": 1, "threats": 2, "blocked": 2}, {"hour": 2, "threats": 1, "blocked": 1}, {"hour": 3, "threats": 0, "blocked": 0}, {"hour": 4, "threats": 3, "blocked": 3}, {"hour": 5, "threats": 2, "blocked": 2}, {"hour": 6, "threats": 1, "blocked": 1}, {"hour": 7, "threats": 2, "blocked": 1}, {"hour": 8, "threats": 3, "blocked": 3}, {"hour": 9, "threats": 2, "blocked": 2}, {"hour": 10, "threats": 1, "blocked": 1}, {"hour": 11, "threats": 0, "blocked": 0}]', 
   auth.uid());

-- Insert sample dashboard stats
INSERT INTO public.dashboard_stats (
  stat_type, stat_value, change_description, metadata, user_id
) VALUES 
  ('active_threats', '12', '+3 from yesterday', '{"trend": "increasing", "severity_breakdown": {"critical": 2, "high": 4, "medium": 6}}', auth.uid()),
  ('detection_rate', '94.2%', '+2.1% from last week', '{"previous_rate": 92.1, "improvement_factors": ["updated_rules", "ml_enhancement"]}', auth.uid()),
  ('system_uptime', '99.97%', 'Stable', '{"downtime_minutes": 2.16, "sla_target": 99.9}', auth.uid()),
  ('protected_endpoints', '847', '+15 new endpoints', '{"new_apis": 12, "new_services": 3, "total_monitored": 847}', auth.uid()),
  ('blocked_attacks', '2,847', '+156 in last 24h', '{"attack_types": {"ddos": 45, "injection": 67, "xss": 44}}', auth.uid()),
  ('security_score', '9.2/10', '+0.3 improvement', '{"factors": {"patch_level": 9.5, "config_score": 8.9, "monitoring": 9.3}}', auth.uid());

-- Insert sample user sessions
INSERT INTO public.user_sessions (
  session_id, ip_address, user_agent, location, threat_score, is_protected, user_id
) VALUES 
  ('sess_2024_001', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'New York, USA', 15, true, auth.uid()),
  ('sess_2024_002', '10.0.0.50', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'San Francisco, USA', 8, true, auth.uid()),
  ('sess_2024_003', '172.16.0.25', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', 'London, UK', 22, true, auth.uid()),
  ('sess_2024_004', '203.0.113.45', 'curl/7.68.0', 'Unknown', 85, false, auth.uid()),
  ('sess_2024_005', '192.168.1.200', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'Chicago, USA', 12, true, auth.uid());