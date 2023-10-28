import { create } from 'zustand';

import type { AccessScope, AccessType } from '@cubik/common-types/src/admin';

interface AccessScopeType {
  scope: AccessScope | null;
  accessType: AccessType | undefined;
  setAccessScope: (
    accessScope: AccessScope | null,
    type: AccessType | undefined,
  ) => void;
}
export const AccessStore = create<AccessScopeType>()((set) => ({
  scope: null,
  accessType: undefined,
  setAccessScope: (access, type) => {
    set({
      scope: access,
      accessType: type,
    });
  },
}));
