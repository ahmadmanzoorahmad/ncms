// Call Center Officer Dashboard

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockTickets, mockDepartments } from '../data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plus, Search, FileText, AlertCircle, CheckCircle, Users, Phone } from 'lucide-react';

export default function CallCenterDashboard() {
  const { currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Call Center Officers see NEW complaints that need validation
  const newComplaints = mockTickets.filter(t => t.status === 'New');
  const recentComplaints = mockTickets.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] text-white rounded-lg p-6 shadow-lg border-l-4 border-[#1F7A3A]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Call Center Dashboard</h1>
            <p className="text-white/90 mt-1">کال سینٹر ڈیش بورڈ • Complaint Intake Management</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/80">New Complaints</p>
              <p className="text-2xl font-bold">{newComplaints.length}</p>
            </div>
            <Button className="bg-white text-[#01411C] hover:bg-gray-100">
              <Plus className="w-4 h-4 mr-2" />
              Create Complaint
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Submissions</p>
                <p className="text-2xl font-bold text-[#01411C]">{newComplaints.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Validated Today</p>
                <p className="text-2xl font-bold text-[#01411C]">18</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-[#FFC107]">5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Calls Handled</p>
                <p className="text-2xl font-bold text-[#01411C]">47</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="new" className="space-y-4">
        <TabsList className="bg-[#DFF5E1]">
          <TabsTrigger value="new" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            New Complaints ({newComplaints.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Recent Submissions
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Create New
          </TabsTrigger>
        </TabsList>

        {/* New Complaints Tab */}
        <TabsContent value="new" className="space-y-4">
          {/* Search */}
          <Card className="border-[#01411C]/20">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search complaints... (شکایات تلاش کریں)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#01411C]/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Complaint List */}
          <div className="space-y-3">
            {newComplaints.map(ticket => (
              <Card key={ticket.id} className="border-[#01411C]/20 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50">
                          NEW
                        </Badge>
                        <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                        <Badge 
                          variant="outline"
                          className={
                            ticket.priority === 'Critical' ? 'border-red-500 text-red-700' :
                            ticket.priority === 'High' ? 'border-orange-500 text-orange-700' :
                            'border-blue-500 text-blue-700'
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-[#01411C] mb-2">{ticket.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{ticket.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{ticket.createdBy.name}</span>
                        </div>
                        <div>Category: <span className="font-medium text-[#01411C]">{ticket.category}</span></div>
                        {ticket.department && (
                          <div>Dept: <span className="font-medium text-[#01411C]">{ticket.department}</span></div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-[#01411C] hover:bg-[#0B5D1E]">
                        Validate
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#01411C]/30">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        Mark Duplicate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Submissions Tab */}
        <TabsContent value="recent" className="space-y-4">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Recent Complaint Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentComplaints.map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                        <Badge variant="outline" className="text-xs">{ticket.status}</Badge>
                      </div>
                      <p className="font-medium text-[#01411C]">{ticket.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{ticket.createdBy.name} • {ticket.category}</p>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create New Tab */}
        <TabsContent value="create">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Create Complaint on Behalf of Citizen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Citizen Information</label>
                  <Input placeholder="Citizen Name" className="mb-2" />
                  <Input placeholder="Contact Number" className="mb-2" />
                  <Input placeholder="Email (Optional)" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Details</label>
                  <Input placeholder="Complaint Title" className="mb-2" />
                  <textarea 
                    placeholder="Complaint Description"
                    className="w-full min-h-32 p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Infrastructure</option>
                      <option>Billing</option>
                      <option>Service Request</option>
                      <option>Technical Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full bg-[#01411C] hover:bg-[#0B5D1E]">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Complaint
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
