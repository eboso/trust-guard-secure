import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const SecurityAnalytics = () => {
  const threatsByHour = [
    { hour: '00:00', threats: 2 },
    { hour: '04:00', threats: 1 },
    { hour: '08:00', threats: 8 },
    { hour: '12:00', threats: 15 },
    { hour: '16:00', threats: 12 },
    { hour: '20:00', threats: 6 },
  ];

  const threatTypes = [
    { name: 'IP Spoofing', value: 35, color: '#ef4444' },
    { name: 'SIM Swap', value: 25, color: '#f97316' },
    { name: 'Device Anomaly', value: 20, color: '#eab308' },
    { name: 'Behavioral', value: 15, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#3b82f6' },
  ];

  const detectionRate = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 94 },
    { month: 'Mar', rate: 96 },
    { month: 'Apr', rate: 95 },
    { month: 'May', rate: 97 },
    { month: 'Jun', rate: 98 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Threats by Hour (Today)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={threatsByHour}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="hour" fontSize={12} />
              <YAxis fontSize={12} />
              <Bar dataKey="threats" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Threat Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={threatTypes}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {threatTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {threatTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-muted-foreground">{type.name}</span>
                <span className="font-medium">{type.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Detection Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={detectionRate}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis domain={[90, 100]} fontSize={12} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};