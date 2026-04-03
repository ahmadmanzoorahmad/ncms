// Mock Data Store - Simulates backend data

import { Ticket, User, Notification, Comment, KPIMetrics, TeamPerformance } from '../types';
import { SLAEngine } from '../services/sla-engine';
import { AIService } from '../services/ai-service';

// Mock Users - All Roles
export const mockUsers: User[] = [
  // Citizens
  { id: 'U001', name: 'Ahmed Khan', email: 'ahmed@citizen.pk', role: 'Citizen', department: null },
  { id: 'U002', name: 'Fatima Ali', email: 'fatima@citizen.pk', role: 'Citizen', department: null },
  
  // Call Center Officers
  { id: 'U003', name: 'Saira Malik', email: 'saira@pda.gov.pk', role: 'Call Center Officer', department: 'Intake' },
  
  // Support Agents
  { id: 'U004', name: 'Hassan Raza', email: 'hassan@pda.gov.pk', role: 'Support Agent', department: 'Technical Support' },
  { id: 'U005', name: 'Ayesha Siddiqui', email: 'ayesha@pda.gov.pk', role: 'Support Agent', department: 'Billing' },
  
  // Field Engineers
  { id: 'U006', name: 'Usman Tariq', email: 'usman@pda.gov.pk', role: 'Field Engineer', department: 'Field Operations' },
  
  // Supervisors
  { id: 'U007', name: 'Zainab Hussain', email: 'zainab@pda.gov.pk', role: 'Supervisor', department: 'Technical Support' },
  { id: 'U008', name: 'Ali Akbar', email: 'ali@pda.gov.pk', role: 'Supervisor', department: 'Billing' },
  
  // Department Heads
  { id: 'U009', name: 'Dr. Imran Sheikh', email: 'imran@pda.gov.pk', role: 'Department Head', department: 'Operations' },
  
  // Executive
  { id: 'U010', name: 'Syed Farhan Ahmad', email: 'farhan@pda.gov.pk', role: 'Executive', department: 'National Command Center' },
  
  // Auditor
  { id: 'U011', name: 'Maryam Noor', email: 'maryam@pda.gov.pk', role: 'Auditor', department: 'Compliance' },
  
  // System Admin
  { id: 'U012', name: 'Kamran Shahid', email: 'kamran@pda.gov.pk', role: 'System Admin', department: 'IT' },
];

// Departments
export const mockDepartments = [
  { id: 'D001', name: 'Technical Support', category: 'Technical' },
  { id: 'D002', name: 'Billing', category: 'Financial' },
  { id: 'D003', name: 'Field Operations', category: 'Operational' },
  { id: 'D004', name: 'Customer Service', category: 'Service' },
  { id: 'D005', name: 'Infrastructure', category: 'Technical' },
];

// Generate mock tickets
function generateMockTickets(): Ticket[] {
  const tickets: Ticket[] = [];
  
  const ticketData = [
    {
      title: 'Road Repair Needed - Main Boulevard',
      description: 'Large pothole causing traffic issues on Main Boulevard near Gulberg intersection.',
      category: 'Infrastructure' as const,
      priority: 'High' as const,
      status: 'In Progress' as const,
      createdBy: mockUsers[0],
      assignedTo: mockUsers[3],
      department: 'Field Operations',
      hoursAgo: 2,
    },
    {
      title: 'Electricity Bill Overcharge',
      description: 'I was charged incorrect amount this month. Bill shows 50,000 units which is impossible.',
      category: 'Billing' as const,
      priority: 'Critical' as const,
      status: 'Escalated' as const,
      createdBy: mockUsers[1],
      assignedTo: mockUsers[4],
      department: 'Billing',
      hoursAgo: 6,
    },
    {
      title: 'Water Supply Disruption',
      description: 'No water supply in Block B, DHA for the past 3 days.',
      category: 'Service Request' as const,
      priority: 'Critical' as const,
      status: 'Assigned' as const,
      createdBy: mockUsers[0],
      assignedTo: mockUsers[5],
      department: 'Field Operations',
      hoursAgo: 4,
    },
    {
      title: 'Street Light Not Working',
      description: 'Street light near Park has been out for 2 weeks creating safety concerns.',
      category: 'Infrastructure' as const,
      priority: 'Medium' as const,
      status: 'New' as const,
      createdBy: mockUsers[1],
      department: 'Field Operations',
      hoursAgo: 1,
    },
    {
      title: 'Document Verification Delay',
      description: 'Applied for document verification 15 days ago but no update yet.',
      category: 'General Inquiry' as const,
      priority: 'High' as const,
      status: 'In Progress' as const,
      createdBy: mockUsers[0],
      assignedTo: mockUsers[3],
      department: 'Customer Service',
      hoursAgo: 8,
    },
    {
      title: 'Gas Leakage Reported',
      description: 'Strong gas smell in residential area. Emergency attention needed.',
      category: 'Service Request' as const,
      priority: 'Critical' as const,
      status: 'Resolved' as const,
      createdBy: mockUsers[1],
      assignedTo: mockUsers[5],
      department: 'Field Operations',
      hoursAgo: 48,
    },
    {
      title: 'Online Portal Access Issue',
      description: 'Cannot access citizen portal. Getting error message.',
      category: 'Technical Issue' as const,
      priority: 'Low' as const,
      status: 'Auto-Resolved' as const,
      createdBy: mockUsers[0],
      hoursAgo: 24,
      isAIResolved: true,
    },
    {
      title: 'Trash Collection Missed',
      description: 'Garbage truck did not come this week in our street.',
      category: 'Service Request' as const,
      priority: 'Medium' as const,
      status: 'Closed' as const,
      createdBy: mockUsers[1],
      assignedTo: mockUsers[5],
      department: 'Field Operations',
      hoursAgo: 72,
    },
    {
      title: 'Building Permission Status',
      description: 'Need to check status of building permission application submitted last month.',
      category: 'General Inquiry' as const,
      priority: 'Low' as const,
      status: 'Auto-Resolved' as const,
      createdBy: mockUsers[0],
      hoursAgo: 12,
      isAIResolved: true,
    },
    {
      title: 'Tax Assessment Correction',
      description: 'Property tax assessment seems incorrect. Need review.',
      category: 'Billing' as const,
      priority: 'Medium' as const,
      status: 'Assigned' as const,
      createdBy: mockUsers[1],
      assignedTo: mockUsers[4],
      department: 'Billing',
      hoursAgo: 10,
    },
    {
      title: 'Traffic Signal Malfunction',
      description: 'Traffic light at Shahrah-e-Faisal junction not working properly.',
      category: 'Infrastructure' as const,
      priority: 'High' as const,
      status: 'In Progress' as const,
      createdBy: mockUsers[0],
      assignedTo: mockUsers[5],
      department: 'Field Operations',
      hoursAgo: 5,
    },
    {
      title: 'Birth Certificate Issuance',
      description: 'How to apply for birth certificate online?',
      category: 'General Inquiry' as const,
      priority: 'Low' as const,
      status: 'Auto-Resolved' as const,
      createdBy: mockUsers[1],
      hoursAgo: 16,
      isAIResolved: true,
    },
  ];

  ticketData.forEach((data, index) => {
    const createdAt = new Date(Date.now() - data.hoursAgo * 60 * 60 * 1000);
    const updatedAt = new Date(Date.now() - (data.hoursAgo - 0.5) * 60 * 60 * 1000);
    const slaDeadline = SLAEngine.getSLADeadline(createdAt, data.priority);
    const slaStatus = SLAEngine.calculateSLAStatus(createdAt, data.priority);

    const ticket: Ticket = {
      id: `TCK-${String(index + 1).padStart(4, '0')}`,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: data.status,
      createdBy: data.createdBy,
      assignedTo: data.assignedTo,
      department: data.department,
      createdAt,
      updatedAt,
      slaDeadline,
      slaStatus,
      attachments: [],
      tags: [data.category.replace(' ', '-').toLowerCase()],
      isAIResolved: data.isAIResolved,
      resolvedAt: data.status === 'Resolved' || data.status === 'Closed' ? updatedAt : undefined,
      closedAt: data.status === 'Closed' ? updatedAt : undefined,
    };

    // Add AI suggestions
    const aiResult = AIService.suggestResolution(ticket);
    ticket.aiSuggestion = aiResult.suggestion;
    ticket.aiConfidence = aiResult.confidence;

    tickets.push(ticket);
  });

  return tickets;
}

export const mockTickets = generateMockTickets();

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    userId: 'U001',
    title: 'New Ticket Created',
    message: 'Your ticket TCK-0001 has been created successfully.',
    type: 'success',
    ticketId: 'TCK-0001',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'N002',
    userId: 'U001',
    title: 'SLA Warning',
    message: 'Ticket TCK-0003 is at risk of SLA breach.',
    type: 'warning',
    ticketId: 'TCK-0003',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'N003',
    userId: 'U002',
    title: 'Ticket Assigned',
    message: 'Ticket TCK-0008 has been assigned to you.',
    type: 'info',
    ticketId: 'TCK-0008',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'N004',
    userId: 'U001',
    title: 'Ticket Resolved',
    message: 'Your ticket TCK-0005 has been resolved.',
    type: 'success',
    ticketId: 'TCK-0005',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    read: true,
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'C001',
    ticketId: 'TCK-0001',
    userId: 'U002',
    userName: 'Sarah Agent',
    content: 'I have initiated the password reset process. Please check your email.',
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    isInternal: false,
  },
  {
    id: 'C002',
    ticketId: 'TCK-0001',
    userId: 'U001',
    userName: 'John Client',
    content: 'Thank you! I received the email and was able to reset my password.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    isInternal: false,
  },
  {
    id: 'C003',
    ticketId: 'TCK-0003',
    userId: 'U002',
    userName: 'Sarah Agent',
    content: 'This needs immediate attention. Escalating to supervisor.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isInternal: true,
  },
];

// Calculate KPI Metrics
export function calculateKPIMetrics(tickets: Ticket[]): KPIMetrics {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => !['Closed', 'Auto-Resolved'].includes(t.status)).length;
  const closedTickets = tickets.filter(t => ['Closed', 'Auto-Resolved'].includes(t.status)).length;
  
  const resolvedTickets = tickets.filter(t => t.resolvedAt);
  const avgResolutionTime = resolvedTickets.length > 0
    ? resolvedTickets.reduce((sum, t) => {
        const duration = (t.resolvedAt!.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
        return sum + duration;
      }, 0) / resolvedTickets.length
    : 0;

  const slaCompliantTickets = tickets.filter(t => t.slaStatus !== 'Breached').length;
  const slaCompliance = (slaCompliantTickets / totalTickets) * 100;

  const breachCount = tickets.filter(t => t.slaStatus === 'Breached').length;

  const aiResolvedTickets = tickets.filter(t => t.isAIResolved).length;
  const aiResolutionRate = (aiResolvedTickets / totalTickets) * 100;

  const escalatedTickets = tickets.filter(t => t.status === 'Escalated').length;
  const escalationRate = (escalatedTickets / totalTickets) * 100;

  return {
    totalTickets,
    openTickets,
    closedTickets,
    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
    slaCompliance: Math.round(slaCompliance * 10) / 10,
    breachCount,
    aiResolutionRate: Math.round(aiResolutionRate * 10) / 10,
    escalationRate: Math.round(escalationRate * 10) / 10,
  };
}

// Calculate Team Performance
export function calculateTeamPerformance(tickets: Ticket[]): TeamPerformance[] {
  const agents = mockUsers.filter(u => u.role === 'Agent');
  
  return agents.map(agent => {
    const assignedTickets = tickets.filter(t => t.assignedTo?.id === agent.id);
    const resolvedTickets = assignedTickets.filter(t => t.resolvedAt);
    
    const avgResolutionTime = resolvedTickets.length > 0
      ? resolvedTickets.reduce((sum, t) => {
          const duration = (t.resolvedAt!.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
          return sum + duration;
        }, 0) / resolvedTickets.length
      : 0;

    const slaCompliantTickets = assignedTickets.filter(t => t.slaStatus !== 'Breached').length;
    const slaCompliance = assignedTickets.length > 0
      ? (slaCompliantTickets / assignedTickets.length) * 100
      : 100;

    return {
      agentId: agent.id,
      agentName: agent.name,
      assignedTickets: assignedTickets.length,
      resolvedTickets: resolvedTickets.length,
      avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
      slaCompliance: Math.round(slaCompliance * 10) / 10,
    };
  });
}