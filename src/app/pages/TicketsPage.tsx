// Tickets Page - Shows all tickets for current user with advanced filters

import { useState } from 'react';
import { Link } from 'react-router';
import { TicketCard } from '../components/TicketCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, tickets } = useApp();
  const { t } = useLanguage();
  
  // Filter tickets by current user
  const userTickets = tickets.filter(t => t.createdBy.id === currentUser.id);
  
  const newTickets = userTickets.filter(t => t.status === 'New');
  const inProgressTickets = userTickets.filter(t => ['Assigned', 'In Progress', 'AI Analysis'].includes(t.status));
  const resolvedTickets = userTickets.filter(t => ['Resolved', 'Auto-Resolved', 'Closed'].includes(t.status));
  const escalatedTickets = userTickets.filter(t => t.status === 'Escalated');
  
  // Filter tickets based on search
  const filterTickets = (ticketList: typeof userTickets) => {
    if (!searchQuery) return ticketList;
    
    return ticketList.filter(ticket =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] text-white rounded-lg p-6 shadow-lg border-l-4 border-[#1F7A3A]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">My Tickets</h1>
            <p className="text-white/90 mt-1">میری شکایات • Track and manage your complaints</p>
          </div>
          <Link to="/create-ticket">
            <Button 
              size="lg" 
              className="flex items-center space-x-2 bg-white text-[#01411C] hover:bg-white/90 font-semibold shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span>Submit New Complaint</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-[#01411C]/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by ticket ID, title, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-[#01411C]/20 focus:border-[#01411C]"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tickets Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-[#01411C]/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            All ({userTickets.length})
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            <Clock className="w-4 h-4 mr-1" />
            New ({newTickets.length})
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            <AlertTriangle className="w-4 h-4 mr-1" />
            In Progress ({inProgressTickets.length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolved ({resolvedTickets.length})
          </TabsTrigger>
          <TabsTrigger value="escalated" className="data-[state=active]:bg-[#01411C] data-[state=active]:text-white">
            <XCircle className="w-4 h-4 mr-1" />
            Escalated ({escalatedTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {filterTickets(userTickets).length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-semibold">No tickets found</p>
                  <p className="text-sm">Create your first complaint to get started</p>
                </div>
                <Link to="/create-ticket">
                  <Button className="bg-[#01411C] hover:bg-[#0B5D1E]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterTickets(userTickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="new" className="space-y-4 mt-6">
          {filterTickets(newTickets).length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2" />
                <p>No new tickets</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterTickets(newTickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4 mt-6">
          {filterTickets(inProgressTickets).length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center text-gray-400">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                <p>No tickets in progress</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterTickets(inProgressTickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-6">
          {filterTickets(resolvedTickets).length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center text-gray-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                <p>No resolved tickets</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterTickets(resolvedTickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="escalated" className="space-y-4 mt-6">
          {filterTickets(escalatedTickets).length === 0 ? (
            <Card className="border-[#01411C]/20">
              <CardContent className="p-12 text-center text-gray-400">
                <XCircle className="w-12 h-12 mx-auto mb-2" />
                <p>No escalated tickets</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterTickets(escalatedTickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}