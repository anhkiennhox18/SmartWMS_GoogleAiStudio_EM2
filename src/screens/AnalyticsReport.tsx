import React from 'react';
import { 
  Download, 
  DollarSign, 
  Database, 
  PackageCheck, 
  Smartphone,
  TrendingUp
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function AnalyticsReport() {
  const { t } = useTranslation();

  const topProducts = [
    { sku: 'IP15-256-VNM', name: 'iPhone 15 Pro Max 256GB', zone: 'Zone A (Hi-Value)', scans: 1450 },
    { sku: 'SS-S24U-512', name: 'Samsung Galaxy S24 Ultra', zone: 'Zone A (Hi-Value)', scans: 1205 },
    { sku: 'AP-APRO-G2', name: 'AirPods Pro 2nd Gen', zone: 'Zone B (Accessories)', scans: 980 },
    { sku: 'XM-MI14-256', name: 'Xiaomi 14 256GB Black', zone: 'Zone C (Standard)', scans: 742 },
    { sku: 'SN-PS5-SLIM', name: 'PlayStation 5 Slim Edition', zone: 'Zone D (Bulk)', scans: 430 },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {t('analytics.title')}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {t('analytics.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
              <button className="px-3.5 py-1.5 text-sm font-bold bg-slate-100 rounded-md text-slate-800 transition-colors">
                {t('analytics.filter.today')}
              </button>
              <button className="px-3.5 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                {t('analytics.filter.7days')}
              </button>
              <button className="px-3.5 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                {t('analytics.filter.30days')}
              </button>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-2 rounded-lg font-bold shadow-sm">
              <Download className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">{t('analytics.export')}</span>
            </button>
          </div>
        </header>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Card 1: Total Inventory Value */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-sm font-bold">{t('analytics.kpi.value')}</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">$4.2M</div>
              <div className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
                <span>+12.5%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Storage Utilization */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-sm font-bold">{t('analytics.kpi.utilization')}</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-indigo-600" strokeWidth={2} />
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">84%</span>
                <span className="text-xs font-bold text-slate-400">12K / 15K Bins</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 3: Order Fulfillment Rate */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-sm font-bold">{t('analytics.kpi.fulfillment')}</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <PackageCheck className="w-5 h-5 text-emerald-600" strokeWidth={2} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-500 tracking-tight">98.5%</div>
              <div className="text-sm font-medium text-slate-500 mt-1">
                2,450 / 2,485 orders
              </div>
            </div>
          </div>

          {/* Card 4: PDA Scanning Efficiency */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-sm font-bold">{t('analytics.kpi.efficiency')}</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-amber-600" strokeWidth={2} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">4.2<span className="text-xl text-slate-500 font-bold tracking-normal ml-1">min/Wave</span></div>
              <div className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 rotate-180" strokeWidth={2.5} />
                <span>15s faster</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualized Chart Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Inbound vs Outbound Volume (Col 1 & 2) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-900">{t('analytics.chart.volume')}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold text-slate-500 uppercase">{t('analytics.chart.inbound')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-xs font-bold text-slate-500 uppercase">{t('analytics.chart.outbound')}</span>
                </div>
              </div>
            </div>
            
            {/* Bar Chart Mockup (Flexbox) */}
            <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 h-56 pt-4 border-b border-slate-100">
              {/* Mon */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[40%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[30%] transition-all hover:opacity-80"></div>
              </div>
              {/* Tue */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[55%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[65%] transition-all hover:opacity-80"></div>
              </div>
              {/* Wed */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[45%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[50%] transition-all hover:opacity-80"></div>
              </div>
              {/* Thu */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[80%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[70%] transition-all hover:opacity-80"></div>
              </div>
              {/* Fri */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[60%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[85%] transition-all hover:opacity-80"></div>
              </div>
              {/* Sat */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[30%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[25%] transition-all hover:opacity-80"></div>
              </div>
              {/* Sun */}
              <div className="flex-1 flex justify-center gap-1 md:gap-2 h-full items-end pb-2">
                <div className="w-1/3 max-w-[24px] bg-blue-500 rounded-t-md h-[20%] transition-all hover:opacity-80"></div>
                <div className="w-1/3 max-w-[24px] bg-amber-400 rounded-t-md h-[35%] transition-all hover:opacity-80"></div>
              </div>
            </div>
            {/* X Axis Labels */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 pt-3 px-2">
              <span className="flex-1 text-center">Mon</span>
              <span className="flex-1 text-center">Tue</span>
              <span className="flex-1 text-center">Wed</span>
              <span className="flex-1 text-center">Thu</span>
              <span className="flex-1 text-center">Fri</span>
              <span className="flex-1 text-center">Sat</span>
              <span className="flex-1 text-center">Sun</span>
            </div>
          </div>

          {/* Inventory Distribution by Zone (Col 3) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col">
            <h2 className="text-lg font-black text-slate-900 mb-6">{t('analytics.chart.distribution')}</h2>
            
            <div className="flex flex-col gap-5 flex-1 justify-center">
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-sm font-bold text-slate-700">Zone A (Cool Zone)</span>
                  <span className="text-sm font-black text-slate-900">45%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-sm font-bold text-slate-700">Zone B (Dry Zone)</span>
                  <span className="text-sm font-black text-slate-900">30%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-sm font-bold text-slate-700">Zone C (High-Value)</span>
                  <span className="text-sm font-black text-slate-900">15%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-sm font-bold text-slate-700">Zone D (Bulk/Floor)</span>
                  <span className="text-sm font-black text-slate-900">10%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Moving Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden mb-8">
          <div className="p-5 md:p-6 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900">{t('analytics.table.title')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('analytics.table.sku')}</th>
                  <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('analytics.table.name')}</th>
                  <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('analytics.table.zone')}</th>
                  <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">{t('analytics.table.scans')}</th>
                  <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">{t('analytics.table.trend')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((product, index) => (
                  <tr key={product.sku} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm font-semibold text-slate-600">{product.sku}</td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{product.name}</td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
                        {product.zone}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-black text-slate-900 text-right tabular-nums">{product.scans.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center text-emerald-500">
                      <div className="inline-flex items-center justify-center p-1.5 bg-emerald-50 rounded-lg">
                        <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
