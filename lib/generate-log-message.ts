import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = ({
  action,
  entityTitle,
  entityType,
}: AuditLog) => {
  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    default:
      return `Uknown action ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
};
