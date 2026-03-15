'use client';

import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { LicenseManager, MasterDetailModule } from 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-quartz.css';

LicenseManager.setLicenseKey(
  'Using_this_{AG_Grid}_Enterprise_key_{AG-104383}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{KeyForge_llc}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{KeyForge_ISPM}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{KeyForge_ISPM}_need_to_be_licensed___{KeyForge_ISPM}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{1_October_2026}____[v3]_[01]_MTc5MDgwOTIwMDAwMA==0b69f6263fac7794744c4ab7c7fde284',
);

ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule]);

interface Entitlement {
  id: number;
  name: string;
  type: string;
}

interface AdminRow {
  id: number;
  account: string;
  owner: string;
  status: string;
  entitlements: Entitlement[];
}

export default function AdminPage() {
  const columnDefs = useMemo<ColDef<AdminRow>[]>(
    () => [
      {
        headerName: '',
        field: 'expand',
        width: 60,
        cellRenderer: 'agGroupCellRenderer',
      },
      { headerName: 'Account', field: 'account', flex: 1 },
      { headerName: 'Owner', field: 'owner', flex: 1 },
      { headerName: 'Status', field: 'status', width: 140 },
    ],
    [],
  );

  const rowData: AdminRow[] = [
    {
      id: 1,
      account: 'HR-Portal',
      owner: 'Harish',
      status: 'Active',
      entitlements: [
        { id: 101, name: 'View Employees', type: 'Read' },
        { id: 102, name: 'Edit Employees', type: 'Write' },
      ],
    },
    {
      id: 2,
      account: 'Payroll',
      owner: 'Priya',
      status: 'Active',
      entitlements: [
        { id: 201, name: 'View Payroll', type: 'Read' },
        { id: 202, name: 'Run Payroll', type: 'Execute' },
      ],
    },
    {
      id: 3,
      account: 'Benefits',
      owner: 'Ravi',
      status: 'Inactive',
      entitlements: [{ id: 301, name: 'View Benefits', type: 'Read' }],
    },
  ];

  const detailColumnDefs = useMemo<ColDef<Entitlement>[]>(
    () => [
      { headerName: 'Entitlement ID', field: 'id', width: 140 },
      { headerName: 'Entitlement', field: 'name', flex: 1 },
      { headerName: 'Type', field: 'type', width: 130 },
    ],
    [],
  );

  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: detailColumnDefs,
        domLayout: 'autoHeight' as const,
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.entitlements ?? []);
      },
    }),
    [detailColumnDefs],
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Admin</h1>
        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      <div className="ag-theme-quartz flex-1 rounded border border-gray-200 bg-white">
        <AgGridReact<AdminRow>
          rowData={rowData}
          columnDefs={columnDefs}
          masterDetail={true}
          detailRowHeight={170}
          detailCellRendererParams={detailCellRendererParams as any}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}

