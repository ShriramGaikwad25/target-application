'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  userId?: string;
}

interface AdminRow {
  id: number;
  userId: string;
  accountName: string;
  lastName: string;
  firstName: string;
  department: string;
  clientName: string;
  planName: string;
  roleName: string;
  entitlements: Entitlement[];
}

export default function AdminPage() {
  const router = useRouter();
  const [rowData, setRowData] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRow, setDrawerRow] = useState<AdminRow | null>(null);
  const [groups, setGroups] = useState<
    { id: string; displayName: string; memberIds: string[] }
  >([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [groupPickerOpen, setGroupPickerOpen] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);

  const columnDefs = useMemo<ColDef<AdminRow>[]>(
    () => [
      {
        headerName: '',
        width: 60,
        cellRenderer: 'agGroupCellRenderer',
      },
      { headerName: 'Account Name', field: 'accountName', flex: 1 },
      { headerName: 'First Name', field: 'firstName', flex: 1 },
      { headerName: 'Last Name', field: 'lastName', flex: 1 },
      { headerName: 'Department', field: 'department', flex: 1 },
      { headerName: 'Client Name', field: 'clientName', flex: 1 },
      { headerName: 'Plan Name', field: 'planName', flex: 1 },
      { headerName: 'Role Name', field: 'roleName', flex: 1 },
      {
        headerName: 'Action',
        field: 'action',
        width: 110,
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => {
          const row = params.data as AdminRow;
          const label = `Assign Group for ${row.firstName || 'user'}`;
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                title={`Edit ${row.firstName || 'user'}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm hover:bg-gray-100"
                onClick={() => {
                  const params = new URLSearchParams({
                    mode: 'edit',
                    userId: row.userId ?? '',
                    accountName: row.accountName ?? '',
                    firstName: row.firstName ?? '',
                    lastName: row.lastName ?? '',
                    department: row.department ?? '',
                    clientName: row.clientName ?? '',
                    planName: row.planName ?? '',
                    roleName: row.roleName ?? '',
                  });
                  router.push(`/dashboard/admin/create?${params.toString()}`);
                }}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M4 13.5V16h2.5L14 8.5 11.5 6 4 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 6 13 4.5 15.5 7 14 8.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                title={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                onClick={() => {
                  setDrawerRow(row);
                  setSelectedGroupIds([]);
                  setDrawerOpen(true);
                }}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M10 6v8M6 10h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/accounts');
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = (await res.json()) as any[];

        const mapped: AdminRow[] = json.map((item, index) => ({
          id: index + 1,
          userId: item.userId ?? '',
          accountName: item.accountName ?? '',
          lastName: item.lastName ?? '',
          firstName: item.firstName ?? '',
          department: item.department ?? '',
          clientName: item.clientName ?? '',
          planName: item.planName ?? '',
          roleName: item.roleName ?? '',
          entitlements:
            Array.isArray(item.groups) && item.groups.length > 0
              ? item.groups.map((g: any, i: number) => ({
                  id: i + 1,
                  name: g.display ?? g.value ?? '',
                  type: 'Group',
                  userId: item.userId ?? '',
                }))
              : [],
        }));

        setRowData(mapped);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const detailColumnDefs = useMemo<ColDef<Entitlement>[]>(
    () => [
      { headerName: 'Entitlement ID', field: 'id', width: 140 },
      { headerName: 'Entitlement', field: 'name', flex: 1 },
      { headerName: 'Type', field: 'type', width: 130 },
      {
        headerName: '',
        field: 'actions',
        width: 70,
        cellRenderer: (params: any) => {
          const row = params.data as Entitlement;
          return (
            <button
              type="button"
              title={`Delete ${row.name || 'entitlement'}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 hover:bg-red-50"
              onClick={async () => {
                if (!row.userId || !row.name) return;
                try {
                  const res = await fetch('/api/group-revoke', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: row.userId,
                      groupName: row.name,
                    }),
                  });
                  if (!res.ok) {
                    const data = await res.json().catch(() => null);
                    // eslint-disable-next-line no-console
                    console.error('Failed to revoke group', data);
                    return;
                  }
                  // eslint-disable-next-line no-console
                  console.log('Revoked group', row.name, 'for user', row.userId);
                  // Refresh grid data after successful revoke
                  router.refresh();
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error('Error revoking group', e);
                }
              }}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 6h10M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6 0v9a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 14 15V6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9v5M11 9v5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          );
        },
      },
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

  useEffect(() => {
    async function loadGroups() {
      try {
        setGroupsLoading(true);
        setGroupsError(null);
        const res = await fetch('/api/groups');
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json = (await res.json()) as any[];
        const mapped =
          Array.isArray(json) && json.length > 0
            ? json.map((g) => ({
                id: g.id as string,
                displayName: g.displayName as string,
                memberIds: Array.isArray(g.members)
                  ? g.members
                      .map((m: any) => m?.value as string | undefined)
                      .filter((v): v is string => Boolean(v))
                  : [],
              }))
            : [];
        setGroups(mapped);
      } catch (e: any) {
        setGroupsError(e?.message ?? 'Failed to load groups');
      } finally {
        setGroupsLoading(false);
      }
    }

    loadGroups();
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Admin</h1>
        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          onClick={() => router.push('/dashboard/admin/create')}
        >
          Create
        </button>
      </div>

      <div className="ag-theme-quartz flex-1 rounded border border-gray-200 bg-white">
        {error && (
          <div className="px-4 py-2 text-sm text-red-600">
            Failed to load data: {error}
          </div>
        )}
        <AgGridReact<AdminRow>
          rowData={rowData}
          columnDefs={columnDefs}
          masterDetail={true}
          detailRowAutoHeight={true}
          detailCellRendererParams={detailCellRendererParams as any}
          domLayout="autoHeight"
        />
      </div>
      {drawerOpen && drawerRow && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Assign Group
              </h2>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-800"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-auto px-5 py-4 text-sm text-gray-700">
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500">
                  User
                </div>
                <div className="mt-1">
                  {drawerRow.firstName} &middot; {drawerRow.department}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500">
                  Client / Plan
                </div>
                <div className="mt-1">
                  {drawerRow.clientName} &mdash; {drawerRow.planName}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-gray-500">
                  Role
                </div>
                <div className="mt-1">{drawerRow.roleName}</div>
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                  Assign to group
                </div>
                {groupsError && (
                  <div className="mb-2 text-xs text-red-600">
                    Failed to load groups: {groupsError}
                  </div>
                )}
                <div className="relative mt-1">
                  {drawerRow && (
                    <input
                      type="hidden"
                      value={drawerRow.userId}
                      readOnly
                    />
                  )}
                  <button
                    type="button"
                    disabled={groupsLoading}
                    onClick={() => setGroupPickerOpen((o) => !o)}
                    className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50"
                  >
                    <span>
                      {groupsLoading
                        ? 'Loading groups...'
                        : selectedGroupIds.length === 0
                          ? 'Select groups'
                          : `${selectedGroupIds.length} group${
                              selectedGroupIds.length > 1 ? 's' : ''
                            } selected`}
                    </span>
                    <span className="text-xs text-gray-500">
                      {groupPickerOpen ? '▲' : '▼'}
                    </span>
                  </button>
                  {groupPickerOpen && !groupsLoading && drawerRow && (
                    <div className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-200 bg-white shadow-lg">
                      {groups
                        .filter((g) => {
                          const memberIds = g.memberIds ?? [];
                          return (
                            !memberIds.includes(drawerRow.userId) ||
                            selectedGroupIds.includes(g.id)
                          );
                        })
                        .map((g) => {
                        const checked = selectedGroupIds.includes(g.id);
                        return (
                          <label
                            key={g.id}
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={checked}
                              onChange={() => {
                                setSelectedGroupIds((prev) =>
                                  checked
                                    ? prev.filter((id) => id !== g.id)
                                    : [...prev, g.id],
                                );
                              }}
                            />
                            <span>{g.displayName}</span>
                          </label>
                        );
                      })}
                      {groups.length === 0 && (
                        <div className="px-3 py-2 text-xs text-gray-500">
                          No groups available.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2 border-t px-5 py-3">
              {assignError && (
                <div className="rounded border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-700">
                  {assignError}
                </div>
              )}
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
                disabled={
                  assigning || selectedGroupIds.length === 0 || !drawerRow?.userId
                }
                onClick={async () => {
                  if (!drawerRow?.userId || selectedGroupIds.length === 0) return;
                  try {
                    setAssigning(true);
                    setAssignError(null);
                    const promises = selectedGroupIds.map((groupId) =>
                      fetch('/api/group-assign', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          userId: drawerRow.userId,
                          groupName:
                            groups.find((g) => g.id === groupId)?.id ?? groupId,
                        }),
                      }),
                    );
                    const results = await Promise.all(promises);
                    const failed = results.filter((r) => !r.ok);
                    if (failed.length > 0) {
                      const first = failed[0];
                      const data = await first.json().catch(() => null);
                      throw new Error(
                        data?.error ||
                          `One or more assignments failed (status ${first.status})`,
                      );
                    }
                    setDrawerOpen(false);
                    // Refresh main page data after successful assignment
                    router.refresh();
                  } catch (e: any) {
                    setAssignError(e?.message ?? 'Failed to assign groups');
                  } finally {
                    setAssigning(false);
                  }
                }}
              >
                {assigning ? 'Adding...' : 'Add'}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

