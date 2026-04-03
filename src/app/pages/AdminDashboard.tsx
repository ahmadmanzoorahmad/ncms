// System Admin Dashboard

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockUsers, mockDepartments, mockTickets } from '../data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Settings, Users, Shield, Database, Activity, 
  CheckCircle, AlertCircle, UserPlus, Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const { environment, currentUser } = useApp();
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalUsers = mockUsers.length;
  const activeSystems = 5;
  const totalComplaints = mockTickets.length;

  // Group users by role
  const usersByRole = mockUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] text-white rounded-lg p-6 shadow-lg border-l-4 border-[#1F7A3A]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Admin Dashboard</h1>
            <p className="text-white/90 mt-1">سسٹم ایڈمن ڈیش بورڈ • Complete System Control</p>
            <p className="text-sm text-white/70 mt-1">
              {currentUser.name} • Full Access • {environment} Mode
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/80">System Status</p>
              <p className="text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Online
              </p>
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
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-[#01411C]">{totalUsers}</p>
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
                <p className="text-sm text-gray-600 mb-1">Departments</p>
                <p className="text-2xl font-bold text-[#01411C]">{mockDepartments.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
                <p className="text-2xl font-bold text-[#01411C]">{totalComplaints}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#01411C]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-[#28A745]">99.9%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="bg-[#DFF5E1]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            System Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            User Management
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            Role Matrix
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            System Settings
          </TabsTrigger>
        </TabsList>

        {/* System Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Environment Status */}
            <Card className="border-[#01411C]/20">
              <CardHeader>
                <CardTitle className="text-[#01411C] flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Environment Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#DFF5E1] rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Current Mode</p>
                    <p className="font-semibold text-[#01411C]">{environment}</p>
                  </div>
                  <Badge className={environment === 'Demo' ? 'bg-amber-500' : 'bg-[#01411C]'}>
                    {environment === 'Demo' ? '⚠️ Demo' : '🔒 Live'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Role Switching</p>
                    <p className="font-semibold text-blue-900">
                      {environment === 'Demo' ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <Lock className={environment === 'Demo' ? 'w-5 h-5 text-amber-600' : 'w-5 h-5 text-green-600'} />
                </div>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card className="border-[#01411C]/20">
              <CardHeader>
                <CardTitle className="text-[#01411C] flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Distribution by Role
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(usersByRole).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{role}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-[#01411C] rounded-full"
                          style={{ width: `${(count / totalUsers) * 100}%` }}
                        />
                      </div>
                      <Badge variant="outline" className="border-[#01411C]/30 text-[#01411C]">
                        {count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Department Overview */}
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockDepartments.map(dept => {
                  const deptTickets = mockTickets.filter(t => t.department === dept.name);
                  const deptUsers = mockUsers.filter(u => u.department === dept.name);
                  
                  return (
                    <div key={dept.id} className="p-4 border border-[#01411C]/20 rounded-lg bg-gradient-to-br from-white to-[#DFF5E1]/20">
                      <h4 className="font-semibold text-[#01411C] mb-2">{dept.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Staff</span>
                          <Badge variant="outline" className="border-[#01411C]/30">
                            {deptUsers.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Complaints</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-700">
                            {deptTickets.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Category</span>
                          <span className="text-[#01411C] font-medium">{dept.category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#01411C]">All System Users</CardTitle>
                <Button className="bg-[#01411C] hover:bg-[#0B5D1E]">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-[#01411C]/20 rounded-lg hover:bg-[#DFF5E1]/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#01411C] rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#01411C]">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-[#01411C]/30 text-[#01411C]">
                            {user.role}
                          </Badge>
                          {user.department && (
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                              {user.department}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-[#01411C]/30">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        Disable
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Matrix Tab */}
        <TabsContent value="roles">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C]">Role-Based Access Control Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#01411C]">
                      <th className="text-left p-3 font-semibold text-[#01411C]">Role</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">Create</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">View</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">Edit</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">Assign</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">Escalate</th>
                      <th className="text-center p-3 font-semibold text-[#01411C]">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { role: 'Citizen', create: true, view: true, edit: false, assign: false, escalate: false, close: false },
                      { role: 'Call Center Officer', create: true, view: true, edit: true, assign: false, escalate: false, close: false },
                      { role: 'Support Agent', create: false, view: true, edit: true, assign: false, escalate: true, close: true },
                      { role: 'Field Engineer', create: false, view: true, edit: true, assign: false, escalate: false, close: false },
                      { role: 'Supervisor', create: false, view: true, edit: true, assign: true, escalate: true, close: true },
                      { role: 'Department Head', create: false, view: true, edit: true, assign: true, escalate: true, close: true },
                      { role: 'Executive', create: false, view: true, edit: false, assign: false, escalate: false, close: false },
                      { role: 'Auditor', create: false, view: true, edit: false, assign: false, escalate: false, close: false },
                      { role: 'System Admin', create: true, view: true, edit: true, assign: true, escalate: true, close: true },
                    ].map((roleData) => (
                      <tr key={roleData.role} className="border-b border-gray-200 hover:bg-[#DFF5E1]/20">
                        <td className="p-3 font-medium text-[#01411C]">{roleData.role}</td>
                        <td className="text-center p-3">
                          {roleData.create ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                        <td className="text-center p-3">
                          {roleData.view ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                        <td className="text-center p-3">
                          {roleData.edit ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                        <td className="text-center p-3">
                          {roleData.assign ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                        <td className="text-center p-3">
                          {roleData.escalate ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                        <td className="text-center p-3">
                          {roleData.close ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings">
          <Card className="border-[#01411C]/20">
            <CardHeader>
              <CardTitle className="text-[#01411C] flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#01411C] mb-3">SLA Configuration</h4>
                <div className="space-y-2">
                  {[
                    { priority: 'Critical', hours: 4 },
                    { priority: 'High', hours: 24 },
                    { priority: 'Medium', hours: 72 },
                    { priority: 'Low', hours: 168 },
                  ].map(sla => (
                    <div key={sla.priority} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{sla.priority} Priority</span>
                      <Badge variant="outline" className="border-[#01411C]/30">
                        {sla.hours} hours
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#01411C] mb-3">Demo Mode Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-sm">Allow Role Switching</span>
                    <Badge className="bg-amber-500">Enabled in Demo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm">Sample Data</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#01411C] hover:bg-[#0B5D1E]">
                <Settings className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
