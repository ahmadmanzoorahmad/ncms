// Support Agent Dashboard

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockTickets } from '../data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SLATimer } from '../components/SLATimer';
import { 
  Briefcase, Clock, CheckCircle2, AlertTriangle, 
  MessageSquare, Upload, Bot, TrendingUp 
} from 'lucide-react';

export default function AgentDashboard() {
  const { currentUser } = useApp();

  // Agent sees only their assigned tickets
  const myTickets = mockTickets.filter(t => t.assignedTo?.id === currentUser.id);
  const activeTickets = myTickets.filter(t => !['Closed', 'Auto-Resolved', 'Resolved'].includes(t.status));
  const resolvedTickets = myTickets.filter(t => ['Resolved', 'Closed'].includes(t.status));
  const slaAtRisk = myTickets.filter(t => t.slaStatus === 'At Risk');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] text-white rounded-lg p-6 shadow-lg border-l-4 border-[#1F7A3A]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Agent Dashboard</h1>
            <p className="text-white/90 mt-1">ایجنٹ ڈیش بورڈ • My Assigned Cases</p>
            <p className="text-sm text-white/70 mt-1">Logged in as: {currentUser.name} • {currentUser.department}</p>
          </div>
          <div className="flex items-center gap-3">
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
                <p className="text-sm text-gray-600 mb-1">My Active Cases</p>
                <p className="text-2xl font-bold text-[#01411C]">{activeTickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved This Week</p>
                <p className="text-2xl font-bold text-[#28A745]">{resolvedTickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">SLA At Risk</p>
                <p className="text-2xl font-bold text-[#FFC107]">{slaAtRisk.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Resolution</p>
                <p className="text-2xl font-bold text-[#01411C]">18.5h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-[#DFF5E1]">
          <TabsTrigger value="active" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Active Cases ({activeTickets.length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Resolved ({resolvedTickets.length})
          </TabsTrigger>
          <TabsTrigger value="priority" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Priority Queue
          </TabsTrigger>
        </TabsList>

        {/* Active Cases Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeTickets.length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#01411C] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#01411C] mb-2">All Caught Up!</h3>
                <p className="text-gray-600">You have no active cases assigned at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            activeTickets.map(ticket => (
              <Card key={ticket.id} className="border-[#01411C]/20 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{ticket.id}</span>
                        <Badge 
                          variant="outline"
                          className={
                            ticket.priority === 'Critical' ? 'border-red-500 text-red-700 bg-red-50' :
                            ticket.priority === 'High' ? 'border-orange-500 text-orange-700 bg-orange-50' :
                            'border-blue-500 text-blue-700 bg-blue-50'
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline" className="border-[#01411C] text-[#01411C] bg-[#DFF5E1]">
                          {ticket.status}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-[#01411C] mb-2">{ticket.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{ticket.description}</p>
                      
                      {/* AI Suggestion */}
                      {ticket.aiSuggestion && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <Bot className="w-4 h-4 text-purple-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-purple-700 mb-1">
                                AI Suggestion (Confidence: {ticket.aiConfidence}%)
                              </p>
                              <p className="text-sm text-purple-900">{ticket.aiSuggestion}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLA Timer */}
                      <SLATimer 
                        deadline={ticket.slaDeadline} 
                        slaStatus={ticket.slaStatus}
                      />

                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                        <div>Submitted by: <span className="font-medium text-[#01411C]">{ticket.createdBy.name}</span></div>
                        <div>Category: <span className="font-medium text-[#01411C]">{ticket.category}</span></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-[#01411C] hover:bg-[#0B5D1E]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#01411C]/30">
                        <Upload className="w-4 h-4 mr-2" />
                        Attach
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Resolved Cases Tab */}
        <TabsContent value="resolved" className="space-y-4">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Recently Resolved Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resolvedTickets.map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-[#01411C]">{ticket.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Resolved {ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Priority Queue Tab */}
        <TabsContent value="priority">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Priority Cases Requiring Attention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeTickets
                  .filter(t => t.priority === 'Critical' || t.priority === 'High')
                  .sort((a, b) => {
                    if (a.priority === 'Critical' && b.priority !== 'Critical') return -1;
                    if (b.priority === 'Critical' && a.priority !== 'Critical') return 1;
                    return 0;
                  })
                  .map(ticket => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="font-mono text-sm text-gray-700">{ticket.id}</span>
                          <Badge variant="outline" className="border-red-500 text-red-700">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="font-semibold text-gray-900">{ticket.title}</p>
                        <SLATimer 
                          deadline={ticket.slaDeadline} 
                          slaStatus={ticket.slaStatus}
                          compact
                        />
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Take Action
                      </Button>
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
