// Supervisor Dashboard

import { useApp } from '../context/AppContext';
import { mockTickets, mockUsers, calculateTeamPerformance } from '../data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Users, TrendingUp, AlertCircle, CheckCircle2, 
  ArrowUpCircle, UserCheck, Clock, Target 
} from 'lucide-react';

export default function SupervisorDashboard() {
  const { currentUser } = useApp();

  // Supervisor sees all tickets in their department
  const departmentTickets = mockTickets.filter(t => t.department === currentUser.department);
  const teamMembers = mockUsers.filter(u => 
    (u.role === 'Support Agent' || u.role === 'Field Engineer') && 
    u.department === currentUser.department
  );
  
  const activeTickets = departmentTickets.filter(t => !['Closed', 'Auto-Resolved'].includes(t.status));
  const escalatedTickets = departmentTickets.filter(t => t.status === 'Escalated');
  const slaAtRisk = departmentTickets.filter(t => t.slaStatus === 'At Risk');
  const slaBreached = departmentTickets.filter(t => t.slaStatus === 'Breached');

  const teamPerformance = calculateTeamPerformance(departmentTickets);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] text-white rounded-lg p-6 shadow-lg border-l-4 border-[#1F7A3A]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
            <p className="text-white/90 mt-1">سپروائزر ڈیش بورڈ • Team Management</p>
            <p className="text-sm text-white/70 mt-1">
              {currentUser.name} • {currentUser.department} Department
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/80">Team Size</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/80">Active Cases</p>
              <p className="text-2xl font-bold">{activeTickets.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Members</p>
                <p className="text-2xl font-bold text-[#01411C]">{teamMembers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Escalated Cases</p>
                <p className="text-2xl font-bold text-[#FFC107]">{escalatedTickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <ArrowUpCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">SLA At Risk</p>
                <p className="text-2xl font-bold text-[#DC3545]">{slaAtRisk.length + slaBreached.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">SLA Compliance</p>
                <p className="text-2xl font-bold text-[#28A745]">92%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="team" className="space-y-4">
        <TabsList className="bg-[#DFF5E1]">
          <TabsTrigger value="team" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Team Performance
          </TabsTrigger>
          <TabsTrigger value="escalated" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Escalated ({escalatedTickets.length})
          </TabsTrigger>
          <TabsTrigger value="workload" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Workload Distribution
          </TabsTrigger>
          <TabsTrigger value="sla" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            SLA Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Team Performance Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Team Member Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map(member => {
                  const performance = teamPerformance.find(p => p.agentId === member.id);
                  const memberTickets = mockTickets.filter(t => t.assignedTo?.id === member.id);
                  const activeCount = memberTickets.filter(t => !['Closed', 'Auto-Resolved'].includes(t.status)).length;

                  return (
                    <div key={member.id} className="p-4 border border-[#01411C]/20 rounded-lg bg-gradient-to-r from-white to-[#DFF5E1]/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#01411C] rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#01411C]">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#01411C]">{activeCount}</p>
                            <p className="text-xs text-gray-500">Active</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#28A745]">{performance?.resolvedTickets || 0}</p>
                            <p className="text-xs text-gray-500">Resolved</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#FFC107]">{performance?.avgResolutionTime || 0}h</p>
                            <p className="text-xs text-gray-500">Avg Time</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-[#01411C]/30">
                          View Details
                        </Button>
                      </div>
                      
                      {/* SLA Compliance Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (performance?.slaCompliance || 0) >= 90 ? 'bg-green-500' :
                            (performance?.slaCompliance || 0) >= 75 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${performance?.slaCompliance || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">SLA Compliance: {performance?.slaCompliance || 0}%</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escalated Cases Tab */}
        <TabsContent value="escalated" className="space-y-4">
          {escalatedTickets.length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#28A745] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#01411C] mb-2">No Escalated Cases</h3>
                <p className="text-gray-600">Your team is handling all cases within their capacity.</p>
              </CardContent>
            </Card>
          ) : (
            escalatedTickets.map(ticket => (
              <Card key={ticket.id} className="border-red-300 bg-red-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-red-500 text-red-700 bg-red-100">
                          ESCALATED
                        </Badge>
                        <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                        <Badge 
                          variant="outline"
                          className="border-red-600 text-red-700"
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-[#01411C] mb-2">{ticket.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{ticket.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div>Assigned to: <span className="font-medium text-[#01411C]">{ticket.assignedTo?.name}</span></div>
                        <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-[#01411C] hover:bg-[#0B5D1E]">
                        Reassign
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#01411C]/30">
                        Review
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                        Approve Closure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Workload Distribution Tab */}
        <TabsContent value="workload">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Team Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map(member => {
                  const memberTickets = mockTickets.filter(t => t.assignedTo?.id === member.id);
                  const activeCount = memberTickets.filter(t => !['Closed', 'Auto-Resolved'].includes(t.status)).length;
                  const maxWorkload = 15;
                  const workloadPercent = (activeCount / maxWorkload) * 100;

                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#01411C]">{member.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{activeCount} / {maxWorkload} cases</span>
                          <Badge 
                            variant="outline"
                            className={
                              workloadPercent >= 80 ? 'border-red-500 text-red-700' :
                              workloadPercent >= 60 ? 'border-yellow-500 text-yellow-700' :
                              'border-green-500 text-green-700'
                            }
                          >
                            {Math.round(workloadPercent)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            workloadPercent >= 80 ? 'bg-red-500' :
                            workloadPercent >= 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(workloadPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLA Monitoring Tab */}
        <TabsContent value="sla">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">SLA Risk Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...slaAtRisk, ...departmentTickets.filter(t => t.slaStatus === 'Breached')].map(ticket => (
                  <div 
                    key={ticket.id}
                    className={`p-4 rounded-lg border-2 ${
                      ticket.slaStatus === 'Breached' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-orange-500 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{ticket.id}</span>
                          <Badge 
                            variant="outline"
                            className={
                              ticket.slaStatus === 'Breached'
                                ? 'border-red-600 text-red-700 bg-red-100'
                                : 'border-orange-600 text-orange-700 bg-orange-100'
                            }
                          >
                            {ticket.slaStatus}
                          </Badge>
                        </div>
                        <p className="font-semibold text-gray-900">{ticket.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Assigned to: {ticket.assignedTo?.name || 'Unassigned'}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        className={
                          ticket.slaStatus === 'Breached'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-orange-600 hover:bg-orange-700'
                        }
                      >
                        Escalate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
