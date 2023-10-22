import { AccessScope, AccessType } from "@cubik/common-types/src/admin";
import { create } from "zustand";

interface AccessScopeType {
  scope: AccessScope | null;
  accessType: AccessType | undefined;
  setAccessScope: (
    accessScope: AccessScope | null,
    type: AccessType | undefined
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
