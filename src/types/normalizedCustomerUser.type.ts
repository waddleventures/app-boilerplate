import type { CustomerUserProfile, CustomerUserProfileProto, User } from "@prisma/client";

export type NormalizedCustomerUser = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  customer?: {
    name: string;
    id: string;
  };
  isProto: boolean;
}

type UserType = (User & {
  customerUserProfile: (CustomerUserProfile & {
      customer: {
          id: string;
          name: string;
      } | null;
  }) | null;
})

export const createFromUser = (user: UserType): NormalizedCustomerUser => ({
  id: user.id,
  name: user.name as string,
  email: user.email as string,
  organizationId: user.organizationId as string,
  customer: user.customerUserProfile?.customer || undefined,
  isProto: false,
});

export const createFromProto = (proto: CustomerUserProfileProto & { customer: { id: string, name: string } | null}): NormalizedCustomerUser => ({
  id: proto.id,
  name: proto.name,
  email: proto.email,
  organizationId: proto.organizationId,
  customer: proto.customer || undefined,
  isProto: true,
});