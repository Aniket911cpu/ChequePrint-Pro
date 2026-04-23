import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, UserPlus, Shield, MoreVertical, Search, Mail, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin_users'],
    queryFn: async () => {
      // In a real app, this would be an IPC call to fetch all users
      // Mocking for now to show the UI
      return [
        { id: 1, full_name: 'System Admin', email: 'admin@chequeprint.pro', role: 'Admin', status: 'Active' },
        { id: 2, full_name: 'John Doe', email: 'john@company.com', role: 'Printer', status: 'Active' },
        { id: 3, full_name: 'Sarah Smith', email: 'sarah@finance.com', role: 'Manager', status: 'Inactive' },
      ];
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold gradient-text">User Management</h2>
          <p className="text-muted-foreground">Manage system access and permissions for your team.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add New User
        </button>
      </div>

      <div className="card space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              placeholder="Search users by name or email..." 
              className="w-full form-input pl-11"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {user.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-destructive'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
