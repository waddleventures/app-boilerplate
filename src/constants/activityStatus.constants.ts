import { AmbassadorActivityStatus, ActivityStatus } from "@prisma/client";

export const CActivityStatusLabel: Record<ActivityStatus, string> = {
  [ActivityStatus.NOT_PUBLISHED]: 'Not published',
  [ActivityStatus.PUBLISHED]: 'Published',
  [ActivityStatus.COMPLETED]: 'Completed',
  [ActivityStatus.ARCHIVED]: 'Archived',
}

export const CActivityStatusIconClass: Record<ActivityStatus, string> = {
  [ActivityStatus.NOT_PUBLISHED]: 'ri-forbid-2-line',
  [ActivityStatus.PUBLISHED]: 'ri-checkbox-circle-line',
  [ActivityStatus.COMPLETED]: 'ri-checkbox-circle-fill',
  [ActivityStatus.ARCHIVED]: 'ri-archive-line',
}

export const CAmbassadorActivityStatusLabel: Record<AmbassadorActivityStatus, string> = {
  [AmbassadorActivityStatus.NOT_SENT]: 'Not sent',
  [AmbassadorActivityStatus.NOT_SEEN]: 'Not seen',
  [AmbassadorActivityStatus.SEEN]: 'Seen',
  [AmbassadorActivityStatus.ACCEPTED]: 'Accepted',
  [AmbassadorActivityStatus.REJECTED]: 'Rejected',
  [AmbassadorActivityStatus.COMPLETED]: 'Completed',
  [AmbassadorActivityStatus.VERIFIED_AND_CLOSED]: 'Verified and closed',
}

export const CAmbassadorActivityStatusClasses: Record<AmbassadorActivityStatus, string> = {
  [AmbassadorActivityStatus.NOT_SENT]: 'ri-question-line text-gray-400',
  [AmbassadorActivityStatus.NOT_SEEN]: 'ri-eye-off-line text-gray-400',
  [AmbassadorActivityStatus.SEEN]: 'ri-eye-line text-sky-400',
  [AmbassadorActivityStatus.ACCEPTED]: 'ri-check-line text-emerald-700',
  [AmbassadorActivityStatus.REJECTED]: 'ri-close-line text-red-700',
  [AmbassadorActivityStatus.COMPLETED]: 'ri-check-double-line text-emerald-700',
  [AmbassadorActivityStatus.VERIFIED_AND_CLOSED]: 'ri-shield-check-line text-emerald-700'
}