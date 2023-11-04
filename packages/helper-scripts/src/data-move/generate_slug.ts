import { prisma } from '@cubik/database';

export const generateSlug = async () => {
  const slugMap: Map<string, number> = new Map();

  const projects = await prisma.project.findMany();

  projects.forEach(async (e) => {
    let slug = e.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces and non-alphanum chars with dashes
      .replace(/(^-|-$)/g, ''); // Remove leading and trailing dashes

    const count = slugMap.get(slug);
    if (count !== undefined) {
      // If it does, increment the count and append it to the slug
      slugMap.set(slug, count + 1);
      slug += `-${count + 1}`;
    } else {
      // If it doesn't, add it to the map with a count of 0
      slugMap.set(slug, 0);
    }

    const update = await prisma.project.update({
      where: {
        id: e.id,
      },
      data: {
        slug: slug,
      },
    });
    console.log(update);
  });
};
