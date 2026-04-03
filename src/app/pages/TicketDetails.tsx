// Ticket Details Page

import { useParams, Link } from 'react-router';
import { mockTickets, mockComments } from '../data/mock-data';
import { AuditService } from '../services/audit-service';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SLATimer } from '../components/SLATimer';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft,
  User,
  Calendar,
  MessageSquare,
  Bot,
  Shield,
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';
import { SLAEngine } from '../services/sla-engine';

export default function TicketDetails() {
  const { id } = useParams();
  const ticket = mockTickets.find(t => t.id === id);
  const comments = mockComments.filter(c => c.ticketId === id);
  const auditReport = ticket ? AuditService.generateTicketAuditReport(ticket.id) : null;

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Ticket Not Found</h2>
        <p className="text-gray-600 mt-2">The ticket you're looking for doesn't exist.</p>
        <Link to="/">
          <Button className="mt-4">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const priorityColor = SLAEngine.getPriorityColor(ticket.priority);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-mono text-gray-500">{ticket.id}</span>
            <div className={`w-2 h-2 rounded-full ${priorityColor}`} />
            <Badge className={`${priorityColor.replace('bg-', 'text-')} border-current`}>
              {ticket.priority}
            </Badge>
            {ticket.isAIResolved && (
              <Badge variant="outline" className="flex items-center space-x-1">
                <Bot className="w-3 h-3" />
                <span>AI Resolved</span>
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{ticket.title}</h1>
          <p className="text-gray-600 mt-2">{ticket.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Reassign</Button>
          <Button>Update Status</Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <Badge variant="secondary" className="text-base">
                    {ticket.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category</span>
                  <Badge variant="outline">{ticket.category}</Badge>
                </div>
                {!['Closed', 'Auto-Resolved'].includes(ticket.status) && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">SLA Countdown</p>
                    <SLATimer 
                      deadline={ticket.slaDeadline} 
                      slaStatus={ticket.slaStatus}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestion */}
          {ticket.aiSuggestion && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-900">
                  <Bot className="w-5 h-5" />
                  <span>AI Suggestion</span>
                  <Badge className="bg-purple-600">
                    {Math.round((ticket.aiConfidence || 0) * 100)}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-800">{ticket.aiSuggestion}</p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline">Apply Suggestion</Button>
                  <Button size="sm" variant="outline">Not Helpful</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs - Comments, Activity, Audit */}
          <Tabs defaultValue="comments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comments">
                Comments ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="activity">
                Activity
              </TabsTrigger>
              <TabsTrigger value="audit">
                Audit Trail
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Comment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea placeholder="Type your comment here..." rows={4} />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">Internal Note</Button>
                    <Button size="sm">Post Comment</Button>
                  </div>
                </CardContent>
              </Card>

              {comments.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No comments yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{comment.userName}</span>
                              <span className="text-xs text-gray-500">
                                {comment.createdAt.toLocaleString()}
                              </span>
                              {comment.isInternal && (
                                <Badge variant="secondary" className="text-xs">Internal</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Ticket Created</p>
                        <p className="text-xs text-gray-500">{ticket.createdAt.toLocaleString()}</p>
                      </div>
                    </div>
                    {ticket.assignedTo && (
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Assigned to {ticket.assignedTo.name}</p>
                          <p className="text-xs text-gray-500">{ticket.updatedAt.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {ticket.resolvedAt && (
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Ticket Resolved</p>
                          <p className="text-xs text-gray-500">{ticket.resolvedAt.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Audit Trail (Blockchain-Ready)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {auditReport && (
                    <div className="space-y-4">
                      {/* Blockchain Verification Placeholder */}
                      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              Blockchain Verification (Future Integration)
                            </p>
                            <p className="text-xs text-blue-700">
                              When enabled, all audit events will be cryptographically verified and stored on the blockchain.
                            </p>
                          </div>
                          <Badge variant="outline" className="text-blue-700 border-blue-300">
                            Ready
                          </Badge>
                        </div>
                      </div>

                      {/* Audit Timeline */}
                      <div className="space-y-3">
                        {auditReport.timeline.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Clock className="w-4 h-4 text-gray-600 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium">{item.action}</span>
                                <Badge variant="outline" className="text-xs">
                                  {item.timestamp.toLocaleString()}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600">By: {item.user}</p>
                              {item.details && (
                                <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* People */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">People</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Reported By</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{ticket.createdBy.name}</p>
                    <p className="text-xs text-gray-500">{ticket.createdBy.email}</p>
                  </div>
                </div>
              </div>
              {ticket.assignedTo && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ticket.assignedTo.name}</p>
                      <p className="text-xs text-gray-500">{ticket.assignedTo.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Created</span>
                <span className="text-gray-900">{ticket.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Updated</span>
                <span className="text-gray-900">{ticket.updatedAt.toLocaleDateString()}</span>
              </div>
              {ticket.resolvedAt && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Resolved</span>
                  <span>{ticket.resolvedAt.toLocaleDateString()}</span>
                </div>
              )}
              {ticket.closedAt && (
                <div className="flex items-center justify-between text-gray-600">
                  <span>Closed</span>
                  <span>{ticket.closedAt.toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ticket.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
