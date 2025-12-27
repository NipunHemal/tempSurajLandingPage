'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetPayments } from '@/service/query/usePayment';
import { useAuthStore } from '@/store/auth.store';
import { Loader2, CheckCircle, Clock, XCircle, CreditCard, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import { PaymentFilters } from '@/types/api-payment-types';
import CustomImage from '@/components/ui/custom-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function PaymentsTab() {
  const { user } = useAuthStore();
  const [filters, setFilters] = useState<PaymentFilters>({
    studentId: user?.student?.id || null,
    page: 1,
    limit: 10,
    status: '',
  });

  const { data: paymentsResponse, isLoading } = useGetPayments(filters);

  const payments = paymentsResponse?.data?.payments ?? [];
  const pagination = paymentsResponse?.data?.pagination;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatMonth = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'BANK_SLIP':
        return (
          <Badge variant="outline" className="font-normal">
            <Receipt className="mr-1 h-3 w-3" />
            Bank Slip
          </Badge>
        );
      case 'ONLINE':
        return (
          <Badge variant="outline" className="font-normal">
            <CreditCard className="mr-1 h-3 w-3" />
            Online
          </Badge>
        );
      case 'FREE_CARD':
        return (
          <Badge variant="outline" className="font-normal">
            Free Card
          </Badge>
        );
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status: status as PaymentFilters['status'], page: 1 }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.total ?? 0}</div>
            <p className="text-xs text-muted-foreground">All time payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {payments.filter((p) => p.status === 'COMPLETED').length}
            </div>
            <p className="text-xs text-muted-foreground">Approved payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {payments.filter((p) => p.status === 'PENDING').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Payment History</CardTitle>
            <Select value={filters.status || 'all'} onValueChange={(value) => handleStatusChange(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed">
              <Receipt className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No payments found</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <Dialog key={payment.id}>
                        <DialogTrigger asChild>
                          <TableRow className={payment.slipPicture ? 'cursor-pointer hover:bg-muted/50' : ''}>
                            <TableCell className="font-medium">
                              {payment.class.name}
                            </TableCell>
                            <TableCell>{formatMonth(payment.paymentMonth)}</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(payment.amount, payment.currency)}
                            </TableCell>
                            <TableCell>{getMethodBadge(payment.method)}</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(payment.paymentDate)}
                            </TableCell>
                          </TableRow>
                        </DialogTrigger>
                        {payment.slipPicture && (
                          <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle>Payment Slip - {formatMonth(payment.paymentMonth)}</DialogTitle>
                            </DialogHeader>
                            <div className="overflow-auto max-h-[75vh]">
                              <div className="relative w-full min-w-[600px]">
                                <CustomImage
                                  src={payment.slipPicture}
                                  alt="Payment slip"
                                  width={1200}
                                  height={800}
                                  className="object-contain w-full h-auto"
                                />
                              </div>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.pages} ({pagination.total} total)
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
