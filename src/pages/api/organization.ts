/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db";

export const createOrganization = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const name: string = req.body?.name || 'New Organization';
  const response = await prisma.organization.create({ data: { name } });
  res.status(200).json(response);
};

export default createOrganization;