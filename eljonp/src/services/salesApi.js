import { requireSupabase, supabase } from '../lib/supabaseClient';

export const today = new Date().toISOString().slice(0, 10);
export const currentMonth = today.slice(0, 7);

export const money = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export function parsePrice(price) {
  const amount = String(price || '').replace(/[^\d.]/g, '');
  return Number.parseFloat(amount) || 0;
}

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function calculateItemsTotal(items) {
  return roundMoney(
    items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.unitPrice), 0),
  );
}

export function normalizeItems(items) {
  return items
    .filter((item) => String(item.name || '').trim())
    .map((item) => {
      const quantity = Number(item.quantity) || 1;
      const unitPrice = roundMoney(Number(item.unitPrice) || 0);

      return {
        name: String(item.name).trim(),
        quantity,
        unitPrice,
        lineTotal: roundMoney(quantity * unitPrice),
      };
    });
}

export async function createSale(payload) {
  const client = requireSupabase();
  const items = normalizeItems(payload.items || []);
  const total = items.length > 0 ? calculateItemsTotal(items) : roundMoney(payload.total);

  if (!Number.isFinite(total) || total < 0) {
    throw new Error('Sale total must be a valid amount.');
  }

  const { data, error } = await client
    .from('sales')
    .insert({
      sale_date: payload.date || today,
      items,
      total,
      payment_method: payload.paymentMethod || 'cash',
      notes: payload.notes || '',
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { sale: mapSale(data) };
}

export async function signInAdmin(email, password) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentAdminSession() {
  if (!supabase) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getDailyReport(date) {
  const sales = await fetchSalesByDateRange(date, date);

  return {
    date,
    salesCount: sales.length,
    totalSales: roundMoney(sales.reduce((sum, sale) => sum + Number(sale.total), 0)),
    sales,
  };
}

export async function getMonthlyReport(month) {
  const from = `${month}-01`;
  const to = getLastDayOfMonth(month);
  const sales = await fetchSalesByDateRange(from, to);
  const dailyTotals = {};

  for (const sale of sales) {
    if (!dailyTotals[sale.date]) {
      dailyTotals[sale.date] = {
        date: sale.date,
        salesCount: 0,
        totalSales: 0,
      };
    }

    dailyTotals[sale.date].salesCount += 1;
    dailyTotals[sale.date].totalSales = roundMoney(dailyTotals[sale.date].totalSales + Number(sale.total));
  }

  return {
    month,
    salesCount: sales.length,
    totalSales: roundMoney(sales.reduce((sum, sale) => sum + Number(sale.total), 0)),
    dailyTotals: Object.values(dailyTotals).sort((a, b) => a.date.localeCompare(b.date)),
    sales,
  };
}

export function downloadDailyCsv(report) {
  const rows = [
    ['Date', 'Sale ID', 'Items', 'Payment Method', 'Total'],
    ...report.sales.map((sale) => [
      sale.date,
      sale.id,
      sale.items.map((item) => `${item.name} x${item.quantity}`).join('; '),
      sale.paymentMethod,
      sale.total,
    ]),
    ['', '', '', 'Daily Total', report.totalSales],
  ];

  downloadCsv(`daily-sales-${report.date}.csv`, rows);
}

export function downloadMonthlyCsv(report) {
  const rows = [
    ['Date', 'Sales Count', 'Total Sales'],
    ...report.dailyTotals.map((row) => [row.date, row.salesCount, row.totalSales]),
    ['Monthly Total', report.salesCount, report.totalSales],
  ];

  downloadCsv(`monthly-sales-${report.month}.csv`, rows);
}

async function fetchSalesByDateRange(from, to) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('sales')
    .select('*')
    .gte('sale_date', from)
    .lte('sale_date', to)
    .order('sale_date', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapSale);
}

function mapSale(row) {
  return {
    id: row.id,
    date: row.sale_date,
    items: row.items || [],
    total: Number(row.total),
    paymentMethod: row.payment_method,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function getLastDayOfMonth(month) {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthNumber, 0)).toISOString().slice(0, 10);
}

function downloadCsv(filename, rows) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const value = String(cell ?? '');
          return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(','),
    )
    .join('\n');
  const blob = new Blob([`${csv}\n`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
