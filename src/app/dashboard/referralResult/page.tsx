'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Dashboard_Components/Header';
import SearchByDate from '@/app/components/Referral_Components/SearchByDate';
import api from '@/lib/api';
import { API_URL } from '@/lib/utils';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface Referee {
  firstName: string;
  lastName: string;
  _id: string;
}

interface Referral {
  selected: boolean;
  acceptedAt: string;
  createdAt: string;  
  email: string;
  refereeId: Referee; 
  referrerId: string;
  status: string;
  updatedAt: string;  
  __v: number;
  _id: string;
}


function InvitationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isInvitesOpen, setIsInvitesOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);
  const [data, setData] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Get dates from URL params
  const fromDate = searchParams?.get('fromDate');
  const toDate = searchParams?.get('toDate');
  const statusParam = searchParams?.get('status');

  //state for filters
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<string | null>(null);
  
  // Fetch data when dates or pagination changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query params
        const params: Record<string, any> = {
          page: pagination.page,
          limit: pagination.limit,
        };

        // Add date filters
        if (fromDate && toDate) {
          params.fromDate = fromDate;
          params.toDate = toDate;
        }

        // Add status filters
        if (statusParam) {
          params.status = statusParam;
        }

        const response = await api.get(`${API_URL}/api/v1/referrals/`, { params });
        
        setData(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
        }));
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Failed to fetch referrals";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate, statusParam, pagination.page, pagination.limit]);

  useEffect(() => {
    setSelectedStatus(statusParam || null);
  
    if (fromDate && toDate) {
      setDateRangeFilter(''); 
    } else {
      setDateRangeFilter(null);
    }
  }, [statusParam, fromDate, toDate]);
  

  const handleDateApply = (dates: { fromDate: string; toDate: string }) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('fromDate', dates.fromDate);
    params.set('toDate', dates.toDate);
    router.push(`${pathname}?${params.toString()}`);
    
    // Reset to first page when dates change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

    // Handle status filter changes
    const handleStatusChange = (status: string) => {
      const newStatus = selectedStatus === status ? null : status;
      setSelectedStatus(newStatus);
    
      applyFilters({
        status: newStatus,
        dateRangeFilter,
      });
    };
    
  
    // Handle date range checkbox button changes
    const handleDateRangeChange = (range: string) => {
      const newRange = dateRangeFilter === range ? null : range;
      setDateRangeFilter(newRange);
    
      applyFilters({
        status: selectedStatus,
        dateRangeFilter: newRange,
      });
    };
    

  // Then update the applyFilters function to ensure we're passing the correct types
  const applyFilters = ({
    status,
    dateRangeFilter,
  }: {
    status: string | null;
    dateRangeFilter: string | null;
  }) => {
    const params: Record<string, string | null | undefined> = {
      status: status || undefined,
    };
  
    if (dateRangeFilter) {
      const now = new Date();
      let fromDate = '';
      let toDate = now.toISOString().split('T')[0];
  
      switch (dateRangeFilter) {
        case 'today':
          fromDate = toDate;
          break;
        case 'last7days':
          fromDate = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
          break;
        case 'last30days':
          fromDate = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
          break;
        case 'all':
          fromDate = '';
          toDate = '';
          break;
      }
  
      params.fromDate = fromDate || undefined;
      params.toDate = toDate || undefined;
    }
  
    updateUrlParams(params);
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  

  // Update the updateUrlParams function to handle string | null | undefined
  const updateUrlParams = (params: Record<string, string | null | undefined>) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    
    // Update or delete params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };


  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleCheckboxChange = (personId: string) => {
    setData((prevData) =>
      prevData.map((person) =>
        person._id === personId
          ? { ...person, selected: !person.selected }
          : person
      )
    );
  };
  

  const toggleInvites = () => setIsInvitesOpen(prev => !prev);
  const toggleDates = () => setIsDatesOpen(prev => !prev);

  // Format date range for display
  const displayDateRange = fromDate && toDate 
    ? `${new Date(fromDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${new Date(toDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : 'Select date range';


  //EXPORT CSV FILE
  const exportToCSV = (data: any[], filename = 'referrals.csv') => {
    if (!data || data.length === 0) return;
  
    const csvRows = [];
  
    // 1. Headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    // 2. Rows
    for (const row of data) {
      const values = headers.map(header => {
        let value = row[header];
  
        // Convert 'createdAt' and 'acceptedAt' to locale string
        if (header === 'createdAt' || header === 'acceptedAt' || header === 'updatedAt') {
          value = new Date(value).toLocaleString();  // Convert to locale string
        }
  
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
  
    // 3. Download
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print(); 
  };
  
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="px-6">
        <div className="w-full mb-6">
          <h1 className="font-mulish font-bold text-[32px] md:text-[40px] text-black">
            Search Result:
          </h1>
          <p className="font-mulish font-medium text-[16px] text-[#747474]">
            {displayDateRange}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Left Panel */}
          <div className="w-full lg:w-[70%] flex flex-col rounded-lg overflow-hidden bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-y border-gray-200">
              <span className="font-mulish font-medium text-2xl text-[#747474]">
                {pagination.total} results found
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportToCSV(data)}
                  className="flex justify-center items-center px-3 py-1.5 text-base text-[#4E4E4E] font-jakarta bg-[#F5F5F5] rounded-md cursor-pointer w-48 h-16"
                >
                  <span className="w-3 h-3 bg-[#E4E4E4] mr-2 rounded-sm"></span>
                  Export CSV
                </button>
                <button
                  className="flex justify-center items-center px-3 py-1.5 text-base text-[#4E4E4E] font-jakarta bg-[#F5F5F5] rounded-md cursor-pointer w-48 h-16"
                  onClick={handlePrint}
                >
                  <span className="w-3 h-3 bg-[#E4E4E4] mr-2 rounded-sm"></span>
                  Print
                </button>
              </div>
              <div className="flex gap-3 items-center text-sm text-gray-600">
                <button 
                  className="p-1 rounded text-[#1E1E1E] w-4 h-4 hover:bg-gray-100 pb-6"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  ←
                </button>
                <span className='font-mulish font-medium text-base text-[#747474]'>
                  {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                </span>
                <button 
                  className="p-1 rounded text-[#1E1E1E] w-4 h-4 hover:bg-gray-100 pb-6"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page * pagination.limit >= pagination.total}
                >
                  →
                </button>
              </div>
            </div>

             {/* Subheader */}
           <div className="flex items-start justify-between px-4 py-6">
               <div>
                 <p className="font-jakarta font-bold text-base text-[#18181B]">
                   {displayDateRange}
                 </p>
                 <p className="font-jakarta font-normal text-[13px] text-[#71717A]">
                   You can refine your search using the filter panel on the right
                 </p>
               </div>
               <a
                 href="#"
                 className="text-xm text-[#2877EA] hover:underline flex items-center gap-1"
               >
                 See All Invitations <span>{'>'}</span>
               </a>
             </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-[20px] p-4">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-3">
                      <input type="checkbox" className="form-checkbox text-blue-600" />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Email Address</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Invite Sent</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Invite Accepted</th>
                  </tr>
                </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center">
                        <FaSpinner className="animate-spin text-blue-500 text-2xl mx-auto" />
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        No data found.
                      </td>
                    </tr>
                  ) : (
                    data.map((person) => (
                      <tr key={person._id} className={person.selected ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={person.selected || false}
                            onChange={() => handleCheckboxChange(person._id)}
                            className="form-checkbox text-blue-600"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
                          <div>
                            <p className="text-gray-900 font-medium">
                              {person?.refereeId?.firstName && person?.refereeId?.lastName
                                ? `${person.refereeId.firstName} ${person.refereeId.lastName}`
                                : 'N/A'}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                              person.status === 'Invite accepted'
                                ? 'bg-green-100 text-green-700'
                                : person.status === 'Invite pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            <span className="w-2 h-2 bg-current rounded-full"></span>
                            {person.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{person.email}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {person.createdAt
                            ? new Date(person.createdAt).toLocaleDateString('en-US')
                            : 'Invalid date'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {person.acceptedAt
                            ? new Date(person.acceptedAt).toLocaleDateString('en-US')
                            : 'Pending'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-center px-4 py-4 border-gray-200">
              <div className="flex items-center gap-2">
                <button 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, i) => i + 1)
                  .slice(0, 5)
                  .map(page => (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-full text-sm ${
                        page === pagination.page ? 'bg-blue-600 text-white' : 'text-gray-700'
                      } hover:bg-blue-100`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                {Math.ceil(pagination.total / pagination.limit) > 5 && (
                  <>
                    <span>...</span>
                    <button
                      className={`w-8 h-8 rounded-full text-sm ${
                        pagination.page === Math.ceil(pagination.total / pagination.limit) ? 'bg-blue-600 text-white' : 'text-gray-700'
                      } hover:bg-blue-100`}
                      onClick={() => handlePageChange(Math.ceil(pagination.total / pagination.limit))}
                    >
                      {Math.ceil(pagination.total / pagination.limit)}
                    </button>
                  </>
                )}
                <button 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page * pagination.limit >= pagination.total}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <aside className="hidden lg:block w-[30%] border border-gray-200 rounded-lg bg-gray-50 p-6 overflow-hidden">
            <SearchByDate 
              onApply={handleDateApply}
              initialFrom={fromDate ? new Date(fromDate) : null}
              initialTo={toDate ? new Date(toDate) : null}
            />

            {/* Rest of your filter components... */}
            <div className="max-w-full bg-white border border-[#E3E3E3] rounded-lg shadow p-6 space-y-4 mt-3 mb-6">
                <div className="mb-6">
                    <h3 className="text-[22px] font-manrope font-bold mb-2 text-[#191D23]">Filters</h3>

                    {/* Invites Section */}
                    <div className='mt-6'>
                    <h3
                        className="text-[18px] font-inter font-medium mb-2 text-[#191D23] cursor-pointer flex items-center justify-between"
                        onClick={toggleInvites}
                    >
                        Invites
                        <span>{isInvitesOpen ? '˅' : '›'}</span> 
                    </h3>
                    {isInvitesOpen && (
                      <div className="space-y-2">
                        <label className="flex items-center text-sm">
                        <input 
                            type="checkbox" 
                            name="status" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={selectedStatus === 'Invite accepted'}
                            onChange={() => handleStatusChange('Invite accepted')}
                          />
                          Invite accepted
                        </label>
                        <label className="flex items-center text-sm">
                        <input 
                            type="checkbox" 
                            name="status" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={selectedStatus === 'Invite pending'}
                            onChange={() => handleStatusChange('Invite pending')}
                          />
                          Invite pending
                        </label>
                        <label className="flex items-center text-sm">
                        <input 
                            type="checkbox" 
                            name="status" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={selectedStatus === 'Invite rejected'}
                            onChange={() => handleStatusChange('Invite rejected')}
                          />
                          Invite rejected
                        </label>
                      </div>
                    )}
                    </div>

                    {/* Dates Section */}
                    <div className='mt-4'>
                    <h3
                        className="text-[18px] font-inter font-medium mb-2 text-[#191D23] cursor-pointer flex items-center justify-between "
                        onClick={toggleDates}
                    >
                        Dates
                        <span>{isDatesOpen ? '˅' : '›'}</span> 
                    </h3>
                    {isDatesOpen && (
                      <div className="space-y-2">
                        <label className="flex items-center text-sm">
                          <input 
                            type="checkbox" 
                            name="date" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={dateRangeFilter === 'today'}
                            onChange={() => handleDateRangeChange('today')}
                          />
                          Today
                        </label>
                        <label className="flex items-center text-sm">
                          <input 
                            type="checkbox" 
                            name="date" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={dateRangeFilter === 'last7days'}
                            onChange={() => handleDateRangeChange('last7days')}
                          />
                          Last 7 Days
                        </label>
                        <label className="flex items-center text-sm">
                          <input 
                            type="checkbox" 
                            name="date" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={dateRangeFilter === 'last30days'}
                            onChange={() => handleDateRangeChange('last30days')}
                          />
                          Last 30 Days
                        </label>
                        <label className="flex items-center text-sm">
                          <input 
                            type="checkbox" 
                            name="date" 
                            className="mr-2 font-manrope text-base font-normal text-[#191D23]"
                            checked={dateRangeFilter === 'all'}
                            onChange={() => handleDateRangeChange('all')}
                          />
                          All Time
                        </label>
                      </div>
                    )}
                    </div>
                </div>

                <div className="w-40 flex justify-between gap-4">
                    <button onClick={() => applyFilters} className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                       Apply
                    </button>
                </div>
              </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default function InvitationDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvitationsPage />
    </Suspense>
  );
}